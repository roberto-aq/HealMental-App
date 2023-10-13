import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../constants/colors';

const AfirmacionCard = () => {
	return (
		<View style={styles.container}>
			<Text style={styles.title}>Afirmación del Día</Text>
			<Text style={styles.content}>
				“Mis acciones de hoy están construyendo un futuro brillante”
			</Text>
		</View>
	);
};

export default AfirmacionCard;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.secondary,
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
		marginVertical: 15,
		borderTopRightRadius: 30,
		borderBottomLeftRadius: 25,
		paddingHorizontal: 30,
		paddingVertical: 20,
	},
	title: {
		color: '#fff',
		fontWeight: 'bold',
		fontSize: 14,
	},
	content: {
		color: '#fff',
		fontSize: 13,
		textAlign: 'center',
		lineHeight: 20,
	},
});
