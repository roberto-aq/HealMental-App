import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Button,
	TouchableOpacity,
} from 'react-native';
import { globalStyles } from '../../styles/global';
import { useDispatch, useSelector } from 'react-redux';
import { getNotasThunk } from '../../store/slices/notas/thunks';
import NotaList from '../../components/notas/NotaList';
import { Colors } from '../../constants/colors';
import { RootState } from '../../store/store';
import Splash from '../Splash';
import ModalNewNota from '../../components/notas/ModalNewNota';
import NotFoundNotas from '../../components/notas/NotFoundNotas';

const NotasScreen = () => {
	const dispatch = useDispatch();
	const { notas, isLoading } = useSelector(
		(state: RootState) => state.notas
	);
	const [isModalVisible, setIsModalVisible] = useState(false);

	const getNotasByUser = () => {
		dispatch(getNotasThunk());
	};

	useEffect(() => {
		getNotasByUser();
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			{notas.length ? <NotaList notas={notas} /> : <NotFoundNotas />}
			<View style={styles.containerButtonNew}>
				<TouchableOpacity
					style={styles.buttonNew}
					onPress={() => setIsModalVisible(true)}
				>
					<Text style={styles.textButtonNew}>Nueva Nota</Text>
				</TouchableOpacity>
			</View>
			<ModalNewNota
				isModalVisible={isModalVisible}
				setIsModalVisible={setIsModalVisible}
			/>
		</View>
	);
};

export default NotasScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	containerButtonNew: {
		height: 80,
		justifyContent: 'center',
	},
	buttonNew: {
		width: '100%',
		backgroundColor: Colors.primary,
		borderRadius: 12,
		paddingVertical: 15,
		alignItems: 'center',
		justifyContent: 'center',
	},
	textButtonNew: {
		color: Colors.secondary,
		fontSize: 14,
		fontWeight: 'bold',
	},
});
