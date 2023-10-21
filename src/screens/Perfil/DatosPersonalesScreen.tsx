import {
	Pressable,
	StyleSheet,
	Text,
	View,
	Image,
	Dimensions,
	Modal,
	TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useState, useEffect } from 'react';
import { Colors } from '../../constants/colors';
import { MaterialIcons } from '@expo/vector-icons';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import {
	getUsuarioAutenticadoThunk,
	updateAvatarUsuarioThunk,
} from '../../store/slices/auth/thunks';
import Splash from '../Splash';

const screenWidth = Dimensions.get('window').width;

const imagesAvatar = {
	default: require('../../../assets/avatar-default.png'),
	hombre: require('../../../assets/avatar-hombre.png'),
	mujer: require('../../../assets/avatar-mujer.png'),
} as {
	default: string;
	hombre: string;
	mujer: string;
};

const DatosPersonalesScreen = () => {
	const { usuario, isLoadingPerfil } = useSelector(
		(state: RootState) => state.auth
	);
	const dispatch = useDispatch();

	const [modalVisible, setModalVisible] = useState(false);

	const updateUser = (avatar: string) => {
		dispatch(updateAvatarUsuarioThunk(avatar));
	};

	const onChangeAvatar = () => {
		setModalVisible(true);
	};

	if (isLoadingPerfil) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerAvatar}>
				<Image
					style={styles.avatarImage}
					source={imagesAvatar[usuario.avatar]}
				/>

				<Pressable
					style={styles.buttonAvatar}
					onPress={() => onChangeAvatar()}
				>
					<Text>
						<MaterialIcons
							name='edit'
							style={styles.iconEditAvatar}
						/>
					</Text>
				</Pressable>
			</View>

			<Modal
				visible={modalVisible}
				onRequestClose={() => setModalVisible(false)}
				animationType='fade'
				transparent={true}
			>
				<View style={styles.centeredView}>
					<View style={styles.modalView}>
						<TouchableOpacity
							onPress={() => {
								updateUser('hombre');
								setModalVisible(false);
							}}
							style={styles.ContainerSelectedButtonAvatar}
						>
							<Image
								source={require('../../../assets/avatar-hombre.png')}
								style={styles.avatarOption}
							/>
						</TouchableOpacity>
						<TouchableOpacity
							onPress={() => {
								setModalVisible(false);
								updateUser('mujer');
							}}
							style={styles.ContainerSelectedButtonAvatar}
						>
							<Image
								source={require('../../../assets/avatar-mujer.png')}
								style={styles.avatarOption}
							/>
						</TouchableOpacity>
					</View>
				</View>
			</Modal>

			<View style={styles.containerDatos}>
				<View style={styles.containerNombreUsuario}>
					<Text style={styles.textLabel}>Nombre: </Text>
					<Text
						style={[
							styles.textContent,
							{ textTransform: 'capitalize' },
						]}
					>
						{usuario.nombreUsuario}
					</Text>
				</View>
				<View style={styles.containerCorreo}>
					<Text style={styles.textLabel}>Correo: </Text>
					<Text style={styles.textContent}>{usuario.email}</Text>
				</View>
				<View style={styles.containerDescripcion}>
					<Text style={styles.textLabel}>Descripción: </Text>
					<Text style={styles.textContent}>{}</Text>
				</View>
			</View>
		</View>
	);
};

export default DatosPersonalesScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		gap: 30,
	},

	containerAvatar: {
		width: 125,
		height: 125,
		backgroundColor: Colors.primary,
		alignItems: 'center',
		borderRadius: 500,
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowColor: '#000',
		elevation: 5,
		alignSelf: 'center',
	},
	avatarImage: {
		width: '100%',
		flex: 1,
		objectFit: 'contain',
		margin: 25,
	},
	buttonAvatar: {
		position: 'absolute',
		bottom: -10,
		right: -10,
		padding: 10,
		borderRadius: 500,
		backgroundColor: Colors.primary,
		borderWidth: 1,
		borderColor: Colors.light,
		shadowOffset: {
			width: 10,
			height: 10,
		},
		shadowColor: '#000',
		elevation: 5,
	},
	iconEditAvatar: {
		fontSize: 25,
		color: Colors.light,
	},

	containerDatos: {
		//
		flex: 1,
		gap: 20,
	},
	containerNombreUsuario: {
		//
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#e1e1e1',
		height: 45,
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 12,
	},
	containerCorreo: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#e1e1e1',
		height: 45,
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 12,
	},

	containerDescripcion: {
		flexDirection: 'row',
		borderWidth: 1,
		borderColor: '#e1e1e1',
		height: 45,
		alignItems: 'center',
		paddingHorizontal: 15,
		borderRadius: 12,
	},

	textLabel: {
		fontFamily: 'Quicksand700',
	},

	textContent: {
		fontFamily: 'Quicksand700',
		color: '#808080',
		marginLeft: 10,
	},

	//MODAL
	centeredView: {
		flex: 1,
		justifyContent: 'flex-end',
		alignItems: 'center',
		backgroundColor: '#00000050',
	},
	modalView: {
		flexDirection: 'row',
		width: '100%',
		backgroundColor: 'white',
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		padding: 25,
		alignItems: 'center',
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 2,
		},
		shadowOpacity: 0.25,
		shadowRadius: 4,
		elevation: 5,
		gap: 10,
	},
	ContainerSelectedButtonAvatar: {
		backgroundColor: '#333',
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 20,
	},
	avatarOption: {
		width: 80,
		height: 80,
		margin: 10,
	},
});
