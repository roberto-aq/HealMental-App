import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import Checkbox from './Checkbox';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { toggleSeleccionTerceraPregunta } from '../../store/slices/formularioInicial/formularioInicial';

const ThirdForm = () => {
	const dispatch = useDispatch();
	const { seleccionTerceraPregunta } = useSelector(
		(state: RootState) => state.formularioInicial
	);

	const handleCheckBoxChange = (index: number) => {
		dispatch(toggleSeleccionTerceraPregunta(index));
	};

	return (
		<View style={styles.containerForm}>
			<Text style={styles.textForm}>¿Qué actividades disfrutas?</Text>

			<Text style={styles.textSubtitle}>
				¿Qué actividades disfrutas o encuentras relajantes?
			</Text>

			<View style={styles.containerCheckboxs}>
				{seleccionTerceraPregunta.map((option, index) => (
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

export default ThirdForm;

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
	textSubtitle: {
		fontSize: 16,
		fontWeight: '500',
		color: Colors.secondary,
		marginBottom: 30,
		alignSelf: 'flex-start',
		paddingLeft: 15,
	},

	containerCheckboxs: {
		gap: 13,
		width: '100%',
		paddingHorizontal: 15,
	},
});
