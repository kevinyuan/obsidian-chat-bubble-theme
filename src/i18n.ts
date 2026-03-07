type Lang = "en" | "zh" | "zh-TW" | "fr";

interface Strings {
	// Reset
	resetName: string;
	resetDesc: string;
	resetBtn: string;
	// Theme
	themeHeading: string;
	enableThemeName: string;
	enableThemeDesc: string;
	themePresetName: string;
	themePresetDesc: string;
	markdownBgName: string;
	tableRadiusName: string;
	tableRadiusDesc: string;
	tableHeaderColorName: string;
	codeBlockDarkName: string;
	codeBlockDarkDesc: string;
	codeBlockRadiusName: string;
	codeBlockRadiusDesc: string;
	checkboxStrikeName: string;
	checkboxStrikeDesc: string;
	// Chat bubbles
	chatBubblesHeading: string;
	calloutIndicatorName: string;
	calloutIndicatorDesc: string;
	chatRColorName: string;
	chatLColorName: string;
	bubbleMaxWidthName: string;
	bubbleMaxWidthDesc: string;
	// Outline
	outlineHeading: string;
	stickyOutlineName: string;
	stickyOutlineDesc: string;
	enableInjectionName: string;
	enableInjectionDesc: string;
	injectChatRName: string;
	injectChatLName: string;
	chatRPrefixName: string;
	chatRPrefixDesc: string;
	chatLPrefixName: string;
	chatLPrefixDesc: string;
	headingLevelName: string;
	headingLevelDesc: string;
	maxLengthName: string;
	maxLengthDesc: string;
}

const translations: Record<Lang, Strings> = {
	en: {
		resetName: "Reset all settings",
		resetDesc: "Restore every option to its default value.",
		resetBtn: "Reset to defaults",
		themeHeading: "Theme",
		enableThemeName: "Enable theme",
		enableThemeDesc: "Apply theme styling to Markdown views.",
		themePresetName: "Theme preset",
		themePresetDesc: "Overwrites colors below.",
		markdownBgName: "Markdown background color",
		tableRadiusName: "Table corner radius",
		tableRadiusDesc: "Border radius for tables in pixels (0–20).",
		tableHeaderColorName: "Table header & border color",
		codeBlockDarkName: "Code block dark theme",
		codeBlockDarkDesc: "Use dark background for code blocks. Disable for a light style.",
		codeBlockRadiusName: "Code block corner radius",
		codeBlockRadiusDesc: "Border radius for code blocks in pixels (0–30).",
		checkboxStrikeName: "Checkbox strikethrough",
		checkboxStrikeDesc: "Show strikethrough on completed checkboxes.",
		chatBubblesHeading: "Chat bubbles",
		calloutIndicatorName: "Callout indicator",
		calloutIndicatorDesc: "Emoji before each bubble.",
		chatRColorName: "User bubble color (chat-r)",
		chatLColorName: "Response bubble color (chat-l)",
		bubbleMaxWidthName: "Bubble max width",
		bubbleMaxWidthDesc: "Maximum width of chat bubbles as a percentage (30–100%).",
		outlineHeading: "Outline",
		stickyOutlineName: "Sticky outline",
		stickyOutlineDesc: "Keep the outline visible when a non-editor view (e.g. terminal) gets focus.",
		enableInjectionName: "Enable outline injection",
		enableInjectionDesc: "Inject chat callouts as headings in the outline panel.",
		injectChatRName: "Inject chat-r (user questions)",
		injectChatLName: "Inject chat-l (responses)",
		chatRPrefixName: "Chat-r prefix",
		chatRPrefixDesc: "Text prepended to user questions in the outline.",
		chatLPrefixName: "Chat-l prefix",
		chatLPrefixDesc: "Text prepended to responses in the outline.",
		headingLevelName: "Heading level",
		headingLevelDesc: "Outline heading level for injected callouts (1–6).",
		maxLengthName: "Max display length",
		maxLengthDesc: "Truncate callout text in the outline after this many characters.",
	},
	zh: {
		resetName: "重置所有设置",
		resetDesc: "将所有选项恢复为默认值。",
		resetBtn: "恢复默认值",
		themeHeading: "主题",
		enableThemeName: "启用主题",
		enableThemeDesc: "为 Markdown 视图应用主题样式。",
		themePresetName: "主题预设",
		themePresetDesc: "将覆盖下方的颜色设置。",
		markdownBgName: "Markdown 背景色",
		tableRadiusName: "表格圆角",
		tableRadiusDesc: "表格边框圆角半径（像素，0–20）。",
		tableHeaderColorName: "表头与边框颜色",
		codeBlockDarkName: "代码块深色主题",
		codeBlockDarkDesc: "为代码块使用深色背景，关闭后切换为浅色风格。",
		codeBlockRadiusName: "代码块圆角",
		codeBlockRadiusDesc: "代码块边框圆角半径（像素，0–30）。",
		checkboxStrikeName: "复选框删除线",
		checkboxStrikeDesc: "在已完成的复选框上显示删除线。",
		chatBubblesHeading: "聊天气泡",
		calloutIndicatorName: "气泡指示符",
		calloutIndicatorDesc: "显示在每个气泡前的 Emoji。",
		chatRColorName: "用户气泡颜色（chat-r）",
		chatLColorName: "回复气泡颜色（chat-l）",
		bubbleMaxWidthName: "气泡最大宽度",
		bubbleMaxWidthDesc: "聊天气泡的最大宽度百分比（30–100%）。",
		outlineHeading: "大纲",
		stickyOutlineName: "大纲常驻",
		stickyOutlineDesc: "当终端等非编辑器视图获得焦点时，保持显示上一个 Markdown 文件的大纲。",
		enableInjectionName: "启用大纲注入",
		enableInjectionDesc: "将聊天 Callout 作为标题注入到大纲面板中。",
		injectChatRName: "注入 chat-r（用户提问）",
		injectChatLName: "注入 chat-l（回复内容）",
		chatRPrefixName: "Chat-r 前缀",
		chatRPrefixDesc: "在大纲中用户提问条目前添加的文本。",
		chatLPrefixName: "Chat-l 前缀",
		chatLPrefixDesc: "在大纲中回复内容条目前添加的文本。",
		headingLevelName: "标题级别",
		headingLevelDesc: "注入 Callout 在大纲中的标题级别（1–6）。",
		maxLengthName: "最大显示长度",
		maxLengthDesc: "大纲中 Callout 文本超过此字符数后截断显示。",
	},
	"zh-TW": {
		resetName: "重置所有設定",
		resetDesc: "將所有選項恢復為預設值。",
		resetBtn: "恢復預設值",
		themeHeading: "主題",
		enableThemeName: "啟用主題",
		enableThemeDesc: "為 Markdown 檢視套用主題樣式。",
		themePresetName: "主題預設",
		themePresetDesc: "將覆蓋下方的顏色設定。",
		markdownBgName: "Markdown 背景色",
		tableRadiusName: "表格圓角",
		tableRadiusDesc: "表格邊框圓角半徑（像素，0–20）。",
		tableHeaderColorName: "表頭與邊框顏色",
		codeBlockDarkName: "程式碼區塊深色主題",
		codeBlockDarkDesc: "為程式碼區塊使用深色背景，關閉後切換為淺色風格。",
		codeBlockRadiusName: "程式碼區塊圓角",
		codeBlockRadiusDesc: "程式碼區塊邊框圓角半徑（像素，0–30）。",
		checkboxStrikeName: "核取方塊刪除線",
		checkboxStrikeDesc: "在已完成的核取方塊上顯示刪除線。",
		chatBubblesHeading: "聊天氣泡",
		calloutIndicatorName: "氣泡指示符",
		calloutIndicatorDesc: "顯示在每個氣泡前的 Emoji。",
		chatRColorName: "使用者氣泡顏色（chat-r）",
		chatLColorName: "回覆氣泡顏色（chat-l）",
		bubbleMaxWidthName: "氣泡最大寬度",
		bubbleMaxWidthDesc: "聊天氣泡的最大寬度百分比（30–100%）。",
		outlineHeading: "大綱",
		stickyOutlineName: "大綱常駐",
		stickyOutlineDesc: "當終端機等非編輯器檢視獲得焦點時，保持顯示上一個 Markdown 檔案的大綱。",
		enableInjectionName: "啟用大綱注入",
		enableInjectionDesc: "將聊天 Callout 作為標題注入大綱面板。",
		injectChatRName: "注入 chat-r（使用者提問）",
		injectChatLName: "注入 chat-l（回覆內容）",
		chatRPrefixName: "Chat-r 前綴",
		chatRPrefixDesc: "在大綱中使用者提問條目前加入的文字。",
		chatLPrefixName: "Chat-l 前綴",
		chatLPrefixDesc: "在大綱中回覆內容條目前加入的文字。",
		headingLevelName: "標題層級",
		headingLevelDesc: "注入 Callout 在大綱中的標題層級（1–6）。",
		maxLengthName: "最大顯示長度",
		maxLengthDesc: "大綱中 Callout 文字超過此字元數後截斷顯示。",
	},
	fr: {
		resetName: "Réinitialiser les paramètres",
		resetDesc: "Restaurer toutes les options à leurs valeurs par défaut.",
		resetBtn: "Réinitialiser",
		themeHeading: "Thème",
		enableThemeName: "Activer le thème",
		enableThemeDesc: "Appliquer le style du thème aux vues Markdown.",
		themePresetName: "Préréglage de thème",
		themePresetDesc: "Remplace les couleurs ci-dessous.",
		markdownBgName: "Couleur de fond Markdown",
		tableRadiusName: "Rayon des coins de tableau",
		tableRadiusDesc: "Rayon de bordure des tableaux en pixels (0–20).",
		tableHeaderColorName: "Couleur d'en-tête et de bordure du tableau",
		codeBlockDarkName: "Thème sombre pour les blocs de code",
		codeBlockDarkDesc: "Utiliser un fond sombre pour les blocs de code. Désactiver pour un style clair.",
		codeBlockRadiusName: "Rayon des coins des blocs de code",
		codeBlockRadiusDesc: "Rayon de bordure des blocs de code en pixels (0–30).",
		checkboxStrikeName: "Texte barré sur les cases cochées",
		checkboxStrikeDesc: "Afficher un texte barré sur les cases à cocher complétées.",
		chatBubblesHeading: "Bulles de discussion",
		calloutIndicatorName: "Indicateur de bulle",
		calloutIndicatorDesc: "Emoji affiché avant chaque bulle.",
		chatRColorName: "Couleur de bulle utilisateur (chat-r)",
		chatLColorName: "Couleur de bulle réponse (chat-l)",
		bubbleMaxWidthName: "Largeur maximale des bulles",
		bubbleMaxWidthDesc: "Largeur maximale des bulles en pourcentage (30–100%).",
		outlineHeading: "Plan",
		stickyOutlineName: "Plan persistant",
		stickyOutlineDesc: "Conserver le plan visible lorsqu'une vue non-éditeur (ex. terminal) reçoit le focus.",
		enableInjectionName: "Activer l'injection dans le plan",
		enableInjectionDesc: "Injecter les callouts de discussion comme titres dans le panneau de plan.",
		injectChatRName: "Injecter chat-r (questions utilisateur)",
		injectChatLName: "Injecter chat-l (réponses)",
		chatRPrefixName: "Préfixe chat-r",
		chatRPrefixDesc: "Texte ajouté avant les questions utilisateur dans le plan.",
		chatLPrefixName: "Préfixe chat-l",
		chatLPrefixDesc: "Texte ajouté avant les réponses dans le plan.",
		headingLevelName: "Niveau de titre",
		headingLevelDesc: "Niveau de titre dans le plan pour les callouts injectés (1–6).",
		maxLengthName: "Longueur d'affichage maximale",
		maxLengthDesc: "Tronquer le texte du callout dans le plan après ce nombre de caractères.",
	},
};

function getLang(): Lang {
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	const locale: string = (window as any).moment?.locale() ?? "en";
	if (locale.startsWith("zh-tw") || locale.startsWith("zh-TW")) return "zh-TW";
	if (locale.startsWith("zh")) return "zh";
	if (locale.startsWith("fr")) return "fr";
	return "en";
}

export function t(): Strings {
	return translations[getLang()];
}
