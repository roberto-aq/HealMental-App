import axios from 'axios';
import { API_URL } from '@env';
import { store } from '../store/store';
import { openSessionExpiredModal } from '../store/slices/auth/auth';

const api = axios.create({
	baseURL: API_URL,
});

// const dispatch = useDispatch();

api.interceptors.response.use(
	response => {
		// Si la respuesta es exitosa, simplemente la devolvemos
		return response;
	},
	error => {
		// Si hay un error y el código de estado es 401, despachamos la acción tokenExpired
		if (error.response && error.response.status === 401) {
			store.dispatch(openSessionExpiredModal());
		}
		// Siempre debes rechazar el error para que puedas manejarlo en tus componentes o acciones de Redux
		return Promise.reject(error);
	}
);

export default api;
