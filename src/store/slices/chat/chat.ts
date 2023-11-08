import { createSlice } from '@reduxjs/toolkit';

interface Mensaje {
	id: string;
	text: string;
	role: 'assistant' | 'user';
	timestamp: string;
	messageType: string;
}

export const chatSlice = createSlice({
	name: 'chat',
	initialState: {
		messages: [
			// {
			// 	text: '¡Hola! Soy Paxi, tu amigable compañero virtual. Estoy aquí para escucharte y ofrecerte apoyo. ¿Cómo te encuentras hoy?',
			// 	role: 'assistant',
			// 	timestamp: new Date().toISOString(),
			// 	messageType: 'text',
			// },
		] as Mensaje[],
		isLoadingMessage: false,
		isLoadingConversation: false,
		error: null,
		lastSavedTimeStamp: '',
	},
	reducers: {
		startLoadingMessage: state => {
			state.isLoadingMessage = true;
		},
		finishLoadingMessage: state => {
			state.isLoadingMessage = false;
		},
		startLoadingConversation: state => {
			state.isLoadingConversation = true;
		},
		finishLoadingConversation: state => {
			state.isLoadingConversation = false;
		},
		setError: (state, { payload }) => {
			state.error = payload;
		},
		setLastSavedTimestamp: (state, { payload }) => {
			state.lastSavedTimeStamp = payload;
		},
		addUserMessage: (state, { payload }) => {
			state.messages.push(payload);
		},
		addPaxiMessage: (state, { payload }) => {
			state.messages.push(payload);
			state.isLoadingMessage = false;
		},
		loadMessages: (state, { payload }) => {
			state.messages = payload;
		},
		resetChat: state => {
			state.messages = [];
			state.error = null;
			state.isLoadingMessage = false;
			state.isLoadingConversation = false;
		},
	},
});

export const {
	addUserMessage,
	addPaxiMessage,
	setLastSavedTimestamp,
	loadMessages,
	setError,
	resetChat,
	// LOADINGS
	startLoadingMessage,
	finishLoadingMessage,
	startLoadingConversation,
	finishLoadingConversation,
} = chatSlice.actions;
