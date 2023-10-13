import { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { Colors } from '../constants/colors';
import Splash from './Splash';
import { AntDesign } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { getEjercicioByIdThunk } from '../store/slices/ejercicios/thunks';
import { RootState } from '../store/store';

const EjercicioDetalleScreen = ({ route }) => {
	const { id } = route.params;

	const dispatch = useDispatch();

	const { ejercicioById, isLoading } = useSelector(
		(state: RootState) => state.ejercicios
	);

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
					{ejercicioById.duracion} minutos
				</Text>
			</View>
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
		fontWeight: 'bold',
		color: Colors.light,
		textAlign: 'center',
		width: '80%',
		lineHeight: 25,
	},
	textContent: {
		fontSize: 16,
		fontWeight: '300',
		color: Colors.secondary,
		marginTop: 40,
		marginBottom: 15,
		lineHeight: 25,
	},
	containerCategoria: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
	},
	textTitleCategory: {
		fontWeight: 'bold',
		color: Colors.secondary,
	},
	textContentCategory: {
		color: Colors.light,
		backgroundColor: Colors.tertiary,
		borderRadius: 5,
		paddingHorizontal: 15,
		paddingVertical: 3,
		fontSize: 12,
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
		fontWeight: 'bold',
		fontSize: 18,
		color: Colors.secondary,
	},
	textContentBeneficios: {
		fontSize: 16,
		fontWeight: '300',
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
		fontWeight: 'bold',
		fontSize: 18,
		color: Colors.secondary,
	},
	textContentInstrucciones: {
		lineHeight: 25,
		color: Colors.secondary,
		fontWeight: '300',
		width: '95%',
		fontSize: 16,
	},

	containerDuracion: {
		gap: 10,
		marginTop: 30,
		flexDirection: 'row',
		backgroundColor: Colors.primary,
		alignSelf: 'flex-start',
		alignItems: 'center',
		paddingHorizontal: 15,
		paddingVertical: 5,
		borderRadius: 5,
	},
	textTitleDuracion: {
		fontWeight: '700',
		color: Colors.secondary,
	},
	textContentDuracion: {
		color: Colors.light,
	},
});
