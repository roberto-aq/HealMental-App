import { View, Text, Dimensions } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
	useAnimatedGestureHandler,
	useAnimatedStyle,
	useSharedValue,
} from 'react-native-reanimated';
import { Colors } from '../../constants/colors';
import { props } from '../../interfaces/props';

const DraggableButton: React.FC<props> = ({ children }) => {
	const window = Dimensions.get('window');
	const buttonSize = 60; // Asume un tamaño de botón de 50; ajusta según sea necesario

	const x = useSharedValue(window.width - 60 - 20);
	const y = useSharedValue(window.height - 60 - 135);

	// Límites para el movimiento del botón
	const limitX = window.width - buttonSize;
	const limitY = window.height - buttonSize - 60;

	const gestureHandler = useAnimatedGestureHandler({
		onStart: (_, ctx: { startX: number; startY: number }) => {
			ctx.startX = x.value;
			ctx.startY = y.value;
		},
		onActive: (event, ctx: { startX: number; startY: number }) => {
			// Calculamos la nueva posición propuesta
			const newX = ctx.startX + event.translationX;
			const newY = ctx.startY + event.translationY;

			// Restringimos el botón para que no se mueva fuera de los límites de la pantalla
			x.value = Math.max(Math.min(newX, limitX), 0);
			y.value = Math.max(Math.min(newY, limitY), 0);
		},
	});

	const animatedStyle = useAnimatedStyle(() => {
		return {
			transform: [
				{
					translateX: x.value,
				},
				{
					translateY: y.value,
				},
			],
			zIndex: 10,
			backgroundColor: Colors.secondary,
			width: 60,
			height: 60,
			borderRadius: 500,
			position: 'absolute',
			// right: 10,
			// bottom: 80,
			elevation: 5,
			shadowOffset: {
				width: 2,
				height: 2,
			},
		};
	});

	return (
		<PanGestureHandler onGestureEvent={gestureHandler}>
			<Animated.View style={animatedStyle}>
				<>{children}</>
			</Animated.View>
		</PanGestureHandler>
	);
};

export default DraggableButton;
