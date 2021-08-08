import { useState } from 'react';
import Link from 'next/link';
import { Avatar, IconButton } from '@material-ui/core';
import AddCircle from '@material-ui/icons/AddCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import SearchIcon from '@material-ui/icons/Search';
import styled from 'styled-components';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useCollection } from 'react-firebase-hooks/firestore';
import { auth, db } from '../firebase';
import { CreateChat } from './CreateChat';
import { ChatListItem } from './ChatListItem';

interface SidebarProps {}

export const Sidebar: React.FC<SidebarProps> = () => {
	const [user] = useAuthState(auth);
	const [searchInput, setSearchInput] = useState('');
	const query = db
		.collection('chats')
		.where('users', 'array-contains', user?.email);
	const [snapshot] = useCollection(query);
	const [showCreateChat, setShowCreateChat] = useState(false);

	const chats =
		searchInput !== ''
			? snapshot?.docs.filter(doc => {
					const validUsers = doc
						.data()
						.users.filter(
							(userEmail: string) =>
								userEmail.indexOf(searchInput) !== -1 &&
								userEmail !== user?.email
						).length;
					if (validUsers > 0) {
						return doc;
					}
			  })
			: snapshot?.docs;
	return (
		<Container>
			<Header>
				<UserInfo>
					<Link href="/">
						<a>
							<UserAvatar
								src={user && user.photoURL ? user.photoURL : ''}
							/>
						</a>
					</Link>
					<h2>{user?.displayName}</h2>
				</UserInfo>
				<IconsContainer>
					<IconButton
						onClick={() => setShowCreateChat(true)}
						title="Create Chat"
					>
						<AddCircle />
					</IconButton>
					<IconButton onClick={() => auth.signOut()} title="Sign Out">
						<ExitToAppIcon />
					</IconButton>
				</IconsContainer>
			</Header>
			<Search>
				<SearchIcon />
				<SearchInput
					placeholder="Search in chats"
					value={searchInput}
					onChange={e => setSearchInput(e.target.value)}
				/>
			</Search>
			<ChatsContainer>
				{chats?.map(chat => (
					<ChatListItem
						key={chat.id}
						id={chat.id}
						users={chat.data().users}
					/>
				))}
			</ChatsContainer>
			{showCreateChat && (
				<CreateChat onClose={() => setShowCreateChat(false)} />
			)}
		</Container>
	);
};

const Container = styled.div`
	flex: 0.45;
	height: calc(100vh - 60px);
	overflow-y: scroll;
	border-right: 1px solid ${({ theme }) => theme.colors.grey1};

	/* hide scrollbar */
	::-webkit-scrollbar {
		display: none;
	}

	-ms-overflow-style: none; /* IE and Edge */
	scrollbar-width: none; /* Firefox */
`;

const Search = styled.div`
	display: flex;
	align-items: center;
	padding: 8px;
	margin: 12px 20px;
	border-radius: 20px;
	background: ${({ theme }) => theme.colors.grey4};
`;

const SearchInput = styled.input`
	flex: 1;
	font-size: ${({ theme }) => theme.font.size.md};
	margin-left: 5px;
	background: transparent;
`;

const Header = styled.div`
	position: sticky;
	display: flex;
	top: 0;
	height: 56px;
	padding: 15px 12px;
	z-index: 1;
	align-items: center;
	border-bottom: 1px solid ${({ theme }) => theme.colors.grey1};
	background: ${({ theme }) => theme.colors.white};
`;

const UserInfo = styled.div`
	display: flex;
	flex: 1;
	align-items: center;

	h2 {
		margin-left: 5px;
	}
`;

const UserAvatar = styled(Avatar)`
	margin: 10px;
`;

const ChatsContainer = styled.div`
	border-top: 1px solid ${({ theme }) => theme.colors.grey1};
`;

const IconsContainer = styled.div``;
