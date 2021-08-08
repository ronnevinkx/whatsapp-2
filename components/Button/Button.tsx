import { ButtonProps } from './Button.interface';
import { StyledButton, StyledAnchorButton } from './Button.styled';

export const Button: React.FC<ButtonProps> = ({
	href,
	backgroundColor,
	primary,
	disabled,
	type = 'button',
	onClick,
	children
}) => {
	if (href) {
		return (
			<StyledAnchorButton
				href={href}
				backgroundColor={backgroundColor}
				primary={primary}
				disabled={disabled}
			>
				{children}
			</StyledAnchorButton>
		);
	}

	return (
		<StyledButton
			backgroundColor={backgroundColor}
			primary={primary}
			disabled={disabled}
			type={type}
			onClick={onClick}
		>
			{children}
		</StyledButton>
	);
};
