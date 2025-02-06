import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { urlPeliculas } from "../utils/endpoints";
import FormularioPeliculas from "./FormularioPeliculas";
import { peliculaCreacionDTO, PeliculasPutGetDTO } from "./peliculas.model";
import Cargando from "../utils/Cargando";
import { convertirPeliculaAFormData } from "../utils/formDataUtils";
import MostrarErrores from "../utils/MostrarErrores";

export default function EditarPeliculas(){

    const [pelicula, setPelicula] = useState<peliculaCreacionDTO>();
    const [peliculaPutGet, setPeliculaPutGet] = useState<PeliculasPutGetDTO>();
    const [errores, setErrores] = useState<string[]>([]);
    const {id}: any = useParams();
    const navigate = useNavigate();
    useEffect(() => {
        axios.get(`${urlPeliculas}/PutGet/${id}`)
         .then((respuesta: AxiosResponse<PeliculasPutGetDTO>) => {
            const modelo: peliculaCreacionDTO = {

                titulo: respuesta.data.pelicula.titulo,
                enCines: respuesta.data.pelicula.enCines,
                trailer: respuesta.data.pelicula.trailer,
                posterURL: respuesta.data.pelicula.poster,
                resumen: respuesta.data.pelicula.resumen,
                fechaLanzamiento: new Date(respuesta.data.pelicula.fechaLanzamiento)  
            };
            setPelicula(modelo);
            setPeliculaPutGet(respuesta.data);
         })
    }, [id])

    async function editar(peliculaEditar: peliculaCreacionDTO) {
        try {
            const formData = convertirPeliculaAFormData(peliculaEditar); 
    
            await axios({
                method: 'put',
                url: `${urlPeliculas}/${id}`,
                data: formData,
                headers: { 'Content-Type': 'multipart/form-data' }
            });
    
            navigate(`/pelicula/${id}`);
    
        } catch (error: any) {
         
            setErrores(error.response?.data);
        }
    }
    

    return(
        <>
        <h3>Editar Peliculas</h3>
        <MostrarErrores errores={errores}/> 
        {pelicula && peliculaPutGet ? <FormularioPeliculas 
        actoresSeleccionados={peliculaPutGet.actores}
        cinesNoSeleccionados={peliculaPutGet.cinesNoSeleccionados}
        cinesSeleccionados={peliculaPutGet.cinesSeleccionados}
        generosNoSeleccionados={peliculaPutGet.generosNoSeleccionados}
        generosSeleccionados={peliculaPutGet.generosSeleccionados}
        modelo={pelicula}
        onSubmit={async valores => await editar(valores)}
        />: <Cargando/>  }

        </>
    )
}