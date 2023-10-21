import {
	StyleSheet,
	Text,
	View,
	TouchableHighlight,
	Image,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Pressable, TextInput } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import { useState } from 'react';

interface EmocionEmojis {
	name: string;
	img: any;
	checked: boolean;
}

interface propsFormRegistroEmocional {
	iconosEmojis: EmocionEmojis[];
	setIconosEmojis: React.Dispatch<
		React.SetStateAction<
			{
				name: string;
				img: any;
				checked: boolean;
			}[]
		>
	>;
	notaDelDia: string;
	desencadenante: string;
	setNotaDelDia: React.Dispatch<React.SetStateAction<string>>;
	setDesencadenante: React.Dispatch<React.SetStateAction<string>>;
	etiquetas: string[];
	setEtiquetas: React.Dispatch<React.SetStateAction<string[]>>;
	onPress: any;
	buttonLabel: string;
}

const FormRegistroEmocional: React.FC<propsFormRegistroEmocional> = ({
	onPress,
	iconosEmojis,
	setIconosEmojis,
	notaDelDia,
	setNotaDelDia,
	desencadenante,
	setDesencadenante,
	etiquetas,
	setEtiquetas,
	// eliminarEtiqueta,
	// agregarEtiqueta,
	// nuevaEtiqueta,
	// setNuevaEtiqueta,
	buttonLabel,
}) => {
	const [caracteresCount, setCaracteresCount] = useState(0);
	const [nuevaEtiqueta, setNuevaEtiqueta] = useState('');

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

	return (
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
							underlayColor={Colors.secondary}
						>
							<Image source={emoji.img} />
						</TouchableHighlight>
						<Text style={styles.textOption}>{emoji.name}</Text>
					</View>
				))}
			</View>

			<View style={styles.containerNotaDelDia}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.textNotaDelDia}>Nota del Día:</Text>
					<Text style={styles.textOptional}>Opcional</Text>
				</View>
				<TextInput
					style={styles.inputNotaDelDia}
					placeholder='Escribe un comentario'
					value={notaDelDia}
					onChangeText={newValue => setNotaDelDia(newValue)}
					multiline
				/>
			</View>

			<View style={styles.containerDesencadenante}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.textDesencadenante}>
						Desencadenante:
					</Text>
					<Text style={styles.textOptional}>Opcional</Text>
				</View>

				<TextInput
					style={styles.inputDesencadenante}
					placeholder='¿Que te hizó sentir así?'
					value={desencadenante}
					onChangeText={newValue => setDesencadenante(newValue)}
					multiline
				/>
			</View>

			<View style={styles.containerEtiquetas}>
				<View
					style={{
						flexDirection: 'row',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<Text style={styles.textTitleEtiquetas}>Etiquetas:</Text>
					<Text style={styles.textOptional}>Opcional</Text>
				</View>
				<View style={styles.containerEtiquetasBadge}>
					{etiquetas.map((etiqueta, index) => (
						<View style={styles.etiquetaBadge} key={index}>
							<Text style={styles.textEtiquetaBadge}>{etiqueta}</Text>
							<Pressable onPress={() => eliminarEtiqueta(etiqueta)}>
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
								onChangeText={value => handleEtiquetaChange(value)}
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
				onPress={onPress}
			>
				<Text style={styles.textGuardar}>{buttonLabel}</Text>
			</TouchableHighlight>
		</>
	);
};

export default FormRegistroEmocional;

const styles = StyleSheet.create({
	title: {
		fontSize: 18,
		fontFamily: 'Quicksand700',
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
		fontFamily: 'Quicksand600',
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
	textNotaDelDia: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 18,
	},
	inputNotaDelDia: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 12,
		height: 85,
		paddingHorizontal: 15,
		textAlignVertical: 'top',
		paddingVertical: 10,
	},
	containerDesencadenante: {
		gap: 10,
	},
	textDesencadenante: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 18,
	},
	inputDesencadenante: {
		borderWidth: 1,
		borderColor: '#e1e1e1',
		borderRadius: 12,
		height: 85,
		paddingHorizontal: 15,
		textAlignVertical: 'top',
		paddingVertical: 10,
	},
	containerEtiquetas: {
		gap: 10,
	},
	textTitleEtiquetas: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 18,
	},
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
	textOptional: {
		color: Colors.dark,
		fontFamily: 'Quicksand700',
		fontSize: 16,
		marginRight: 10,
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
