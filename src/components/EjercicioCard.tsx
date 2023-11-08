import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
} from 'react-native';
import {
	NavigationContext,
	useIsFocused,
	useNavigation,
} from '@react-navigation/native';
import { Ejercicio } from '../interfaces/ejercicioApi';
import { getColorByCategory, shortenText } from '../helpers/helpers';
import ButtonFavorite from './Perfil/ButtonFavorite';
import { Colors } from '../constants/colors';
import React, { useContext } from 'react';

const screenWidth = Dimensions.get('window').width;

const EjercicioCard: React.FC<{
	item: Ejercicio;
}> = ({ item }) => {
	const navigation = useNavigation();
	const isFocused = useIsFocused();
	// const navigationContext = useContext(NavigationContext);

	// Asegúrate de que el contexto no sea nulo y luego accede a `isReady`
	// const navigationReady = (useContext(NavigationContext) as NavigationContextType)?.isReady();

	const handlePress = () => {
		navigation.navigate('Ejercicios', {
			screen: 'DetalleEjercicio',
			params: { id: item.id },
			initial: false,
		});
	};

	return (
		<View
			style={[
				styles.containerCard,
				{
					backgroundColor: getColorByCategory(
						item.categoria.toLocaleLowerCase()
					),
				},
			]}
		>
			<Pressable style={styles.card} onPress={handlePress}>
				<View style={[styles.cardLine]}></View>
				<View style={[styles.cardContent]}>
					<Text style={styles.cardTextTitle}>{item.nombre}</Text>
					<Text style={styles.cardTextContent}>
						{shortenText(item.descripcionLarga, 90)}
					</Text>
				</View>
			</Pressable>
			<View style={styles.overlay}>
				<ButtonFavorite ejercicioId={item.id} />
			</View>
			<View style={styles.pseudoAfter}></View>
		</View>
	);
};

export default EjercicioCard;

const styles = StyleSheet.create({
	containerCard: {
		position: 'relative',
		zIndex: 10,
		marginVertical: 10,
		borderRadius: 15,
		overflow: 'hidden',
		height: 140,
		width: screenWidth - 50,
	},
	card: {
		flexDirection: 'row',
	},
	cardLine: {
		width: 24,
		backgroundColor: Colors.secondary,
		opacity: 0.9,
		height: '100%',
	},
	pseudoAfter: {
		width: 24,
		backgroundColor: Colors.secondary,
		// opacity: 0.9,hg
		height: 140,
		zIndex: 100,
		position: 'absolute',
	},
	cardContent: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 13,
		gap: 15,
	},
	cardTextTitle: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
	},
	cardTextContent: {
		color: Colors.secondary,
		lineHeight: 20,
		fontFamily: 'Quicksand400',
	},
	overlay: {
		position: 'absolute',
		right: 10,
		bottom: 10,
		zIndex: 50,
		justifyContent: 'flex-end',
		alignItems: 'flex-end',
	},
});
