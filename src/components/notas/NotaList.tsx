import { FlatList, StyleSheet, Text, View } from 'react-native';
import { NotaListProps } from '../../interfaces/props';
import NotaCard from './NotaCard';

const NotaList: React.FC<NotaListProps> = ({ notas }) => {
	return (
		<View style={styles.container}>
			<FlatList
				data={notas}
				keyExtractor={nota => nota.id.toString()}
				renderItem={({ item }) => <NotaCard nota={item} />}
			/>
		</View>
	);
};

export default NotaList;

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
});
