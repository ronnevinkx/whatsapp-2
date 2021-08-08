import firebase from 'firebase/app';

export const getRecipientEmail = (
	users: [string],
	userLoggedIn: firebase.User | null | undefined
): string => {
	return users?.filter(
		userToFilter => userToFilter !== userLoggedIn?.email
	)[0];
};

// double bang converts to boolean
export const chatAlreadyExists = (
	recipientEmail: string,
	snapshot: firebase.firestore.QuerySnapshot | undefined
): boolean =>
	!!snapshot?.docs.find(
		doc =>
			doc.data().users.find((user: string) => user === recipientEmail)
				?.length > 0
	);
