import { Colors } from '../constants/colors';
import { emocionesImagesProps } from '../interfaces/props';

export const formatDate = (dateString: string) => {
	const date = new Date(dateString);
	const day = String(date.getUTCDate()).padStart(2, '0');
	const month = String(date.getUTCMonth() + 1).padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
	const year = String(date.getUTCFullYear()); // Obtiene los últimos dos dígitos del año
	return `${day}-${month}-${year}`;
};

export const shortenText = (text: string, maxLength = 50) => {
	if (text.length <= maxLength) return text;
	return text.slice(0, maxLength) + '...';
};

// Función para determinar que color mostrar en el ejercicio
export const getColorByCategory = (categoria: string) => {
	switch (categoria) {
		case 'sueño':
			return Colors.categoriaSueño;
		case 'animo':
			return Colors.categoriaAnimo;
		case 'ansiedad':
			return Colors.categoriaAnsiedad;
		case 'estres':
			return Colors.categoriaEstres;
		default:
			return Colors.primary;
	}
};

export const emocionesImages: emocionesImagesProps = {
	Neutral: require('../../assets/emojis-calendario/icono-neutral.png'),
	Cansado: require('../../assets/emojis-calendario/icono-cansado.png'),
	Enojado: require('../../assets/emojis-calendario/icono-enojado.png'),
	Relajado: require('../../assets/emojis-calendario/icono-relajado.png'),
	Feliz: require('../../assets/emojis-calendario/icono-feliz.png'),
	Triste: require('../../assets/emojis-calendario/icono-triste.png'),
	Estresado: require('../../assets/emojis-calendario/icono-estresado.png'),
	Motivado: require('../../assets/emojis-calendario/icono-motivado.png'),
	Ansioso: require('../../assets/emojis-calendario/icono-ansioso.png'),
};

// OBTENER COLORES ALEATORIOS PARA NOTAS
export const coloresAleatorios = [
	'#FFC8DD',
	'#E6F8B2',
	'#CDB4DB',
	'#A5FFD6',
];
export const obtenerColorAleatorio = (colores: string[]) => {
	const indiceAleatorio = Math.floor(Math.random() * colores.length);
	return colores[indiceAleatorio];
};

// VALIDAR CARACTERES ESPECiALES PAXI - NO ESTA CORRECTO, HAY QUE MEJORARLO
export const contieneCaracteresEspeciales = (texto: string) => {
	// Definir los caracteres que deseas permitir. Agrega o elimina según sea necesario.
	const regexp = /^[a-zA-Z0-9 .,!?]*$/;
	return !regexp.test(texto);
};

// VALIDAR FORMATO DE CELULAR
export const formatInternationalNumber = (
	number: string,
	callingCode: string
) => {
	// Si el número ya comienza con el código de país, devolverlo tal cual
	if (number.startsWith(callingCode)) {
		return `+${number}`;
	}

	// Remover cero inicial si lo hay (asumiendo que todos los números se introducen en formato local)
	const numberWithoutZeroPrefix = number.replace(/^0+/, '');

	// Retornar el número formateado con el código de país
	return `${callingCode}${numberWithoutZeroPrefix}`;
};
