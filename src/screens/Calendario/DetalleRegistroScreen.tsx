import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	ScrollView,
	Image,
	Pressable,
	TouchableHighlight,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
	deleteRegistroEmocionThunk,
	getEmocionByFechaThunk,
} from '../../store/slices/calendario/thunks';
import { globalStyles } from '../../styles/global';
import Splash from '../Splash';
import { Octicons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { emocionesImages } from '../../helpers/helpers';
import ModalFormUpdateRegistro from '../../components/calendario/ModalFormUpdateRegistro';
import { useNavigation } from '@react-navigation/native';

const DetalleRegistroScreen = ({ route }) => {
	const { fecha } = route.params;

	const { emocion, isLoading } = useSelector(
		(state: RootState) => state.calendario
	);

	const [modalEditVisible, setModalEditVisible] = useState(false);

	const dispatch = useDispatch();
	const navigation = useNavigation();

	const eliminarEmocion = () => {
		dispatch(deleteRegistroEmocionThunk(emocion.id));
		navigation.goBack();
	};

	useEffect(() => {
		dispatch(getEmocionByFechaThunk(fecha));
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ScrollView>
				<View style={styles.containerFecha}>
					<MaterialCommunityIcons
						name='calendar-check'
						size={20}
						style={styles.iconCalendario}
					/>
					<Text style={styles.titleFecha}>Fecha: </Text>
					<Text style={styles.contentFecha}>{emocion.fecha}</Text>
				</View>
				<View style={styles.containerEmociones}>
					<Text style={styles.titleEmociones}>Tus emociones</Text>
					<View style={{ gap: 10 }}>
						{emocion.emociones.map(emocion => (
							<View key={emocion} style={styles.containerEmocion}>
								<View style={styles.containerTextEmocion}>
									<Octicons
										name='dot-fill'
										size={18}
										style={styles.containerIconEmocion}
									/>
									<Text style={styles.textEmocion}>{emocion}</Text>
								</View>
								<Image
									source={emocionesImages[emocion]}
									style={styles.imagenEmocion}
								/>
							</View>
						))}
					</View>
				</View>
				<View style={styles.containerNotaDelDia}>
					<Text style={styles.titleNotaDelDia}>Nota del Día</Text>
					<View style={styles.containerContentNotaDelDia}>
						<Text style={styles.contentNotaDelDia}>
							{emocion.notaDelDia}
						</Text>
					</View>
				</View>
				<View style={styles.containerDesencadenante}>
					<Text style={styles.titleDesencadenante}>
						Desencadenante
					</Text>
					<ScrollView style={styles.containerContentDesencadenante}>
						<Text style={styles.contentDesencadenante}>
							{emocion.desencadenante}
						</Text>
					</ScrollView>
				</View>
				<View style={styles.containerEtiquetas}>
					<Text style={styles.titleEtiquetas}>Etiquetas</Text>
					{emocion.etiquetas.length === 0 ? (
						<View style={{ alignSelf: 'flex-start' }}>
							<Text style={styles.textSinEtiqueta}>
								No tiene etiquetas
							</Text>
						</View>
					) : (
						<View style={styles.containerEtiquetasBadge}>
							{emocion.etiquetas.map(etiqueta => (
								<View style={styles.etiquetaBadge} key={etiqueta.id}>
									<Text style={styles.textEtiquetaBadge}>
										{etiqueta.nombre}
									</Text>
								</View>
							))}
						</View>
					)}
				</View>

				<View style={styles.containerButtons}>
					<TouchableHighlight
						style={styles.button}
						onPress={() => setModalEditVisible(true)}
						underlayColor={Colors.primary}
					>
						<Text style={styles.buttonText}>Editar</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.button}
						onPress={eliminarEmocion}
						underlayColor={Colors.primary}
					>
						<Text style={styles.buttonText}>Eliminar</Text>
					</TouchableHighlight>
				</View>
			</ScrollView>

			<ModalFormUpdateRegistro
				modalEditVisible={modalEditVisible}
				setModalEditVisible={setModalEditVisible}
				emocion={emocion}
			/>
		</View>
	);
};

export default DetalleRegistroScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		paddingBottom: 10,
	},
	containerFecha: {
		flexDirection: 'row',
		gap: 8,
		alignItems: 'center',
	},
	titleFecha: {
		fontFamily: 'Quicksand600',
		fontSize: 20,
	},
	contentFecha: {
		fontSize: 20,
		fontFamily: 'Quicksand700',
	},
	iconCalendario: {
		color: Colors.primary,
	},
	containerEmociones: {
		marginVertical: 20,
		justifyContent: 'center',
		gap: 15,
	},
	titleEmociones: {
		fontFamily: 'Quicksand700',
		fontSize: 22,
		textAlign: 'center',
	},
	containerEmocion: {
		flexDirection: 'row',
		alignItems: 'center',
	},
	containerTextEmocion: {
		flexDirection: 'row',
		gap: 15,
		flex: 1,
	},
	textEmocion: {
		fontFamily: 'Quicksand600',
		fontSize: 16,
		lineHeight: 20,
	},
	containerIconEmocion: {
		color: Colors.primary,
	},
	imagenEmocion: {
		height: 40,
		objectFit: 'contain',
	},
	containerNotaDelDia: {
		gap: 15,
		alignItems: 'center',
	},
	titleNotaDelDia: {
		fontFamily: 'Quicksand700',
		textAlign: 'center',
		fontSize: 22,
	},
	containerContentNotaDelDia: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		flex: 1,
		width: '100%',
		borderRadius: 12,
		height: 100,
		backgroundColor: Colors.primary,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	contentNotaDelDia: {
		fontFamily: 'Quicksand500',
		fontSize: 16,
		color: Colors.secondary,
	},
	containerDesencadenante: {
		gap: 15,
		alignItems: 'center',
		marginVertical: 20,
	},
	titleDesencadenante: {
		fontFamily: 'Quicksand700',
		textAlign: 'center',
		fontSize: 22,
	},
	containerContentDesencadenante: {
		borderWidth: 1,
		borderColor: Colors.secondary,
		width: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 10,
		height: 100,
		paddingHorizontal: 10,
		paddingVertical: 5,
	},
	contentDesencadenante: {
		fontFamily: 'Quicksand500',
		fontSize: 16,
		color: Colors.secondary,
	},
	containerEtiquetas: {
		alignItems: 'center',
		gap: 5,
	},
	titleEtiquetas: {
		fontFamily: 'Quicksand700',
		fontSize: 22,
		color: Colors.secondary,
	},
	containerEtiquetasBadge: {
		width: '100%',
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
	etiquetaBadge: {
		backgroundColor: Colors.primary,
		paddingVertical: 3,
		paddingHorizontal: 15,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textSinEtiqueta: {
		color: Colors.secondary,
		fontSize: 16,
		fontFamily: 'Quicksand700',
	},
	textEtiquetaBadge: {
		color: Colors.light,
		fontFamily: 'Quicksand500',
		textTransform: 'capitalize',
	},
	containerButtons: {
		flexDirection: 'row',
		gap: 30,
		marginVertical: 25,
		marginTop: 35,
	},
	button: {
		padding: 7,
		borderWidth: 2,
		borderColor: Colors.primary,
		borderRadius: 12,
		flex: 1,
		alignItems: 'center',
	},
	buttonText: {
		fontFamily: 'Quicksand700',
	},
});
