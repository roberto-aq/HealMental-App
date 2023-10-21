import {
	StyleSheet,
	Text,
	View,
	Modal,
	Pressable,
} from 'react-native';
import { useState } from 'react';
import { Nota } from '../../interfaces/notasApi';
import { AntDesign } from '@expo/vector-icons';
import Form from './Form';
import { Colors } from '../../constants/colors';
import { useDispatch } from 'react-redux';
import { updateNotaThunk } from '../../store/slices/notas/thunks';

interface propsModal {
	isModalVisible: boolean;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	nota: Nota;
	id: string;
}

const ModalUpdateNota: React.FC<propsModal> = ({
	isModalVisible,
	setIsModalVisible,
	nota,
	id,
}) => {
	const [title, setTitle] = useState(nota.tituloNota);
	const [description, setDescription] = useState(
		nota.descripcionNota
	);
	const dispatch = useDispatch();

	const handleUpdateNota = (title: string, description: string) => {
		dispatch(updateNotaThunk(id, title, description));
		setIsModalVisible(false);
	};

	return (
		<Modal
			visible={isModalVisible}
			onRequestClose={() => {
				setIsModalVisible(false);
			}}
			animationType='slide'
		>
			<View style={styles.containerModal}>
				<View style={styles.modalView}>
					<Text style={styles.title}>Actualizar Nota</Text>
					<Form
						title={title}
						description={description}
						buttonLabel={'Guardar Nota'}
						setTitle={setTitle}
						setDescription={setDescription}
						placeholderTitle='Escribe el título de tu nota'
						placeholderDescription='Escribe lo que gustes'
						onPress={() => handleUpdateNota(title, description)}
					/>
					<Pressable
						onPress={() => setIsModalVisible(false)}
						style={styles.iconButtonContainer}
					>
						<AntDesign
							name='close'
							size={18}
							style={styles.iconButtonClose}
						/>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

export default ModalUpdateNota;

const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
	},
	modalView: {
		backgroundColor: Colors.light,
		flex: 1,
		padding: 25,
	},
	title: {
		fontSize: 24,
		textAlign: 'center',
		marginTop: 40,
		color: Colors.secondary,
		fontWeight: '700',
	},
	iconButtonContainer: {
		position: 'absolute',
		top: 20,
		right: 25,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 5,
		shadowOpacity: 0.35,
		elevation: 3,
		backgroundColor: '#fff',
		borderRadius: 500,
	},
	iconButtonClose: {
		color: Colors.primary,
	},
});
