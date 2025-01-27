import axios from "axios";
import FormularioGeneros from "./FormularioGeneros";
import { generoCreacionDTO } from "./genero.model";
import { urlGeneros } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";

export default function CrearGeneros() {
    const navigate = useNavigate();
    async function crear(genero: generoCreacionDTO) {
        try {
            await axios.post(urlGeneros, genero);
            navigate('/generos');
        }
        catch (error) {
            console.error(error)
        }

    }

    return (
        <>

             <h3 className="text-white">Géneros</h3> 

            <FormularioGeneros modelo={{ nombre: '' }}
                onSubmit={async valores => {
                    await crear(valores);
                }
                } />


        </>
    );
}
