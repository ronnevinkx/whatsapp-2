import firebase from 'firebase/app';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import Head from 'next/head';
import styled from 'styled-components';
import { Wrapper } from '../../components/Wrapper';
import { Sidebar } from '../../components/Sidebar';
import { ChatScreen } from '../../components/ChatScreen';
import { auth, db } from '../../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { getRecipientEmail } from '../../utils/';

interface ChatProps {
	chat: firebase.firestore.DocumentData;
	messages: string;
}

export default function Chat({ chat, messages }: ChatProps) {
	const [user] = useAuthState(auth);

	return (
		<Wrapper>
			<Head>
				<title>Chat with {getRecipientEmail(chat.users, user)}</title>
			</Head>
			<Sidebar />
			<ChatContainer>
				<ChatScreen chat={chat} messages={messages} />
			</ChatContainer>
		</Wrapper>
	);
}

export const getServerSideProps: GetServerSideProps = async (
	context: GetServerSidePropsContext
) => {
	const ref = db.collection('chats').doc(String(context.query.id));

	// prep messages on server
	const messagesRes = await ref
		.collection('messages')
		.orderBy('timestamp', 'asc')
		.get();

	const messages = messagesRes.docs
		.map((doc: firebase.firestore.DocumentData) => ({
			id: doc.id,
			...doc.data()
		}))
		.map(messages => ({
			...messages,
			timestamp: messages.timestamp.toDate().getTime()
		}));

	// prep chats
	const chatRes = await ref.get();
	const chat = {
		id: chatRes.id,
		...chatRes.data()
	};

	return {
		props: {
			messages: JSON.stringify(messages),
			chat
		}
	};
};

const ChatContainer = styled.div`
	flex: 1;
	height: calc(100vh - 60px);
	overflow: scroll;

	/* hide scrollbar */
	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;
