export interface StyledInputProps {
	disabled?: boolean;
	type: string;
	placeholder?: string;
	id?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	round: boolean;
	flex: boolean;
	contained: boolean;
	required?: boolean;
}

export interface InputProps {
	disabled?: boolean;
	type?: string;
	placeholder?: string;
	id?: string;
	value?: string;
	onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
	round?: boolean;
	flex?: boolean;
	contained?: boolean;
	required?: boolean;
}
