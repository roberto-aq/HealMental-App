import { useState, useEffect } from 'react';
import {
	Image,
	StyleSheet,
	Text,
	TextInput,
	TouchableHighlight,
	View,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { Pressable } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
	getEmocionHoyThunk,
	guardarEmocionThunk,
} from '../../store/slices/calendario/thunks';
import { RootState } from '../../store/store';
import Splash from '../Splash';

const RegistroEmocional = () => {
	const [iconosEmojis, setIconosEmojis] = useState([
		{
			name: 'Enojado',
			img: require('../../../assets/emojis-calendario/icono-enojado.png'),
			checked: false,
		},
		{
			name: 'Triste',
			img: require('../../../assets/emojis-calendario/icono-triste.png'),
			checked: false,
		},
		{
			name: 'Ansioso',
			img: require('../../../assets/emojis-calendario/icono-ansioso.png'),
			checked: false,
		},
		{
			name: 'Cansado',
			img: require('../../../assets/emojis-calendario/icono-cansado.png'),
			checked: false,
		},
		{
			name: 'Neutral',
			img: require('../../../assets/emojis-calendario/icono-neutral.png'),
			checked: true,
		},

		{
			name: 'Estresado',
			img: require('../../../assets/emojis-calendario/icono-estresado.png'),
			checked: false,
		},
		{
			name: 'Relajado',
			img: require('../../../assets/emojis-calendario/icono-relajado.png'),
			checked: false,
		},
		{
			name: 'Feliz',
			img: require('../../../assets/emojis-calendario/icono-feliz.png'),
			checked: false,
		},
		{
			name: 'Motivado',
			img: require('../../../assets/emojis-calendario/icono-motivado.png'),
			checked: false,
		},
	]);
	const [etiquetas, setEtiquetas] = useState<string[]>([]);
	const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');
	const [caracteresCount, setCaracteresCount] = useState(0);
	const [notaDelDia, setNotaDelDia] = useState('');
	const [desencadenante, setDesencadenante] = useState('');

	const { isEmocionRegistrada, isLoading } = useSelector(
		(state: RootState) => state.calendario
	);

	const dispatch = useDispatch();

	const handleEtiquetaChange = (texto: string) => {
		if (texto.length <= 25) {
			setNuevaEtiqueta(texto);
			setCaracteresCount(texto.length);
		}
		return;
	};

	const agregarEtiqueta = (nuevaEtiqueta: string) => {
		if (etiquetas.length < 3 && nuevaEtiqueta.length > 0) {
			setEtiquetas([...etiquetas, nuevaEtiqueta]);
		}

		return;
	};

	const eliminarEtiqueta = (etiqueta: string) => {
		const newEtiquetas = etiquetas.filter(
			valueEtiqueta => valueEtiqueta !== etiqueta
		);
		setEtiquetas(newEtiquetas);
	};

	const onToggleEmocion = (name: string) => {
		const nuevosEmojis = iconosEmojis.map(icono => {
			if (icono.name === name) {
				return { ...icono, checked: !icono.checked };
			}
			return icono;
		});
		setIconosEmojis(nuevosEmojis);
	};

	const guardarEmocion = async (
		desencadenante: string,
		notaDelDia: string
	) => {
		const emocionesSeleccionadas = iconosEmojis
			.filter(emoji => emoji.checked)
			.map(emoji => emoji.name);

		dispatch(
			guardarEmocionThunk(
				emocionesSeleccionadas,
				notaDelDia,
				desencadenante,
				etiquetas
			)
		);
	};

	useEffect(() => {
		dispatch(getEmocionHoyThunk());
	}, [dispatch]);

	if (isLoading) return <Splash />;

	return (
		<View style={styles.containerRegistro}>
			{isEmocionRegistrada ? (
				<Text>Ya registraste tu emoción hoy. ¡Vuelve mañana!</Text>
			) : (
				<>
					<Text style={styles.title}>¿Cómo te encuentras hoy?</Text>
					<View style={styles.containerOptions}>
						{iconosEmojis.map((emoji, index) => (
							<View style={styles.containerOption} key={index}>
								<TouchableHighlight
									style={[
										styles.containerEmoji,
										emoji.checked && styles.containerEmojiChecked,
									]}
									onPress={() => onToggleEmocion(emoji.name)}
								>
									<Image source={emoji.img} />
								</TouchableHighlight>
								<Text style={styles.textOption}>{emoji.name}</Text>
							</View>
						))}
					</View>

					<View style={styles.containerNotaDelDia}>
						<Text style={styles.textNotaDelDia}>Nota del Día:</Text>
						<TextInput
							style={styles.inputNotaDelDia}
							placeholder='Escribe un comentario'
							value={notaDelDia}
							onChangeText={newValue => setNotaDelDia(newValue)}
						/>
					</View>

					<View style={styles.containerDesencadenante}>
						<Text style={styles.textDesencadenante}>
							Desencadenante:
						</Text>
						<TextInput
							style={styles.inputDesencadenante}
							placeholder='¿Que te hizó sentir así?'
							value={desencadenante}
							onChangeText={newValue => setDesencadenante(newValue)}
						/>
					</View>

					<View style={styles.containerEtiquetas}>
						<Text style={styles.textTitleEtiquetas}>Etiquetas:</Text>
						<View style={styles.containerEtiquetasBadge}>
							{etiquetas.map((etiqueta, index) => (
								<View style={styles.etiquetaBadge} key={index}>
									<Text key={index} style={styles.textEtiquetaBadge}>
										{etiqueta}
									</Text>
									<Pressable
										onPress={() => eliminarEtiqueta(etiqueta)}
									>
										<AntDesign name='close' size={14} color='#fff' />
									</Pressable>
								</View>
							))}
						</View>
						{etiquetas.length < 3 && (
							<View style={styles.containerInputEtiqueta}>
								<View style={styles.inputEtiqueta}>
									<TextInput
										style={{ flex: 1 }}
										value={nuevaEtiqueta}
										onChangeText={value =>
											handleEtiquetaChange(value)
										}
										placeholder='Añadir etiqueta...'
									/>
									<Text style={styles.textCaracters}>
										{caracteresCount}/25
									</Text>
								</View>

								<TouchableHighlight
									style={styles.botonAgregar}
									onPress={() => {
										agregarEtiqueta(nuevaEtiqueta);
										setNuevaEtiqueta('');
										setCaracteresCount(0);
									}}
								>
									<Text style={styles.textBoton}>Añadir</Text>
								</TouchableHighlight>
							</View>
						)}
					</View>

					<TouchableHighlight
						style={styles.buttonGuardar}
						onPress={() => guardarEmocion(desencadenante, notaDelDia)}
					>
						<Text style={styles.textGuardar}>Guardar</Text>
					</TouchableHighlight>
				</>
			)}
		</View>
	);
};

export default RegistroEmocional;

const styles = StyleSheet.create({
	containerRegistro: {
		marginTop: 10,
		gap: 20,
	},
	title: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.secondary,
	},
	containerOptions: {
		flexDirection: 'row',
		gap: 10,
		// backgroundColor: 'green',
		flexWrap: 'wrap',
		justifyContent: 'center',
	},
	containerOption: {
		gap: 5,
		// backgroundColor: 'red',
		width: '25%',
		alignItems: 'center',
	},
	textOption: {
		fontWeight: '500',
		color: Colors.secondary,
		fontSize: 13,
		textAlign: 'center',
	},
	containerEmoji: {
		width: '100%',
		height: 80,
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	containerEmojiChecked: {
		borderColor: Colors.secondary,
		backgroundColor: Colors.primary,
	},
	imageEmoji: {},
	containerNotaDelDia: {
		gap: 10,
	},
	textNotaDelDia: {},
	inputNotaDelDia: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 10,
		height: 80,
		justifyContent: 'flex-start',
		paddingHorizontal: 15,
	},
	containerDesencadenante: {
		gap: 10,
	},
	textDesencadenante: {},
	inputDesencadenante: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 10,
		height: 80,
		justifyContent: 'flex-start',
		paddingHorizontal: 15,
	},
	containerEtiquetas: {
		gap: 10,
	},
	textTitleEtiquetas: {},
	containerEtiquetasBadge: {
		flexDirection: 'row',
		gap: 10,
		flexWrap: 'wrap',
	},
	etiquetaBadge: {
		gap: 10,
		backgroundColor: Colors.primary,
		paddingVertical: 5,
		paddingHorizontal: 15,
		borderRadius: 10,
		flexDirection: 'row',
		alignItems: 'center',
		// flex: 1,
	},
	textEtiquetaBadge: {
		color: Colors.light,
		fontSize: 14,
	},
	containerInputEtiqueta: {
		flexDirection: 'row',
		alignItems: 'center',
		gap: 10,
	},
	inputEtiqueta: {
		flex: 1,
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 10,
		paddingHorizontal: 15,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		alignSelf: 'stretch',
	},
	textCaracters: {
		fontSize: 13,
		fontWeight: '700',
	},
	botonAgregar: {
		padding: 10,
		backgroundColor: Colors.primary,
		borderRadius: 10,
		paddingHorizontal: 20,
	},
	textBoton: {
		color: Colors.light,
	},
	buttonGuardar: {
		height: 45,
		width: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 12,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textGuardar: {
		color: Colors.light,
		fontSize: 14,
		fontWeight: '700',
	},
});
