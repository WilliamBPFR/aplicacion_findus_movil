// API Link de prueba en Emulador de Android: en PC
const API_BASE_URL = 'http://10.0.2.2:3000/api';

// // API Link de prueba en Telefono Android
// const IP = "10.0.0.254";
// const API_BASE_URL = `http://${IP}:3000/api`;

const apiRoutes = {
    // Rutas de usuario
    registrarUsuario: () => `${API_BASE_URL}/user/registrar_usuario`,
    confirmarCorreo: () => `${API_BASE_URL}/user/confirmar_correo`,

    //Rutas Tipo de Documento
    obtenerTiposDocumentos: () => `${API_BASE_URL}/tipo_documento/obtenerTipoDocumento`,
    // Otras rutas
    // ...
};

export default apiRoutes;
