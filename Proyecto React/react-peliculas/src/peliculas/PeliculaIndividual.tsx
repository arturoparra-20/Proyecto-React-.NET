import { peliculaDTO } from "./peliculas.model";
import css from './PeliculaIndividual.module.css'

export default function PeliculaIndvidual(props: PeliculaIndvidualProps){

    const construirLink = () => `/pelicula/${props.pelicula.id}`

return(
    <div className={css.div}>
        <a href={construirLink()}>

           <img src={props.pelicula.poster} alt="Poster"/> 
        </a>
       <p>
           <a href={construirLink()}>
            
            {props.pelicula.titulo}</a>
        </p>  
       
        
    </div>
)
}

interface PeliculaIndvidualProps{
    pelicula: peliculaDTO;
}