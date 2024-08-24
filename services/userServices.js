import apiRoutes from "../api_paths";
import axios from "axios";

const registrarUsuario = async (usuario) => {
    try {
        const response = await axios.post(apiRoutes.registrarUsuario(), usuario);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
}