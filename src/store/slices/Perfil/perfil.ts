import { createSlice } from '@reduxjs/toolkit';
import { Ejercicio } from '../../../interfaces/ejercicioApi';

interface EjerciciosFavoritosProps {
	ejerciciosFavoritos: Ejercicio[];
	isLoading: boolean;
}

export const perfilSlice = createSlice({
	name: 'notas',
	initialState: {
		ejerciciosFavoritos: [],
		isLoading: false,
	} as EjerciciosFavoritosProps,
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		finishLoading: state => {
			state.isLoading = false;
		},
		getEjerciciosFavoritos: (state, { payload }) => {
			state.ejerciciosFavoritos = payload;
			state.isLoading = false;
		},
		addEjercicioFavorito: (state, { payload }) => {
			state.ejerciciosFavoritos.unshift(payload);
			state.isLoading = false;
		},
		removeEjercicioFavorito: (state, { payload }) => {
			state.ejerciciosFavoritos = state.ejerciciosFavoritos.filter(
				ejercicio => ejercicio.id !== payload
			);
			state.isLoading = false;
		},
	},
});

export const {
	startLoading,
	finishLoading,
	getEjerciciosFavoritos,
	addEjercicioFavorito,
	removeEjercicioFavorito
} = perfilSlice.actions;
