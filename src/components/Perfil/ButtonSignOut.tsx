import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

const ButtonSignOut = ({ onPress }) => {
	return (
		<TouchableOpacity onPress={onPress} style={styles.button}>
			<Text style={styles.textButton}>Cerrar Sesión</Text>

			<AntDesign name='logout' size={18} style={styles.iconButton} />
		</TouchableOpacity>
	);
};

export default ButtonSignOut;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 30,
		height: 45,
		borderRadius: 12,
		// borderWidth: 1,
		// borderColor: '#e1e1e1',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		backgroundColor: Colors.delete,
		elevation: 10,
		shadowColor: '#00000050',
	},
	textButton: {
		color: Colors.light,
		fontSize: 14,
		fontFamily: 'Quicksand700',
	},
	iconButton: {
		color: Colors.light,
	},
});
