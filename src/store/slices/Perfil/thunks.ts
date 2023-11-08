import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/api';
import { API_URL } from '@env';
import {
	addEjercicioFavorito,
	finishLoading,
	getEjerciciosFavoritos,
	getProfesionales,
	removeEjercicioFavorito,
	startLoading,
} from './perfil';
import { Dispatch } from '@reduxjs/toolkit';

export const getEjerciciosFavoritosThunk = () => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');
		try {
			const { data } = await api.get(
				`${API_URL}/auth/ejercicios/favoritos`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(getEjerciciosFavoritos(data));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const addEjercicioFavoritoThunk = (ejercicioId: string) => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');
		try {
			const { data } = await api.post(
				`${API_URL}/auth/ejercicios/favoritos/${ejercicioId}`,
				{},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(addEjercicioFavorito(data));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const deleteEjercicioFavoritoThunk = (ejercicioId: string) => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');
		try {
			const { data } = await api.delete(
				`${API_URL}/auth/ejercicios/favoritos/${ejercicioId}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(removeEjercicioFavorito(ejercicioId));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

/* ********************************** */
/*            PROFESIONALES           */
/* ********************************** */
export const getProfesionalesThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());

		try {
			const { data } = await api.get(`${API_URL}/profesionales`);

			dispatch(getProfesionales(data));
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
