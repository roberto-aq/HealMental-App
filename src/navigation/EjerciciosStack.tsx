import {
	CardStyleInterpolators,
	createStackNavigator,
} from '@react-navigation/stack';
import EjerciciosScreen from '../screens/EjerciciosScreen';
import EjercicioDetalleScreen from '../screens/EjercicioDetalleScreen';
import HeaderTab from '../components/HeaderTab';

const Stack = createStackNavigator();

export default function EjerciciosStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: true,
				header: ({ navigation, route, options }) => (
					<HeaderTab
						navigation={navigation}
						options={options}
						route={route}
					/>
				),
			}}
		>
			<Stack.Screen
				name='home'
				component={EjerciciosScreen}
				options={{ title: 'Ejercicios' }}
			/>
			<Stack.Screen
				name='DetalleEjercicio'
				component={EjercicioDetalleScreen}
				options={{
					title: ' ',
				}}
			/>
		</Stack.Navigator>
	);
}
