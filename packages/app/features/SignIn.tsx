import type { FC } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

import { useAssets } from '../utils';

type Props = {
	onPressSignIn?: () => void;
};

const SignInFeature: FC<Props> = ({ onPressSignIn }) => {
	const { assets } = useAssets();

	return (
		<View style={styles.container}>
			<Text style={styles.title}>Peakee</Text>
			<Image
				style={styles.titleImage}
				source={assets?.authImage}
				resizeMode="contain"
			/>
			<TouchableOpacity
				style={styles.signInButton}
				onPress={onPressSignIn}
			>
				<Image style={styles.googleImage} source={assets?.google} />
				<Text style={styles.signInText}>Continue with Google</Text>
			</TouchableOpacity>
		</View>
	);
};

export default SignInFeature;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		gap: 40,
	},
	title: {
		fontSize: 50,
		fontWeight: '900',
		color: '#FF7701',
		alignSelf: 'center',
		marginBottom: 60,
	},
	titleImage: {
		width: '100%',
		height: 160,
		alignSelf: 'center',
	},
	signInButton: {
		flexDirection: 'row',
		alignItems: 'center',
		borderWidth: 1,
		borderColor: '#B1B6C1',
		borderRadius: 30,
		paddingVertical: 10,
		paddingHorizontal: 10,
	},
	signInText: {
		flex: 1,
		fontSize: 16,
		textAlign: 'center',
	},
	googleImage: {
		width: 30,
		height: 30,
	},
});
