import {
	Modal,
	View,
	Text,
	StyleSheet,
	Pressable,
} from 'react-native';
import { Colors } from '../constants/colors';
import { AntDesign } from '@expo/vector-icons';

interface SessionExpiredModalProps {
	isVisible: boolean;
	onClose: () => void;
}

const SessionExpiredModal: React.FC<SessionExpiredModalProps> = ({
	isVisible,
	onClose,
}) => {
	return (
		<Modal
			animationType='slide'
			transparent={true}
			visible={isVisible}
			onRequestClose={onClose}
		>
			<View style={styles.containerModal}>
				<View style={styles.cardModal}>
					<Text style={styles.textModal}>
						Su sesión ha expirado. Vuelva a iniciar sesión.
					</Text>
					<Pressable onPress={onClose} style={styles.button}>
						<Text style={styles.textButton}>Iniciar sesión</Text>
						<AntDesign
							name='right'
							size={14}
							style={styles.iconButton}
						/>
					</Pressable>
				</View>
			</View>
		</Modal>
	);
};

const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000080',
	},
	cardModal: {
		width: '80%',
		padding: 30,
		backgroundColor: 'white',
		borderRadius: 10,
		gap: 20,
		shadowOffset: {
			width: 0,
			height: 0,
		},
		elevation: 80,
		shadowColor: '#000',
		shadowOpacity: 20,
	},
	textModal: {
		fontSize: 20,
		textAlign: 'center',
		fontWeight: '700',
		color: Colors.secondary,
	},
	button: {
		flexDirection: 'row',
		gap: 10,
		backgroundColor: Colors.primary,
		justifyContent: 'center',
		alignItems: 'center',
		paddingVertical: 10,
		borderRadius: 12,
	},
	textButton: {
		fontSize: 16,
		color: '#fff',
	},
	iconButton: {
		color: '#fff',
	},
});

export default SessionExpiredModal;
