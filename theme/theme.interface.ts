export interface Size {
	sm: string;
	md: string;
	lg: string;
}

export interface Font {
	size: Size;
}

export interface Colors {
	grey1: string;
	grey2: string;
	grey3: string;
	grey4: string;
	grey5: string;
	grey6: string;
	green1: string;
	white: string;
	black: string;
}

export interface Theme {
	font: Font;
	colors: Colors;
}
