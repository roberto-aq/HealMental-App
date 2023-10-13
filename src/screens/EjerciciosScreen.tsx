import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import EjercicioCard from '../components/EjercicioCard';
import Splash from './Splash';
import { globalStyles } from '../styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getEjerciciosThunk } from '../store/slices/ejercicios/thunks';
import { getEjerciciosFavoritosThunk } from '../store/slices/Perfil/thunks';
import { Colors } from '../constants/colors';

const EjerciciosScreen = ({ navigation }) => {
	// const { getEjercicios, ejercicios, loading } = useContext(GeneralContext);

	const { ejercicios, isLoading } = useSelector(
		(state: RootState) => state.ejercicios
	);

	const { ejerciciosFavoritos } = useSelector(
		(state: RootState) => state.perfil
	);

	const dispatch = useDispatch();

	const getEjercicios = () => {
		dispatch(getEjerciciosThunk());
	};

	const getEjerciciosFavoritosOfUser = () => {
		dispatch(getEjerciciosFavoritosThunk());
	};

	useEffect(() => {
		getEjercicios();
		getEjerciciosFavoritosOfUser();
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[styles.container, globalStyles.screenContainer]}>
			{/* !TODO - Personalizar Ejercicios en base a las respuestas del formulario inicial */}
			<View style={styles.containerRecomendados}>
				<Text style={styles.title}>Recomendados para ti</Text>

				<FlatList
					data={ejerciciosFavoritos}
					keyExtractor={ejercicio => ejercicio.id}
					renderItem={({ item }) => <EjercicioCard item={item} />}
					ListFooterComponent={() => (
						<View style={{ marginBottom: 15 }}></View>
					)}
				/>
			</View>

			<View style={styles.containerAllEjercicios}>
				<Text style={styles.title}>Todos los Ejercicios</Text>
				<FlatList
					data={ejercicios}
					keyExtractor={ejercicio => ejercicio.id}
					renderItem={({ item }) => <EjercicioCard item={item} />}
					ListFooterComponent={() => (
						<View style={{ marginBottom: 15 }}></View>
					)}
				/>
			</View>
		</View>
	);
};

export default EjerciciosScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		flex: 1,
		backgroundColor: '#fff',
		gap: 20,
	},
	containerRecomendados: {
		flex: 1,
		gap: 5,
	},
	containerAllEjercicios: {
		flex: 2.3,
		gap: 5,
	},
	title: {
		fontWeight: '700',
		color: Colors.secondary,
		textAlign: 'center',
		fontSize: 22,
	},
});
