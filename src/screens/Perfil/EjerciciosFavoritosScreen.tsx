import { StyleSheet, Text, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../../store/store';
import Splash from '../Splash';
import { globalStyles } from '../../styles/global';
import { getEjerciciosFavoritosThunk } from '../../store/slices/Perfil/thunks';
import { useEffect } from 'react';
import NotFoundEjerciciosFavoritos from '../../components/Perfil/NotFoundEjerciciosFavoritos';
import EjerciciosFavoritosList from '../../components/Perfil/EjerciciosFavoritosList';

const EjerciciosFavoritosScreen = () => {
	const dispatch = useDispatch();

	const { isLoading, ejerciciosFavoritos } = useSelector(
		(state: RootState) => state.perfil
	);

	const getEjerciciosFavoritosOfUser = async () => {
		dispatch(getEjerciciosFavoritosThunk());
	};

	useEffect(() => {
		getEjerciciosFavoritosOfUser();
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			{ejerciciosFavoritos.length ? (
				<EjerciciosFavoritosList ejercicios={ejerciciosFavoritos} />
			) : (
				<NotFoundEjerciciosFavoritos />
			)}
		</View>
	);
};

export default EjerciciosFavoritosScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
});
