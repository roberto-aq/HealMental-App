import { createSlice } from '@reduxjs/toolkit';
import { Emocion } from '../../../interfaces/EmocionApi';

interface propsCalendarioSlice {
	isLoading: boolean;
	emociones: Emocion[];
	isEmocionRegistrada: boolean;
	emocion: Emocion;
}

export const calendarioSlice = createSlice({
	name: 'calendario',
	initialState: {
		isLoading: false,
		emociones: [],
		isEmocionRegistrada: false,
		emocion: {
			desencadenante: '',
			notaDelDia: '',
			emociones: [],
			etiquetas: [],
			fecha: '',
			id: '',
		},
	} as propsCalendarioSlice,
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		finishLoading: state => {
			state.isLoading = false;
		},
		getEmociones: (state, { payload }) => {
			state.emociones = payload;
			state.isLoading = false;
		},
		registrarEmocion: (state, { payload }) => {
			state.emociones.push(payload);
			state.isLoading = false;
		},
		setIsEmocionRegistrada: (state, { payload }) => {
			state.isEmocionRegistrada = payload;
			state.isLoading = false;
		},
		getEmocionByFecha: (state, { payload }) => {
			state.emocion = payload;
			state.isLoading = false;
		},
		updateEmocionById: (state, { payload }) => {
			const index = state.emociones.findIndex(
				emocion => emocion.id === payload.id
			);

			if (index !== -1) {
				state.emociones[index] = payload;
			}

			state.emocion = payload;

			state.isLoading = false;
		},
		eliminarEmocionById: (state, { payload }) => {
			state.emociones = state.emociones.filter(
				emocion => emocion.id !== payload
			);
			state.isLoading = false;
		},
	},
});

export const {
	startLoading,
	finishLoading,
	getEmociones,
	registrarEmocion,
	setIsEmocionRegistrada,
	getEmocionByFecha,
	updateEmocionById,
	eliminarEmocionById,
} = calendarioSlice.actions;
