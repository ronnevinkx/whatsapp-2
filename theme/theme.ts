import { createGlobalStyle } from 'styled-components';
import { Theme } from './theme.interface';

export const theme: Theme = {
	font: {
		size: {
			sm: '11px',
			md: '14px',
			lg: '22px'
		}
	},
	colors: {
		grey1: 'whitesmoke',
		grey2: '#e9eaeb',
		grey3: '#cecece',
		grey4: '#dddddd',
		grey5: '#333333',
		grey6: '#999999',
		green1: '#dcf8c6',
		white: '#ffffff',
		black: '#000000'
	}
};

export const GlobalStyle = createGlobalStyle`
	* {
		margin: 0;
		padding: 0;
		border: none;
		outline: none;
		appearance: none;
		box-sizing: none;
	}

	html, body {
		width: 100%;
	}

	body {
		font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
			Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
		font-size: 14px;
		background: ${theme.colors.grey5};
	}

	a {
		color: inherit;
		text-decoration: none;
	}
`;
