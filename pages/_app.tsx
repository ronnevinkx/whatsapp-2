import { useRouter } from 'next/router';
import { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, db } from '../firebase';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from '../theme/theme';
import Login from './login';
import { Loading } from '../components/Loading';
import firebase from 'firebase/app';
import type { AppProps } from 'next/app';

function MyApp({ Component, pageProps }: AppProps) {
	const [user, loading] = useAuthState(auth);
	const router = useRouter();

	useEffect(() => {
		if (user) {
			// insert/update user in db
			db.collection('users').doc(user.uid).set(
				{
					name: user.displayName,
					email: user.email,
					lastSeen: firebase.firestore.FieldValue.serverTimestamp(),
					photoURL: user.photoURL
				},
				{ merge: true }
			);
		}
	}, [user]);

	if (loading)
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Loading />
			</ThemeProvider>
		);

	if (!user) {
		return (
			<ThemeProvider theme={theme}>
				<GlobalStyle />
				<Login />
			</ThemeProvider>
		);
	} else if (router.pathname === '/login') {
		router.push('/');
	}

	return (
		<ThemeProvider theme={theme}>
			<GlobalStyle />
			<Component {...pageProps} />
		</ThemeProvider>
	);
}

export default MyApp;
