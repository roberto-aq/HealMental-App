import { createSlice } from '@reduxjs/toolkit';
import { Ejercicio } from '../../../interfaces/ejercicioApi';

interface ejerciciosProps {
	ejercicios: Ejercicio[];
	ejercicioById: Ejercicio;
	isLoading: boolean;
}

export const ejerciciosSlice = createSlice({
	name: 'ejercicios',
	initialState: {
		ejercicios: [],
		isLoading: false,
		ejercicioById: {
			id: '',
			beneficios: [],
			categoria: '',
			descripcionCorta: '',
			descripcionLarga: '',
			dificultad: '',
			duracion: '',
			frecuenciaRecomendada: '',
			instrucciones: [],
			media: null,
			nombre: '',
			plan: 'gratis',
		},
	} as ejerciciosProps,
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		getEjercicios: (state, { payload }) => {
			state.ejercicios = payload;
			state.isLoading = false;
		},
		getEjercicioById: (state, { payload }) => {
			state.ejercicioById = payload;
			state.isLoading = false;
		},
		finishLoading: state => {
			state.isLoading = false;
		},
	},
});

export const {
	getEjercicios,
	startLoading,
	finishLoading,
	getEjercicioById,
} = ejerciciosSlice.actions;
