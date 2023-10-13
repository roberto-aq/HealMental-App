import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '@env';
import api from '../../../api/api';
import {
	addNota,
	deleteNota,
	finishLoading,
	getNotas,
	startLoading,
	updateNota,
} from './notas';

export const getNotasThunk = () => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(`${API_URL}/notas/usuario`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			dispatch(getNotas(data));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const crearNotaThunk = (
	title: string,
	description: string
) => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.post(
				`${API_URL}/notas/new`,
				{
					tituloNota: title,
					descripcionNota: description,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(addNota(data));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const updateNotaThunk = (
	id: string,
	title: string,
	description: string
) => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.patch(
				`${API_URL}/notas/usuario/${id}`,
				{
					tituloNota: title,
					descripcionNota: description,
				},
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(updateNota(data));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};

export const deleteNotaThunk = (id: string) => {
	return async dispatch => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.delete(
				`${API_URL}/notas/usuario/${id}`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
			dispatch(deleteNota(id));
		} catch (error) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
