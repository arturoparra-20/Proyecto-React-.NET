import { useEffect, useState } from "react";
import { landingPageDTO } from "./peliculas/peliculas.model";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import CarruselPeliculas from "./utils/CarruselPeliculas";
import axios, { AxiosResponse } from "axios";
import { urlPeliculas } from "./utils/endpoints";
import AlertaContext from "./utils/AlertaContext";

export default function LandingPage() {
  const [peliculas, SetPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {

    cargarDatos();

    }, [])

    function cargarDatos(){
      
    axios.get(urlPeliculas)
    .then((respuesta: AxiosResponse<landingPageDTO>) => {
       SetPeliculas(respuesta.data);
    })
  
  }

  return (
    <>
    <AlertaContext.Provider value={()=> cargarDatos()}>
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="max-w-full mx-auto p-4 align-center">
        {/* <h3 className="text-2xl font-bold mb-4">Carrusel de Estrenos</h3>
        <CarruselPeliculas peliculas={peliculas.carrusel || []} /> */}

        <h3 className="text-2xl font-bold mt-8 mb-4">En cartelera</h3>
        <ListadoPeliculas peliculas={peliculas.enCines} />

        <h3 className="text-2xl font-bold mt-8 mb-4">Próximos Estrenos</h3>
        <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
      </div>
    </div>
    </AlertaContext.Provider>
    </>
  );
}

