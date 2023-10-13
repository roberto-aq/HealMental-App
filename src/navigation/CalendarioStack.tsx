import { createStackNavigator } from '@react-navigation/stack';
import CalendarioScreen from '../screens/Calendario/CalendarioScreen';
import RegistroEmocional from '../screens/Calendario/RegistroEmocional';
import HeaderTab from '../components/HeaderTab';
import DetalleRegistroScreen from '../screens/Calendario/DetalleRegistroScreen';

const Stack = createStackNavigator();

export default function CalendarioStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				header: ({ navigation, route, options }) => (
					<HeaderTab
						navigation={navigation}
						route={route}
						options={options}
					/>
				),
			}}
		>
			<Stack.Screen
				name='home'
				component={CalendarioScreen}
				options={{ title: 'Calendario' }}
			/>
			<Stack.Screen
				name='RegistroEmocional'
				component={RegistroEmocional}
				options={{ title: 'Emociones' }}
			/>
			<Stack.Screen
				name='DetalleEmocion'
				component={DetalleRegistroScreen}
			/>
		</Stack.Navigator>
	);
}
