import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
interface CheckboxProps {
	label: string;
	checked: boolean;
	onToggle: () => void;
}

const Checkbox: React.FC<CheckboxProps> = ({
	label,
	checked,
	onToggle,
}) => {
	return (
		<Pressable onPress={onToggle} style={styles.containerCheckbox}>
			<View style={[styles.box, checked && styles.checkedBox]}>
				{checked && (
					<AntDesign name='check' size={17} style={styles.icon} />
				)}
			</View>
			<Text style={styles.label}>{label}</Text>
		</Pressable>
	);
};

export default Checkbox;

const styles = StyleSheet.create({
	containerCheckbox: {
		flexDirection: 'row',
		alignItems: 'center',
		backgroundColor: '#fff',
		borderWidth: 2,
		borderColor: Colors.secondary,
		height: 40,
		width: '100%',
		borderRadius: 20,
		paddingLeft: 10,
		gap: 15,
	},
	box: {
		width: 25,
		height: 25,
		borderWidth: 2,
		borderRadius: 500,
		borderColor: Colors.secondary,
		alignItems: 'center',
		justifyContent: 'center',
	},
	checkedBox: {
		backgroundColor: Colors.secondary,
	},
	icon: {
		color: '#fff',
	},
	label: {
		fontSize: 18,
		fontWeight: '700',
		color: Colors.secondary,
	},
});
