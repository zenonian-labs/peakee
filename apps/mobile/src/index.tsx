import { StatusBar, StyleSheet, View } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from '@peakee/app/state';
import { UIProvider } from '@peakee/ui';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ExploreScreen from 'screens/Explore';
import HomeScreen from 'screens/Home';
import NotificationsScreen from 'screens/Notifications';
import OnboardingScreen from 'screens/Onboarding';
import PracticeScreen from 'screens/Practice';
import SettingsScreen from 'screens/Settings';
import SignInScreen from 'screens/SignIn';
import Splash from 'screens/Splash';
import {
	type HomeTabParamList,
	type RootStackParamList,
	homeTabOptions,
} from 'utils/navigation';

import 'utils/auth';
import 'react-native-url-polyfill/auto';

const Stack = createStackNavigator<RootStackParamList>();
const HomeTab = createMaterialTopTabNavigator<HomeTabParamList>();

StatusBar.setTranslucent(true);
StatusBar.setBackgroundColor('transparent');

function App(): JSX.Element {
	return (
		<View style={styles.container}>
			<Provider store={store()}>
				<SafeAreaProvider>
					{/* this StatusBar as a node make animation lag */}
					{/* <StatusBar translucent backgroundColor={'transparent'} /> */}
					<UIProvider>
						<NavigationContainer>
							<Stack.Navigator
								screenOptions={{ headerShown: false }}
							>
								<Stack.Screen
									name="Splash"
									component={Splash}
								/>
								<Stack.Screen
									name="SignIn"
									component={SignInScreen}
								/>
								<Stack.Screen
									name="Onboarding"
									component={OnboardingScreen}
								/>
								<Stack.Screen
									name="Home"
									component={HomeTabStack}
								/>
							</Stack.Navigator>
						</NavigationContainer>
					</UIProvider>
				</SafeAreaProvider>
			</Provider>
		</View>
	);
}

const HomeTabStack = () => {
	return (
		<HomeTab.Navigator
			screenOptions={homeTabOptions}
			tabBarPosition="bottom"
		>
			<HomeTab.Screen name="Conversations" component={HomeScreen} />
			<HomeTab.Screen name="Explore" component={ExploreScreen} />
			<HomeTab.Screen name="Practice" component={PracticeScreen} />
			<HomeTab.Screen
				name="Notifications"
				component={NotificationsScreen}
			/>
			<HomeTab.Screen name="Settings" component={SettingsScreen} />
		</HomeTab.Navigator>
	);
};

export default App;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
	},
});
