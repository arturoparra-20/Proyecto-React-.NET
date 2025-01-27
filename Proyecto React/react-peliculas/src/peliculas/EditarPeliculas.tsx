import { actorPeliculaDTO } from "../actores/actores.model";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/genero.model";
import FormularioPeliculas from "./FormularioPeliculas";

export default function EditarPeliculas(){

    const generosNoSeleccionados: generoDTO[] = [
        {id: 3, nombre: 'Drama'} ]
    const generosSeleccionados: generoDTO[] = [
        {id: 1, nombre: 'Accion'}, 
        {id: 2, nombre: 'Comedia'}, 
         ]

    const cinesSeleccionados: cineDTO[] = [{id: 1, nombre: 'Supercines'}]
    const cinesNoSeleccionados: cineDTO[] = [ {id: 2, nombre: 'CineMark'}]

    const actoresSeleccionados: actorPeliculaDTO[] = [
        { 
            id: 1, nombre: 'Arturo', personaje:'', foto:'https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg/640px-Deadpool_2_Japan_Premiere_Red_Carpet_Ryan_Reynolds_%28cropped%29.jpg'
        }
    ]
    return(
        <>
        <h3>Editar Peliculas</h3>
        <FormularioPeliculas 
        actoresSeleccionados={actoresSeleccionados}
        cinesNoSeleccionados={cinesNoSeleccionados}
        cinesSeleccionados={cinesSeleccionados}
        generosNoSeleccionados={generosNoSeleccionados}
        generosSeleccionados={generosSeleccionados}
        modelo={{titulo: 'Spiderman', enCinces: true, trailer: 'url', 
            fechaLanzamiento: new Date('2019-01-01T00:00:00')
        }}
        onSubmit={valores => console.log(valores)}
        /> 
        </>
    )
}