import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EjerciciosStack from './EjerciciosStack';
import ChatScreen from '../screens/ChatScreen';
import PerfilStack from './PerfilStack';
import CalendarioScreen from '../screens/Calendario/CalendarioScreen';
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import HeaderTab from '../components/HeaderTab';
import CalendarioStack from './CalendarioStack';
import Animated, {
	useAnimatedStyle,
	withTiming,
} from 'react-native-reanimated';

const AppTab = createBottomTabNavigator();

export default function AppBottomTab() {
	// const AnimatedTabIcon = ({ focused, name }) => {
	// 	const animatedStyles = useAnimatedStyle(() => {
	// 		return {
	// 			opacity: withTiming(focused ? 1 : 0.5),
	// 		};
	// 	});

	// 	return (
	// 		<Animated.View style={animatedStyles}>
	// 			<Ionicons name={name} size={24} />
	// 		</Animated.View>
	// 	);
	// };

	return (
		<AppTab.Navigator
			initialRouteName='Home'
			screenOptions={{
				headerTitleAlign: 'center',
				header: ({ navigation, route, options }) => (
					<HeaderTab
						navigation={navigation}
						route={route}
						options={options}
					/>
				),
				tabBarStyle: [styles.tabBarStyle],
				// tabBarShowLabel: false,
				tabBarInactiveTintColor: Colors.secondary,
				tabBarActiveTintColor: Colors.tertiary,
				tabBarLabelStyle: {
					fontSize: 10,
					fontFamily: 'Quicksand700',
					bottom: 11,
					letterSpacing: 0.5,
				},
			}}
		>
			<AppTab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color, focused }) => (
						<Ionicons name='home' color={color} size={24} />
					),
					tabBarLabel: 'Inicio',
					headerShown: false,
				}}
			/>
			<AppTab.Screen
				name='Ejercicios'
				component={EjerciciosStack}
				options={{
					tabBarIcon: ({ color }) => (
						<MaterialCommunityIcons
							name='meditation'
							size={24}
							color={color}
						/>
					),
					headerShown: false,
				}}
			/>
			<AppTab.Screen
				name='Paxi'
				component={ChatScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Entypo
							name='chat'
							size={24}
							color={color}
							style={styles.tabBarStylePaxi}
						/>
					),
					tabBarStyle: { display: 'none' },
				}}
			/>
			<AppTab.Screen
				name='Calendario'
				component={CalendarioStack}
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons name='calendar' color={color} size={24} />
					),
					headerShown: false,
				}}
			/>
			<AppTab.Screen
				name='Perfil'
				component={PerfilStack}
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons name='settings' color={color} size={24} />
					),
					headerShown: false,
					title: 'Configuración',
				}}
			/>
		</AppTab.Navigator>
	);
}

const styles = StyleSheet.create({
	tabBarStyle: {
		height: 60,
		backgroundColor: Colors.primary,
	},
	tabBarStylePaxi: {},
});
