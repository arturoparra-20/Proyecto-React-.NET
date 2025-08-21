import { actorDTO, actorPeliculaDTO } from "../actores/actores.model";
import { cineDTO } from "../cines/cines.model";
import { generoDTO } from "../generos/genero.model";

export interface peliculaDTO {
    id: number;
    titulo: string;
    poster: string;
    enCines: boolean;
    trailer: string;
    resumen: string;
    fechaLanzamiento: Date;
    generos: generoDTO[];
    actores: actorPeliculaDTO[];
    cines: cineDTO[];
    votoUsuario?: number;
    promedioVoto?: number;
}
export interface peliculaCreacionDTO{
    titulo: string;
    enCines: boolean;
    trailer: string;
    resumen?: string;
    fechaLanzamiento?: Date;
    poster?: File;
    posterURL?: string;
    generosIds?: number[];
    cinesIds?: number[];
    actores?: actorPeliculaDTO[];
}
export interface landingPageDTO {
    enCines?: peliculaDTO[];
    proximosEstrenos?: peliculaDTO[];
    carrusel?: peliculaDTO[]
}

export interface peliculasPostGetDTO {
    generos: generoDTO[];
    cines: cineDTO[];
}

export interface PeliculasPutGetDTO {
    pelicula: peliculaDTO;
    generosSeleccionados: generoDTO[];
    generosNoSeleccionados: generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actores: actorPeliculaDTO[];

}