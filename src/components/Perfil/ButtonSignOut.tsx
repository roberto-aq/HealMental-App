import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { AntDesign } from '@expo/vector-icons';

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
		borderWidth: 1,
		borderColor: 'red',
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	textButton: {
		color: '#808080',
		fontSize: 14,
		fontWeight: '500',
	},
	iconButton: {
		color: 'red',
	},
});
