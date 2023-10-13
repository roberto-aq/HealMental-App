import { StyleSheet, Text, View, FlatList } from 'react-native';
import { Ejercicio } from '../../interfaces/ejercicioApi';
import EjercicioCard from '../EjercicioCard';
import { Colors } from '../../constants/colors';

interface ejerciciosProps {
	ejercicios: Ejercicio[];
}

const EjerciciosFavoritosList: React.FC<ejerciciosProps> = ({
	ejercicios,
}) => {
	return (
		<View>
			<Text style={styles.title}>Ejercicios que te gustan</Text>
			<FlatList
				data={ejercicios}
				keyExtractor={ejercicio => ejercicio.id}
				renderItem={({ item }) => <EjercicioCard item={item} />}
				ListFooterComponent={() => (
					<View style={{ marginBottom: 50 }}></View>
				)}
			/>
		</View>
	);
};

export default EjerciciosFavoritosList;

const styles = StyleSheet.create({
	container: {
		marginVertical: 10,
	},
	title: {
		textAlign: 'center',
		color: Colors.secondary,
		fontWeight: '700',
		fontSize: 24,
		paddingBottom: 20,
	},
});
