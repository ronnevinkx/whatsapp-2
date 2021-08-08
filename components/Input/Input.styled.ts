import { StyledInputProps } from './Input.interface';
import styled, { css } from 'styled-components';

export const StyledInput = styled.input<StyledInputProps>(
	({ theme, flex, type, round, contained }) => css`
		display: block;
		width: 100%;
		${flex && 'flex: 1;'}
		font-size: ${theme.font.size.md};
		color: ${theme.colors.black};
		border: none;
		padding: 8px;
		margin-top: 6px;
		border-radius: ${round ? '20px' : '5px'};
		${contained &&
		`
			padding: 12px;
			margin: 0 15px;
		`}
		${type === 'email' && 'text-transform: lowercase;'}
		background: ${theme.colors.grey4};
	`
);
