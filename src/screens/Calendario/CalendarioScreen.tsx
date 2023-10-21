import { useState } from 'react';
import { StyleSheet } from 'react-native';
import RegistroEmocional from './RegistroEmocional';
import CalendarioComponent from '../../components/calendario/CalendarioComponent';
import CalendarioLayout from '../../components/calendario/CalendarioLayout';
import EstadisticasScreen from './EstadisticasScreen';

const CalendarioScreen = ({ navigation }) => {
	const [currentView, setCurrentView] = useState<
		'calendario' | 'registroEmocional' | 'estadisticas'
	>('calendario');

	const regresarCalendario = () => {
		setCurrentView('calendario');
	};

	const renderCurrentView = () => {
		switch (currentView) {
			case 'registroEmocional':
				return (
					<RegistroEmocional
						regresarCalendario={regresarCalendario}
					/>
				);
			case 'estadisticas':
				return <EstadisticasScreen />;
			case 'calendario':
				return <CalendarioComponent />;
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
