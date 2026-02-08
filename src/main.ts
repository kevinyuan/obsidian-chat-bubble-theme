import { Plugin, TFile, HeadingCache } from "obsidian";

export default class ChatCalloutOutlinePlugin extends Plugin {
	private _calloutCache: Map<string, HeadingCache[]> = new Map();
	private _updating = false;
	private _originalGetFileCache: ((file: TFile) => ReturnType<typeof this.app.metadataCache.getFileCache>) | null = null;

	async onload() {
		// Monkey-patch metadataCache.getFileCache
		this._originalGetFileCache = this.app.metadataCache.getFileCache.bind(
			this.app.metadataCache
		);
		this.app.metadataCache.getFileCache = (file: TFile) => {
			return this._patchedGetFileCache(file);
		};

		// Listen for metadata changes (fires when file content changes)
		this.registerEvent(
			this.app.metadataCache.on("changed", (file: TFile) => {
				if (this._updating) return;
				this._updateCallouts(file);
			})
		);

		// Listen for active file changes
		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				const file = this.app.workspace.getActiveFile();
				if (file) {
					this._updateCallouts(file);
				}
			})
		);

		// Initial parse of the currently active file
		const activeFile = this.app.workspace.getActiveFile();
		if (activeFile) {
			this._updateCallouts(activeFile);
		}
	}

	onunload() {
		if (this._originalGetFileCache) {
			this.app.metadataCache.getFileCache = this._originalGetFileCache;
		}
		this._calloutCache.clear();
	}

	private _patchedGetFileCache(file: TFile) {
		if (!this._originalGetFileCache) return null;
		const cache = this._originalGetFileCache(file);
		if (!cache || !file) return cache;

		const calloutHeadings = this._calloutCache.get(file.path);
		if (!calloutHeadings || calloutHeadings.length === 0) return cache;

		const realHeadings = cache.headings || [];
		const merged = [...realHeadings, ...calloutHeadings];
		merged.sort((a, b) => a.position.start.line - b.position.start.line);

		return { ...cache, headings: merged };
	}

	private async _updateCallouts(file: TFile) {
		if (!file || file.extension !== "md") return;

		try {
			const content = await this.app.vault.cachedRead(file);
			const calloutHeadings = this._parseCallouts(content);
			this._calloutCache.set(file.path, calloutHeadings);

			this._updating = true;
			this.app.metadataCache.trigger("changed", file);
			this._updating = false;
		} catch {
			this._updating = false;
		}
	}

	private _parseCallouts(content: string): HeadingCache[] {
		const lines = content.split("\n");
		const headings: HeadingCache[] = [];
		let offset = 0;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]!;

			if (/^> \[!chat-[rl]\]\s*$/.test(line)) {
				const textParts: string[] = [];
				let endLine = i;
				let endCol = line.length;

				for (let j = i + 1; j < lines.length; j++) {
					const nextLine = lines[j]!;
					if (/^> .+/.test(nextLine)) {
						textParts.push(nextLine.slice(2));
						endLine = j;
						endCol = nextLine.length;
					} else {
						break;
					}
				}

				let endOffset = offset;
				for (let k = i; k <= endLine; k++) {
					endOffset += lines[k]!.length + 1;
				}
				endOffset -= 1;

				if (textParts.length > 0) {
					const headingText = textParts.join(" ").trim();
					const displayText =
						headingText.length > 80
							? headingText.slice(0, 77) + "..."
							: headingText;

					headings.push({
						heading: displayText,
						level: 1,
						position: {
							start: { line: i, col: 0, offset: offset },
							end: {
								line: endLine,
								col: endCol,
								offset: endOffset,
							},
						},
					});
				}
			}

			offset += line.length + 1;
		}

		return headings;
	}
}
