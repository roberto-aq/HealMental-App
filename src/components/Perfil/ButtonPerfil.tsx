import {
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { Colors } from '../../constants/colors';

interface IconProps {
	size: number;
	color: string;
}

interface propsButtonPerfil {
	title: string;
	path: string;
	navigation: any;
	iconComponent?: (props: IconProps) => JSX.Element;
}

const ButtonPerfil: React.FC<propsButtonPerfil> = ({
	title,
	path,
	navigation,
	iconComponent,
}) => {
	const iconProps: IconProps = {
		color: Colors.secondary,
		size: 20,
	};

	return (
		<TouchableOpacity
			onPress={() => navigation.navigate(path)}
			style={styles.button}
		>
			<View
				style={{
					flexDirection: 'row',
					alignItems: 'center',
					gap: 15,
					flex: 1,
				}}
			>
				{iconComponent && iconComponent(iconProps)}

				<Text style={styles.textButton}>{title}</Text>
			</View>

			<Entypo
				name='chevron-right'
				size={20}
				style={styles.iconButton}
			/>
		</TouchableOpacity>
	);
};

export default ButtonPerfil;

const styles = StyleSheet.create({
	button: {
		paddingHorizontal: 30,
		height: 50,
		borderRadius: 12,
		borderWidth: 1,
		borderColor: Colors.secondary,
		flexDirection: 'row',
		alignItems: 'center',
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 16,
		fontFamily: 'Quicksand700',
	},
	iconButton: {
		color: Colors.secondary,
	},
});
