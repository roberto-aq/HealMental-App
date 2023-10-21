import { StyleSheet, Text, View, Image } from 'react-native';
import { Colors } from '../../constants/colors';
import { useSelector } from 'react-redux';
import { RootState } from '../../store/store';

const imagesAvatar = {
	default: require('../../../assets/avatar-default.png'),
	hombre: require('../../../assets/avatar-hombre.png'),
	mujer: require('../../../assets/avatar-mujer.png'),
} as {
	default: string;
	hombre: string;
	mujer: string;
};

const MessageComponent = ({ item }) => {
	const { usuario } = useSelector((state: RootState) => state.auth);

	return (
		<View
			style={[
				styles.rowMessage,
				item.isUser && {
					justifyContent: 'flex-start',
					flexDirection: 'row-reverse',
				},
			]}
		>
			<View style={styles.containerAvatar}>
				<Image
					source={
						item.isUser
							? imagesAvatar[usuario.avatar]
							: require('../../../assets/paxi-outline.png')
					}
					style={styles.imageAvatar}
				/>
			</View>
			<View
				style={[
					styles.containerMessage,
					item.isUser && { backgroundColor: Colors.tertiary },
				]}
			>
				<Text style={styles.name}>
					{item.isUser ? usuario.nombreUsuario : 'Paxi'}
				</Text>
				<Text style={styles.textMessage}>{item.text}</Text>
			</View>
		</View>
	);
};

export default MessageComponent;

const styles = StyleSheet.create({
	rowMessage: {
		flexDirection: 'row',
		gap: 5,
		alignItems: 'center',
	},
	containerAvatar: {
		width: 60,
		height: 60,
		backgroundColor: Colors.light,
		borderRadius: 500,
		elevation: 2,
		shadowOffset: { width: 10, height: 3 },
		shadowRadius: 100,
		shadowOpacity: 4,
		justifyContent: 'center',
		alignItems: 'center',
	},
	imageAvatar: {
		height: '90%',
		width: '90%',
		objectFit: 'contain',
		borderRadius: 500,
	},
	containerMessage: {
		paddingVertical: 10,
		paddingHorizontal: 15,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		flex: 1,
	},
	name: {
		textTransform: 'capitalize',
		fontFamily: 'Quicksand700',
		fontSize: 16,
		color: Colors.light,
	},
	textMessage: {
		color: Colors.light,
		fontFamily: 'Quicksand500',
	},
});
