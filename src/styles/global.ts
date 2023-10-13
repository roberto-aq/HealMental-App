import { StatusBar, StyleSheet } from 'react-native';
import { Colors } from '../constants/colors';

export const globalStyles = StyleSheet.create({
	screenContainer: {
		flex: 1,
		backgroundColor: Colors.light,
		paddingTop: StatusBar.currentHeight,
	},
	title: {
		fontSize: 25,
		fontWeight: '600',
		color: Colors.secondary,
	},
});
