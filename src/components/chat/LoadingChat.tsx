import LottieView from 'lottie-react-native';
import { Image } from 'react-native';

const LoadingChat = () => {
	return (
		// <LottieView
		// 	source={require('../../../assets/animations/Loading_chat_animation.json')} // Asegúrate de proporcionar la ruta correcta al archivo JSON
		// 	autoPlay
		// 	loop
		// 	style={{ width: 80, height: 80 }} // Ajusta el tamaño según lo necesites
		// />
		<Image source={require("../../../assets/animations/animation-loading.gif")}/>
	);
};

export default LoadingChat;
