import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Colors } from '../constants/colors';
import { Entypo, MaterialIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderTab = ({ navigation, route, options }) => {
	const isPaxiRoute = route.name === 'Paxi';

	const handleIconPress = () => {
		if (isPaxiRoute) {
			navigation.navigate('Perfil', {
				screen: 'ProfesionalesList',
				initial: false,
			}); // Cambiar a otra ruta cuando esté en 'Paxi'
		} else {
			navigation.navigate('Paxi'); // Navegar a 'Paxi' por defecto
		}
	};

	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={() => navigation.goBack()}>
				<Entypo
					name='chevron-left'
					size={24}
					style={styles.iconBack}
				/>
			</TouchableOpacity>
			<Text style={styles.text}>{options.title || route.name}</Text>
			<TouchableOpacity onPress={handleIconPress}>
				{isPaxiRoute ? (
					<MaterialIcons
						name='psychology'
						size={24}
						style={styles.iconInfo}
					/>
				) : (
					<Feather
						name='message-circle'
						size={24}
						style={styles.iconInfo}
					/>
				)}
			</TouchableOpacity>
		</View>
	);
};

export default HeaderTab;

const styles = StyleSheet.create({
	container: {
		// marginTop: StatusBar.currentHeight,
		paddingTop: StatusBar.currentHeight,
		paddingVertical: 20,
		backgroundColor: Colors.primary,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 30,
	},
	text: {
		color: Colors.secondary,
		fontWeight: '700',
		fontSize: 16,
	},
	iconBack: {
		color: Colors.secondary,
	},
	iconInfo: {
		color: Colors.secondary,
	},
});
