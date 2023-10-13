import { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import RegistroEmocional from './RegistroEmocional';
import CalendarioComponent from '../../components/calendario/CalendarioComponent';
import CalendarioLayout from '../../components/calendario/CalendarioLayout';
import EstadisticasScreen from './EstadisticasScreen';

const CalendarioScreen = ({ navigation }) => {
	const [currentView, setCurrentView] = useState<
		'calendario' | 'registroEmocional' | 'estadisticas'
	>('calendario');

	const renderCurrentView = () => {
		switch (currentView) {
			case 'registroEmocional':
				return <RegistroEmocional />;
			case 'estadisticas':
				return <EstadisticasScreen />;
			default:
				return <CalendarioComponent />;
		}
	};

	return (
		<CalendarioLayout
			setCurrentView={setCurrentView}
			currentView={currentView}
		>
			{renderCurrentView()}
		</CalendarioLayout>
	);
};

export default CalendarioScreen;

const styles = StyleSheet.create({});
