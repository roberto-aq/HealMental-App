import { Dispatch } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import api from '../../../api/api';
import { API_URL } from '@env';
import {
	login,
	start,
	fail,
	register,
	setUsusario,
	startIsLoading,
	EndIsLoading,
	updateAvatarUsuario,
} from './auth';

export const loginWithEmailPassword = ({ email, password }) => {
	return async (dispatch: Dispatch) => {
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
		} catch (error: any) {
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
	contactoEmergencia,
}) => {
	return async (dispatch: Dispatch) => {
		dispatch(start());

		try {
			const { data } = await axios.post(`${API_URL}/auth/register`, {
				email,
				password,
				nombreUsuario,
				contactoEmergencia,
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
			return null;
		} catch (error: any) {
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

// OBTENER USUARIO PARA DATOS PERSONALES
export const getUsuarioAutenticadoThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startIsLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(`${API_URL}/auth/usuario`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(setUsusario(data));
			dispatch(EndIsLoading());
		} catch (error: any) {
			dispatch(EndIsLoading());
			console.log(error.response.data);
		}
	};
};

// ACTUALIZAR USUARIO PARA DATOS PERSONALES
export const updateAvatarUsuarioThunk = (avatar: string) => {
	return async (dispatch: Dispatch) => {
		dispatch(startIsLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.patch(
				`${API_URL}/auth/usuario`,
				{
					avatar,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(updateAvatarUsuario(data.avatar));
			dispatch(EndIsLoading());
		} catch (error: any) {
			dispatch(EndIsLoading());
			console.log(error.response.data);
		}
	};
};
