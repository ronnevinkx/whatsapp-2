import { InputProps } from './Input.interface';
import { StyledInput } from './Input.styled';

export const Input: React.FC<InputProps> = ({
	disabled,
	type = 'text',
	placeholder,
	id,
	value,
	onChange,
	round = false,
	flex = false,
	contained = false,
	required
}) => {
	return (
		<StyledInput
			disabled={disabled}
			type={type}
			placeholder={placeholder}
			id={id}
			value={value}
			onChange={onChange}
			round={round}
			flex={flex}
			contained={contained}
			required={required}
		/>
	);
};
