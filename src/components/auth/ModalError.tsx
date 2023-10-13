import {
	Modal,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface propsModal {
	isModalVisible: boolean;
	setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
	errorMessage: string;
}

const ModalError: React.FC<propsModal> = ({
	isModalVisible,
	setIsModalVisible,
	errorMessage,
}) => {
	return (
		<Modal
			visible={isModalVisible}
			onRequestClose={() => setIsModalVisible(false)}
			transparent={true}
		>
			<View style={styles.containerContentModal}>
				<View style={styles.containerModal}>
					<Text style={styles.textModal}>{errorMessage}</Text>
					<TouchableOpacity
						onPress={() => setIsModalVisible(false)}
						style={styles.iconButtonContainer}
					>
						<AntDesign
							name='close'
							size={24}
							style={styles.iconButton}
						/>
					</TouchableOpacity>
				</View>
			</View>
		</Modal>
	);
};

export default ModalError;

const styles = StyleSheet.create({
	containerContentModal: {
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#00000030',
		flex: 1,
	},
	containerModal: {
		backgroundColor: Colors.primary,
		width: '70%',
		height: '25%',
		justifyContent: 'center',
		alignItems: 'center',
		opacity: 1,
		borderRadius: 30,
	},
	iconButton: {
		color: '#fff',
	},
	iconButtonContainer: {
		position: 'absolute',
		top: 15,
		right: 25,
		padding: 15,
	},
	textModal: {
		fontSize: 24,
		fontWeight: '700',
		color: '#fff',
	},
});
