export interface Emocion {
	id: string;
	emociones: string[];
	notaDelDia: string;
	desencadenante: string;
	fecha: string;
	etiquetas: Etiqueta[];
}

export interface Etiqueta {
	id: string;
	nombre: string;
}
