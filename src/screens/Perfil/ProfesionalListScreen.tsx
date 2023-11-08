import { useEffect } from 'react';
import { StyleSheet, Text, View, FlatList } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { getProfesionalesThunk } from '../../store/slices/Perfil/thunks';
import { RootState } from '../../store/store';
import { Colors } from '../../constants/colors';
import { globalStyles } from '../../styles/global';
import Splash from '../Splash';
import CardProfesional from '../../components/Perfil/CardProfesional';

const ProfesionalListScreen = () => {
	const dispatch = useDispatch();

	const { profesionales, isLoading } = useSelector(
		(state: RootState) => state.perfil
	);

	const getProfesionales = () => {
		dispatch(getProfesionalesThunk());
	};

	useEffect(() => {
		getProfesionales();
	}, []);

	if (isLoading) return <Splash />;

	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			{profesionales.length > 0 ? (
				<>
					<Text style={styles.textTitle}>
						Profesionales Disponibles
					</Text>
					<FlatList
						data={profesionales}
						keyExtractor={profesional => profesional.id}
						renderItem={({ item }) => <CardProfesional item={item} />}
						ListHeaderComponent={() => (
							<View style={{ marginTop: 20 }}></View>
						)}
						ItemSeparatorComponent={() => (
							<View style={{ height: 10 }}></View>
						)}
						ListFooterComponent={() => (
							<View style={{ marginTop: 20 }}></View>
						)}
					/>
				</>
			) : (
				<Text style={styles.textTitle}>
					No existen registros de Profesionales
				</Text>
			)}
		</View>
	);
};

export default ProfesionalListScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
	},
	textTitle: {
		color: Colors.secondary,
		fontFamily: 'Quicksand700',
		fontSize: 20,
		textAlign: 'center',
	},
});
