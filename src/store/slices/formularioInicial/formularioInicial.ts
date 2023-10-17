import { createSlice } from '@reduxjs/toolkit';

export const formularioInicialSlice = createSlice({
	name: 'formularioInicial',
	initialState: {
		seleccionPrimerPregunta: '1',
		seleccionSegundaPregunta: [
			{ label: 'Mejorar el sueño', checked: false },
			{ label: 'Manejar la ansiedad', checked: false },
			{ label: 'Manejo de estrés', checked: false },
			{ label: 'Mejorar mi ánimo', checked: false },
		],
		seleccionTerceraPregunta: [
			{ label: 'Meditación', checked: false },
			{ label: 'Ejercicio', checked: false },
			{ label: 'Lectura', checked: false },
			{ label: 'Música', checked: false },
			{ label: 'Videojuegos', checked: false },
			{ label: 'Arte', checked: false },
			{ label: 'Otras', checked: false },
		],
		isLoading: false,
	},
	reducers: {
		startLoading: state => {
			state.isLoading = true;
		},
		setSeleccionPrimeraPregunta: (state, { payload }) => {
			state.seleccionPrimerPregunta = payload;
		},
		toggleSeleccionSegundaPregunta: (state, { payload }) => {
			const index = payload;
			state.seleccionSegundaPregunta[index].checked =
				!state.seleccionSegundaPregunta[index].checked;
		},
		toggleSeleccionTerceraPregunta: (state, { payload }) => {
			const index = payload;
			state.seleccionTerceraPregunta[index].checked =
				!state.seleccionTerceraPregunta[index].checked;
		},
		finishLoading: state => {
			state.isLoading = false;
		},
	},
});

export const {
	setSeleccionPrimeraPregunta,
	toggleSeleccionSegundaPregunta,
	toggleSeleccionTerceraPregunta,
	startLoading,
	finishLoading,
} = formularioInicialSlice.actions;
