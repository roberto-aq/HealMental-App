import {
	StyleSheet,
	Text,
	View,
	Linking,
	Platform,
	TouchableOpacity,
	TouchableHighlight,
	Image,
	ScrollView,
} from 'react-native';
import { globalStyles } from '../../styles/global';
import { Profesional } from '../../store/slices/Perfil/perfil';
import {
	Feather,
	AntDesign,
	MaterialIcons,
} from '@expo/vector-icons';
import { Colors } from '../../constants/colors';
import { Entypo } from '@expo/vector-icons';

interface ProfesionalDetailsProps {
	route: { params: { item: Profesional } };
}

const ProfesionalDetailsScreen: React.FC<ProfesionalDetailsProps> = ({
	route,
}) => {
	const { item } = route.params;

	const handlePressCall = () => {
		let phoneNumber = item.telefono;

		if (Platform.OS === 'android') {
			phoneNumber = `tel:${item.telefono}`;
		} else {
			phoneNumber = `telprompt:${item.telefono}`;
		}

		Linking.openURL(phoneNumber);
	};

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ScrollView
				style={styles.containerAllContent}
				showsVerticalScrollIndicator={false}
			>
				<View style={styles.containerImage}>
					<Image
						source={require('../../../assets/avatar-default.png')}
						style={styles.imageProfesional}
					/>
				</View>
				<View style={styles.separator}></View>
				<View
					style={[styles.viewIconText, { justifyContent: 'center' }]}
				>
					<Text style={styles.titleNombre}>{item.nombres}</Text>
					<MaterialIcons
						name='verified'
						size={24}
						color={Colors.primary}
					/>
				</View>
				<View style={styles.separator}></View>
				<Text style={styles.titleEspecialidad}>
					Especialidad en{' '}
					<Text style={{ fontFamily: 'Quicksand700' }}>
						{item.especialidad}
					</Text>
				</Text>
				<View style={styles.separator}></View>
				<View style={{ gap: 20, marginVertical: 10 }}>
					<View style={styles.viewIconText}>
						<Entypo name='clock' size={20} color='black' />
						<Text style={styles.titleHorario}>
							Horarios Disponibles
						</Text>
					</View>
					{item.horariosDisponibles ? (
						<View style={styles.containerHorarios}>
							{item.horariosDisponibles?.map(day => (
								<View key={day.dia} style={styles.rowHorario}>
									<AntDesign
										name='checkcircle'
										size={20}
										color='#44CF6C'
									/>
									<Text style={styles.contentTextHorario}>
										{day.dia}
									</Text>
									<Text style={styles.contentTextHorario}>
										{day.horaInicio}{' '}
									</Text>
									<Text style={styles.contentTextHorario}>
										{day.horaFin}
									</Text>
								</View>
							))}
						</View>
					) : (
						<Text
							style={{ fontFamily: 'Quicksand500', fontSize: 16 }}
						>
							No tiene horarios disponibles
						</Text>
					)}
				</View>
				<View style={styles.separator}></View>
				<View style={{ gap: 20, marginVertical: 10 }}>
					<View style={styles.viewIconText}>
						<MaterialIcons name='contacts' size={20} color='black' />
						<Text style={styles.titleInformationContact}>
							Información de Contacto
						</Text>
					</View>
					<View style={styles.rowInformationContact}>
						<Entypo name='pin' size={20} color='red' />
						<Text style={styles.labelInformationContact}>
							Correo:
						</Text>
						<Text style={styles.contentInformationContact}>
							{item.correo}
						</Text>
					</View>
					<View style={styles.rowInformationContact}>
						<Entypo name='pin' size={20} color='red' />
						<Text style={styles.labelInformationContact}>
							Número de celular:
						</Text>
						<Text style={styles.contentInformationContact}>
							{item.telefono}
						</Text>
					</View>
				</View>
				<View style={styles.separator}></View>
			</ScrollView>
			<TouchableHighlight
				onPress={handlePressCall}
				underlayColor={Colors.primary}
			>
				<View style={styles.buttonContact}>
					<Feather
						name='smartphone'
						size={24}
						style={styles.iconButtonContact}
					/>
					<Text style={styles.textButtonContact}>Contactar</Text>
				</View>
			</TouchableHighlight>
		</View>
	);
};

export default ProfesionalDetailsScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		paddingBottom: 20,
		gap: 5,
	},

	containerAllContent: {
		flex: 1,
		gap: 15,
	},

	containerImage: {
		backgroundColor: Colors.primary,
		borderColor: Colors.secondary,
		borderWidth: 1,
		borderRadius: 15,
		width: 120,
		height: 120,
		alignItems: 'center',
		justifyContent: 'center',
		alignSelf: 'center',
		marginBottom: 10,
	},

	imageProfesional: {
		width: '85%',
		height: '85%',
	},

	titleNombre: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 20,
	},
	titleEspecialidad: {
		fontFamily: 'Quicksand400',
		fontSize: 16,
		color: Colors.dark,
		width: '80%',
	},
	titleHorario: {
		fontFamily: 'Quicksand700',
		fontSize: 18,
	},
	containerHorarios: {
		gap: 10,
	},
	contentTextHorario: {
		fontFamily: 'Quicksand700',
	},

	rowHorario: {
		backgroundColor: '#fff',
		elevation: 10,
		shadowOffset: {
			height: 0,
			width: 0,
		},
		borderRadius: 5,
		shadowColor: '#00000040',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		paddingVertical: 15,
		paddingHorizontal: 25,
	},

	viewIconText: {
		flexDirection: 'row',
		gap: 10,
		alignItems: 'center',
	},
	titleInformationContact: {
		fontSize: 18,
		fontFamily: 'Quicksand700',
	},

	rowInformationContact: {
		flexDirection: 'row',
		gap: 15,
		paddingLeft: 15,
	},
	labelInformationContact: {
		fontSize: 16,
		fontFamily: 'Quicksand700',
	},
	contentInformationContact: {
		fontFamily: 'Quicksand500',
		fontSize: 16,
		flex: 1,
		textAlign: 'right',
	},

	// BOTÓN CONTACTAR
	buttonContact: {
		// backgroundColor: Colors.primary,
		flexDirection: 'row',
		gap: 20,
		justifyContent: 'center',
		paddingVertical: 12,
		borderRadius: 12,
		borderWidth: 2,
		borderColor: Colors.primary,
	},
	iconButtonContact: {
		color: Colors.secondary,
	},
	textButtonContact: {
		color: Colors.secondary,
		fontSize: 16,
		fontFamily: 'Quicksand700',
	},
	separator: {
		marginBottom: 15,
	},
});
