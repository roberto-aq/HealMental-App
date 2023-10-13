import { Dispatch } from '@reduxjs/toolkit';
import {
	finishLoading,
	getEmociones,
	registrarEmocion,
	setIsEmocionRegistrada,
	startLoading,
} from './calendario';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/api';
import { API_URL } from '@env';

export const guardarEmocionThunk = (
	emociones: string[],
	notaDelDia: string,
	desencadenante: string,
	etiquetas: string[]
) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.post(
				`${API_URL}/usuario/emociones/new`,
				{ emociones, notaDelDia, desencadenante, etiquetas },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(registrarEmocion(data));
			dispatch(setIsEmocionRegistrada(true));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const getEmocionesThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(
				`${API_URL}/usuario/emociones/fechas`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(getEmociones(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const getEmocionHoyThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');
		try {
			const { data } = await api.get(
				`${API_URL}/usuario/emociones/hoy`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			dispatch(setIsEmocionRegistrada(true));
		} catch (error: any) {
			if (error.response?.statusCode === 404) {
				dispatch(setIsEmocionRegistrada(false));
			}
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
