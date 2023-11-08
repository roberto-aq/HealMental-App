import { createStackNavigator } from '@react-navigation/stack';
import PerfilScreen from '../screens/PerfilScreen';
import NotasScreen from '../screens/Perfil/NotasScreen';
import HeaderTab from '../components/HeaderTab';
import NotaIndividualScreen from '../screens/Perfil/NotaIndividualScreen';
import EjerciciosFavoritosScreen from '../screens/Perfil/EjerciciosFavoritosScreen';
import DatosPersonalesScreen from '../screens/Perfil/DatosPersonalesScreen';
import ProfesionalListScreen from '../screens/Perfil/ProfesionalListScreen';
import ProfesionalDetailsScreen from '../screens/Perfil/ProfesionalDetailsScreen';

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
					title: 'Configuración',
				}}
			/>
			<Stack.Screen name='Notas' component={NotasScreen} />
			<Stack.Screen
				name='NotaIndividual'
				component={NotaIndividualScreen}
				options={{ title: ' ' }}
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
			<Stack.Screen
				name='ProfesionalesList'
				component={ProfesionalListScreen}
				options={{ title: 'Lista de Profesionales' }}
			/>
			<Stack.Screen
				name='ProfesionalDetails'
				component={ProfesionalDetailsScreen}
				options={{ title: ' ' }}
			/>
		</Stack.Navigator>
	);
}
