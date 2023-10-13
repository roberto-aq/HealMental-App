import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../constants/colors';

const NotFoundNotas = () => {
	return (
		<View style={styles.containerImage}>
			<Text style={styles.title}>No tienes ninguna nota todavía</Text>
			<Image
				source={require('../../../assets/ilustracion-no-hay-notas.png')}
				style={styles.image}
			/>
			<Text style={styles.subtitle}>¿Te gustaría escribir algo?</Text>
		</View>
	);
};

export default NotFoundNotas;

const styles = StyleSheet.create({
	containerImage: {
		flex: 1,
		alignItems: 'center',
		gap: 30,
	},
	title: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.secondary,
	},
	image: {
		width: '100%',
		objectFit: 'contain',
		height: 350,
	},
	subtitle: {
		fontSize: 16,
		fontWeight: '700',
		color: Colors.secondary,
	},
});
