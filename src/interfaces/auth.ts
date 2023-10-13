import { GestureResponderEvent } from 'react-native';

export interface InputText {
	label: string;
	value: string;
	onChangeText: ((text: string) => void) | undefined;
	secureTextEntry?: boolean;
}

export interface ButtonFormInterface {
	labelButton: string;
	onPress: ((event: GestureResponderEvent) => void) | undefined;
	backgroundColor: string;
	textColor: string;
}
