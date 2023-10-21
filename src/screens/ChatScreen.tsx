import {
	StyleSheet,
	Text,
	View,
	Image,
	TextInput,
	Pressable,
	TouchableOpacity,
	FlatList,
} from 'react-native';
import { Colors } from '../constants/colors';
import { FontAwesome } from '@expo/vector-icons';
import { useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MessageComponent from '../components/chat/MessageComponent';
import { addMessage } from '../store/slices/chat/chat';

const ChatScreen = () => {
	const [mensajeUsuario, setMensajeUsuario] = useState('');
	const [counter, setCounter] = useState(6);

	const { messages } = useSelector((state: RootState) => state.chat);

	const dispatch = useDispatch();

	const flatListRef = useRef<FlatList | null>(null);

	const handleContentSizeChange = () => {
		flatListRef.current?.scrollToEnd({ animated: true });
	};

	const enviarMensaje = () => {
		if (mensajeUsuario.trim() === '') {
			return;
		}

		dispatch(
			addMessage({
				id: counter,
				text: mensajeUsuario,
				isUser: true,
			})
		);

		setCounter(counter + 1);
		setMensajeUsuario('');
	};

	return (
		<View style={[styles.container]}>
			<FlatList
				data={messages}
				keyExtractor={message => message.id.toString()}
				renderItem={({ item }) => <MessageComponent item={item} />}
				ItemSeparatorComponent={() => (
					<View style={{ marginVertical: 10 }}></View>
				)}
				ref={flatListRef}
				onContentSizeChange={handleContentSizeChange}
			/>

			<View style={styles.containerInputMessage}>
				<TextInput
					placeholder='Escribe algo...'
					style={styles.inputMessage}
					multiline
					value={mensajeUsuario}
					onChangeText={newValue => setMensajeUsuario(newValue)}
				/>
				<TouchableOpacity
					style={styles.containerSendButton}
					onPress={enviarMensaje}
				>
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
		backgroundColor: Colors.light,
		paddingVertical: 15,
		flex: 1,
	},
	containerInputMessage: {
		minHeight: 40,
		borderRadius: 12,
		marginVertical: 15,
		marginBottom: 5,
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
