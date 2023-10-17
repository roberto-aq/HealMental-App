import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { globalStyles } from '../styles/global';
import { Colors } from '../constants/colors';
import { TouchableOpacity } from 'react-native-gesture-handler';
import FirstForm from '../components/formularioInicial/FirstForm';
import SecondForm from '../components/formularioInicial/SecondForm';
import ThirdForm from '../components/formularioInicial/ThirdForm';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { setFirstLogin } from '../store/slices/auth/auth';
import { guardarRespuestasThunk } from '../store/slices/formularioInicial/thunks';
import Splash from './Splash';

const FormularioInicial = () => {
	const { firstLogin, status } = useSelector(
		(state: RootState) => state.auth
	);

	const {
		isLoading,
		seleccionPrimerPregunta,
		seleccionSegundaPregunta,
		seleccionTerceraPregunta,
	} = useSelector((state: RootState) => state.formularioInicial);

	const dispatch = useDispatch();

	const [actualForm, setActualForm] = useState(1);

	const isFormComplete = (formNumber: number) => {
		switch (formNumber) {
			case 1:
				// Aquí puedes agregar la validación para el FirstForm si es necesario.
				return true;
			case 2:
				return seleccionSegundaPregunta.some(
					option => option.checked
				);
			case 3:
				return seleccionTerceraPregunta.some(
					option => option.checked
				);
			default:
				return false;
		}
	};

	const handleNext = () => {
		if (isFormComplete(actualForm)) {
			if (actualForm < 3) setActualForm(actualForm + 1);
		} else {
			alert('Debe seleccionar al menos uno');
		}
	};

	const handleBack = () => {
		if (actualForm > 1) setActualForm(actualForm - 1);
	};

	const finishForm = async () => {
		if (!isFormComplete(actualForm)) {
			alert('Debe seleccionar al menos uno');
			return;
		}
		dispatch(setFirstLogin());
		dispatch(
			guardarRespuestasThunk(
				seleccionPrimerPregunta,
				seleccionSegundaPregunta,
				seleccionTerceraPregunta
			)
		);
	};

	if (isLoading) return <Splash />;

	const RenderForm = () => {
		switch (actualForm) {
			case 1:
				return <FirstForm />;
			case 2:
				return <SecondForm />;
			case 3:
				return <ThirdForm />;
			default:
				return <FirstForm />;
		}
	};

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerOptions}>
				<View
					style={[
						styles.containerOption,
						{
							backgroundColor:
								actualForm >= 1 ? Colors.primary : '#e1e1e1',
						},
					]}
				></View>
				<View
					style={[
						styles.containerOption,
						{
							backgroundColor:
								actualForm >= 2 ? Colors.primary : '#e1e1e1',
						},
					]}
				></View>
				<View
					style={[
						styles.containerOption,
						{
							backgroundColor:
								actualForm === 3 ? Colors.primary : '#e1e1e1',
						},
					]}
				></View>
			</View>

			{RenderForm()}
			<View style={styles.containerButtons}>
				<TouchableOpacity style={styles.button} onPress={handleBack}>
					<Text style={styles.buttonText}>Anterior</Text>
				</TouchableOpacity>

				{actualForm === 3 ? (
					<Pressable style={styles.button} onPress={finishForm}>
						<Text style={styles.buttonText}>Finalizar</Text>
					</Pressable>
				) : (
					<TouchableOpacity
						style={styles.button}
						onPress={handleNext}
					>
						<Text style={styles.buttonText}>Siguiente</Text>
					</TouchableOpacity>
				)}
			</View>
		</View>
	);
};

export default FormularioInicial;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		alignItems: 'center',
	},
	containerOptions: {
		width: '100%',
		flexDirection: 'row',
		marginTop: 35,
		marginBottom: 70,
		gap: 5,
	},
	containerOption: {
		flex: 1,
		height: 11,
		backgroundColor: '#e1e1e1',
		borderRadius: 15,
	},

	containerButtons: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '100%',
		marginBottom: 30,
	},
	button: {
		backgroundColor: Colors.primary,
		height: 45,
		paddingHorizontal: 50,
		justifyContent: 'center',
		borderRadius: 12,
	},
	buttonText: {
		color: '#fff',
		fontWeight: 'bold',
	},
});
