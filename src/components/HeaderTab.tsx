import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { Colors } from '../constants/colors';
import { Entypo } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

const HeaderTab = ({ navigation, route, options }) => {
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
			<TouchableOpacity>
				<Ionicons
					name='ios-information-circle'
					size={24}
					style={styles.iconInfo}
				/>
			</TouchableOpacity>
		</View>
	);
};

export default HeaderTab;

const styles = StyleSheet.create({
	container: {
		marginTop: StatusBar.currentHeight,
		paddingVertical: 20,
		backgroundColor: Colors.primary,
		justifyContent: 'space-between',
		alignItems: 'center',
		flexDirection: 'row',
		paddingHorizontal: 30,
	},
	text: {
		color: '#fff',
		fontWeight: '700',
		fontSize: 16,
	},
	iconBack: {
		color: '#fff',
	},
	iconInfo: {
		color: '#fff',
	},
});
