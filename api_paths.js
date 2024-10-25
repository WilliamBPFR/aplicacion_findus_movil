import {API_BASE_URL} from "@env"

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,
    solicitarCambioContrasena: () => `${API_BASE_URL}/user/solicitar_cambio_contrasena`,
    verificar_codigo_cambio_contrasena: () => `${API_BASE_URL}/user/verificar_codigo_cambio_contrasena`,
    cambiar_contrasena: () => `${API_BASE_URL}/user/cambiar_contrasena`,
    loginUsuario: () => `${API_BASE_URL}/user/login`,
    obtenerFotoPerfilUsuario: () => `${API_BASE_URL}/user/obtener_foto_perfil_usuario`,

    //Rutas Tipo de Documento
    obtenerTiposDocumentos: () => `${API_BASE_URL}/tipo_documento/obtenerTipoDocumento`,

    //Rutas de Publicacion
    obtenerPublicacionesScrollGrande: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidosActivosScrollGrande/`,
    obtenerPublicacionesScrollHorizontal: () => `${API_BASE_URL}/desaparecido/obtenerDesaparecidosActivosScrollHorizontal`,
    obtenerPublicacion: (id) => `${API_BASE_URL}/desaparecido/obtenerDesaparecido${id}`,
    crearPublicacion: () => `${API_BASE_URL}/desaparecido/crearDesaparecido`,
    actualizarPublicacion: (id) => `${API_BASE_URL}/desaparecido/updateDesaparecido/${id}`,
    eliminarPublicacion: (id) => `${API_BASE_URL}/desaparecido/deleteDesaparecido/${id}`,

    // Fotos publicacion
    subirArchivo: () => `${API_BASE_URL}/fotospublicacion/crearFotoPublicacion`,
    
    // Otras rutas
    // ...
};

export default apiRoutes;
