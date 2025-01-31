import PeliculaIndvidual from "./PeliculaIndividual";
import { peliculaDTO } from "./peliculas.model";
import css from './ListadoPeliculas.module.css'
import Cargando from "../utils/Cargando";
import ListadoGenerico from "../utils/ListadoGenerico";
export default function(props: ListadoPeliculasProps){

    return(
        <ListadoGenerico listado={props.peliculas}>
        <div className={css.div}>
            {props.peliculas?.map(pelicula => 
            <PeliculaIndvidual pelicula={pelicula}
                                key={pelicula.id}
            />)}
        </div>
        </ListadoGenerico>
 
    )
 

}

interface ListadoPeliculasProps{
    peliculas?: peliculaDTO[]
}