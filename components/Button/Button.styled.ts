import { StyledButtonProps } from './Button.interface';
import styled, { css } from 'styled-components';

const buttonStyles = css<StyledButtonProps>`
	${({ primary, theme }) =>
		primary
			? `font-size: ${theme.font.size.lg};`
			: `font-size: ${theme.font.size.md};`}

	color: ${({ theme }) => theme.colors.white};
	border: none;
	cursor: pointer;
	padding: 10px 14px;
	border-radius: 5px;
	background: ${({ theme }) => theme.colors.black};
	${({ disabled, theme }) =>
		!disabled && `:hover { background: ${theme.colors.grey5}; }`}
`;

export const StyledAnchorButton = styled.a`
	${buttonStyles}
`;

export const StyledButton = styled.button`
	${buttonStyles}
`;
