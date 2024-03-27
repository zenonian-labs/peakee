import Config from 'react-native-config';
import { getOrInitUserProfile, setJWT } from '@peakee/app/api';
import {
	resetChatState,
	resetUserState,
	setProfile,
	setProfileLoading,
	store,
} from '@peakee/app/state';
import auth from '@react-native-firebase/auth';
import {
	GoogleSignin,
	statusCodes,
} from '@react-native-google-signin/google-signin';

GoogleSignin.configure({
	webClientId: Config.WEB_CLIENT_ID,
});

type UnknownObject = Record<string, never>;

export const signInWithGoogle = async () => {
	try {
		await GoogleSignin.hasPlayServices();
		const userInfo = await GoogleSignin.signIn();

		const googleCredential = auth.GoogleAuthProvider.credential(
			userInfo.idToken,
		);

		const userCredential = await auth().signInWithCredential(
			googleCredential,
		);

		return userCredential;
	} catch (error) {
		const err = error as UnknownObject;
		if (err.code === statusCodes.SIGN_IN_CANCELLED) {
			console.debug('Cancelled sign in');
		} else if (err.code === statusCodes.IN_PROGRESS) {
			console.debug('Sign in in progress');
		} else if (err.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
			console.debug('Play services not available');
		} else {
			console.debug('Unknown error', err);
		}
	}
};

export const signOut = async () => {
	await auth()
		.signOut()
		.then(() => console.log('User signed out!'));
};

auth().onIdTokenChanged(async (firebaseUser) => {
	if (firebaseUser) {
		const jwt = await firebaseUser.getIdToken();
		setJWT(jwt);
		if (!store.getState().user.profile) {
			const user = await getOrInitUserProfile({
				name: firebaseUser.displayName as string,
				email: firebaseUser.email as string,
				imageUrl: firebaseUser.photoURL as string,
			});
			if (user) {
				store.dispatch(setProfile(user));
			}
			store.dispatch(setProfileLoading(false));
		}
	} else {
		console.log('not found firebase user');
		store.dispatch(resetUserState());
		store.dispatch(resetChatState());
	}
});
