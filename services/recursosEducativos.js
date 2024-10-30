import apiRoutes from "../api_paths";
import axios from "axios";

export const obtenerRecursosEducativosActivos = async (page,limit) => {
    try {
        const response = await axios.get(`${apiRoutes.obtenerMaterialEducativoActivo()}/${page}/${limit}`);
        return response;
    } catch (error) {
        return error.response;
    }
}