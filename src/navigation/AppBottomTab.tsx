import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '../screens/HomeScreen';
import EjerciciosStack from './EjerciciosStack';
import ChatScreen from '../screens/ChatScreen';
import PerfilStack from './PerfilStack';
import CalendarioScreen from '../screens/Calendario/CalendarioScreen';
import { Ionicons } from '@expo/vector-icons';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../constants/colors';
import { StyleSheet } from 'react-native';
import HeaderTab from '../components/HeaderTab';
import CalendarioStack from './CalendarioStack';

const AppTab = createBottomTabNavigator();

export default function AppBottomTab() {
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
				tabBarShowLabel: false,
				tabBarInactiveTintColor: Colors.light,
				tabBarActiveTintColor: Colors.secondary,
			}}
		>
			<AppTab.Screen
				name='Home'
				component={HomeScreen}
				options={{
					tabBarIcon: ({ color }) => (
						<Ionicons name='home' color={color} size={24} />
					),
					headerShown: false,
				}}
			/>
			<AppTab.Screen
				name='Ejercicios'
				component={EjerciciosStack}
				options={{
					tabBarIcon: ({ color }) => (
						<Entypo name='briefcase' size={24} color={color} />
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
						<Ionicons name='person' color={color} size={24} />
					),
					headerShown: false,
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
