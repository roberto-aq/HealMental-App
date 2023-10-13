import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { Entypo } from '@expo/vector-icons';

const ButtonPerfil = ({ title, path, navigation }) => {
	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(path)}
			style={styles.button}
		>
			<Text style={styles.textButton}>{title}</Text>
			<Entypo
				name='chevron-right'
				size={18}
				style={styles.iconButton}
			/>
		</TouchableOpacity>
	);
};

export default ButtonPerfil;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 30,
		height: 45,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: '#e1e1e1',
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
		color: '#808080',
	},
});
