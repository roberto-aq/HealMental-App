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
