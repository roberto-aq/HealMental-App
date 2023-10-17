import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/global';

const DatosPersonalesScreen = () => {
	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<Text>DatosPersonalesScreen</Text>
		</View>
	);
};

export default DatosPersonalesScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
});
