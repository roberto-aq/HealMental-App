import { useState } from 'react';
import { StyleSheet, Text, View, Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../constants/colors';
import { Entypo, AntDesign } from '@expo/vector-icons';
import { formatDate } from '../../helpers/helpers';
import { ScrollView } from 'react-native-gesture-handler';
import ModalUpdateNota from '../../components/notas/ModalUpdateNota';
import { deleteNotaThunk } from '../../store/slices/notas/thunks';
import Splash from '../Splash';

const NotaIndividualScreen = ({ route, navigation }) => {
	const { notas, isLoading } = useSelector(
		(state: RootState) => state.notas
	);

	const [isModalVisible, setIsModalVisible] = useState(false);

	const { id } = route.params;
	const nota = notas.find(nota => nota.id === id);

	const dispatch = useDispatch();

	if (!nota) return null;

	if (isLoading) {
		return <Splash />;
	}

	const handleDeleteNota = (id: string) => {
		dispatch(deleteNotaThunk(id));
		// navigation.navigate('Notas');
		navigation.goBack();
	};

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<ScrollView style={styles.contentNota}>
				<Text style={styles.textTitleNota}>{nota?.tituloNota}</Text>
				<View style={styles.containerDate}>
					<AntDesign
						name='clockcircle'
						size={18}
						style={styles.iconDate}
					/>
					<Text style={styles.textDate}>
						{formatDate(nota?.fechaCreacion || '')}
					</Text>
				</View>
				<Text style={styles.textDescription}>
					{nota?.descripcionNota}
				</Text>
			</ScrollView>
			<View style={styles.containerButtons}>
				<Pressable
					style={[styles.button, styles.editButton]}
					onPress={() => setIsModalVisible(true)}
				>
					<Text style={styles.textButton}>Editar</Text>
					<Entypo name='edit' size={16} style={styles.iconButton} />
				</Pressable>
				<Pressable
					style={[styles.button, styles.deleteButton]}
					onPress={() => handleDeleteNota(id)}
				>
					<Text style={styles.textButton}>Eliminar</Text>
					<Entypo name='trash' size={16} style={styles.iconButton} />
				</Pressable>
			</View>
			<ModalUpdateNota
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
				nota={nota!}
				id={id}
			/>
		</View>
	);
};

export default NotaIndividualScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 35,
		gap: 30,
	},
	contentNota: {
		flex: 1,
		backgroundColor: Colors.light,
		borderRadius: 12,
		paddingHorizontal: 20,
		paddingTop: 25,
		elevation: 15,
		shadowColor: '#00000050',
		shadowOffset: {
			width: 10,
			height: 10,
		},
		// gap: 50,
	},
	textTitleNota: {
		fontSize: 16,
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		textAlign: 'center',
		marginBottom: 20,
	},
	containerDate: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
		marginBottom: 20,
	},
	iconDate: {
		color: Colors.secondary,
	},
	textDate: {
		color: Colors.secondary,
		fontFamily: 'Quicksand500',
	},
	textDescription: {
		fontSize: 14,
		fontFamily: 'Quicksand500',
		lineHeight: 23,
		color: Colors.secondary,
		marginBottom: 40,
	},
	containerButtons: {
		gap: 15,
		marginBottom: 20,
	},
	button: {
		height: 45,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 12,
		flexDirection: 'row',
		gap: 15,
		elevation: 5,
		shadowColor: '#00000050',
		shadowOffset: {
			width: 10,
			height: 10,
		},
	},
	textButton: {
		color: Colors.light,
		fontWeight: '700',
	},
	iconButton: {
		color: Colors.light,
	},
	deleteButton: {
		backgroundColor: Colors.delete,
	},
	editButton: {
		backgroundColor: Colors.primary,
	},
});
