import { createSlice } from '@reduxjs/toolkit';

export const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		messages: [
			{
				id: 1,
				text: '¡Hola! Soy tu asistente terapéutico.',
				isUser: false, // Indica si el mensaje es del usuario o del chatbot
			},
			{
				id: 2,
				text: 'Quisiera hablarte de mi vida triste y trágica',
				isUser: true,
			},
			{
				id: 3,
				text: 'Si claro cuentame. ¿Qué sucede?',
				isUser: false,
			},
			{
				id: 4,
				text: 'Mi exnovia me dejo hace más de un año y yo todo estupido sigo pensando en ella y trabajo como loco y realmente es estupido todo lo que hago porque siento que no gano nada. Y que se supone que haga una vez termine la universidad. Soy un programador que en estos ultimos meses ha aprendido muchisimo y ha experimentado muchisimas cosas. Pero realmente me siento vacío por dentro. Solo quisiera a alguien que me ame. Nadie ve mi esfuerzo. No se si me entiendas',
				isUser: true,
			},
			{
				id: 5,
				text: 'te entiendo perfectamente. Y puedo empatizar contigo. Nadie ve lo mucho que te esfuerzas pero yo lo veo, es grandioso. Te admiro y debo decir que tienes que continuar. Tienes una leyenda',
				isUser: false,
			},
			// Agrega más mensajes aquí
		],
	},
	reducers: {
		addMessage: (state, { payload }) => {
			state.messages.push(payload);
		},
	},
});

export const { addMessage } = chatSlice.actions;
