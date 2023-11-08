import { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Colors } from '../constants/colors';
import CountryPicker from 'react-native-country-picker-modal';
import { TextInput } from 'react-native';
import { Entypo } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { StatusBar } from 'react-native';
import { formatInternationalNumber } from '../helpers/helpers';

const CelularScreen = ({ route, navigation }) => {
	const { user } = route.params;

	const [countryCode, setCountryCode] = useState('EC');
	const [country, setCountry] = useState(null);
	const [callingCode, setCallingCode] = useState('593');
	const [numberPhone, setNumberPhone] = useState('');

	const onSelect = country => {
		setCountryCode(country.cca2);
		setCountry(country);
		setCallingCode(country.callingCode[0]);
		console.log(country.callingCode);
	};

	const onNextFormularioInicial = () => {
		if (numberPhone.length < 1) {
			alert('El número no puede estar vacío');
			return;
		}

		const number = formatInternationalNumber(
			numberPhone,
			callingCode
		);

		navigation.navigate('FormularioInicial', {
			user: { ...user, contactoEmergencia: number },
		});
	};

	return (
		<View style={[styles.container]}>
			<View style={{ flex: 1, justifyContent: 'center' }}>
				<View style={styles.header}>
					<Text style={styles.title}>Contacto de Emergencia</Text>
					<Text style={styles.paragraph}>Registra ......</Text>
				</View>
				<View style={{ flex: 1 }}>
					<View style={styles.containerInput}>
						<View style={styles.containerCountryPicker}>
							<CountryPicker
								{...{
									countryCode,
									onSelect,
								}}
								withCallingCode
								withFilter={true}
							/>
							<Text style={styles.textCountryPicker}>
								+{country ? country.callingCode : callingCode}
							</Text>
						</View>
						<TextInput
							style={styles.phoneInput}
							placeholder='Número de teléfono'
							onChangeText={setNumberPhone}
							value={numberPhone}
							keyboardType='phone-pad'
						/>
					</View>
				</View>
			</View>

			<TouchableOpacity
				onPress={onNextFormularioInicial}
				style={styles.buttonNext}
			>
				<Text style={styles.textButtonNext}>Continuar</Text>
			</TouchableOpacity>
		</View>
	);
};

export default CelularScreen;

const styles = StyleSheet.create({
	container: {
		paddingHorizontal: 25,
		justifyContent: 'center',
		flex: 1,
		backgroundColor: Colors.light,
		paddingVertical: StatusBar.currentHeight + 15,
		gap: 15,
	},
	header: {
		flex: 1,
		justifyContent: 'center',
		gap: 30,
	},
	title: {
		fontFamily: 'Quicksand700',
		fontSize: 30,
		color: Colors.secondary,
		textAlign: 'center',
	},
	paragraph: {
		fontFamily: 'Quicksand500',
	},
	containerInput: {
		flexDirection: 'row',
		borderWidth: 2,
		borderColor: Colors.primary,
		height: 70,
		borderRadius: 12,
		overflow: 'hidden',
	},
	containerCountryPicker: {
		flexDirection: 'row',
		alignItems: 'center',
		paddingHorizontal: 10,
	},
	textCountryPicker: {
		fontFamily: 'Quicksand700',
		fontSize: 18,
	},
	iconCountryPicker: {
		color: Colors.secondary,
	},
	phoneInput: {
		borderLeftWidth: 2,
		borderLeftColor: Colors.primary,
		flex: 1,
		fontFamily: 'Quicksand700',
		paddingHorizontal: 15,
		fontSize: 18,
	},
	buttonNext: {
		backgroundColor: Colors.primary,
		padding: 15,
		borderRadius: 10,
		justifyContent: 'center',
		alignItems: 'center',
	},
	textButtonNext: {
		color: Colors.light,
		textAlign: 'center',
		fontSize: 16,
	},
});
