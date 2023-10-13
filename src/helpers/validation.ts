export const validarEmail = (email: string) => {
	const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
	return regex.test(email);
};

export const validarNombre = (nombreUsuario: string) => {
	// Ejemplo: asegurarse de que el nombre no esté vacío
	return nombreUsuario.trim().length > 0;
};

// ... otras funciones de validación ...
export const validarPassword = (password: string) => {
	return /^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{6,}$/.test(password);
};
