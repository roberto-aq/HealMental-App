import {
	Image,
	Pressable,
	StyleSheet,
	Text,
	View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';

const NotFoundEjerciciosFavoritos = () => {
	const navigation = useNavigation();

	return (
		<View style={styles.containerImage}>
			<Text style={styles.title}>
				Aún no has agregado ningún ejercicio a tus favoritos
			</Text>
			<Image
				source={require('../../../assets/ilustracion-no-ejercicios-favoritos.png')}
				style={styles.image}
			/>
			<Text style={styles.subtitle}>
				¿Por qué no explorar algunos ahora?
			</Text>
			<Pressable
				style={styles.button}
				onPress={() => navigation.navigate('Ejercicios')}
			>
				<Text style={styles.textButton}>Ir a Ejercicios</Text>
			</Pressable>
		</View>
	);
};

export default NotFoundEjerciciosFavoritos;

const styles = StyleSheet.create({
	containerImage: {
		flex: 1,
		alignItems: 'center',
		gap: 50,
		marginBottom: 30,
	},
	title: {
		fontSize: 18,
		fontWeight: '700',
		color: Colors.secondary,
		width: '75%',
		textAlign: 'center',
		lineHeight: 24,
	},
	image: {
		width: '100%',
		objectFit: 'contain',
		flex: 1,
	},
	subtitle: {
		fontSize: 18,
		fontWeight: '700',
		color: Colors.secondary,
	},
	button: {
		backgroundColor: Colors.primary,
		width: '100%',
		height: 45,
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
	},
	textButton: {
		fontWeight: '700',
		color: Colors.secondary,
	},
});
