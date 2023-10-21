import { Dispatch } from '@reduxjs/toolkit';
import {
	eliminarEmocionById,
	finishLoading,
	getEmocionByFecha,
	getEmociones,
	registrarEmocion,
	setIsEmocionRegistrada,
	startLoading,
	updateEmocionById,
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

export const getEmocionByFechaThunk = (fecha: string) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');
		try {
			const { data } = await api.get(
				`${API_URL}/usuario/emociones/fecha/${fecha}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(getEmocionByFecha(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const updateRegistroEmocionThunk = (
	id: string,
	emociones: string[],
	notaDelDia: string,
	desencadenante: string,
	etiquetas: string[]
) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.patch(
				`${API_URL}/usuario/emociones/${id}`,
				{
					emociones,
					notaDelDia,
					desencadenante,
					etiquetas,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			console.log(data);
			dispatch(updateEmocionById(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const deleteRegistroEmocionThunk = (id: string) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.delete(
				`${API_URL}/usuario/emociones/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(eliminarEmocionById(id));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
