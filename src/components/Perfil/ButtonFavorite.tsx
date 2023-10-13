import { StyleSheet, Text } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import {
	addEjercicioFavoritoThunk,
	deleteEjercicioFavoritoThunk,
} from '../../store/slices/Perfil/thunks';
import { RootState } from '../../store/store';

interface ButtonFavoriteProps {
	ejercicioId: string;
	// isFavorito: boolean;
}

const ButtonFavorite: React.FC<ButtonFavoriteProps> = ({
	ejercicioId,
	// isFavorito,
}) => {
	const dispatch = useDispatch();

	const { ejerciciosFavoritos } = useSelector(
		(state: RootState) => state.perfil
	);

	const isFavorito = ejerciciosFavoritos.some(
		ejercicio => ejercicio.id === ejercicioId
	);

	const toggleFavorite = () => {
		if (isFavorito) {
			dispatch(deleteEjercicioFavoritoThunk(ejercicioId));
		} else {
			dispatch(addEjercicioFavoritoThunk(ejercicioId));
		}
	};

	return (
		<TouchableOpacity
			style={styles.cardButton}
			onPress={toggleFavorite}
		>
			<AntDesign
				name={isFavorito ? 'heart' : 'hearto'}
				size={18}
				style={styles.iconButton}
			/>
			<Text style={styles.textButton}>
				{isFavorito ? 'Añadido' : 'Añadir'}
			</Text>
		</TouchableOpacity>
	);
};

export default ButtonFavorite;

const styles = StyleSheet.create({
	cardButton: {
		flexDirection: 'row',
		alignSelf: 'flex-end',
		gap: 8,
		paddingHorizontal: 15,
		paddingVertical: 5,
		top: 0,
	},
	iconButton: {
		color: Colors.secondary,
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 13,
		fontWeight: '300',
	},
});
