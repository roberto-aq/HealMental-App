import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/api';
import { Dispatch } from '@reduxjs/toolkit';
import { finishLoading, startLoading } from './formularioInicial';

export const guardarRespuestasThunk = (
	respuestaPrimerPregunta,
	seleccionSegundaPregunta,
	seleccionTercerPregunta
) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoading());
		const token = await AsyncStorage.getItem('@token');

		try {
			// PREGUNTA 1 = ID 3(¿Cómo te sientes hoy en una escala del 1 al 10?)
			await api.post(
				`${API_URL}/respuesta-inicial?preguntaId=3`,
				{ respuesta: respuestaPrimerPregunta },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}

		try {
			// PREGUNTA 2 = ID 1(CUALES SON TUS OBJETIVOS)
			const respuestasSegundaPregunta = seleccionSegundaPregunta
				.filter((opcion: any) => opcion.checked)
				.map((opcion: any) => opcion.label);
			await api.post(
				`${API_URL}/respuesta-inicial?preguntaId=1`,
				{ respuesta: respuestasSegundaPregunta },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}

		try {
			// PREGUNTA 3 = ID 2(QUE ACTIVIDADES DISFRUTAS)
			const respuestasTerceraPregunta = seleccionTercerPregunta
				.filter((opcion: any) => opcion.checked)
				.map((opcion: any) => opcion.label);
			await api.post(
				`${API_URL}/respuesta-inicial?preguntaId=2`,
				{ respuesta: respuestasTerceraPregunta },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoading());
		}
	};
};
