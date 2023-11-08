import { useEffect, useState } from 'react';
import {
	StyleSheet,
	Text,
	View,
	Image,
	TouchableOpacity,
} from 'react-native';
import { Colors } from '../../constants/colors';
import { Calendar, LocaleConfig } from 'react-native-calendars';
import { useDispatch, useSelector } from 'react-redux';
import { getEmocionesThunk } from '../../store/slices/calendario/thunks';
import { RootState } from '../../store/store';
import { emocionesImages } from '../../helpers/helpers';
import Splash from '../../screens/Splash';
import { useNavigation } from '@react-navigation/native';

LocaleConfig.locales['es'] = {
	monthNames: [
		'Enero',
		'Febrero',
		'Marzo',
		'Abril',
		'Mayo',
		'Junio',
		'Julio',
		'Agosto',
		'Septiembre',
		'Octubre',
		'Noviembre',
		'Diciembre',
	],
	monthNamesShort: [
		'Ene.',
		'Feb.',
		'Mar',
		'Abr',
		'May',
		'Jun',
		'Jul.',
		'Ago',
		'Sept.',
		'Oct.',
		'Nov.',
		'Dic.',
	],
	dayNames: [
		'Domingo',
		'Lunes',
		'Martes',
		'Miércoles',
		'Jueves',
		'Viernes',
		'Sábado',
	],
	dayNamesShort: [
		'Dom.',
		'Lun.',
		'Mar.',
		'Mié.',
		'Jue.',
		'Vie.',
		'Sáb.',
	],
	today: 'Hoy',
};
LocaleConfig.defaultLocale = 'es';

const CalendarioComponent = () => {
	const { emociones, isLoading } = useSelector(
		(state: RootState) => state.calendario
	);

	const navigation = useNavigation();

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getEmocionesThunk());
	}, [dispatch]);

	if (isLoading) return <Splash />;

	return (
		<Calendar
			// Establece el estilo inicial del calendario
			theme={{
				selectedDayBackgroundColor: '#333',
				selectedDayTextColor: 'gray',
				todayTextColor: '#00adf5',
				arrowColor: Colors.secondary,
				textDayFontWeight: '300',
				textDayHeaderFontWeight: '300',
				textDayFontSize: 16,
				textMonthFontWeight: 'bold',
				textMonthFontSize: 16,
				textDayHeaderFontSize: 16,
			}}
			dayComponent={({ date, state }) => {
				const registroDelDia = emociones.find(registroEmocion => {
					const fechaRegistro = registroEmocion.fecha.split('T')[0];
					return fechaRegistro === date?.dateString;
				});

				let imagenEmocion;
				if (registroDelDia && registroDelDia.emociones[0]) {
					imagenEmocion =
						emocionesImages[registroDelDia.emociones[0]];
				}

				return (
					<View style={styles.containerDay}>
						<Text
							style={[
								styles.textDay,
								state === 'disabled' ? styles.textDayDisabled : {},
								state === 'today' ? styles.textToday : {},
							]}
						>
							{date?.day}
						</Text>
						<View style={styles.containerEmoji}>
							{imagenEmocion ? (
								<TouchableOpacity
									style={styles.viewEmoji}
									onPress={() => {
										if (registroDelDia) {
											navigation.navigate('DetalleEmocion', {
												fecha: date?.dateString,
											});
										}
									}}
								>
									<Image
										style={styles.imageEmoji}
										source={imagenEmocion}
									/>
								</TouchableOpacity>
							) : (
								<View
									style={[
										styles.circle,
										state === 'disabled' ? styles.circleDisabled : {},
										state === 'today' ? styles.circleToday : {},
									]}
								></View>
							)}
						</View>
					</View>
				);
			}}
		/>
	);
};

export default CalendarioComponent;

const styles = StyleSheet.create({
	containerDay: {
		alignItems: 'center',
		gap: 5,
		flex: 1,
	},
	textDay: {
		color: Colors.secondary,
		fontWeight: '700',
	},
	textDayDisabled: {
		color: '#e1e1e1',
	},
	textToday: {
		color: Colors.tertiary,
	},
	containerEmoji: {
		width: 40,
		height: 40,
	},
	circle: {
		width: '100%',
		height: '100%',
		backgroundColor: '#d3d3d3',
		borderRadius: 500,
	},

	circleDisabled: {
		backgroundColor: '#f5f5f5',
	},
	circleToday: {
		borderWidth: 2,
		borderColor: Colors.tertiary,
	},
	viewEmoji: {
		width: '100%',
		height: '100%',
		borderRadius: 500,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: 'transparent',
	},
	imageEmoji: {
		width: '115%',
		height: '115%',
	},
});
