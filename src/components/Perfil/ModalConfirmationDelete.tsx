import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { Colors } from '../../constants/colors';
import { Modal } from 'react-native';
import { Pressable } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

interface propsModal {
	modalVisible: boolean;
	setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	deleteConverasation: () => void;
}

const ModalConfirmationDelete: React.FC<propsModal> = ({
	modalVisible,
	setModalVisible,
	deleteConverasation,
}) => {
	return (
		<Modal
			visible={modalVisible}
			onRequestClose={() => setModalVisible(false)}
			transparent={true}
			animationType='fade'
		>
			<View style={styles.containerContentModal}>
				<View style={styles.containerModal}>
					<View style={{ flex: 1, gap: 10 }}>
						<View style={styles.headerModal}>
							<Text style={styles.textModal}>
								Estás a punto de eliminar la conversación.
							</Text>
							<Pressable
								onPress={() => setModalVisible(false)}
								style={styles.iconButtonContainer}
							>
								<AntDesign
									name='close'
									size={24}
									style={styles.iconButton}
								/>
							</Pressable>
						</View>
						<Text style={styles.textContent}>
							Esta acción eliminará todos los mensajes actuales en el
							historial de tu chat. ¿Deseas continuar?
						</Text>
					</View>

					<Pressable
						onPress={() => {
							deleteConverasation();
							setModalVisible(false);
						}}
						style={styles.buttonSave}
					>
						<Text style={styles.textButtonSave}>Eliminar</Text>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

export default ModalConfirmationDelete;

const styles = StyleSheet.create({
	containerContentModal: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000030',
		flex: 1,
	},
	containerModal: {
		backgroundColor: Colors.light,
		width: '80%',
		height: '30%',
		justifyContent: 'flex-start',
		alignItems: 'center',
		borderRadius: 20,
		elevation: 20,
		shadowColor: '#00000090',
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	headerModal: {
		flexDirection: 'row',
		justifyContent: 'center',
		width: '100%',
	},
	iconButton: {
		color: '#fff',
	},
	iconButtonContainer: {
		backgroundColor: Colors.delete,
		width: 40,
		height: 40,
		borderRadius: 500,
		justifyContent: 'center',
		alignItems: 'center',
		elevation: 8,
		position: 'absolute',
		left: '92%',
		bottom: '100%',
	},
	textModal: {
		fontSize: 18,
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
		textAlign: 'center',
	},
	textContent: {
		fontFamily: 'Quicksand500',
		lineHeight: 25,
		color: Colors.secondary,
	},
	buttonSave: {
		backgroundColor: Colors.delete,
		width: '100%',
		padding: 12,
		borderRadius: 12,
	},
	textButtonSave: {
		color: Colors.light,
		textAlign: 'center',
		fontFamily: 'Quicksand700',
	},
});
