import axios from "axios";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { urlCuentas } from "../utils/endpoints";
import { useContext, useState } from "react";
import MostrarErrores from "../utils/MostrarErrores";
import { guadarTokenLocalStoraged, obtenerClaims } from "./manejadorJWT";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const { actualizar } = useContext(AuthContext);
    const [errores, setErrores] = useState<string[]>([]);
    const navigate = useNavigate();

    async function login(credenciales: credencialesUsuario) {
        try {
            const respuesta = await axios.post<respuestaAutenticacion>(
                `${urlCuentas}/login`,
                credenciales
            );
            guadarTokenLocalStoraged(respuesta.data);
            actualizar(obtenerClaims());
            navigate("/");
        } catch (error: any) {
            setErrores(error.response?.data || ["Error de conexión"]);
        }
    }

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">Iniciar Sesión</h3>
                <MostrarErrores errores={errores} />
                <FormularioAuth
                    modelo={{ email: "", password: "" }}
                    onSubmit={async (valores) => await login(valores)}
                />
            </div>
        </div>
    );
}
