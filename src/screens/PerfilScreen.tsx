import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import ButtonPerfil from '../components/Perfil/ButtonPerfil';
import ButtonSignOut from '../components/Perfil/ButtonSignOut';
import { useDispatch } from 'react-redux';
import { signOut } from '../store/slices/auth/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PerfilScreen = ({ navigation }) => {
	const dispatch = useDispatch();

	const Logout = async () => {
		await AsyncStorage.removeItem('@token');
		dispatch(signOut());
	};

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerButtons}>
				<ButtonPerfil
					title='Datos Personales'
					path='Notas'
					navigation={navigation}
				/>
				<ButtonPerfil
					title='Ejercicios favoritos'
					path='EjerciciosFavoritos'
					navigation={navigation}
				/>
				<ButtonPerfil
					title='Notas'
					path='Notas'
					navigation={navigation}
				/>

				<ButtonSignOut onPress={Logout} />
			</View>
		</View>
	);
};

export default PerfilScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	containerButtons: {
		gap: 10,
	},
});
