import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import AfirmacionCard from '../components/AfirmacionCard';
import ContainerLogo from '../components/ContainerLogo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const HomeScreen = ({ navigation }) => {
	const { nombreUsuario } = useSelector(
		(state: RootState) => state.auth
	);

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ContainerLogo />
			<Text>Saludos, {nombreUsuario}!</Text>
			<AfirmacionCard />
		</View>
	);
};

export default HomeScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
});
