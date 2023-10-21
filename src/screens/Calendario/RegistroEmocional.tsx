import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../../constants/colors';
import { useDispatch, useSelector } from 'react-redux';
import { guardarEmocionThunk } from '../../store/slices/calendario/thunks';
import { RootState } from '../../store/store';
import Splash from '../Splash';
import FormRegistroEmocional from '../../components/calendario/FormRegistroEmocional';

const RegistroEmocional = ({ regresarCalendario }) => {
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
	const [notaDelDia, setNotaDelDia] = useState('');
	const [desencadenante, setDesencadenante] = useState('');

	const { isLoading, emociones } = useSelector(
		(state: RootState) => state.calendario
	);

	const fechaActual = new Date().toISOString().slice(0, 10);
	const existeRegistroFechaActual = emociones.some(
		emocion => emocion.fecha === fechaActual
	);

	const dispatch = useDispatch();

	const guardarEmocion = async (
		desencadenante: string,
		notaDelDia: string
	) => {
		const emocionesSeleccionadas = iconosEmojis
			.filter(emoji => emoji.checked)
			.map(emoji => emoji.name);

		if (emocionesSeleccionadas.length === 0) {
			alert('Debe seleccionar al menos una emoción');
			return;
		}

		dispatch(
			guardarEmocionThunk(
				emocionesSeleccionadas,
				notaDelDia,
				desencadenante,
				etiquetas
			)
		);

		regresarCalendario();
	};

	if (isLoading) return <Splash />;

	return (
		<View style={styles.containerRegistro}>
			{existeRegistroFechaActual ? (
				<Text>Ya registraste tu emoción hoy. ¡Vuelve mañana!</Text>
			) : (
				<FormRegistroEmocional
					iconosEmojis={iconosEmojis}
					setIconosEmojis={setIconosEmojis}
					setDesencadenante={setDesencadenante}
					desencadenante={desencadenante}
					notaDelDia={notaDelDia}
					setNotaDelDia={setNotaDelDia}
					etiquetas={etiquetas}
					setEtiquetas={setEtiquetas}
					onPress={() => guardarEmocion(desencadenante, notaDelDia)}
					buttonLabel='Guardar'
				/>
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
});
