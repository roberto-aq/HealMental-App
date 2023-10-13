import { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { useSelector, useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppBottomTab from './AppBottomTab';
import InitialStack from './InitialStack';
import Splash from '../screens/Splash';
import {
	closeSessionExpiredModal,
	restoreToken,
	saveUsername,
	tokenExpired,
} from '../store/slices/auth/auth';
import { RootState } from '../store/store';
import SessionExpiredModal from '../components/SessionExpiredModal';
import FormularioInicial from '../screens/FormularioInicial';

export default function RootNavigator() {
	const {
		status,
		userToken,
		isSessionExpiredModalOpen,
		isLoading,
		firstLogin,
	} = useSelector((state: RootState) => state.auth);

	const dispatch = useDispatch();

	const getToken = async () => {
		try {
			const value = await AsyncStorage.getItem('@token');
			if (value !== null) {
				console.log('data restored', value);
				dispatch(restoreToken(value));
			} else {
				console.log('no data');
				dispatch(restoreToken(null));
			}
		} catch (error) {
			console.log(error);
		}
	};

	const getNombreUsuario = async () => {
		const value = await AsyncStorage.getItem('@nombreUsuario');
		if (value) {
			dispatch(saveUsername(value));
		} else {
			dispatch(saveUsername(''));
		}
	};

	const handleCloseModal = async () => {
		await AsyncStorage.removeItem('@token');
		await AsyncStorage.removeItem('@nombreUsuario');

		dispatch(closeSessionExpiredModal());
		dispatch(tokenExpired());
	};

	useEffect(() => {
		getToken();
		getNombreUsuario();
	}, []);

	if (isLoading) {
		return <Splash />;
	}

	return (
		<NavigationContainer>
			{status === 'authenticated' && userToken && firstLogin ? (
				<FormularioInicial />
			) : status === 'authenticated' && userToken ? (
				<AppBottomTab />
			) : (
				<InitialStack />
			)}
			<SessionExpiredModal
				isVisible={isSessionExpiredModalOpen}
				onClose={handleCloseModal}
			/>
		</NavigationContainer>
	);
}
