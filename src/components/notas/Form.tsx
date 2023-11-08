import {
	StyleSheet,
	Text,
	TextInput,
	View,
	Pressable,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Ionicons } from '@expo/vector-icons';

interface propsForm {
	title: string;
	description: string;
	buttonLabel: string;
	placeholderTitle?: string;
	placeholderDescription?: string;
	setTitle: React.Dispatch<React.SetStateAction<string>>;
	setDescription: React.Dispatch<React.SetStateAction<string>>;
	onPress: () => void;
}

const Form: React.FC<propsForm> = ({
	title,
	description,
	buttonLabel,
	setTitle,
	setDescription,
	placeholderTitle,
	placeholderDescription,
	onPress,
}) => {
	return (
		<View style={styles.containerForm}>
			<View style={styles.containerInputs}>
				<View style={styles.containerInput}>
					<Text style={styles.label}>Título:</Text>
					<TextInput
						style={styles.inputText}
						value={title}
						onChangeText={newValue => setTitle(newValue)}
						placeholder={placeholderTitle}
					/>
				</View>
				<View style={styles.containerInput}>
					<Text style={styles.label}>Descripción:</Text>
					<TextInput
						style={[styles.inputText, styles.inputTextDescription]}
						value={description}
						onChangeText={newValue => setDescription(newValue)}
						placeholder={placeholderDescription}
						multiline
					/>
				</View>
			</View>
			<Pressable onPress={onPress} style={styles.button}>
				<Text style={styles.textButton}>{buttonLabel}</Text>
				<Ionicons name='save' size={18} style={styles.iconButton} />
			</Pressable>
		</View>
	);
};

export default Form;

const styles = StyleSheet.create({
	containerForm: {
		paddingTop: 20,
		flex: 1,
	},
	label: {
		fontSize: 14,
		fontWeight: '700',
	},
	containerInputs: {
		flex: 1,
		gap: 20,
	},
	containerInput: {
		gap: 10,
	},
	inputText: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 12,
		height: 45,
		paddingHorizontal: 15,
	},
	inputTextDescription: {
		height: '70%',
		textAlignVertical: 'top',
		paddingTop: 15,
	},
	button: {
		backgroundColor: Colors.primary,
		height: 45,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
		flexDirection: 'row',
		gap: 15,
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 14,
		fontWeight: '700',
	},
	iconButton: {
		color: Colors.secondary,
	},
});
