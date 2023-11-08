import { useState } from 'react';
import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Dimensions,
} from 'react-native';
import { Nota } from '../../interfaces/notasApi';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
	coloresAleatorios,
	formatDate,
	obtenerColorAleatorio,
	shortenText,
} from '../../helpers/helpers';

interface propsNotaCard {
	nota: Nota;
}

const screenWidth = Dimensions.get('window').width;

const NotaCard: React.FC<propsNotaCard> = ({ nota }) => {
	const navigation = useNavigation();

	const [colorFondo, setColorFondo] = useState(() =>
		obtenerColorAleatorio(coloresAleatorios)
	);

	return (
		<Pressable
			onPress={() =>
				navigation.navigate('NotaIndividual', { id: nota.id })
			}
		>
			<View style={[styles.card, { backgroundColor: colorFondo }]}>
				<View style={styles.cardLine}></View>
				<View style={styles.cardContent}>
					<View style={{ gap: 10, flex: 1 }}>
						<Text style={styles.cardTextTitle}>
							{nota.tituloNota}
						</Text>
						<Text style={styles.cardTextContent}>
							{shortenText(nota.descripcionNota)}
						</Text>
					</View>
					<View style={styles.containerDate}>
						<AntDesign
							name='clockcircle'
							size={18}
							style={styles.iconDate}
						/>
						<Text style={styles.textDate}>
							{formatDate(nota.fechaCreacion)}
						</Text>
					</View>
				</View>
			</View>
		</Pressable>
	);
};

export default NotaCard;

const styles = StyleSheet.create({
	card: {
		backgroundColor: Colors.primary,
		flexDirection: 'row',
		borderRadius: 15,
		overflow: 'hidden',
		marginVertical: 10,
		width: screenWidth - 50,
		height: 130,
	},
	cardLine: {
		width: 23,
		backgroundColor: Colors.secondary,
	},
	cardContent: {
		flex: 1,
		paddingHorizontal: 20,
		paddingVertical: 13,
	},
	cardTextTitle: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
	},
	cardTextContent: {
		fontFamily: 'Quicksand400',
		color: Colors.secondary,
		lineHeight: 20,
	},
	containerDate: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	iconDate: {
		color: Colors.secondary,
	},
	textDate: {
		color: Colors.secondary,
		fontFamily: 'Quicksand400',
	},
});
