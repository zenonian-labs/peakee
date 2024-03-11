import type { FC } from 'react';
import {
	ScrollView,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import CountryFlag from 'react-native-country-flag';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import type { UserExplore, UserProfile } from '@peakee/db/types';
import { Avatar } from '@peakee/ui';

interface Props {
	profile: UserProfile;
	explore: UserExplore;
	onPressChat: (user: UserExplore) => void;
}
const ExploreProfile: FC<Props> = ({ profile, explore, onPressChat }) => {
	const handlePressChat = () => {
		onPressChat(explore);
	};
	return (
		<View style={styles.container}>
			<View style={styles.leftCol}>
				<View style={styles.avatarContainer}>
					<Avatar source={{ uri: profile.imageUrl }} size={60} />
					<View style={styles.heartCount}>
						<FontAwesomeIcon
							icon={faHeart}
							color="#D10C0F"
							size={10}
						/>
						<Text>{explore.like | 0}</Text>
					</View>
				</View>
				<View style={styles.inforContainer}>
					<View style={styles.infoHeader}>
						<Text style={styles.name}> {explore.name}</Text>
						<CountryFlag
							isoCode={explore.country}
							size={15}
							style={styles.flag}
						/>
					</View>
					<ScrollView
						horizontal
						scrollEnabled
						showsHorizontalScrollIndicator={false}
						style={{
							flex: 1,
						}}
						contentContainerStyle={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<View style={styles.flexRow}>
							{explore.learnings.map((lang, idx) => {
								return (
									<View
										style={styles.languageContainer}
										key={idx}
									>
										<Text style={styles.languageText}>
											{lang}
										</Text>
									</View>
								);
							})}
						</View>
					</ScrollView>
					<View style={styles.flexRow}>
						<Text style={styles.infoText}>{explore.major}</Text>
						<Text style={styles.infoText}>-</Text>
						<Text style={styles.infoText}>
							{explore.interests?.map((it, idx) => {
								return idx + 1 == explore.interests?.length ? (
									<Text key={idx}>{it}</Text>
								) : (
									<Text key={idx}>{it}, </Text>
								);
							})}
						</Text>
					</View>
				</View>
			</View>
			<TouchableOpacity
				style={styles.chatButton}
				onPress={handlePressChat}
			>
				<Text style={{ color: '#fea91a' }}>Chat</Text>
			</TouchableOpacity>
		</View>
	);
};
export default ExploreProfile;

const styles = StyleSheet.create({
	container: {
		display: 'flex',
		flexDirection: 'row',
		height: 100,
		gap: 10,
		width: '100%',
		alignItems: 'center',
		justifyContent: 'space-between',
		borderBottomWidth: 1.5,
		paddingBottom: 10,
		borderColor: '#F5F4F4',
	},
	leftCol: {
		display: 'flex',
		flexDirection: 'row',
		height: '100%',
		gap: 10,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
	},
	avatarContainer: {
		display: 'flex',
		height: '100%',
		gap: 7,
		flexDirection: 'column',
		justifyContent: 'center',
		alignItems: 'center',
	},
	heartCount: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 3,
		justifyContent: 'center',
	},
	inforContainer: {
		display: 'flex',
		flexDirection: 'column',
		height: '100%',
		flex: 1,
		justifyContent: 'space-between',
	},
	infoHeader: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	name: {
		includeFontPadding: false,
		fontSize: 20,
		fontWeight: '600',
		textTransform: 'capitalize',
	},
	flag: {
		borderRadius: 4,
	},
	flexRow: {
		display: 'flex',
		flexDirection: 'row',
		gap: 5,
	},
	languageContainer: {
		borderRadius: 11,
		borderColor: '#9AA3AE',
		borderWidth: 1,
		width: 80,
		height: 25,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
	},
	languageText: {
		color: '#4B5462',
		fontSize: 10,
		textTransform: 'capitalize',
	},
	infoText: {
		color: '#4B5462',
		fontSize: 15,
		textTransform: 'capitalize',
	},
	chatButton: {
		height: 35,
		fontSize: 15,
		display: 'flex',
		justifyContent: 'center',
		alignItems: 'center',
		width: 80,
		borderRadius: 15,
		borderWidth: 0,
		backgroundColor: '#FEEDCC',
	},
	languagesBar: {
		width: 'auto',
		overflow: 'scroll',
	},
});
