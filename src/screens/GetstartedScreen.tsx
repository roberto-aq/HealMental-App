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
		<View style={[styles.container]}>
			<View style={styles.containerLogo}>
				<Image
					source={require('../../assets/icon_healmental.png')}
					style={styles.iconLogo}
				/>
				<Image
					source={require('../../assets/Logo.png')}
					style={styles.iconLogoHealmental}
				/>
				{/* <SvgUri uri={require('../../assets/logo_healMental.svg')} /> */}
			</View>
			<Text style={styles.headerTitle}>
				Descubre una nueva forma de Cuidar tu Mente
			</Text>
			<Image
				source={require('../../assets/gif-started.gif')}
				style={{ width: '100%', flex: 1 }}
			/>
			<View style={styles.containerButtons}>
				<TouchableOpacity
					style={[styles.button, styles.buttonLogin]}
					onPress={() => navigation.navigate('Register')}
				>
					<Text style={styles.textButtonLogin}>Soy nuevo</Text>
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
		paddingVertical: 30,
	},
	containerLogo: {
		alignItems: 'center',
		paddingTop: 12,
	},
	iconLogo: {
		width: 120,
		height: 120,
	},
	iconLogoHealmental: {
		position: 'absolute',
		top: 35,
	},
	textLogo: {
		bottom: 50,
		width: '100%',
		height: 30,
	},

	headerTitle: {
		color: Colors.secondary,
		fontSize: 25,
		fontFamily: 'Quicksand700',
		width: '85%',
		textAlign: 'center',
		lineHeight: 35,
		paddingVertical: 40,
	},
	containerButtons: {
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
