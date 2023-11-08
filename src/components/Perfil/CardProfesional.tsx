import {
	StyleSheet,
	Text,
	View,
	Pressable,
	Image,
} from 'react-native';
import { Profesional } from '../../store/slices/Perfil/perfil';
import { Colors } from '../../constants/colors';
import { useNavigation } from '@react-navigation/native';
import { Entypo } from '@expo/vector-icons';

interface CardProfesionalProps {
	item: Profesional;
}

const CardProfesional: React.FC<CardProfesionalProps> = ({
	item,
}) => {
	const navigation = useNavigation();

	return (
		<Pressable
			style={styles.cardContainer}
			onPress={() =>
				navigation.navigate('ProfesionalDetails', { item })
			}
		>
			<View style={styles.containerImage}>
				<Image
					style={styles.image}
					source={require('../../../assets/avatar-default.png')}
				/>
			</View>
			<View style={styles.containerContent}>
				<View style={{ flex: 1 }}>
					<Text style={styles.titleNombres}>{item.nombres}</Text>
					<Text style={styles.titleEspecialidad}>
						Especialidad en {item.especialidad}
					</Text>
				</View>
				<View style={styles.containerMore}>
					<Text style={styles.textMore}>Ver más</Text>
					<Entypo
						name='chevron-small-right'
						size={20}
						color={Colors.secondary}
					/>
				</View>
			</View>
		</Pressable>
	);
};

export default CardProfesional;

const styles = StyleSheet.create({
	cardContainer: {
		backgroundColor: 'white', // Asegúrate de tener un color de fondo, ya que en iOS la sombra no se muestra sin él.
		elevation: 3, // esto es para Android
		marginVertical: 5,
		marginHorizontal: 1,

		shadowColor: '#000',
		shadowOffset: {
			width: 10,
			height: 10, // Puedes experimentar con los valores de offset para cambiar la dirección de la sombra
		},
		shadowOpacity: 0.25, // La transparencia de la sombra, 1.0 es completamente opaco
		shadowRadius: 3.84, // Un valor más alto significará una sombra más difusa

		borderWidth: 0.1, // Añade un borde muy delgado
		borderColor: 'transparent', // Hace el borde transparente

		paddingHorizontal: 15,
		paddingVertical: 15,
		height: 125,
		borderRadius: 12,
		flexDirection: 'row',
		gap: 15,
	},

	containerImage: {
		backgroundColor: Colors.primary,
		height: '100%',
		width: 90,
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		borderRadius: 12,
	},
	image: {
		width: '80%',
		height: '80%',
	},

	containerContent: {
		flex: 1,
		gap: 7,
	},

	titleNombres: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 16,
	},

	titleEspecialidad: {
		fontFamily: 'Quicksand400',
	},

	containerMore: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'flex-end',
	},

	textMore: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		fontSize: 16,
	},
});
