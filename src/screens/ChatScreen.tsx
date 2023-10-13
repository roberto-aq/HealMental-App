import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
	TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../styles/global';
import { Colors } from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';

const ChatScreen = () => {
	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<Text>ChatScreen</Text>
			<View style={styles.containerMessages}>
				<View style={styles.containerImagePaxi}>
					<Image
						source={require('../../assets/paxi-outline.png')}
						style={styles.imagePaxi}
					/>
				</View>
			</View>

			<View style={styles.containerInputMessage}>
				<TextInput
					placeholder='Escribe algo...'
					style={styles.inputMessage}
					multiline
				/>
				<TouchableOpacity style={styles.containerSendButton}>
					<FontAwesome
						name='send'
						size={18}
						style={styles.sendButtonIcon}
					/>
				</TouchableOpacity>
			</View>
		</View>
	);
};

export default ChatScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	containerImagePaxi: {
		width: 70,
		height: 70,
		backgroundColor: Colors.primary,
		borderRadius: 500,
	},
	containerMessages: {
		flex: 1,
	},
	imagePaxi: {
		width: '100%',
		height: '100%',
		objectFit: 'cover',
	},
	containerInputMessage: {
		minHeight: 40,
		borderRadius: 12,
		marginVertical: 15,
		backgroundColor: '#fff',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		elevation: 5,
		shadowColor: '#00000050',
		shadowOpacity: 100,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	inputMessage: {
		flex: 1,
		paddingHorizontal: 15,
		paddingVertical: 10,
	},
	containerSendButton: {
		alignSelf: 'stretch',
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
		paddingRight: 15,
	},
	sendButtonIcon: {
		color: Colors.secondary,
	},
});
