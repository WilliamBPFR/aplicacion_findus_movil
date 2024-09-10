import apiRoutes from "../api_paths";
import axios from "axios";
import * as SecureStore from "expo-secure-store";


const formato_nombres = (nombres) => {
    return nombres.trim() // Eliminar espacios al principio y al final
                  .toLowerCase() // Convertir toda la cadena a minúsculas
                  .split(' ') // Dividir la cadena en palabras
                  .map(word => word.charAt(0).toUpperCase() + word.slice(1)) // Capitalizar la primera letra de cada palabra
                  .join(' '); // Volver a unir las palabras con un espacio en blanco
}

const guardarToken = async (token) => {
    try {
        await SecureStore.setItemAsync('token', token);
        console.log("Token guardado");
        return true;
    } catch (error) {
        console.log("Error al guardar token: ",error);
        return false;
    }
}

const obtenerToken = async () => {
    try {
        const token = await SecureStore.getItemAsync('token');
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
const registrarUsuario = async (usuario) => {
    try {
        const response = await axios.post(apiRoutes.registrarUsuario(), usuario);
        return response;
    } catch (error) {
        return error.response;
    }
}

const confirmarCorreo = async (data) => {
    try {
        const response = await axios.post(apiRoutes.confirmarCorreo(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

const solicitarCambioContrasena = async (data) => {
    try {
        console.log("KLKKKK")
        const response = await axios.post(apiRoutes.solicitarCambioContrasena(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

const login = async (data) => {
    try {
        const response = await axios.post(apiRoutes.loginUsuario(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

const verificarCodigoCambioContrasena = async (data) => {
    try {
        const response = await axios.post(apiRoutes.verificar_codigo_cambio_contrasena(), data);
        return response;
    } catch (error) {
        return error.response;
    }
}

const  cambiarContrasena = async (data, token) => {
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


//Exportar funciones
module.exports = {
    registrarUsuario,
    formato_nombres,
    confirmarCorreo,
    solicitarCambioContrasena,
    verificarCodigoCambioContrasena,
    cambiarContrasena,
    guardarToken,
    obtenerToken,
    login
}