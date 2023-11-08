import { createSlice } from '@reduxjs/toolkit';
import { Ejercicio } from '../../../interfaces/ejercicioApi';

export interface Profesional {
	id: string;
	nombres: string;
	especialidad: string;
	telefono: string;
	correo: string;
	horariosDisponibles: HorariosDisponible[] | null;
}

export interface HorariosDisponible {
	dia: string;
	horaInicio: string;
	horaFin: string;
}

interface EjerciciosFavoritosProps {
	ejerciciosFavoritos: Ejercicio[];
	isLoading: boolean;
	profesionales: Profesional[];
}

export const perfilSlice = createSlice({
	name: 'perfil',
	initialState: {
		ejerciciosFavoritos: [],
		isLoading: false,
		profesionales: [],
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
		getProfesionales: (state, { payload }) => {
			state.profesionales = payload;
			state.isLoading = false;
		},
	},
});

export const {
	startLoading,
	finishLoading,
	getEjerciciosFavoritos,
	addEjercicioFavorito,
	removeEjercicioFavorito,
	getProfesionales,
} = perfilSlice.actions;
