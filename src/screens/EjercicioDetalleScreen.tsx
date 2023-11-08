import { useEffect, useState, useCallback } from 'react';
import {
	StyleSheet,
	Text,
	View,
	TouchableOpacity,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../constants/colors';
import Splash from './Splash';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getEjercicioByIdThunk } from '../store/slices/ejercicios/thunks';
import { RootState } from '../store/store';
import YoutubePlayer from 'react-native-youtube-iframe';
import {
	addEjercicioFavoritoThunk,
	deleteEjercicioFavoritoThunk,
} from '../store/slices/Perfil/thunks';

interface EjercicioDetalleScreenProps {
	route: { params: { id: string } };
}

const EjercicioDetalleScreen: React.FC<
	EjercicioDetalleScreenProps
> = ({ route }) => {
	const [playing, setPlaying] = useState(false);

	const onStateChange = useCallback((state: any) => {
		if (state === 'ended') {
			setPlaying(false);
		}
	}, []);

	const { id } = route.params;

	const dispatch = useDispatch();

	const { ejercicioById, isLoading } = useSelector(
		(state: RootState) => state.ejercicios
	);
	const { ejerciciosFavoritos } = useSelector(
		(state: RootState) => state.perfil
	);

	const isFavorito = ejerciciosFavoritos.some(
		ejercicio => ejercicio.id === ejercicioById.id
	);

	const toggleFavorite = () => {
		if (isFavorito) {
			dispatch(deleteEjercicioFavoritoThunk(ejercicioById.id));
		} else {
			dispatch(addEjercicioFavoritoThunk(ejercicioById.id));
		}
	};

	const getEjercicioById = (id: string) => {
		dispatch(getEjercicioByIdThunk(id));
	};

	useEffect(() => {
		getEjercicioById(id);
	}, []);

	if (isLoading) return <Splash />;

	return (
		<ScrollView style={styles.container}>
			<View style={styles.containerTitle}>
				<Text style={styles.titleEjercicio}>
					{ejercicioById.nombre}
				</Text>
			</View>

			<Text style={styles.textContent}>
				{ejercicioById.descripcionLarga}
			</Text>

			<View style={styles.containerCategoria}>
				<Text style={styles.textTitleCategory}>Categoría:</Text>
				<Text style={styles.textContentCategory}>
					{ejercicioById.categoria}
				</Text>
			</View>

			<View style={styles.containerBeneficios}>
				<Text style={styles.textTitleBeneficios}>Beneficios</Text>

				<View style={styles.containerTextBeneficios}>
					{ejercicioById.beneficios?.map((beneficio, index) => (
						<View key={index} style={styles.containerTextBeneficio}>
							<AntDesign
								name='checkcircle'
								size={18}
								style={styles.iconCheck}
							/>
							<Text style={styles.textContentBeneficios}>
								{beneficio}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View style={styles.containerInstrucciones}>
				<Text style={styles.textTitleInstrucciones}>
					Instrucciones
				</Text>
				<View style={styles.containerTextInstrucciones}>
					{ejercicioById.instrucciones?.map((instruccion, index) => (
						<View key={index} style={styles.containerTextInstruccion}>
							<Text style={styles.textContentInstrucciones}>
								<Text style={{ fontWeight: '700' }}>{index + 1}</Text>
								. {instruccion}
							</Text>
						</View>
					))}
				</View>
			</View>

			<View style={styles.containerDuracion}>
				<Text style={styles.textTitleDuracion}>Duración:</Text>
				<Text style={styles.textContentDuracion}>
					{ejercicioById.duracion}
				</Text>
			</View>

			<View style={styles.containerDuracion}>
				<Text style={styles.textTitleDuracion}>
					Frecuencia Recomendada:
				</Text>
				<Text style={styles.textContentDuracion}>
					{ejercicioById.frecuenciaRecomendada}
				</Text>
			</View>

			<View style={[styles.containerDuracion, { marginBottom: 20 }]}>
				<Text style={styles.textTitleDuracion}>Dificultad:</Text>
				<Text style={styles.textContentDuracion}>
					{ejercicioById.dificultad}
				</Text>
			</View>

			{ejercicioById.media ? (
				<View style={styles.containerVideoYoutube}>
					<Text style={styles.textTitleVideo}>
						¿Cómo puedo hacer?
					</Text>
					<YoutubePlayer
						height={300}
						play={playing}
						videoId={ejercicioById.media}
						onChangeState={onStateChange}
						webViewProps={{
							renderToHardwareTextureAndroid: true,
						}}
					/>
				</View>
			) : (
				''
			)}

			<TouchableOpacity
				style={styles.cardButton}
				onPress={toggleFavorite}
			>
				<AntDesign
					name={isFavorito ? 'heart' : 'hearto'}
					size={18}
					style={[
						styles.iconButton,
						!isFavorito ? { color: Colors.secondary } : {},
					]}
				/>
				<Text
					style={[
						styles.textButton,
						!isFavorito ? { color: Colors.secondary } : {},
					]}
				>
					{isFavorito ? 'Añadido a Favoritos' : 'Añadir a Favoritos'}
				</Text>
			</TouchableOpacity>
		</ScrollView>
	);
};

export default EjercicioDetalleScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		marginVertical: 20,
	},
	containerTitle: {
		paddingVertical: 15,
		backgroundColor: Colors.secondary,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
	},
	titleEjercicio: {
		fontSize: 20,
		fontFamily: 'Quicksand700',
		color: Colors.light,
		textAlign: 'center',
		width: '80%',
		lineHeight: 25,
		textTransform: 'capitalize',
	},
	textContent: {
		fontSize: 16,
		fontFamily: 'Quicksand400',
		color: Colors.secondary,
		marginTop: 40,
		marginBottom: 15,
		lineHeight: 25,
	},
	containerCategoria: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
		marginTop: 20,
	},
	textTitleCategory: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
	},
	textContentCategory: {
		color: Colors.light,
		backgroundColor: Colors.tertiary,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
		fontSize: 12,
		fontFamily: 'Quicksand700',
	},
	containerBeneficios: {
		alignItems: 'center',
		marginTop: 40,
		gap: 20,
		paddingLeft: 15,
	},
	containerTextBeneficios: {
		gap: 10,
		width: '100%',
	},
	containerTextBeneficio: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},
	textTitleBeneficios: {
		fontFamily: 'Quicksand700',
		fontSize: 18,
		color: Colors.secondary,
	},
	textContentBeneficios: {
		fontSize: 16,
		fontFamily: 'Quicksand400',
		color: Colors.secondary,
		width: '87%',
		lineHeight: 25,
	},
	iconCheck: {
		color: Colors.secondary,
	},

	containerInstrucciones: {
		marginTop: 30,
		alignItems: 'center',
		gap: 20,
		paddingLeft: 15,
	},
	containerTextInstrucciones: {
		gap: 10,
		width: '100%',
	},

	containerTextInstruccion: {
		flexDirection: 'row',
		gap: 12,
		alignItems: 'center',
	},

	textTitleInstrucciones: {
		fontFamily: 'Quicksand700',
		fontSize: 18,
		color: Colors.secondary,
	},
	textContentInstrucciones: {
		lineHeight: 25,
		color: Colors.secondary,
		fontFamily: 'Quicksand400',
		width: '95%',
		fontSize: 16,
	},

	containerDuracion: {
		gap: 10,
		marginTop: 30,
		alignSelf: 'flex-start',
		alignItems: 'flex-start',
	},
	textTitleDuracion: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		fontSize: 18,
	},
	textContentDuracion: {
		color: Colors.secondary,
		fontFamily: 'Quicksand400',
		lineHeight: 25,
		fontSize: 16,
	},
	containerVideoYoutube: {
		gap: 20,
		marginVertical: 20,
	},
	textTitleVideo: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		fontSize: 18,
		textAlign: 'center',
	},

	// BUTTON FAVORITE
	cardButton: {
		backgroundColor: Colors.primary,
		flexDirection: 'row',
		gap: 10,
		paddingVertical: 15,
		justifyContent: 'center',
		borderRadius: 12,
		marginBottom: 20,
	},
	iconButton: {
		color: Colors.secondary,
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 14,
		fontFamily: 'Quicksand700',
	},
});
