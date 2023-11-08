import { useState } from 'react';
import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ButtonPerfil from '../components/Perfil/ButtonPerfil';
import ButtonSignOut from '../components/Perfil/ButtonSignOut';
import { signOut } from '../store/slices/auth/auth';
import { resetChat } from '../store/slices/chat/chat';
import { deleteConversationThunk } from '../store/slices/chat/thunks';
import { RootState } from '../store/store';
import {
	Entypo,
	Ionicons,
	MaterialIcons,
	AntDesign,
} from '@expo/vector-icons';
import ModalConfirmationDelete from '../components/Perfil/ModalConfirmationDelete';
import { globalStyles } from '../styles/global';
import Splash from './Splash';
import { Colors } from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

const PerfilScreen = ({ navigation }) => {
	const dispatch = useDispatch();
	const [modalVisible, setModalVisible] = useState(false);

	const { isLoadingConversation } = useSelector(
		(state: RootState) => state.chat
	);

	const Logout = async () => {
		await AsyncStorage.removeItem('@token');
		dispatch(signOut());
		dispatch(resetChat());
	};

	const onDeleteConversation = () => {
		dispatch(deleteConversationThunk());
	};

	if (isLoadingConversation) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerButtons}>
				<ButtonPerfil
					title='Datos Personales'
					path='DatosPersonales'
					navigation={navigation}
					iconComponent={iconProps => (
						<Ionicons
							name='person'
							size={iconProps.size}
							color={iconProps.color}
						/>
					)}
				/>
				<ButtonPerfil
					title='Ejercicios favoritos'
					path='EjerciciosFavoritos'
					navigation={navigation}
					iconComponent={iconProps => (
						<AntDesign
							name='heart'
							size={iconProps.size}
							color={iconProps.color}
						/>
					)}
				/>
				<ButtonPerfil
					title='Notas'
					path='Notas'
					navigation={navigation}
					iconComponent={iconProps => (
						<MaterialIcons
							name='notes'
							size={iconProps.size}
							color={iconProps.color}
						/>
					)}
				/>
				<ButtonPerfil
					title='Contacta a Profesionales'
					path='ProfesionalesList'
					navigation={navigation}
					iconComponent={iconProps => (
						<MaterialIcons
							name='psychology'
							size={iconProps.size}
							color={iconProps.color}
						/>
					)}
				/>
				<TouchableOpacity
					onPress={() => setModalVisible(true)}
					style={styles.button}
				>
					<View
						style={{
							flexDirection: 'row',
							alignItems: 'center',
							gap: 15,
							flex: 1,
						}}
					>
						<FontAwesome
							name='trash'
							size={20}
							color={Colors.secondary}
						/>
						<Text style={styles.textButton}>Borrar Chat</Text>
					</View>
					<Entypo
						name='chevron-right'
						size={20}
						style={styles.iconButton}
					/>
				</TouchableOpacity>
			</View>
			<View style={styles.containerButtonSignOut}>
				<ButtonSignOut onPress={Logout} />
			</View>

			<ModalConfirmationDelete
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				deleteConverasation={onDeleteConversation}
			/>
		</View>
	);
};

export default PerfilScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	containerButtons: {
		gap: 15,
		flex: 1,
	},
	containerButtonSignOut: {
		marginVertical: 40,
	},
	button: {
		paddingHorizontal: 30,
		height: 50,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.secondary,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 16,
		fontFamily: 'Quicksand700',
	},
	iconButton: {
		color: Colors.secondary,
	},
});
