import { setChatData, store } from '@peakee/app/state';
import type { UserChatData, UserProfile } from '@peakee/app/types';
import firestore from '@react-native-firebase/firestore';

export const usersCollection = firestore().collection('Users');

export const fetchUserChatData = async (
	profile: UserProfile,
	option?: { listen: boolean },
) => {
	try {
		const usersQuery = await usersCollection
			.where('firebaseUid', '==', profile.uid)
			.get();

		let userChatDataId: string;

		if (usersQuery.docs.length == 0) {
			console.log('Not found this user -> init', profile.email);
			const userDoc: Partial<UserChatData> = {
				name: profile.name,
				fullName: profile.fullName,
				email: profile.email,
				imageUrl: profile.imageUrl,
				firebaseUid: profile.uid,
				friends: [],
			};

			const res = await usersCollection.add(userDoc);
			userChatDataId = res.id;
		} else {
			console.log('Found in firestore', profile.email);
			userChatDataId = usersQuery.docs[0].id;
		}

		if (option?.listen) {
			listenUserChatData(userChatDataId);
		}
	} catch (e) {
		console.log(e, '<-- Firestore error');
	}
};

export const listenUserChatData = (id: string) => {
	usersCollection.doc(id).onSnapshot(async (doc) => {
		const friendsIds = doc.data()?.friends as string[];

		// Need to optimize if any profiles are already fetched
		if (
			friendsIds.toString() !==
			store.getState().user.chatData?.friends.toString()
		) {
			fetchFriends(friendsIds);
		}

		store.dispatch(
			setChatData({
				id,
				...doc.data(),
			} as UserChatData),
		);
	});
};

export const fetchFriends = async (friendsIds: string[]) => {
	if (friendsIds.length === 0) return;
	const friendsQuery = await usersCollection
		.where(firestore.FieldPath.documentId(), 'in', friendsIds)
		.get();

	store.dispatch(
		setFriends(
			friendsQuery.docs.map((ele) => {
				return {
					id: ele.id,
					...ele.data(),
				} as UserChatData;
			}),
		),
	);
};

export const addFriend = async (email: string) => {
	const friendsQuery = await usersCollection
		.where('email', '==', email)
		.get();

	if (friendsQuery.docs.length === 0) {
		console.log('Not found this user');
	} else {
		const data = store.getState().user.chatData;
		if (!data) {
			console.log('Not found user chat data');
			return false;
		}

		const friendId = friendsQuery.docs[0].id;
		if (!data.friends.includes(friendId)) {
			console.log('Already added');
			return false;
		}

		await usersCollection.doc(data.id).update({
			friends: [...data.friends, friendId],
		});

		return true;
	}

	return false;
};