import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { ButtonFormInterface } from '../../interfaces/auth';

const ButtonForm: React.FC<ButtonFormInterface> = ({
	labelButton,
	onPress,
	backgroundColor,
	textColor,
}) => {
	return (
		<TouchableOpacity
			style={[styles.button, { backgroundColor }]}
			onPress={onPress}
		>
			<Text style={[styles.text, { color: textColor }]}>
				{labelButton}
			</Text>
		</TouchableOpacity>
	);
};

export default ButtonForm;

const styles = StyleSheet.create({
	button: {
		fontWeight: '700',
		width: '100%',
		height: 45,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	text: {
		fontWeight: 'bold',
		fontSize: 16,
	},
});
