import {
	ActivityIndicator,
	Text,
	View,
	StyleSheet,
} from 'react-native';
import { globalStyles } from '../styles/global';
import { Colors } from '../constants/colors';

const Splash = () => {
	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<Text style={globalStyles.title}>Cargando..</Text>
			<ActivityIndicator size={'large'} color={Colors.primary} />
		</View>
	);
};

export default Splash;

const styles = StyleSheet.create({
	container: {
		justifyContent: 'center',
		alignItems: 'center',
		gap: 15,
	},
	indicator: {
		color: Colors.gray,
	},
});
