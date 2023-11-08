import { StyleSheet, Text, TextInput, View } from 'react-native';
import { InputText } from '../../interfaces/auth';
import { Colors } from '../../constants/colors';

const Input: React.FC<InputText> = ({
	label,
	value,
	onChangeText,
	secureTextEntry,
}) => {
	return (
		<View style={styles.container}>
			<Text style={styles.text}>{label}:</Text>
			<TextInput
				value={value}
				onChangeText={onChangeText}
				secureTextEntry={secureTextEntry}
				style={styles.input}
				autoCapitalize='none'
			/>
		</View>
	);
};

export default Input;

const styles = StyleSheet.create({
	container: {
		gap: 12,
	},
	text: {
		fontFamily: 'Quicksand700',
		textTransform: 'capitalize',
		color: Colors.secondary,
	},

	input: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 12,
		height: 45,
		color: '#333',
		paddingHorizontal: 12,
		fontFamily: 'Quicksand500',
	},
});
