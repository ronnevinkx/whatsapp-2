import Head from 'next/head';
import styled from 'styled-components';
import { Button } from '../components/Button';
import { auth, provider } from '../firebase';

export default function Login() {
	const signIn = () => {
		auth.signInWithPopup(provider).catch(error => {
			// console.log('ERROR', error)
		});
	};

	return (
		<Container>
			<Head>
				<title>Login</title>
			</Head>
			<LoginContainer>
				<Logo src="/whatsapp.svg" />
				<Button onClick={signIn}>Sign in with Google</Button>
			</LoginContainer>
		</Container>
	);
}

const Container = styled.div`
	display: grid;
	height: 100vh;
	place-items: center;
	background: ${({ theme }) => theme.colors.grey1};
`;

const LoginContainer = styled.div`
	display: flex;
	padding: 100px;
	flex-direction: column;
	align-items: center;
	background: ${({ theme }) => theme.colors.white};
`;

const Logo = styled.img`
	width: 200px;
	height: 200px;
	margin-bottom: 50px;
`;
