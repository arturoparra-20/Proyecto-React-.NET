import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlPeliculas } from "../utils/endpoints";
import { peliculaDTO } from "./peliculas.model";
import Cargando from "../utils/Cargando";

export default function DetallePeliculas (){
    const {id}: any = useParams();
   

    const [pelicula, setPelicula] = useState<peliculaDTO>();

    useEffect(() => {
      axios.get(`${urlPeliculas}/${id}`)
          .then((respuesta: AxiosResponse<peliculaDTO>) => {
              // console.log("Respuesta API:", respuesta.data);
              setPelicula(respuesta.data);
          })
          
  }, [id]);
  

    return(
      pelicula ? 
      <div style={{display: 'flex'}}>
        <div>
            <h2>{pelicula.titulo} ({new Date(pelicula.fechaLanzamiento).getFullYear()})</h2>
              
            
        </div> 


      </div> : <Cargando/>
    )

}