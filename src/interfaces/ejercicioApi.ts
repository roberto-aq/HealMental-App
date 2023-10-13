export interface Ejercicio {
	id: string;
	nombre: string;
	categoria: string;
	descripcionCorta: string;
	descripcionLarga: string;
	beneficios: string[];
	instrucciones: string[];
	duracion: string;
	media: null | string;
	dificultad: string;
	frecuenciaRecomendada: string;
	plan: string;
}
