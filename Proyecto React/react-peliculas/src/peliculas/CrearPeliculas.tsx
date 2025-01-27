import { useEffect, useState } from "react";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/genero.model";
import FormularioPeliculas from "./FormularioPeliculas";
import axios, { AxiosResponse } from "axios";
import { urlPeliculas } from "../utils/endpoints";
import { peliculaCreacionDTO, peliculasPostGetDTO } from "./peliculas.model";
import { boolean } from "yup";
import Cargando from "../utils/Cargando";
import { useNavigate } from "react-router-dom";
import { convertirPeliculaAFormData } from "../utils/formDataUtils";
import MostrarErrores from "../utils/MostrarErrores";

export default function CrearPeliculas(){

    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState<generoDTO[]>([]);
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState<cineDTO[]>([]);
    const [errores, setErrores] = useState<string[]>([]);
    const [cargado, setCargado] = useState(false);
    const navigate = useNavigate();

    useEffect(()=> {
        axios.get(`${urlPeliculas}/postget`)
        .then((respuesta: AxiosResponse<peliculasPostGetDTO>) => {
           setGenerosNoSeleccionados(respuesta.data.generos);
           setCinesNoSeleccionados(respuesta.data.cines);
           setCargado(true);
        })
    }, [])

    async function crear(pelicula: peliculaCreacionDTO) {

        try{
            const formData = convertirPeliculaAFormData(pelicula);

            await axios({
                method: 'post',
                url: urlPeliculas,
                data: formData,
                headers: {'Content-Type': 'multipart/form-data'}
            }).then((respuesta: AxiosResponse<number>) => {
                navigate(`/pelicula/${respuesta.data}`)
            })
        }
        catch(error){
        
            setErrores(error.response.data)

        }
        
    }

   
    return(
        <>
        <h3 className="text-white">CrearPeliculas</h3>
        <MostrarErrores errores={errores}/>
        {cargado ? 
        <FormularioPeliculas 
        actoresSeleccionados={[]}
        cinesNoSeleccionados={cinesNoSeleccionados}
        cinesSeleccionados={[]}
        generosNoSeleccionados={generosNoSeleccionados}
        generosSeleccionados={[]}
        modelo={{titulo: '', enCinces: false, trailer: '' }}
        onSubmit={async valores => crear(valores)}
        /> : <Cargando/> }
        </>
    )
}