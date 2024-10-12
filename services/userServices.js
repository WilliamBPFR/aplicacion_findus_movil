import apiRoutes from "../api_paths";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


export const formato_nombres = (nombres) => {
    return nombres.trim() // Eliminar espacios al principio y al final
                  .toLowerCase() // Convertir toda la cadena a minúsculas
                  .split(' ') // Dividir la cadena en palabras
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
                  .join(' '); // Volver a unir las palabras con un espacio en blanco
}

export const guardarToken = async (token) => {
    try {
        await SecureStore.setItemAsync('token', token);
        console.log("Token guardado");
        return true;
    } catch (error) {
        console.log("Error al guardar token: ",error);
        return false;
    }
}

export const obtenerToken = () => {
    try {
        const token = SecureStore.getItem('token');
        if(token == null){
                console.log("Token no encontrado");
                return null;
            }
        return token;        
    } catch (error) {
        console.log("Error al obtener token: ",error);
        return null;
    }
}




//Funciones de comunicacion con el servidor
export const registrarUsuario = async (usuario) => {
    try {
        const response = await axios.post(apiRoutes.registrarUsuario(), usuario);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const confirmarCorreo = async (data) => {
    try {
        const response = await axios.post(apiRoutes.confirmarCorreo(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const solicitarCambioContrasena = async (data) => {
    try {
        console.log("KLKKKK")
        const response = await axios.post(apiRoutes.solicitarCambioContrasena(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const login = async (data) => {
    try {
        const response = await axios.post(apiRoutes.loginUsuario(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const verificarCodigoCambioContrasena = async (data) => {
    try {
        const response = await axios.post(apiRoutes.verificar_codigo_cambio_contrasena(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const  cambiarContrasena = async (data, token) => {
    try {
        const response = await axios.post(apiRoutes.cambiar_contrasena(), data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

// Funciones de Publicaciones

export const obtenerPublicaciones = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerPublicaciones());
        return response;
    } catch (error) {
        return error.response;
    }
}

export const obtenerPublicacion = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerPublicacion(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const crearPublicacion = async (data, token) => {
    try {
        const response = await axios.post(apiRoutes.crearPublicacion(), data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const actualizarPublicacion = async (id, data, token) => {
    try {
        const response = await axios.put(apiRoutes.actualizarPublicacion(id), data,{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

export const eliminarPublicacion = async (id, token) => {
    try {
        const response = await axios.delete(apiRoutes.eliminarPublicacion(id),{
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}




// //Exportar funciones
// module.exports = {
//     registrarUsuario,
//     formato_nombres,
//     confirmarCorreo,
//     solicitarCambioContrasena,
//     verificarCodigoCambioContrasena,
//     cambiarContrasena,
//     guardarToken,
//     obtenerToken,
//     login
// }