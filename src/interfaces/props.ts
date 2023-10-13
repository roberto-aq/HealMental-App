import { Nota } from './notasApi';

export interface props {
	children?: JSX.Element | JSX.Element[];
}

export interface NotaListProps {
	notas: Nota[];
}
