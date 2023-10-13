import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
	Modal,
} from 'react-native';
import { useState } from 'react';
import { globalStyles } from '../styles/global';
import Input from '../components/auth/InputText';
import { Colors } from '../constants/colors';
import ButtonForm from '../components/auth/ButtonForm';
import ContainerLogo from '../components/ContainerLogo';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import { API_URL } from '@env';
import { useDispatch } from 'react-redux';
import { loginWithEmailPassword } from '../store/slices/auth/thunks';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { validarEmail } from '../helpers/validation';
import ModalError from '../components/auth/ModalError';

const LoginScreen = ({ navigation }) => {
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [isModalVisible, setIsModalVisible] = useState(false);
	const [errorMessage, setErrorMessage] = useState('');

	const dispatch = useDispatch();

	const login = async () => {
		let mensajeError = '';

		if (email.length === 0) {
			mensajeError = 'El email es requerido';
		} else if (password.length === 0) {
			mensajeError = 'La contraseña es requerida';
		} else if (!validarEmail(email)) {
			mensajeError = 'Ingrese un correo válido';
		}

		if (mensajeError) {
			setErrorMessage(mensajeError);
			setIsModalVisible(true);
			return;
		}

		const erroresServidor = await dispatch(
			loginWithEmailPassword({
				email,
				password,
			})
		);

		if (erroresServidor) {
			// setErrorMessage(
			// 	'Credenciales incorrectas. Por favor, inténtelo de nuevo'
			// );
			// setIsModalVisible(true);
			alert(
				'Credenciales incorrectas. Por favor, inténtelo de nuevo'
			);
			return;
		}
	};

	return (
		<KeyboardAwareScrollView
			style={[globalStyles.screenContainer, styles.container]}
		>
			<ContainerLogo>
				<Text style={styles.textLogo}>Bienvenido de vuelta</Text>
			</ContainerLogo>
			<View style={styles.containerInputs}>
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
					labelButton='Iniciar Sesión'
					onPress={login}
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
				<Text style={styles.finalText}>¿No tienes una cuenta?</Text>
				<TouchableOpacity
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={styles.finalTextLink}>Regístrate</Text>
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

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
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
