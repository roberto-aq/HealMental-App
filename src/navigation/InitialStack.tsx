import { createStackNavigator } from '@react-navigation/stack';
import GetstartedScreen from '../screens/GetstartedScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import AppBottomTab from './AppBottomTab';
import FormularioInicial from '../screens/FormularioInicial';

const Stack = createStackNavigator();

export default function InitialStack() {
	return (
		<Stack.Navigator
			screenOptions={{
				headerShown: false,
			}}
		>
			<Stack.Screen name='GetStarted' component={GetstartedScreen} />
			<Stack.Screen name='Login' component={LoginScreen} />
			<Stack.Screen name='Register' component={RegisterScreen} />
			<Stack.Screen
				name='FormularioInicial'
				component={FormularioInicial}
			/>
			<Stack.Screen name='AppHome' component={AppBottomTab} />
		</Stack.Navigator>
	);
}
