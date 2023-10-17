import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import EjercicioCard from '../components/EjercicioCard';
import Splash from './Splash';
import { globalStyles } from '../styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import {
	getEjerciciosRecomendadosThunk,
	getEjerciciosThunk,
} from '../store/slices/ejercicios/thunks';
import { Colors } from '../constants/colors';

const EjerciciosScreen = ({ navigation }) => {
	const { ejercicios, isLoading, ejerciciosRecomendados } =
		useSelector((state: RootState) => state.ejercicios);

	const dispatch = useDispatch();

	const getEjercicios = () => {
		dispatch(getEjerciciosThunk());
	};

	const getEjerciciosRecomendados = () => {
		dispatch(getEjerciciosRecomendadosThunk());
	};

	useEffect(() => {
		getEjercicios();
		getEjerciciosRecomendados();
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[styles.container, globalStyles.screenContainer]}>
			<View style={styles.containerRecomendados}>
				<Text style={styles.title}>Recomendados para ti</Text>

				<FlatList
					data={ejerciciosRecomendados}
					keyExtractor={ejercicio => ejercicio.id}
					renderItem={({ item }) => <EjercicioCard item={item} />}
					horizontal={true}
					ListFooterComponent={() => (
						<View style={{ marginBottom: 15 }}></View>
					)}
					ItemSeparatorComponent={() => (
						<View style={{ width: 15 }}></View>
					)}
					showsHorizontalScrollIndicator={false}
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
		backgroundColor: '#000',
		gap: 20,
	},
	containerRecomendados: {
		gap: 5,
	},
	containerAllEjercicios: {
		gap: 5,
		flex: 1,
	},
	title: {
		fontWeight: '700',
		color: Colors.secondary,
		textAlign: 'center',
		fontSize: 22,
	},
});
