import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/auth/auth';
import { thunkMiddleware } from './slices/auth/middleware';
import { notasSlice } from './slices/notas/notas';
import { formularioInicialSlice } from './slices/formularioInicial/formularioInicial';
import { perfilSlice } from './slices/Perfil/perfil';
import { ejerciciosSlice } from './slices/ejercicios/ejercicios';
import { calendarioSlice } from './slices/calendario/calendario';

export const store = configureStore({
	reducer: {
		auth: authSlice.reducer,
		notas: notasSlice.reducer,
		formularioInicial: formularioInicialSlice.reducer,
		perfil: perfilSlice.reducer,
		ejercicios: ejerciciosSlice.reducer,
		calendario: calendarioSlice.reducer,
	},
	middleware: getDefaultMiddleware =>
		getDefaultMiddleware().concat(thunkMiddleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
