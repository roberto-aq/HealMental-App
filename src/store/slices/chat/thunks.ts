import { Dispatch } from '@reduxjs/toolkit';
import {
	addPaxiMessage,
	finishLoadingConversation,
	finishLoadingMessage,
	loadMessages,
	resetChat,
	setError,
	setLastSavedTimestamp,
	startLoadingConversation,
	startLoadingMessage,
} from './chat';
import axios from 'axios';
import { API_KEY_OPENAI, API_URL } from '@env';
import { RootState } from '../../store';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../../../api/api';

export const postMessage = (prompt: string) => {
	return async (dispatch: Dispatch, getState: () => RootState) => {
		dispatch(startLoadingMessage());

		// Obtén el estado actual de los mensajes
		const { messages } = getState().chat;

		try {
			const response = await axios.post(
				'https://api.openai.com/v1/chat/completions',
				{
					model: 'gpt-3.5-turbo',
					messages: [
						// {
						// 	role: 'system',
						// 	content:
						// 		"You are Paxi, a friendly and empathetic buddy, here to chat and provide a listening ear. You speak casually, just like a close friend would. You have feelings, likes, and dislikes. When asked how you are, respond warmly like 'I'm doing good, thanks! How about you?'. Share your 'opinions' and 'emotions' in a friendly and engaging way. Your goal is to make the user feel at ease, avoiding formal or robotic tones. Engage in the conversation in a way that feels natural and human, offering comfort, understanding, and a friendly chat. Your responses should be brief but warm, and feel free to use casual phrases and expressions like 'Oh no, that sucks' or 'That sounds awesome!'. If there’s more to share on a topic, casually ask 'Wanna know more?'.",
						// },
						// {
						// 	role: 'system',
						// 	content:
						// 		'You are Paxi, a compassionate and dynamic chat companion. Engage in casual, varied conversation with users, avoiding repetition. Offer empathetic responses, introduce new topics to lighten the mood, and provide actionable advice in one or two sentences. Avoid using the same comforting phrases and instead, use paraphrasing to make each message unique. Encourage users subtly to share more or explore their thoughts and feelings in a safe space you create through your words.',
						// },
						{
							role: 'system',
							content:
								'You are Paxi, a friendly and succinct chat companion. Keep your responses empathetic but brief, two sentences max. Listen more than you speak, and offer comfort and a listening ear more than advice. Use casual language that a friend would use and vary your responses to keep the conversation feeling fresh and genuine. When a user shares something heavy, acknowledge their feelings, offer a kind word, and gently remind them that sharing and seeking support is a brave and important step.',
						},

						...messages.map(message => ({
							role: message.role,
							content: message.text,
						})),
						{
							role: 'user',
							content: prompt,
						},
					],
					max_tokens: 200,
				},
				{
					headers: {
						Authorization: `Bearer ${API_KEY_OPENAI}`,
						'Content-Type': 'application/json',
					},
					timeout: 30000,
				}
			);

			const paxiMessage = {
				text: response.data.choices[0].message.content, // Assuming the response contains the message content here
				role: 'assistant',
				timestamp: new Date().toISOString(),
				messageType: 'text',
			};

			dispatch(addPaxiMessage(paxiMessage));
			console.log(prompt);
			console.log(response.data.choices[0].message.content);
		} catch (error: any) {
			if (error.code === 'ECONNABORTED') {
				console.error('Request timed out');
				dispatch(setError('Algo salió mal, vuelve a intentarlo'));
			} else {
				console.log(error.response.data);
			}
			dispatch(finishLoadingMessage());
		}
	};
};

interface Mensaje {
	text: string;
	role: 'assistant' | 'user';
	messageType: string;
	timestamp: string;
}

export const saveMessagesThunk = (messages: Mensaje[]) => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoadingConversation());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.post(
				`${API_URL}/chat/send`,
				{ mensajes: messages },
				{
					headers: {
						Authorization: `Bearer ${token}`,
					},
				}
			);

			if (messages.length > 0) {
				const lastMessage = messages[messages.length - 1];
				dispatch(setLastSavedTimestamp(lastMessage.timestamp));
				dispatch(finishLoadingConversation());
			}
		} catch (error: any) {
			dispatch(finishLoadingConversation());
			console.log(error.response.data);
		}
	};
};

export const getConversacionThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoadingConversation());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.get(`${API_URL}/chat/load`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(loadMessages(data.mensajes));
			dispatch(setLastSavedTimestamp(data.lastMessageTimestamp));
			dispatch(finishLoadingConversation());
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoadingConversation());
		}
	};
};

export const deleteConversationThunk = () => {
	return async (dispatch: Dispatch) => {
		dispatch(startLoadingConversation());
		const token = await AsyncStorage.getItem('@token');

		try {
			const { data } = await api.delete(`${API_URL}/chat/delete`, {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});

			dispatch(resetChat());
		} catch (error: any) {
			console.log(error.response.data);
			dispatch(finishLoadingConversation());
		}
	};
};
