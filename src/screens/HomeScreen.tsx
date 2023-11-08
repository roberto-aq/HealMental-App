import { useEffect } from 'react';
import {
	Button,
	StyleSheet,
	Text,
	View,
	Pressable,
	ScrollView,
} from 'react-native';
import { globalStyles } from '../styles/global';
import AfirmacionCard from '../components/AfirmacionCard';
import ContainerLogo from '../components/ContainerLogo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { getEjerciciosFavoritosThunk } from '../store/slices/Perfil/thunks';
// import { ScrollView } from 'react-native-gesture-handler';
import { FlatList } from 'react-native';
import EjercicioCard from '../components/EjercicioCard';
import { Colors } from '../constants/colors';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { getEjerciciosRecomendadosThunk } from '../store/slices/ejercicios/thunks';
import NotaCard from '../components/notas/NotaCard';
import { getNotasThunk } from '../store/slices/notas/thunks';
import Splash from './Splash';

const HomeScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const { nombreUsuario } = useSelector(
		(state: RootState) => state.auth
	);

	const { notas, isLoading: isLoadingNotas } = useSelector(
		(state: RootState) => state.notas
	);

	const { isLoading: isLoadingFavoritos, ejerciciosFavoritos } =
		useSelector((state: RootState) => state.perfil);

	const { isLoading: isLoadingRecomendados, ejerciciosRecomendados } =
		useSelector((state: RootState) => state.ejercicios);

	const getEjerciciosFavoritosOfUser = async () => {
		dispatch(getEjerciciosFavoritosThunk());
	};

	const getEjerciciosRecomendados = () => {
		dispatch(getEjerciciosRecomendadosThunk());
	};

	const getNotasByUser = () => {
		dispatch(getNotasThunk());
	};

	useEffect(() => {
		getEjerciciosFavoritosOfUser();
		getEjerciciosRecomendados();
		getNotasByUser();
	}, []);

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ContainerLogo />
			<ScrollView showsVerticalScrollIndicator={false}>
				<Text style={{ fontFamily: 'Quicksand400', fontSize: 20 }}>
					¡Hola,{' '}
					<Text
						style={{
							fontFamily: 'Quicksand700',
							textTransform: 'capitalize',
						}}
					>
						{nombreUsuario}!
					</Text>
				</Text>
				<AfirmacionCard />

				<Pressable onPress={() => navigation.navigate('home')}>
					<Text>Ver calendario</Text>
				</Pressable>

				<View style={styles.separator}></View>
				<View style={styles.containerRecomendacion}>
					<View style={styles.containerIconText}>
						<Ionicons name='bulb' size={24} color={Colors.tertiary} />
						<Text style={styles.titleEjerciciosFavoritos}>
							Sugerencias del día
						</Text>
					</View>
					{!isLoadingRecomendados ? (
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
					) : (
						<Splash />
					)}
				</View>
				<View style={styles.separator}></View>

				<View style={styles.containerEjerciciosFavoritos}>
					<View style={styles.containerIconText}>
						<Ionicons
							name='heart'
							size={24}
							color={Colors.tertiary}
						/>
						<Text style={styles.titleEjerciciosFavoritos}>
							Ejercicios Favoritos
						</Text>
					</View>

					{!isLoadingFavoritos ? (
						<>
							{ejerciciosFavoritos.length > 0 ? (
								<FlatList
									data={ejerciciosFavoritos}
									keyExtractor={ejercicio => ejercicio.id}
									renderItem={({ item }) => (
										<EjercicioCard item={item} />
									)}
									ListFooterComponent={() => (
										<View style={{ marginBottom: 50 }}></View>
									)}
									horizontal={true}
									ItemSeparatorComponent={() => (
										<View style={{ width: 15 }}></View>
									)}
								/>
							) : (
								<View style={styles.containerWithout}>
									<Text
										style={{
											flex: 1,
											fontFamily: 'Quicksand700',
											color: Colors.secondary,
										}}
									>
										No hay Ejercicios Favoritos
									</Text>
									<Pressable
										onPress={() => navigation.navigate('Ejercicios')}
										style={styles.buttonExploreEjercicios}
									>
										<Text style={styles.textButtonExploreEjercicios}>
											Explorar ejercicios
										</Text>
									</Pressable>
								</View>
							)}
						</>
					) : (
						<Splash />
					)}
				</View>
				<View style={styles.separator}></View>

				<View style={styles.containerNotas}>
					<View style={styles.containerIconText}>
						<MaterialIcons
							name='notes'
							size={24}
							color={Colors.tertiary}
						/>
						<Text style={styles.titleNotas}>Tus notas</Text>
					</View>
					{!isLoadingNotas ? (
						<>
							{notas.length > 0 ? (
								<FlatList
									data={notas}
									keyExtractor={nota => nota.id.toString()}
									renderItem={({ item }) => <NotaCard nota={item} />}
									horizontal={true}
									ItemSeparatorComponent={() => (
										<View style={{ width: 15 }}></View>
									)}
								/>
							) : (
								<View style={styles.containerWithout}>
									<Text>No ha agregado notas nuevas</Text>
								</View>
							)}
						</>
					) : (
						<Splash />
					)}
				</View>
			</ScrollView>
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},

	containerRecomendacion: {
		gap: 10,
	},

	containerEjerciciosFavoritos: {
		gap: 10,
	},
	containerIconText: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
		justifyContent: 'center',
	},
	titleEjerciciosFavoritos: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		fontSize: 22,
	},

	buttonExploreEjercicios: {
		backgroundColor: Colors.primary,
		width: '80%',
		marginVertical: 5,
		paddingVertical: 10,
		borderRadius: 8,
	},
	textButtonExploreEjercicios: {
		color: Colors.secondary,
		textAlign: 'center',
		fontWeight: "700",
	},

	containerNotas: {
		gap: 10,
	},

	titleNotas: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 22,
	},

	containerWithout: {
		backgroundColor: '#fff',
		height: 130,
		borderRadius: 12,
		alignItems: 'center',
		borderColor: Colors.primary,
		borderWidth: 1,
		paddingVertical: 15,
	},

	separator: {
		height: 15,
	},
});
