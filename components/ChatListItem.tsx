import { useEffect, useState } from 'react';
import { Avatar } from '@material-ui/core';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { getRecipientEmail } from '../utils/';
import { auth, db } from '../firebase';
import { useCollection } from 'react-firebase-hooks/firestore';
import { useRouter } from 'next/router';

interface ChatListItemProps {
	id: string;
	users: [string];
}

export const ChatListItem: React.FC<ChatListItemProps> = ({ id, users }) => {
	const router = useRouter();
	const [user] = useAuthState(auth);
	const [isCurrent, setIsCurrent] = useState<boolean>(false);
	const [snapshot] = useCollection(
		db
			.collection('users')
			.where('email', '==', getRecipientEmail(users, user))
	);

	useEffect(() => {
		if (router.query.id === id) {
			setIsCurrent(true);
		} else {
			setIsCurrent(false);
		}
	}, [router, id]);

	const enterChat = () => {
		router.push(`/chat/${id}`);
	};

	const recipient = snapshot?.docs?.[0]?.data();
	const recipientName = recipient?.name;
	const recipientEmail = recipient?.email || getRecipientEmail(users, user);

	return (
		<Container onClick={enterChat} isCurrent={isCurrent}>
			{recipient ? (
				<UserAvatar src={recipient.photoURL} />
			) : (
				<UserAvatar>{recipientEmail[0].toUpperCase()}</UserAvatar>
			)}
			<RecipientInfo>
				{recipientName && (
					<RecipientName>{recipientName}</RecipientName>
				)}
				<RecipientEmail>{recipientEmail}</RecipientEmail>
			</RecipientInfo>
		</Container>
	);
};

interface ContainerProps {
	isCurrent: boolean;
}

const Container = styled.div<ContainerProps>`
	display: flex;
	align-items: center;
	cursor: pointer;
	color: ${({ theme }) => theme.colors.black};
	padding: 10px 15px;
	word-break: break-word;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};

	${({ isCurrent, theme }) =>
		isCurrent
			? `background: ${theme.colors.grey4};`
			: `:hover {
					color: ${theme.colors.black};
					background: ${theme.colors.grey2};
				}
			`}
`;

const UserAvatar = styled(Avatar)`
	margin: 5px;
	margin-right: 15px;
`;

const RecipientInfo = styled.div`
	font-size: ${({ theme }) => theme.font.size.md};
	width: 100%;
`;

const RecipientName = styled.div`
	font-weight: bold;
`;

const RecipientEmail = styled.div`
	color: ${({ theme }) => theme.colors.grey6};
`;
