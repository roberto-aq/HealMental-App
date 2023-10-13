import { API_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/api';

export const guardarRespuestas = () => {
	return async dispatch => {
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(`${API_URL}/notas/usuario`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
		} catch (error) {
			console.log(error.response.data);
		}
	};
};
