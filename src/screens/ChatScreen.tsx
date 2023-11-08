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
import { FontAwesome, Entypo } from '@expo/vector-icons';
import { useState, useRef, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../store/store';
import MessageComponent from '../components/chat/MessageComponent';
import { addUserMessage } from '../store/slices/chat/chat';
import {
	getConversacionThunk,
	postMessage,
	saveMessagesThunk,
} from '../store/slices/chat/thunks';
import LoadingChat from '../components/chat/LoadingChat';
import Splash from './Splash';
import DraggableButton from '../components/chat/DraggableButton';
import { contieneCaracteresEspeciales } from '../helpers/helpers';
import ModalSaveConversation from '../components/chat/ModalSaveConversation';

const ChatScreen = () => {
	const [mensajeUsuario, setMensajeUsuario] = useState('');
	const [modalVisible, setModalVisible] = useState(false);

	const {
		messages,
		isLoadingMessage,
		isLoadingConversation,
		lastSavedTimeStamp,
	} = useSelector((state: RootState) => state.chat);

	const dispatch = useDispatch();

	const flatListRef = useRef<FlatList | null>(null);

	const handleContentSizeChange = () => {
		flatListRef.current?.scrollToEnd({ animated: true });
	};

	const enviarMensaje = () => {
		if (mensajeUsuario.trim() === '' || isLoadingMessage) {
			return;
		}

		// if (contieneCaracteresEspeciales(mensajeUsuario)) {
		// 	alert('El mensaje contiene caracteres no permitidos.');
		// 	return;
		// }

		dispatch(
			addUserMessage({
				text: mensajeUsuario,
				role: 'user',
				timestamp: new Date().toISOString(),
				messageType: 'text',
			})
		);

		setMensajeUsuario('');

		dispatch(postMessage(mensajeUsuario));
	};

	const guardarMensajes = () => {
		const nuevosMensajes = messages.filter(
			message => message.timestamp > lastSavedTimeStamp
		);

		const mensajes = nuevosMensajes.map(message => ({
			text: message.text,
			role: message.role,
			messageType: message.messageType,
			timestamp: message.timestamp,
		}));

		if (mensajes.length > 0) {
			dispatch(saveMessagesThunk(mensajes));
		}

		console.log('1');
	};

	useEffect(() => {
		dispatch(getConversacionThunk());
	}, []);

	if (isLoadingConversation) return <Splash />;

	return (
		<View style={[styles.container]}>
			<DraggableButton>
				<TouchableOpacity
					// style={styles.buttonSaveConversation}
					onPress={() => setModalVisible(true)}
					style={{
						alignItems: 'center',
						justifyContent: 'center',
						height: '100%',
					}}
				>
					<Text style={styles.textSaveConversation}>
						<Entypo
							name='save'
							size={30}
							style={{ color: Colors.light }}
						/>
					</Text>
				</TouchableOpacity>
			</DraggableButton>
			<FlatList
				data={
					isLoadingMessage
						? [...messages, { loading: true }]
						: messages
				}
				keyExtractor={message =>
					message.loading
						? 'loading'
						: message.id || message.timestamp
				}
				renderItem={({ item }) =>
					item.loading ? (
						<LoadingChat />
					) : (
						<MessageComponent item={item} />
					)
				}
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

			<ModalSaveConversation
				modalVisible={modalVisible}
				setModalVisible={setModalVisible}
				guardarMensajes={guardarMensajes}
			/>
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
	containerButtonSaveConversation: {
		position: 'absolute',
		bottom: 80,
		right: 30,
	},
	// buttonSaveConversation: {
	// 	backgroundColor: Colors.primary,
	// 	paddingVertical: 10,
	// 	paddingHorizontal: 30,
	// 	borderRadius: 30,
	// 	elevation: 2,
	// 	shadowColor: '#000000',
	// 	shadowOffset: {
	// 		width: 2,
	// 		height: 2,
	// 	},
	// },
	textSaveConversation: {
		fontFamily: 'Quicksand700',
		color: Colors.secondary,
	},
});
