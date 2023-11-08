import {
	Modal,
	Pressable,
	StyleSheet,
	View,
	ScrollView,
} from 'react-native';
import { useEffect, useState } from 'react';
import FormRegistroEmocional from './FormRegistroEmocional';
import { Emocion } from '../../interfaces/EmocionApi';
import { Colors } from '../../constants/colors';
import { AntDesign } from '@expo/vector-icons';
import { updateRegistroEmocionThunk } from '../../store/slices/calendario/thunks';
import { useDispatch } from 'react-redux';

interface ModalUpdateProps {
	modalEditVisible: boolean;
	setModalEditVisible: React.Dispatch<React.SetStateAction<boolean>>;
	emocion: Emocion;
}

const ModalFormUpdateRegistro: React.FC<ModalUpdateProps> = ({
	modalEditVisible,
	setModalEditVisible,
	emocion,
}) => {
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
	const [desencadenante, setDesencadenante] = useState(
		emocion.desencadenante
	);
	const [notaDelDia, setNotaDelDia] = useState(emocion.notaDelDia);
	const [etiquetas, setEtiquetas] = useState(
		emocion.etiquetas.map(etiqueta => etiqueta.nombre)
	);

	const dispatch = useDispatch();

	useEffect(() => {
		const selectedEmojis = iconosEmojis.map(emoji => {
			return {
				...emoji,
				checked: emocion.emociones.includes(emoji.name),
			};
		});

		setIconosEmojis(selectedEmojis);
	}, []);

	const editEmocion = () => {
		const emocionesSeleccionadas = iconosEmojis
			.filter(emoji => emoji.checked)
			.map(emoji => emoji.name);

		if (emocionesSeleccionadas.length === 0) {
			alert('Debe seleccionar al menos una emoción');
			return;
		}

		dispatch(
			updateRegistroEmocionThunk(
				emocion.id,
				emocionesSeleccionadas,
				notaDelDia,
				desencadenante,
				etiquetas
			)
		);
		setModalEditVisible(false);
	};

	return (
		<Modal
			animationType='slide'
			visible={modalEditVisible}
			onRequestClose={() => setModalEditVisible(false)}
		>
			<ScrollView>
				<View style={styles.containerModal}>
					<FormRegistroEmocional
						buttonLabel='Actualizar'
						desencadenante={desencadenante}
						etiquetas={etiquetas}
						notaDelDia={notaDelDia}
						iconosEmojis={iconosEmojis}
						onPress={() => editEmocion()}
						setIconosEmojis={setIconosEmojis}
						setDesencadenante={setDesencadenante}
						setEtiquetas={setEtiquetas}
						setNotaDelDia={setNotaDelDia}
					/>
				</View>
			</ScrollView>

			<Pressable
				onPress={() => setModalEditVisible(false)}
				style={styles.iconButtonContainer}
			>
				<AntDesign
					name='close'
					size={18}
					style={styles.iconButtonClose}
				/>
			</Pressable>
		</Modal>
	);
};

export default ModalFormUpdateRegistro;

const styles = StyleSheet.create({
	containerModal: {
		flex: 1,
		backgroundColor: Colors.light,
		padding: 20,
		gap: 20,
		paddingVertical: 50,
	},
	iconButtonContainer: {
		position: 'absolute',
		top: 20,
		right: 25,
		padding: 10,
		shadowColor: '#000',
		shadowOffset: {
			width: 0,
			height: 0,
		},
		shadowRadius: 5,
		shadowOpacity: 0.35,
		elevation: 3,
		backgroundColor: Colors.secondary,
		borderRadius: 500,
	},
	iconButtonClose: {
		color: Colors.primary,
	},
});
