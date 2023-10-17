import { StyleSheet, Text, View, Pressable } from 'react-native';
import React from 'react';
import { globalStyles } from '../../styles/global';
import { Colors } from '../../constants/colors';
import { ScrollView } from 'react-native-gesture-handler';

interface calendarioProps {
	setCurrentView: React.Dispatch<
		React.SetStateAction<
			'calendario' | 'registroEmocional' | 'estadisticas'
		>
	>;
	children?: JSX.Element | JSX.Element[];
	currentView: 'calendario' | 'registroEmocional' | 'estadisticas';
}

const CalendarioLayout: React.FC<calendarioProps> = ({
	setCurrentView,
	children,
	currentView,
}) => {
	return (
		<View style={[globalStyles.screenContainer, styles.container]}>
			<View style={styles.containerButtons}>
				<Pressable
					style={[
						styles.button,
						currentView === 'calendario' ? styles.buttonActive : {},
					]}
					onPress={() => setCurrentView('calendario')}
				>
					<Text style={styles.textButton}>Calendario</Text>
				</Pressable>
				<Pressable
					style={[
						styles.button,
						currentView === 'registroEmocional'
							? styles.buttonActive
							: {},
					]}
					onPress={() => setCurrentView('registroEmocional')}
				>
					<Text style={styles.textButton}>Emociones</Text>
				</Pressable>
				<Pressable
					style={[
						styles.button,
						currentView === 'estadisticas' ? styles.buttonActive : {},
					]}
					onPress={() => setCurrentView('estadisticas')}
				>
					<Text style={styles.textButton}>Estadisticas</Text>
				</Pressable>
			</View>
			{/* Contenido */}
			<ScrollView style={{ flex: 1, marginBottom: 10 }}>
				{children}
			</ScrollView>
		</View>
	);
};

export default CalendarioLayout;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 20,
		gap: 15,
	},
	containerButtons: {
		flexDirection: 'row',
		gap: 10,
		width: '100%',
	},
	button: {
		padding: 5,
		borderRadius: 7,
		borderWidth: 1,
		borderColor: Colors.secondary,
		flex: 1,
		alignItems: 'center',
	},
	textButton: {
		color: Colors.secondary,
		fontSize: 12,
		fontWeight: '500',
		fontFamily: 'Quicksand700',
	},
	buttonActive: {
		backgroundColor: Colors.primary,
	},
});
