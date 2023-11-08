import { StyleSheet, View, Image } from 'react-native';
import { props } from '../interfaces/props';

const ContainerLogo: React.FC<props> = ({ children }) => {
	return (
		<View style={styles.containerLogo}>
			<Image
				source={require('../../assets/icon_healmental.png')}
				style={styles.iconLogo}
			/>
			{children}
		</View>
	);
};

export default ContainerLogo;

const styles = StyleSheet.create({
	containerLogo: {
		alignItems: 'center',
		paddingTop: 10,
	},
	iconLogo: {
		width: 100,
		height: 100,
	},
});
