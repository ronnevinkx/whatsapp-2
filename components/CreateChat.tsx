import React, { useState, useEffect } from 'react';
import firebase from 'firebase/app';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import styled from 'styled-components';
import { IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Input } from './Input';
import { Button } from './Button';
import * as EmailValidator from 'email-validator';
import { chatAlreadyExists } from '../utils';

interface CreateChatProps {
	onClose: () => void;
}

export const CreateChat: React.FC<CreateChatProps> = ({ onClose }) => {
	const [user] = useAuthState(auth);
	const [recipientEmail, setRecipientEmail] = useState<string>('');

	useEffect(() => {
		const escHandler = (e: KeyboardEvent): void => {
			if (e.key === 'Escape') {
				onClose();
			}
		};

		document.addEventListener('keydown', escHandler);
		return () => {
			document.removeEventListener('keydown', escHandler);
		};
	}, [onClose]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (!recipientEmail) return;

		// check for valid email address, if chat already exists in db and if it's not current user
		if (
			EmailValidator.validate(recipientEmail) &&
			!chatAlreadyExists(recipientEmail, snapshot) &&
			recipientEmail !== user?.email
		) {
			// create chat in `chats` collection
			db.collection('chats').add({
				users: [user?.email, recipientEmail]
			});

			onClose();
		}
	};

	const query = db
		.collection('chats')
		.where('users', 'array-contains', user?.email);
	const [snapshot] = useCollection<firebase.firestore.DocumentData>(query);

	return (
		<Container>
			<Inner>
				<Title>
					<h3>Create a new chat</h3>
					<IconButton onClick={onClose} title="Close">
						<CloseIcon />
					</IconButton>
				</Title>
				<Content>
					<form onSubmit={handleSubmit}>
						<FormGroup>
							<label htmlFor="email">Chat with:</label>
							<Input
								type="email"
								id="email"
								placeholder="name@email.com"
								required
								onChange={(
									e: React.ChangeEvent<HTMLInputElement>
								) => setRecipientEmail(e.target.value)}
							/>
						</FormGroup>
						<FormGroup>
							<Button type="submit">Create Chat</Button>
						</FormGroup>
					</form>
				</Content>
			</Inner>
			<Background onClick={() => onClose()} />
		</Container>
	);
};

const Container = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	display: flex;
	width: 100%;
	height: 100%;
	justify-content: center;
	align-items: center;
	z-index: 997;
`;

const Background = styled.div`
	position: absolute;
	top: 0;
	left: 0;
	width: 100%;
	height: 100%;
	z-index: 998;
	background: rgba(0, 0, 0, 0.5);
`;

const Inner = styled.div`
	width: 400px;
	max-width: 400px;
	max-height: 300px;
	z-index: 999;
	background: ${({ theme }) => theme.colors.white};
`;

const Title = styled.div`
	display: flex;
	padding: 12px 15px 12px 30px;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};

	h3 {
		flex: 1;
	}
`;

const Content = styled.div`
	padding: 16px 30px 30px;
`;

const FormGroup = styled.div`
	width: 100%;

	label {
		margin-bottom: 5px;
	}

	button {
		margin-top: 20px;
	}
`;
