import axios from "axios";
import { credencialesUsuario, respuestaAutenticacion } from "./auth.model";
import FormularioAuth from "./FormularioAuth";
import { urlCuentas } from "../utils/endpoints";
import { useContext, useState } from "react";
import { guadarTokenLocalStoraged, obtenerClaims } from "./manejadorJWT";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../utils/MostrarErrores";


export default function Registro() {
    const [errores, setErrores] = useState<string[]>([]);
    const {actualizar} = useContext(AuthContext);
    const navigate = useNavigate();

async function registrar(credenciales: credencialesUsuario) {

    try {
        const respuesta = await axios
            .post<respuestaAutenticacion>(`${urlCuentas}/crear`, credenciales);
                guadarTokenLocalStoraged(respuesta.data);
                        actualizar(obtenerClaims());
                        navigate("/")

        console.log(respuesta.data);
    } catch (error) {
        setErrores(error.response.data);
    }

}

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-800">
            <div className="bg-gray-900 p-8 rounded-2xl shadow-lg w-full max-w-md text-white">
                <h3 className="text-2xl font-bold mb-4 text-center">Registro</h3>
                <MostrarErrores errores={errores} />
                <FormularioAuth
                    modelo={{ email: "", password: "" }}
                    onSubmit={async (valores) => await registrar(valores)}
                />
            </div>
        </div>
    );

   
}