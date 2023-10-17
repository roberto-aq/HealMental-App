import { Button, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../styles/global';
import AfirmacionCard from '../components/AfirmacionCard';
import ContainerLogo from '../components/ContainerLogo';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';
import { useFonts } from 'expo-font';

const HomeScreen = ({ navigation }) => {
	const { nombreUsuario } = useSelector(
		(state: RootState) => state.auth
	);

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ContainerLogo />
			<Text style={{ fontFamily: 'Quicksand400', fontSize: 20 }}>
				Saludos,{' '}
				<Text
					style={{
						fontFamily: 'Quicksand700',
						textTransform: 'capitalize',
					}}
				>
					{nombreUsuario}!
				</Text>
			</Text>
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
