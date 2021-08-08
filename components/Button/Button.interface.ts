export type ButtonType = 'button' | 'reset' | 'submit';

export interface StyledButtonProps {
	href?: string;
	backgroundColor?: string;
	primary?: boolean;
	disabled?: boolean;
	type?: ButtonType;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
}

export interface ButtonProps
	extends React.AnchorHTMLAttributes<HTMLAnchorElement | HTMLButtonElement> {
	href?: string;
	backgroundColor?: string;
	primary?: boolean;
	disabled?: boolean;
	type?: ButtonType;
	onClick?: (e: React.MouseEvent<HTMLElement>) => void;
	children?: React.ReactNode;
}
