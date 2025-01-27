import axios from "axios";
import { actorCreacionDTO } from "./actores.model";
import FormularioActores from "./FormularioActores";
import { urlActores } from "../utils/endpoints";
import { useNavigate } from "react-router-dom";
import MostrarErrores from "../utils/MostrarErrores";
import { useState } from "react";
import { convertirActorFormData } from "../utils/formDataUtils";

export default function CrearActores(){

    const [errores, setErrores] = useState<string[]>([]);
    
    const navigate = useNavigate();

    async function crear(actor:actorCreacionDTO) {
        try{
            const formData = convertirActorFormData(actor);
            await axios({
                method: 'post',
                url: urlActores,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            });
            navigate('/actores')
        }catch(error){
            setErrores(error.response.data);
        }
    }
    return(
        <>
        <h3>Crear Actor</h3>
        {/* <MostrarErrores errores={errores}/> */}
        <FormularioActores modelo={{nombre: '', fechaNacimiento: undefined}}
        onSubmit={async valores => {
            console.log(valores);
            await crear(valores);
        }}
        />
        </>
          
    )
}