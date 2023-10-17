import { API_URL } from '@env';
import {
	finishLoading,
	getEjercicioById,
	getEjercicios,
	getEjerciciosRecomendados,
	startLoading,
} from './ejercicios';
import api from '../../../api/api';
import { Dispatch } from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const getEjerciciosThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		try {
			const { data } = await api.get(`${API_URL}/ejercicios`);

			dispatch(getEjercicios(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const getEjercicioByIdThunk = (ejercicioId: string) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		try {
			const { data } = await api.get(
				`${API_URL}/ejercicios/${ejercicioId}`
			);

			dispatch(getEjercicioById(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const getEjerciciosRecomendadosThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(
				`${API_URL}/auth/ejercicios/recomendados`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(getEjerciciosRecomendados(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
