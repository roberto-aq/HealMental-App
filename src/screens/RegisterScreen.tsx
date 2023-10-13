import { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch } from 'react-redux';
import { globalStyles } from '../styles/global';
import ButtonForm from '../components/auth/ButtonForm';
import { Colors } from '../constants/colors';
import Input from '../components/auth/InputText';
import ContainerLogo from '../components/ContainerLogo';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validarEmail, validarPassword } from '../helpers/validation';
import ModalError from '../components/auth/ModalError';
import { registerThunk } from '../store/slices/auth/thunks';

const RegisterScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [nameUser, setNameUser] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();

	const register = async () => {
		let mensajeError = '';

		if (email.length === 0) {
			mensajeError = 'El email es requerido';
		} else if (password.length === 0) {
			mensajeError = 'La contraseña es requerida';
		} else if (!validarEmail(email)) {
			mensajeError = 'Ingrese un correo válido';
		}
		if (!validarPassword(password)) {
			mensajeError =
				'La contraseña debe tener al menos 1 Mayúscula, 1 minúscula y un número';
		}

		if (nameUser.length < 1) {
			mensajeError = 'El nombre de usuario es requerido';
		}

		if (mensajeError) {
			setErrorMessage(mensajeError);
			setIsModalVisible(true);
			return;
		}

		const erroresServidor = await dispatch(
			registerThunk({
				nombreUsuario: nameUser,
				email,
				password,
				navigate: navigation.navigate,
			})
		);

		if (erroresServidor) {
			// setErrorMessage(
			// 	'Credenciales incorrectas. Por favor, inténtelo de nuevo'
			// );
			// setIsModalVisible(true);
			alert(erroresServidor);
			return;
		}
	};

	return (
		<KeyboardAwareScrollView
			style={[globalStyles.screenContainer, styles.container]}
		>
			<ContainerLogo>
				<Text style={styles.textLogo}>Crea una nueva cuenta</Text>
			</ContainerLogo>
			<View style={styles.containerInputs}>
				<Input
					label='Nombre'
					value={nameUser}
					onChangeText={setNameUser}
				/>
				<Input
					label='Correo Electrónico'
					value={email}
					onChangeText={setEmail}
				/>
				<Input
					label='Contraseña'
					value={password}
					onChangeText={setPassword}
					secureTextEntry={true}
				/>
			</View>

			<View style={styles.containerButtons}>
				<ButtonForm
					labelButton='Registrarse'
					onPress={register}
					backgroundColor={Colors.primary}
					textColor='#fff'
				/>
				<View style={styles.containerSeparator}>
					<View style={styles.separator}></View>
					<Text style={{ fontSize: 16, fontWeight: 'bold' }}>o</Text>
					<View style={styles.separator}></View>
				</View>
				<ButtonForm
					labelButton='Continuar con Google'
					onPress={() => navigation.navigate('AppHome')}
					backgroundColor='#E0FBFC'
					textColor='#000'
				/>
			</View>

			<View style={styles.containerText}>
				<Text style={styles.finalText}>¿Ya tienes una cuenta?</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('Login')}
				>
					<Text style={styles.finalTextLink}>Inicia sesión</Text>
				</TouchableOpacity>
			</View>

			<ModalError
				errorMessage={errorMessage}
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</KeyboardAwareScrollView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},

	containerLogo: {
		alignItems: 'center',
		paddingTop: 10,
	},
	iconLogo: {
		width: 120,
		height: 120,
	},
	textLogo: {
		color: Colors.secondary,
		fontWeight: 'bold',
		fontSize: 25,
		textAlign: 'center',
		marginBottom: 24,
	},
	containerInputs: {
		gap: 30,
	},
	containerButtons: {
		marginVertical: 30,
		gap: 20,
	},
	containerSeparator: {
		flexDirection: 'row',
		alignItems: 'center',
		width: '100%',
		justifyContent: 'space-between',
	},
	separator: {
		height: 1.5,
		width: '45%',
		backgroundColor: '#C5C5C5',
	},
	containerText: {
		flexDirection: 'row',
		justifyContent: 'center',
		gap: 5,
	},
	finalText: {
		fontSize: 13,
		justifyContent: 'center',
		alignItems: 'center',
		fontWeight: '500',
	},
	finalTextLink: {
		color: Colors.primary,
		fontWeight: 'bold',
		fontSize: 13,
	},
});
