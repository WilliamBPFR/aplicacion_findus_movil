import apiRoutes from "../api_paths";
import axios from "axios";


//SERVICIOS LOCALES
export const formatearFecha = (fecha) => {
    const fechaDesaparicion = new Date(fecha);
    const dia = fechaDesaparicion.getDate();
    const mes = fechaDesaparicion.getMonth() + 1;
    const anio = fechaDesaparicion.getFullYear();
    return `${dia}/${mes}/${anio}`;
}


export const formatearFechaComentario = (fecha) => {
    // Funcion para poner la fecha de publicacion de un comentario en el siguiente formato:
    // -- Si es hace menos de un dia: "Publicado hace x horas"
    // -- Si es entre 1 dia y 6 dias: "Publicado hace x días"
    // -- Si es de 7 dias en adelante: "Publicado el 12 de septiembre del 2024"
    const fechaComentario = new Date(fecha);
    const fechaActual = new Date();
    const diferencia = fechaActual - fechaComentario;
    const segundos = Math.floor(diferencia / 1000);
    const minutos = Math.floor(segundos / 60);
    const horas = Math.floor(minutos / 60);
    const dias = Math.floor(horas / 24);
    if (minutos < 0) {
        return `Publicado hace menos de un minuto`;
    } else if (minutos < 60) {
        return `Publicado hace ${minutos} minutos`;
    } else if (dias < 0) {
        return `Publicado hace ${horas} horas`;
    } else if (dias >= 1 && dias <= 6) {
        return `Publicado hace ${dias} días`;
    } else {
        const dia = fechaComentario.getDate();
        const mes = fechaComentario.toLocaleDateString('es-ES', { month: 'long' });
        const anio = fechaComentario.getFullYear();
        return `Publicado el ${dia} de ${mes} del ${anio}`;
    }
}

//SERVICIOS DE LLAMADAS A LA API
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

export const obtenerInfoDesaparecidoByID = async (id) => {
    try {
        const response = await axios.get(apiRoutes.obtenerInfoDesaparecidoByID(id));
        return response;
    } catch (error) {
        return error.response;
    }
}

export const crearComentario = async (data,token) => {
    try {
        const response = await axios.post(apiRoutes.crearComentarioPublicaciones(), data,
        {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

// obtener publicaciones por usuario, pasando el token
export const publicacionesByUser = async (token) => {
    try {
        const response = await axios.get(apiRoutes.publicacionesByUser(), {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return response;
    } catch (error) {
        return error.response;
    }
}

// cerrar publicacion, pasando el id de la publicacion sin token
export const cerrarPublicacion = async (id,tipoCierre) => {
    try {
        const response = await axios.put(apiRoutes.cerrarPublicacion(id,tipoCierre));
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
