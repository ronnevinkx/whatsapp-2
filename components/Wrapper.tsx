import styled from 'styled-components';

interface WrapperProps {
	children: React.ReactNode;
}

export const Wrapper: React.FC<WrapperProps> = ({ children }) => {
	return <StyledWrapper>{children}</StyledWrapper>;
};

const StyledWrapper = styled.div`
	display: flex;
	max-width: 1380px;
	margin: 30px auto;
	border: 1px solid ${({ theme }) => theme.colors.grey1};
	background: ${({ theme }) => theme.colors.white};
`;
