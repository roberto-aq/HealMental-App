import { createSlice } from '@reduxjs/toolkit';
import { Nota } from '../../../interfaces/notasApi';

interface NotasState {
	notas: Nota[];
	isLoading: boolean;
}

export const notasSlice = createSlice({
	name: 'notas',
	initialState: {
		notas: [],
		isLoading: false,
	} as NotasState,
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		finishLoading: state => {
			state.isLoading = false;
		},
		getNotas: (state, { payload }) => {
			state.notas = payload;
			state.isLoading = false;
		},
		addNota: (state, { payload }) => {
			state.notas.unshift(payload);
			state.isLoading = false;
		},
		updateNota: (state, { payload }) => {
			const index = state.notas.findIndex(
				nota => nota.id === payload.id
			);
			if (index !== -1) {
				state.notas[index] = payload;
			}
			state.isLoading = false;
		},
		deleteNota: (state, { payload }) => {
			state.notas = state.notas.filter(nota => nota.id !== payload);
			state.isLoading = false;
		},
	},
});

export const {
	getNotas,
	startLoading,
	finishLoading,
	addNota,
	updateNota,
	deleteNota,
} = notasSlice.actions;
