import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import Checkbox from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleSeleccionSegundaPregunta } from '../../store/slices/formularioInicial/formularioInicial';

const SecondForm = () => {
	const dispatch = useDispatch();

	const { seleccionSegundaPregunta } = useSelector(
		(state: RootState) => state.formularioInicial
	);

	const handleCheckBoxChange = (index: number) => {
		dispatch(toggleSeleccionSegundaPregunta(index));
	};

	return (
		<View style={styles.containerForm}>
			<Text style={styles.textForm}>¿Cuáles son tus objetivos?</Text>

			<Text style={styles.textSubtitle}>
				¿Qué te gustaría lograr con nuestra aplicación?
			</Text>

			<View style={styles.containerCheckboxs}>
				{seleccionSegundaPregunta.map((option, index) => (
					<Checkbox
						key={index}
						label={option.label}
						checked={option.checked}
						onToggle={() => handleCheckBoxChange(index)}
					/>
				))}
			</View>
		</View>
	);
};

export default SecondForm;

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
		marginBottom: 40,
	},
	textSubtitle: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.secondary,
		marginBottom: 30,
		alignSelf: 'flex-start',
		paddingLeft: 15,
	},

	containerCheckboxs: {
		gap: 25,
		width: '100%',
		paddingHorizontal: 15,
	},
});
