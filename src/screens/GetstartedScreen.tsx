import {
	Button,
	Image,
	StatusBar,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from 'react-native';
import { Colors } from '../constants/colors';
import { SvgUri } from 'react-native-svg';
import { globalStyles } from '../styles/global';

const GetstartedScreen = ({ navigation }) => {
	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerLogo}>
				<Image
					source={require('../../assets/icon_healmental.png')}
					style={styles.iconLogo}
				/>
				{/* <SvgUri uri={require('../../assets/logo_healMental.svg')} /> */}
			</View>
			<Text style={styles.headerTitle}>
				Descubre una nueva forma de Cuidar tu Mente
			</Text>
			<Image source={require('../../assets/gif-started.gif')} />
			<View style={styles.containerButtons}>
				<TouchableOpacity
					style={[styles.button, styles.buttonLogin]}
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={styles.textButtonLogin}>Soy nuevo Aquí</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={[styles.button, styles.buttonRegister]}
					onPress={() => navigation.navigate('Login')}
				>
					<Text style={styles.textButtonRegister}>
						Ya tengo una cuenta
					</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default GetstartedScreen;

const styles = StyleSheet.create({
	container: {
		backgroundColor: Colors.primary,
		flex: 1,
		alignItems: 'center',
		justifyContent: 'space-between',
		paddingTop: StatusBar.currentHeight,
	},
	containerLogo: {
		alignItems: 'center',
		paddingTop: 12,
	},
	iconLogo: {
		width: 120,
		height: 120,
	},
	textLogo: {
		bottom: 50,
		width: '100%',
		height: 30,
	},

	headerTitle: {
		fontWeight: 'bold',
		color: '#fff',
		fontSize: 20,
		textAlign: 'center',
	},
	containerButtons: {
		marginBottom: 20,
		width: '85%',
		gap: 12,
	},
	button: {
		width: '100%',
		paddingVertical: 15,
		borderRadius: 12,
	},
	buttonLogin: {
		backgroundColor: Colors.tertiary,
	},
	textButtonLogin: {
		fontWeight: 'bold',
		color: '#fff',
		textAlign: 'center',
		fontSize: 16,
	},
	buttonRegister: {
		borderWidth: 2,
		borderColor: Colors.secondary,
	},
	textButtonRegister: {
		fontWeight: 'bold',
		color: Colors.secondary,
		textAlign: 'center',
		fontSize: 16,
	},
});
