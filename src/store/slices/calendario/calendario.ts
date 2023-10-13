import { createSlice } from '@reduxjs/toolkit';
import { Emocion } from '../../../interfaces/EmocionApi';

interface propsCalendarioSlice {
	isLoading: boolean;
	emociones: Emocion[];
	isEmocionRegistrada: boolean;
}

export const calendarioSlice = createSlice({
	name: 'calendario',
	initialState: {
		isLoading: false,
		emociones: [],
		isEmocionRegistrada: false,
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
	},
});

export const {
	startLoading,
	finishLoading,
	getEmociones,
	registrarEmocion,
	setIsEmocionRegistrada,
} = calendarioSlice.actions;
