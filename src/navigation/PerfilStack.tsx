import { createStackNavigator } from '@react-navigation/stack';
import PerfilScreen from '../screens/PerfilScreen';
import NotasScreen from '../screens/Perfil/NotasScreen';
import HeaderTab from '../components/HeaderTab';
import NotaIndividualScreen from '../screens/Perfil/NotaIndividualScreen';
import EjerciciosFavoritosScreen from '../screens/Perfil/EjerciciosFavoritosScreen';
import DatosPersonalesScreen from '../screens/Perfil/DatosPersonalesScreen';

const Stack = createStackNavigator();

export default function PerfilStack() {
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
				name='Home'
				component={PerfilScreen}
				options={{
					title: 'Perfil',
				}}
			/>
			<Stack.Screen name='Notas' component={NotasScreen} />
			<Stack.Screen
				name='NotaIndividual'
				component={NotaIndividualScreen}
			/>
			<Stack.Screen
				name='EjerciciosFavoritos'
				component={EjerciciosFavoritosScreen}
			/>
			<Stack.Screen
				name='DatosPersonales'
				component={DatosPersonalesScreen}
				options={{ title: 'Datos Personales' }}
			/>
		</Stack.Navigator>
	);
}
