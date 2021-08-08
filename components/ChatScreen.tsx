import React, { useState, useRef } from 'react';
import { useRouter } from 'next/router';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { Input } from './Input';
import { Avatar, IconButton } from '@material-ui/core';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import AttachFileIcon from '@material-ui/icons/AttachFile';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import MicIcon from '@material-ui/icons/Mic';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import firebase from 'firebase/app';
import { getRecipientEmail } from '../utils';
import { Message } from './Message';
import TimeAgo from 'timeago-react';
import { MessageType } from '../types';

interface ChatScreenProps {
	chat: firebase.firestore.DocumentData;
	messages: string;
}

export const ChatScreen: React.FC<ChatScreenProps> = ({ chat, messages }) => {
	const [user] = useAuthState(auth);
	const [message, setMessage] = useState<string>('');
	const endOfMessagesRef = useRef<HTMLDivElement>(null);
	const router = useRouter();
	const [messagesSnapshot] = useCollection(
		db
			.collection('chats')
			.doc(String(router.query.id))
			.collection('messages')
			.orderBy('timestamp', 'asc')
	);
	const [recipientSnapshot] = useCollection(
		db
			.collection('users')
			.where('email', '==', getRecipientEmail(chat.users, user))
	);

	const showMessages = () => {
		if (messagesSnapshot) {
			return messagesSnapshot.docs.map((message: any) => (
				<Message
					key={message.id}
					user={message.data().user}
					message={{
						...message.data(),
						timestamp: message.data().timestamp?.toDate().getTime()
					}}
				/>
			));
		} else {
			return JSON.parse(messages).map((message: MessageType) => (
				<Message
					key={message.id}
					user={message.user}
					message={message}
				/>
			));
		}
	};

	const scrollToBottom = () => {
		if (endOfMessagesRef.current) {
			endOfMessagesRef.current.scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		}
	};

	const sendMessage = (e: React.MouseEvent<HTMLElement>) => {
		e.preventDefault();

		// update last seen
		db.collection('users').doc(user?.uid).set(
			{
				lastSeen: firebase.firestore.FieldValue.serverTimestamp()
			},
			{ merge: true }
		);

		db.collection('chats')
			.doc(String(router.query.id))
			.collection('messages')
			.add({
				timestamp: firebase.firestore.FieldValue.serverTimestamp(),
				message,
				user: user?.email
			});

		setMessage('');
		scrollToBottom();
	};

	const recipient = recipientSnapshot?.docs?.[0]?.data();
	const recipientEmail = getRecipientEmail(chat.users, user);

	return (
		<Container>
			<Header>
				{recipient && recipient.photoURL ? (
					<Avatar src={recipient.photoURL} />
				) : (
					<Avatar>{recipientEmail[0].toUpperCase()}</Avatar>
				)}
				<HeaderInfo>
					<h3>{recipient ? recipient.name : recipientEmail}</h3>
					{recipientSnapshot ? (
						<p>
							Last active:{' '}
							{recipient?.lastSeen?.toDate() ? (
								<TimeAgo
									datetime={recipient?.lastSeen?.toDate()}
								/>
							) : (
								'Unavailable'
							)}
						</p>
					) : (
						<p>Loading last active...</p>
					)}
				</HeaderInfo>
				<HeaderIcons>
					<IconButton>
						<AttachFileIcon />
					</IconButton>
					<IconButton>
						<MoreVertIcon />
					</IconButton>
				</HeaderIcons>
			</Header>
			<MessageContainer>
				{showMessages()}
				<EndOfMessage ref={endOfMessagesRef} />
			</MessageContainer>
			<InputContainer>
				<InsertEmoticonIcon />
				<Input
					value={message}
					onChange={e => setMessage(e.target.value)}
					flex
					round
					contained
				/>
				<button
					hidden
					disabled={!message}
					type="submit"
					onClick={sendMessage}
				>
					Send Message
				</button>
				<MicIcon />
			</InputContainer>
		</Container>
	);
};

const Container = styled.div``;

const Header = styled.div`
	position: sticky;
	top: 0;
	display: flex;
	padding: 11px;
	height: 64px;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
	z-index: 100;
	background: ${({ theme }) => theme.colors.white};
`;

const HeaderInfo = styled.div`
	flex: 1;
	margin-left: 15px;

	> h3 {
		margin-bottom: 3px;
	}

	> p {
		font-size: ${({ theme }) => theme.font.size.md};
		color: gray;
	}
`;

const HeaderIcons = styled.div``;

const MessageContainer = styled.div`
	padding: 30px;
	min-height: 80vh;
	background: ${({ theme }) => theme.colors.grey3};
`;

const EndOfMessage = styled.div`
	margin-bottom: 10px;
`;

const InputContainer = styled.form`
	position: sticky;
	bottom: 0;
	display: flex;
	align-items: center;
	padding: 10px;
	z-index: 100;
	background: ${({ theme }) => theme.colors.white};
`;
