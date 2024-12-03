import { obtenerToken, validarUsuarioLogueado } from "../services/userServices";


export const checkUserState = async () => {
  try {
    const token = obtenerToken();
    if (token) {
      // Aquí puedes verificar el token con tu backend
      const response = await validarUsuarioLogueado(token);
      const isValid = response.status === 200;
      if (isValid) {
        console.log("Usuario autenticado");
        return true;
      } else {
        console.log("Token inválido");
        return false;
      }
    }
  } catch (error) {
    console.error("Error al verificar el token", error);
  }
};

