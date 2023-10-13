import { createSlice } from '@reduxjs/toolkit';

export const authSlice = createSlice({
	name: 'auth',
	initialState: {
		userToken: null,
		status: 'not-authenticated',
		nombreUsuario: '',
		isSessionExpiredModalOpen: false,
		isLoading: false,
		firstLogin: true,
	},
	reducers: {
		start: state => {
			state.status = 'isChecking';
			state.isLoading = true;
		},
		login: (state, { payload }) => {
			state.status = 'authenticated';
			state.nombreUsuario = payload.nombreUsuario;
			state.userToken = payload.token;
			state.isLoading = false;
			state.firstLogin = false;
		},
		register: (state, { payload }) => {
			state.status = 'authenticated';
			state.nombreUsuario = payload.nombreUsuario;
			state.userToken = payload.token;
			state.isLoading = false;
		},
		restoreToken: (state, { payload }) => {
			state.userToken = payload;
			state.status = 'authenticated';
			state.firstLogin = false;
		},
		saveUsername: (state, { payload }) => {
			state.nombreUsuario = payload;
		},
		fail: state => {
			state.status = 'not-authenticated';
			state.isLoading = false;
		},
		signOut: state => {
			state.status = 'not-authenticated';
			state.userToken = null;
			state.nombreUsuario = '';
			state.firstLogin = true;
		},
		tokenExpired: state => {
			state.status = 'not-authenticated';
			state.userToken = null;
			state.nombreUsuario = '';
		},
		openSessionExpiredModal: state => {
			state.isSessionExpiredModalOpen = true;
		},
		closeSessionExpiredModal: state => {
			state.isSessionExpiredModalOpen = false;
		},
		setFirstLogin: state => {
			state.firstLogin = false;
		},
	},
});

export const {
	start,
	login,
	register,
	signOut,
	fail,
	restoreToken,
	saveUsername,
	tokenExpired,
	openSessionExpiredModal,
	closeSessionExpiredModal,
	setFirstLogin,
} = authSlice.actions;
