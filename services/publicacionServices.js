import apiRoutes from "../api_paths";
import axios from "axios";

export const obtenerPublicacionesScrollGrande = async (page,limit) => {
    try {
        const response = await axios.get(`${apiRoutes.obtenerPublicacionesScrollGrande()+page}/${limit}`);
        return response;
    } catch (error) {
        return error.response;
    }
}

export const obtenerPublicacionesScrollHorizontal = async () => {
    try {
        const response = await axios.get(apiRoutes.obtenerPublicacionesScrollHorizontal());
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
        const response = await axios.post(apiRoutes.crearPublicacion(), data, {
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
        const response = await axios.put(apiRoutes.actualizarPublicacion(id), data, {
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
        const response = await axios.delete(apiRoutes.eliminarPublicacion(id), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

// export {
//     obtenerPublicaciones,
//     obtenerPublicacion,
//     crearPublicacion,
//     actualizarPublicacion,
//     eliminarPublicacion
// }
