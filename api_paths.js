import {API_BASE_URL} from "@env"
import { publicacionesByUser } from "./services/publicacionServices";

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,
    solicitarCambioContrasena: () => `${API_BASE_URL}/user/solicitar_cambio_contrasena`,
    verificar_codigo_cambio_contrasena: () => `${API_BASE_URL}/user/verificar_codigo_cambio_contrasena`,
    cambiar_contrasena: () => `${API_BASE_URL}/user/cambiar_contrasena`,
    loginUsuario: () => `${API_BASE_URL}/user/login`,
    obtenerInfoBasicaUser : () => `${API_BASE_URL}/user/obtener_info_basica_user`,

    //Rutas Tipo de Documento
    obtenerTiposDocumentos: () => `${API_BASE_URL}/tipo_documento/obtenerTipoDocumento`,

    //Rutas de Publicacion
    obtenerPublicacionesScrollGrande: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidosActivosScrollGrande/`,
    obtenerPublicacionesScrollHorizontal: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidosActivosScrollHorizontal`,
    obtenerPublicacion: (id) => `${API_BASE_URL}/desaparecido/obtenerDesaparecido${id}`,
    crearPublicacion: () => `${API_BASE_URL}/desaparecido/crearDesaparecido`,
    actualizarPublicacion: (id) => `${API_BASE_URL}/desaparecido/updateDesaparecido/${id}`,
    eliminarPublicacion: (id) => `${API_BASE_URL}/desaparecido/deleteDesaparecido/${id}`,
    publicacionesByUser: (id) => `${API_BASE_URL}/desaparecido/obtenerDesaparecidosByUser`,
    obtenerInfoDesaparecidoByID: (id) => `${API_BASE_URL}/desaparecido/obtenerInfoDesaparecidoByID/${id}`,
    crearComentarioPublicaciones: () => `${API_BASE_URL}/desaparecido/crearComentarioPublicaciones`,
    
    //Rutas de Avistamientos
    crearAvistamiento: () => `${API_BASE_URL}/avistamiento/crearAvistamiento`,
    subirFotoAvistamiento: () => `${API_BASE_URL}/avistamiento/subirFotoAvistamiento`,

    // Fotos publicacion
    subirArchivo: () => `${API_BASE_URL}/fotospublicacion/crearFotoPublicacion`,
    

    //Material Educativo
    obtenerMaterialEducativoActivo: () => `${API_BASE_URL}/recursos_educativos/get_recursos_educativos_activos`,
    // Otras rutas
    // ...
};

export default apiRoutes;
