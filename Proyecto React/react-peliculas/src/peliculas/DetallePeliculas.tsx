import axios, { AxiosResponse } from "axios";
import { act, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { urlPeliculas } from "../utils/endpoints";
import { peliculaDTO } from "./peliculas.model";
import Cargando from "../utils/Cargando";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import { coordenadaDTO } from "../utils/coordenadas.model";
import Mapa from "../utils/Mapa";
import { relative } from "path";

export default function DetallePeliculas() {
  const { id }: any = useParams();
  const [pelicula, setPelicula] = useState<peliculaDTO>();

  useEffect(() => {
    axios.get(`${urlPeliculas}/${id}`)
      .then((respuesta: AxiosResponse<peliculaDTO>) => {
        // console.log("Respuesta API:", respuesta.data);
        setPelicula(respuesta.data);
      })

  }, [id]);

  function transformarCoordenadas(): coordenadaDTO[] {
    if (pelicula?.cines) {
      const coordenadas = pelicula.cines.map(cine => {
        return { lat: cine.latitud, lng: cine.longitud, nombre: cine.nombre } as coordenadaDTO;
      });
      return coordenadas;
    }
    return [];
  }

  function generarURLYoutubeEmbebido(url: any): string {

    if (!url) {
      return '';
    }

    var video_id = url.split('v=')[1];
    var posicionAmpersand = video_id.indexOf('&')

    if (posicionAmpersand !== -1) {
      video_id = video_id.substring(0, posicionAmpersand);
    }
    return `https://www.youtube.com/embed/${video_id}`

  }


  return (
    pelicula ?
      <div className="flex-container">
        <div>
          <h2>{pelicula.titulo} ({new Date(pelicula.fechaLanzamiento).getFullYear()})</h2>
          {pelicula.generos?.map(genero =>
            <Link key={genero.id} style={{ marginRight: '5px' }}
              className="btn btn-primary btn-sm rounded-pill"
              to={`peliculas/filtrar?generoId=${genero.id}`}
            >{genero.nombre}</Link>
          )}
          | {new Date(pelicula.fechaLanzamiento).toDateString()}

          <div 
          style={{marginTop:'3rem', marginBottom: '3rem', display: 'flex'}}
          className=" bg-gray-900 flex  gap-8 p-8 rounded-lg shadow-xl ">
            
            {/* Póster de la película */}
           <div className="basis-2/5 flex-shrink-0"> 
            <img 
              src={pelicula.poster}
              alt={pelicula.titulo}
              className="w-64 rounded-lg shadow-lg"
            />
            </div>

            {/* Contenedor del resumen */}
            <div
            className="text-white max-w-lg basis-3/5">
              <h2 className=" font-bold text-xl mb-4">Resumen</h2>
              <p className="w-full">{pelicula.resumen}</p>
            </div>
            
          </div>



          {pelicula.trailer ? <div style={{ display: 'flex', justifyContent: 'center', marginTop: '3rem' }}>
            <div style={{ position: 'relative', width: '45%', maxWidth: '1000px', aspectRatio: '16/9' }}>
              <iframe
                title="youtube-trailer"
                width="560"
                height="315"
                src={generarURLYoutubeEmbebido(pelicula.trailer)}
                frameBorder={0}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              >

              </iframe>
            </div>

          </div> : null}

          {pelicula.actores && pelicula.actores.length > 0 ?
            <div style={{ marginTop: '3rem' }}>
              <h3>Actores</h3>
              <div style={{ display: 'flex', flexDirection: 'column' }}>
                {pelicula.actores?.map(actor =>
                  <div key={actor.id} style={{ marginBottom: '2px' }}>
                    <img alt="foto" src={actor.foto}
                      style={{ width: '70px', verticalAlign: 'middle' }} />
                    <span style={{
                      display: 'inline-block',
                      width: '200px',
                      marginLeft: '1rem'
                    }}>
                      {actor.nombre}
                    </span>
                    <span style={{
                      display: 'inline-block',
                      width: '45px'
                    }}>...</span>
                    <span>{actor.personaje}</span>

                  </div>
                )}

              </div>


            </div> : null}
          {pelicula.cines && pelicula.cines.length > 0 ?
            <div style={{marginTop: '2rem', marginBottom: '3rem'}}>
              <h2>Mostrandose en los siguientes Cines</h2>
              <Mapa soloLectura={true} coordenadas={transformarCoordenadas()} />
            </div> : null}
        </div>


      </div> : <Cargando />
  )

}