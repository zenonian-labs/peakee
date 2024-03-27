import { StyleSheet } from 'react-native';
import SignInFeature from '@peakee/app/features/SignIn';
import { useNavigation } from '@react-navigation/native';
import { signInWithGoogle } from 'utils/auth';

const SignInScreen = () => {
	const navigation = useNavigation();

	const handleSignIn = async () => {
		const userCredential = await signInWithGoogle();
		if (userCredential) {
			navigation.navigate('Home' as never);
		}
	};

	return (
		<SignInFeature
			style={styles.container}
			titleStyle={styles.titleStyle}
			buttonStyle={styles.signInButtonStyle}
			onPressSignIn={handleSignIn}
		/>
	);
};

export default SignInScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		paddingHorizontal: 20,
		backgroundColor: '#FFFFFF',
	},
	titleStyle: {
		flex: 1,
		justifyContent: 'center',
	},
	signInButtonStyle: {},
});
