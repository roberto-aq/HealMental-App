import { Nota } from './notasApi';

export interface props {
	children?: JSX.Element | JSX.Element[];
}

export interface NotaListProps {
	notas: Nota[];
}

// INTERFACES PARA HELPERS
// OBJETO DE IMÁGENES
export interface emocionesImagesProps {
	Neutral: any;
	Cansado: any;
	Enojado: any;
	Relajado: any;
	Feliz: any;
	Triste: any;
	Estresado: any;
	Motivado: any;
	Ansioso: any;
	[key: string]: any;
}
