import { Plugin, PluginSettingTab, Setting, App, TFile, HeadingCache, ColorComponent } from "obsidian";

// ── Theme Presets ────────────────────────────────────────────

type ThemePresetKey = "warm" | "ocean" | "forest" | "lavender";

interface ThemePreset {
	label: string;
	circleEmoji: string;
	palette: string[];
	defaults: {
		markdownBgColor: string;
		chatRBubbleColor: string;
		chatLBubbleColor: string;
		tableHeaderBorderColor: string;
	};
	css: {
		textColor: string;
		headingColor: string;
		borderColor: string;
		qBorderColor: string;
		linkColor: string;
		inlineCodeBg: string;
		inlineCodeColor: string;
		emphasisColor: string;
		codeBlockLightBg: string;
	};
}

const THEME_PRESETS: Record<ThemePresetKey, ThemePreset> = {
	lavender: {
		label: "Lavender",
		circleEmoji: "🟣",
		palette: [
			"#FFFFFF", "#F5F0FA", "#EBE0F5", "#E0D0F0",
			"#D4BEE8", "#C4AAE0", "#B090D4", "#9A74C4",
			"#8058B0", "#6A3D9A", "#4E2880", "#000000",
		],
		defaults: {
			markdownBgColor: "#FFFFFF",
			chatRBubbleColor: "#E4D6F2",
			chatLBubbleColor: "#E4D6F2",
			tableHeaderBorderColor: "#B090D4",
		},
		css: {
			textColor: "rgb(38, 30, 48)",
			headingColor: "rgb(50, 38, 62)",
			borderColor: "rgb(196, 170, 224)",
			qBorderColor: "rgb(208, 186, 232)",
			linkColor: "#6A3D9A",
			inlineCodeBg: "#EDE4F5",
			inlineCodeColor: "#5A2D8A",
			emphasisColor: "#5E3D7A",
			codeBlockLightBg: "#F0EAF6",
		},
	},
	warm: {
		label: "Warm",
		circleEmoji: "🟤",
		palette: [
			"#FFFFFF", "#FFF8F0", "#F8F4F2", "#F0E8DC",
			"#E8D5C4", "#D9C7B8", "#C4A882", "#B08A60",
			"#9A7048", "#8B4513", "#6B3410", "#000000",
		],
		defaults: {
			markdownBgColor: "#FFFFFF",
			chatRBubbleColor: "#F9E3D0",
			chatLBubbleColor: "#F9E3D0",
			tableHeaderBorderColor: "#D9C7B8",
		},
		css: {
			textColor: "rgb(38, 35, 32)",
			headingColor: "rgb(49, 45, 42)",
			borderColor: "rgb(217, 199, 184)",
			qBorderColor: "rgb(207, 201, 198)",
			linkColor: "#A0522D",
			inlineCodeBg: "#F0E8DC",
			inlineCodeColor: "#8B4513",
			emphasisColor: "#5C4A38",
			codeBlockLightBg: "#F5F0EB",
		},
	},
	ocean: {
		label: "Ocean",
		circleEmoji: "🔵",
		palette: [
			"#FFFFFF", "#F0F6FA", "#E0EFF8", "#D0E6F3",
			"#B8D6EA", "#8BBDD9", "#6AAAC8", "#4D94B4",
			"#3A7FA0", "#2B6E8A", "#1A4E66", "#000000",
		],
		defaults: {
			markdownBgColor: "#FFFFFF",
			chatRBubbleColor: "#D4EAF5",
			chatLBubbleColor: "#D4EAF5",
			tableHeaderBorderColor: "#8BBDD9",
		},
		css: {
			textColor: "rgb(28, 38, 45)",
			headingColor: "rgb(32, 48, 58)",
			borderColor: "rgb(168, 199, 220)",
			qBorderColor: "rgb(180, 208, 228)",
			linkColor: "#2B6E8A",
			inlineCodeBg: "#E0EFF8",
			inlineCodeColor: "#1A5F7A",
			emphasisColor: "#3A6A80",
			codeBlockLightBg: "#EAF3F9",
		},
	},
	forest: {
		label: "Forest",
		circleEmoji: "🟢",
		palette: [
			"#FFFFFF", "#F2F6F0", "#E4EFE0", "#D0E4C8",
			"#B8D4A8", "#96BC88", "#78A868", "#5E9450",
			"#4A8038", "#3D6B2E", "#2A4E1E", "#000000",
		],
		defaults: {
			markdownBgColor: "#FFFFFF",
			chatRBubbleColor: "#D8E8D0",
			chatLBubbleColor: "#D8E8D0",
			tableHeaderBorderColor: "#96BC88",
		},
		css: {
			textColor: "rgb(32, 40, 28)",
			headingColor: "rgb(38, 52, 32)",
			borderColor: "rgb(174, 204, 160)",
			qBorderColor: "rgb(186, 212, 176)",
			linkColor: "#3D6B2E",
			inlineCodeBg: "#E4EFE0",
			inlineCodeColor: "#2D5A1E",
			emphasisColor: "#4A6E3C",
			codeBlockLightBg: "#EBF2E8",
		},
	},
};

interface PluginSettings {
	// Theme
	themePreset: ThemePresetKey;
	enableThemeCSS: boolean;
	markdownBgColor: string;
	codeBlockRadius: number;
	checkboxStrikethrough: boolean;
	tableRadius: number;
	tableHeaderBorderColor: string;
	codeBlockDarkTheme: boolean;
	// Chat Bubbles
	calloutIndicator: string;
	chatRBubbleColor: string;
	chatLBubbleColor: string;
	chatBubbleMaxWidth: number;
	// Outline Injection
	enableOutlineInjection: boolean;
	injectChatR: boolean;
	injectChatL: boolean;
	chatRPrefix: string;
	chatLPrefix: string;
	headingLevel: number;
	maxDisplayLength: number;
}

const DEFAULT_SETTINGS: PluginSettings = {
	themePreset: "lavender",
	enableThemeCSS: true,
	markdownBgColor: "#FFFFFF",
	codeBlockRadius: 14,
	checkboxStrikethrough: false,
	tableRadius: 8,
	tableHeaderBorderColor: "#B090D4",
	codeBlockDarkTheme: true,
	calloutIndicator: "none",
	chatRBubbleColor: "#E4D6F2",
	chatLBubbleColor: "#E4D6F2",
	chatBubbleMaxWidth: 75,
	enableOutlineInjection: true,
	injectChatR: true,
	injectChatL: true,
	chatRPrefix: "",
	chatLPrefix: "",
	headingLevel: 1,
	maxDisplayLength: 80,
};

export default class ChatCalloutOutlinePlugin extends Plugin {
	settings: PluginSettings = DEFAULT_SETTINGS;
	private _calloutCache: Map<string, HeadingCache[]> = new Map();
	private _updating = false;
	private _originalGetFileCache: ((file: TFile) => ReturnType<typeof this.app.metadataCache.getFileCache>) | null = null;

	async onload() {
		await this.loadSettings();
		this.addSettingTab(new ChatCalloutOutlineSettingTab(this.app, this));

		// Apply CSS variables and body class
		this._applyCSS();

		// Monkey-patch metadataCache.getFileCache
		this._originalGetFileCache = this.app.metadataCache.getFileCache.bind(
			this.app.metadataCache
		);
		this.app.metadataCache.getFileCache = (file: TFile) => {
			return this._patchedGetFileCache(file);
		};

		this.registerEvent(
			this.app.metadataCache.on("changed", (file: TFile) => {
				if (this._updating) return;
				void this._updateCallouts(file);
			})
		);

		this.registerEvent(
			this.app.workspace.on("active-leaf-change", () => {
				const file = this.app.workspace.getActiveFile();
				if (file) void this._updateCallouts(file);
			})
		);

		const activeFile = this.app.workspace.getActiveFile();
		if (activeFile) void this._updateCallouts(activeFile);
	}

	onunload() {
		if (this._originalGetFileCache) {
			this.app.metadataCache.getFileCache = this._originalGetFileCache;
		}
		this._calloutCache.clear();
		// Remove body classes and CSS variables
		document.body.classList.remove("chat-bubble-theme-active", "cbt-no-strikethrough", "cbt-code-light", "cbt-indicator-dot", "cbt-indicator-speech");
		document.body.style.removeProperty("--cbt-indicator-emoji");
		this._removeCSSVariables();
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
	}

	async saveSettings() {
		await this.saveData(this.settings);
	}

	// ── Dynamic CSS via variables ────────────────────────────────

	_applyCSS() {
		if (this.settings.enableThemeCSS) {
			document.body.classList.add("chat-bubble-theme-active");
			this._setCSSVariables();
		} else {
			document.body.classList.remove("chat-bubble-theme-active");
			this._removeCSSVariables();
		}

		if (!this.settings.checkboxStrikethrough) {
			document.body.classList.add("cbt-no-strikethrough");
		} else {
			document.body.classList.remove("cbt-no-strikethrough");
		}

		if (!this.settings.codeBlockDarkTheme) {
			document.body.classList.add("cbt-code-light");
		} else {
			document.body.classList.remove("cbt-code-light");
		}

		document.body.classList.remove("cbt-indicator-dot", "cbt-indicator-speech");
		const ind = this.settings.calloutIndicator;
		if (ind === "speech") {
			document.body.classList.add("cbt-indicator-speech");
		} else if (ind && ind !== "none") {
			document.body.classList.add("cbt-indicator-dot");
			document.body.style.setProperty("--cbt-indicator-emoji", `"${ind}"`);
		}
	}

	private _setCSSVariables() {
		const s = this.settings;
		const theme = THEME_PRESETS[s.themePreset];
		document.body.style.setProperty("--cbt-bg", s.markdownBgColor);
		document.body.style.setProperty("--cbt-radius", s.codeBlockRadius + "px");
		document.body.style.setProperty("--cbt-chat-r-bg", s.chatRBubbleColor);
		document.body.style.setProperty("--cbt-chat-l-bg", s.chatLBubbleColor);
		document.body.style.setProperty("--cbt-chat-max-w", s.chatBubbleMaxWidth + "%");
		document.body.style.setProperty("--cbt-table-radius", s.tableRadius + "px");
		document.body.style.setProperty("--cbt-table-border-color", s.tableHeaderBorderColor);
		// Derive header bg by mixing border color with white (30% color, 70% white)
		const hex = s.tableHeaderBorderColor.replace("#", "");
		const r = Math.round(parseInt(hex.substring(0, 2), 16) * 0.3 + 255 * 0.7);
		const g = Math.round(parseInt(hex.substring(2, 4), 16) * 0.3 + 255 * 0.7);
		const b = Math.round(parseInt(hex.substring(4, 6), 16) * 0.3 + 255 * 0.7);
		document.body.style.setProperty("--cbt-table-header-bg", `rgb(${r}, ${g}, ${b})`);
		// Theme-driven CSS vars
		document.body.style.setProperty("--cbt-text-color", theme.css.textColor);
		document.body.style.setProperty("--cbt-heading-color", theme.css.headingColor);
		document.body.style.setProperty("--cbt-border-color", theme.css.borderColor);
		document.body.style.setProperty("--cbt-q-border-color", theme.css.qBorderColor);
		document.body.style.setProperty("--cbt-link-color", theme.css.linkColor);
		document.body.style.setProperty("--cbt-inline-code-bg", theme.css.inlineCodeBg);
		document.body.style.setProperty("--cbt-inline-code-color", theme.css.inlineCodeColor);
		document.body.style.setProperty("--cbt-emphasis-color", theme.css.emphasisColor);
		document.body.style.setProperty("--cbt-code-light-bg", theme.css.codeBlockLightBg);
		document.body.style.setProperty("--cbt-circle-emoji", `"${theme.circleEmoji}"`);
	}

	private _removeCSSVariables() {
		const vars = [
			"--cbt-bg", "--cbt-radius", "--cbt-chat-r-bg", "--cbt-chat-l-bg",
			"--cbt-chat-max-w", "--cbt-table-radius", "--cbt-table-border-color",
			"--cbt-table-header-bg", "--cbt-text-color", "--cbt-heading-color",
			"--cbt-border-color", "--cbt-q-border-color", "--cbt-link-color",
			"--cbt-inline-code-bg", "--cbt-inline-code-color", "--cbt-emphasis-color",
			"--cbt-code-light-bg", "--cbt-circle-emoji", "--cbt-indicator-emoji",
		];
		for (const v of vars) document.body.style.removeProperty(v);
	}

	// ── Outline injection ────────────────────────────────────────

	private _patchedGetFileCache(file: TFile) {
		if (!this._originalGetFileCache) return null;
		const cache = this._originalGetFileCache(file);
		if (!cache || !file) return cache;
		if (!this.settings.enableOutlineInjection) return cache;

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
			const cache = this.app.metadataCache.getFileCache(file);
			this.app.metadataCache.trigger("changed", file, content, cache);
			this._updating = false;
		} catch {
			this._updating = false;
		}
	}

	private _parseCallouts(content: string): HeadingCache[] {
		const lines = content.split("\n");
		const headings: HeadingCache[] = [];
		let offset = 0;
		const maxLen = this.settings.maxDisplayLength;
		const level = this.settings.headingLevel;
		const injectR = this.settings.injectChatR;
		const injectL = this.settings.injectChatL;
		const prefixR = this.settings.chatRPrefix;
		const prefixL = this.settings.chatLPrefix;

		for (let i = 0; i < lines.length; i++) {
			const line = lines[i]!;
			const matchR = /^> \[!chat-r\]\s*$/.test(line);
			const matchL = /^> \[!chat-l\]\s*$/.test(line);

			if (matchR || matchL) {
				if (matchR && !injectR) { offset += line.length + 1; continue; }
				if (matchL && !injectL) { offset += line.length + 1; continue; }

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
					const prefix = matchR ? prefixR : prefixL;
					const raw = textParts.join(" ").trim();
					const headingText = prefix ? prefix + " " + raw : raw;
					const displayText =
						headingText.length > maxLen
							? headingText.slice(0, maxLen - 3) + "..."
							: headingText;

					headings.push({
						heading: displayText,
						level: level,
						position: {
							start: { line: i, col: 0, offset: offset },
							end: { line: endLine, col: endCol, offset: endOffset },
						},
					});
				}
			}

			offset += line.length + 1;
		}

		return headings;
	}
}

// ── Settings Tab ─────────────────────────────────────────────

class ChatCalloutOutlineSettingTab extends PluginSettingTab {
	plugin: ChatCalloutOutlinePlugin;

	constructor(app: App, plugin: ChatCalloutOutlinePlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	private _addColorSettingWithPalette(
		containerEl: HTMLElement,
		name: string,
		desc: string,
		getValue: () => string,
		setValue: (v: string) => void,
	): void {
		const setting = new Setting(containerEl)
			.setName(name);
		if (desc) setting.setDesc(desc);
		let colorPicker: ColorComponent | undefined;
		setting.addColorPicker((cp) => {
			colorPicker = cp;
			cp.setValue(getValue()).onChange(async (v) => {
				setValue(v);
				await this.plugin.saveSettings();
				this.plugin._applyCSS();
				swatchContainer.querySelectorAll<HTMLElement>(".palette-swatch").forEach((s) => {
					s.classList.toggle("is-active", s.dataset.color === v.toUpperCase());
				});
			});
		});

		const swatchContainer = setting.controlEl.createDiv({ cls: "palette-swatches" });

		const current = getValue().toUpperCase();
		const palette = THEME_PRESETS[this.plugin.settings.themePreset].palette;
		for (const color of palette) {
			const swatch = swatchContainer.createEl("button", { cls: "palette-swatch" });
			swatch.dataset.color = color.toUpperCase();
			swatch.style.backgroundColor = color;
			if (color.toUpperCase() === current) swatch.classList.add("is-active");
			swatch.addEventListener("click", () => {
				void (async () => {
					setValue(color);
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
					colorPicker?.setValue(color);
					swatchContainer.querySelectorAll<HTMLElement>(".palette-swatch").forEach((s) => {
						s.classList.toggle("is-active", s.dataset.color === color.toUpperCase());
					});
				})();
			});
		}

		// Insert swatches before the color picker
		setting.controlEl.insertBefore(swatchContainer, setting.controlEl.firstChild);
	}

	private _addThemePresetPicker(containerEl: HTMLElement): void {
		const setting = new Setting(containerEl)
			.setName("Theme preset")
			.setDesc("Overwrites colors below.");

		const pickerContainer = setting.controlEl.createDiv({ cls: "theme-preset-picker" });

		const currentKey = this.plugin.settings.themePreset;
		for (const key of Object.keys(THEME_PRESETS) as ThemePresetKey[]) {
			const theme = THEME_PRESETS[key];
			const btn = pickerContainer.createDiv({ cls: "theme-preset-btn" });

			const swatch = btn.createEl("span", { cls: "theme-preset-swatch" });
			swatch.style.backgroundColor = theme.defaults.chatRBubbleColor;
			if (key === currentKey) swatch.classList.add("is-active");

			btn.createEl("span", { text: theme.label });

			btn.addEventListener("click", () => {
				void (async () => {
					this.plugin.settings.themePreset = key;
					const d = theme.defaults;
					this.plugin.settings.markdownBgColor = d.markdownBgColor;
					this.plugin.settings.chatRBubbleColor = d.chatRBubbleColor;
					this.plugin.settings.chatLBubbleColor = d.chatLBubbleColor;
					this.plugin.settings.tableHeaderBorderColor = d.tableHeaderBorderColor;
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
					this.display();
				})();
			});
		}
	}

	private _addIndicatorPicker(containerEl: HTMLElement): void {
		const setting = new Setting(containerEl)
			.setName("Callout indicator")
			.setDesc("Emoji before each bubble.");

		const indicators = [
			{ key: "none", emoji: "—" },
			{ key: "speech", emoji: "💬" },
			{ key: "🔴", emoji: "🔴" },
			{ key: "🟡", emoji: "🟡" },
			{ key: "🟠", emoji: "🟠" },
			{ key: "🟢", emoji: "🟢" },
			{ key: "🔵", emoji: "🔵" },
			{ key: "🟣", emoji: "🟣" },
			{ key: "🟤", emoji: "🟤" },
			{ key: "⚫", emoji: "⚫" },
			{ key: "⚪", emoji: "⚪" },
		];

		const pickerContainer = setting.controlEl.createDiv({ cls: "indicator-picker" });

		const current = this.plugin.settings.calloutIndicator;
		for (const opt of indicators) {
			const btn = pickerContainer.createDiv({ cls: "indicator-btn" });
			if (opt.key === current) btn.classList.add("is-active");
			btn.textContent = opt.emoji;

			btn.addEventListener("click", () => {
				void (async () => {
					this.plugin.settings.calloutIndicator = opt.key;
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
					this.display();
				})();
			});
		}
	}

	display(): void {
		const { containerEl } = this;
		containerEl.empty();

		// ── Reset ──
		new Setting(containerEl)
			.setName("Reset all settings")
			.setDesc("Restore every option to its default value.")
			.addButton((b) =>
				b.setButtonText("Reset to defaults").onClick(async () => {
					this.plugin.settings = Object.assign({}, DEFAULT_SETTINGS);
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
					this.display();
				})
			);

		// ── Theme ──
		new Setting(containerEl).setName("Theme").setHeading();

		new Setting(containerEl)
			.setName("Enable theme")
			.setDesc("Apply theme styling to Markdown views.")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.enableThemeCSS).onChange(async (v) => {
					this.plugin.settings.enableThemeCSS = v;
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
				})
			);

		this._addThemePresetPicker(containerEl);

		this._addColorSettingWithPalette(
			containerEl, "Markdown background color", "",
			() => this.plugin.settings.markdownBgColor,
			(v) => { this.plugin.settings.markdownBgColor = v; },
		);

		new Setting(containerEl)
			.setName("Table corner radius")
			.setDesc("Border radius for tables in pixels (0–20).")
			.addSlider((s) =>
				s.setLimits(0, 20, 1).setValue(this.plugin.settings.tableRadius)
					.setDynamicTooltip().onChange(async (v) => {
						this.plugin.settings.tableRadius = v;
						await this.plugin.saveSettings();
						this.plugin._applyCSS();
					})
			);

		this._addColorSettingWithPalette(
			containerEl, "Table header & border color", "",
			() => this.plugin.settings.tableHeaderBorderColor,
			(v) => { this.plugin.settings.tableHeaderBorderColor = v; },
		);

		new Setting(containerEl)
			.setName("Code block dark theme")
			.setDesc("Use dark background for code blocks. Disable for a light code block style.")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.codeBlockDarkTheme).onChange(async (v) => {
					this.plugin.settings.codeBlockDarkTheme = v;
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
				})
			);

		new Setting(containerEl)
			.setName("Code block corner radius")
			.setDesc("Border radius for code blocks in pixels (0–30).")
			.addSlider((s) =>
				s.setLimits(0, 30, 1).setValue(this.plugin.settings.codeBlockRadius)
					.setDynamicTooltip().onChange(async (v) => {
						this.plugin.settings.codeBlockRadius = v;
						await this.plugin.saveSettings();
						this.plugin._applyCSS();
					})
			);

		new Setting(containerEl)
			.setName("Checkbox strikethrough")
			.setDesc("Show strikethrough on completed checkboxes.")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.checkboxStrikethrough).onChange(async (v) => {
					this.plugin.settings.checkboxStrikethrough = v;
					await this.plugin.saveSettings();
					this.plugin._applyCSS();
				})
			);

		// ── Chat bubbles ──
		new Setting(containerEl).setName("Chat bubbles").setHeading();

		this._addIndicatorPicker(containerEl);

		this._addColorSettingWithPalette(
			containerEl, "User bubble color (chat-r)", "",
			() => this.plugin.settings.chatRBubbleColor,
			(v) => { this.plugin.settings.chatRBubbleColor = v; },
		);

		this._addColorSettingWithPalette(
			containerEl, "Response bubble color (chat-l)", "",
			() => this.plugin.settings.chatLBubbleColor,
			(v) => { this.plugin.settings.chatLBubbleColor = v; },
		);

		new Setting(containerEl)
			.setName("Bubble max width")
			.setDesc("Maximum width of chat bubbles as a percentage (30–100%).")
			.addSlider((s) =>
				s.setLimits(30, 100, 5).setValue(this.plugin.settings.chatBubbleMaxWidth)
					.setDynamicTooltip().onChange(async (v) => {
						this.plugin.settings.chatBubbleMaxWidth = v;
						await this.plugin.saveSettings();
						this.plugin._applyCSS();
					})
			);

		// ── Outline injection ──
		new Setting(containerEl).setName("Outline injection").setHeading();

		new Setting(containerEl)
			.setName("Enable outline injection")
			.setDesc("Inject chat callouts as headings in the outline panel.")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.enableOutlineInjection).onChange(async (v) => {
					this.plugin.settings.enableOutlineInjection = v;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Inject chat-r (user questions)")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.injectChatR).onChange(async (v) => {
					this.plugin.settings.injectChatR = v;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Inject chat-l (responses)")
			.addToggle((t) =>
				t.setValue(this.plugin.settings.injectChatL).onChange(async (v) => {
					this.plugin.settings.injectChatL = v;
					await this.plugin.saveSettings();
				})
			);

		new Setting(containerEl)
			.setName("Chat-r prefix")
			.setDesc("Text prepended to user questions in the outline.")
			.addText((t) =>
				t.setPlaceholder("Q:").setValue(this.plugin.settings.chatRPrefix)
					.onChange(async (v) => {
						this.plugin.settings.chatRPrefix = v;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Chat-l prefix")
			.setDesc("Text prepended to responses in the outline.")
			.addText((t) =>
				t.setPlaceholder("A:").setValue(this.plugin.settings.chatLPrefix)
					.onChange(async (v) => {
						this.plugin.settings.chatLPrefix = v;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Heading level")
			.setDesc("Outline heading level for injected callouts (1–6).")
			.addSlider((s) =>
				s.setLimits(1, 6, 1).setValue(this.plugin.settings.headingLevel)
					.setDynamicTooltip().onChange(async (v) => {
						this.plugin.settings.headingLevel = v;
						await this.plugin.saveSettings();
					})
			);

		new Setting(containerEl)
			.setName("Max display length")
			.setDesc("Truncate callout text in the outline after this many characters.")
			.addSlider((s) =>
				s.setLimits(30, 200, 10).setValue(this.plugin.settings.maxDisplayLength)
					.setDynamicTooltip().onChange(async (v) => {
						this.plugin.settings.maxDisplayLength = v;
						await this.plugin.saveSettings();
					})
			);
	}
}
