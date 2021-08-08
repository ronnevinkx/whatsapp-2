import moment from 'moment';
import { useAuthState } from 'react-firebase-hooks/auth';
import styled from 'styled-components';
import { auth } from '../firebase';
import { MessageType } from '../types';

interface MessageProps {
	user: string;
	message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ user, message }) => {
	const [userLoggedIn] = useAuthState(auth);
	const TypeOfMessage = user === userLoggedIn?.email ? Sender : Receiver;

	return (
		<Container>
			<TypeOfMessage>
				{message.message}
				<TimeStamp>
					{message.timestamp
						? moment(message.timestamp).format('LT')
						: '...'}
				</TimeStamp>
			</TypeOfMessage>
		</Container>
	);
};

const Container = styled.div``;

const MessageElement = styled.p`
	position: relative;
	width: fit-content;
	padding: 10px 15px 24px;
	border-radius: 10px;
	margin: 10px;
	min-width: 80px;
	text-align: right;
`;

const Sender = styled(MessageElement)`
	margin-left: auto;
	background: ${({ theme }) => theme.colors.green1};
`;

const Receiver = styled(MessageElement)`
	text-align: left;
	background: ${({ theme }) => theme.colors.grey1};
`;

const TimeStamp = styled.span`
	position: absolute;
	right: 0;
	bottom: 0;
	font-size: ${({ theme }) => theme.font.size.sm};
	color: gray;
	padding: 10px 15px;
	text-align: right;
`;
