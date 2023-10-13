import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { login, start, fail, register } from './auth';

export const loginWithEmailPassword = ({ email, password }) => {
	return async dispatch => {
		dispatch(start());

		try {
			const { data } = await axios.post(`${API_URL}/auth/login`, {
				email,
				password,
			});
			dispatch(
				login({
					nombreUsuario: data.nombreUsuario,
					token: data.token,
				})
			);
			await AsyncStorage.setItem('@token', data.token);
			await AsyncStorage.setItem(
				'@nombreUsuario',
				data.nombreUsuario
			);
			return null;
		} catch (error) {
			dispatch(fail());
			if (error.response.data.statusCode === 401) {
				return error.response.data.message;
			}
			return 'Ocurrió un error. Por favor, inténtelo de nuevo.';
		}
	};
};

export const registerThunk = ({
	nombreUsuario,
	email,
	password,
	navigate,
}) => {
	return async dispatch => {
		dispatch(start());

		try {
			const { data } = await axios.post(`${API_URL}/auth/register`, {
				email,
				password,
				nombreUsuario,
			});
			dispatch(
				register({
					nombreUsuario: data.nombreUsuario,
					token: data.token,
				})
			);

			await AsyncStorage.setItem('@token', data.token);
			await AsyncStorage.setItem(
				'@nombreUsuario',
				data.nombreUsuario
			);
			navigate('FormularioInicial');
			return null;
		} catch (error) {
			console.log(error.response.data);
			dispatch(fail());
			if (
				error.response.data.statusCode === 400 &&
				error.response.data.message.includes('already exists')
			) {
				return 'El email ya está registrado. Por favor, intenta con otro.';
			}
			return 'Ocurrió un error al registrarse. Por favor, inténtelo de nuevo.';
		}
	};
};
