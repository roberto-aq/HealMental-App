import { useEffect, useState } from 'react';
import RootNavigator from './src/navigation/RootNavigator';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useFonts } from 'expo-font';
import { Text } from 'react-native';

export default function App() {
	let [fontsLoaded, fontError] = useFonts({
		Quicksand300: require('./assets/fonts/Quicksand-Light.ttf'),
		Quicksand400: require('./assets/fonts/Quicksand-Regular.ttf'),
		Quicksand500: require('./assets/fonts/Quicksand-Medium.ttf'),
		Quicksand600: require('./assets/fonts/Quicksand-SemiBold.ttf'),
		Quicksand700: require('./assets/fonts/Quicksand-Bold.ttf'),
	});


	if (!fontsLoaded && !fontError) {
		return null;
	}

	return (
		<GestureHandlerRootView style={{ flex: 1 }}>
			<Provider store={store}>
				<RootNavigator />
			</Provider>
		</GestureHandlerRootView>
	);
}
