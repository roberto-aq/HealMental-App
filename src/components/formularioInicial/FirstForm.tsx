import { Image, StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { Colors } from '../../constants/colors';
import Slider from '@react-native-community/slider';
import { RootState } from '../../store/store';
import { setSeleccionPrimeraPregunta } from '../../store/slices/formularioInicial/formularioInicial';

const images: Record<number, any> = {
	1: require('../../../assets/img-formulario-inicial/formulario-imagen1.png'),
	2: require('../../../assets/img-formulario-inicial/formulario-imagen2.png'),
	3: require('../../../assets/img-formulario-inicial/formulario-imagen3.png'),
	4: require('../../../assets/img-formulario-inicial/formulario-imagen4.png'),
	5: require('../../../assets/img-formulario-inicial/formulario-imagen5.png'),
	6: require('../../../assets/img-formulario-inicial/formulario-imagen6.png'),
	7: require('../../../assets/img-formulario-inicial/formulario-imagen7.png'),
	8: require('../../../assets/img-formulario-inicial/formulario-imagen8.png'),
	9: require('../../../assets/img-formulario-inicial/formulario-imagen9.png'),
	10: require('../../../assets/img-formulario-inicial/formulario-imagen10.png'),
};

const FirstForm = () => {
	const dispatch = useDispatch();

	const { seleccionPrimerPregunta } = useSelector(
		(state: RootState) => state.formularioInicial
	);

	const handleChangeValue = (value: string) => {
		dispatch(setSeleccionPrimeraPregunta(value));
	};

	return (
		<View style={styles.containerForm}>
			<Text style={styles.textForm}>
				¿Cómo te sientes hoy en una escala del 1 al 10?
			</Text>
			<Text style={styles.textValueEmotion}>
				{seleccionPrimerPregunta}
			</Text>
			<Slider
				style={{ width: '100%', height: 40 }}
				minimumValue={1}
				maximumValue={10}
				step={1}
				value={+seleccionPrimerPregunta}
				onValueChange={newValue =>
					handleChangeValue(newValue.toString())
				}
				minimumTrackTintColor={Colors.secondary}
				maximumTrackTintColor='#000000'
				thumbTintColor={Colors.primary}
			/>
			<View style={styles.containerImage}>
				<Image
					source={images[+seleccionPrimerPregunta]}
					style={styles.image}
				/>
			</View>
		</View>
	);
};

export default FirstForm;

const styles = StyleSheet.create({
	containerForm: {
		width: '100%',
		flex: 1,
		alignItems: 'center',
	},

	textForm: {
		color: Colors.secondary,
		fontWeight: '700',
		fontSize: 25,
		textAlign: 'center',
		lineHeight: 40,
		marginBottom: 35,
	},
	textValueEmotion: {
		color: Colors.tertiary,
		fontWeight: 'bold',
		fontSize: 55,
		marginBottom: 20,
	},
	containerImage: {
		width: '100%',
		flex: 1,
		marginVertical: 30,
	},
	image: {
		objectFit: 'contain',
		width: '100%',
		height: '100%',
	},
});
