import { useEffect, useState } from "react";
import { landingPageDTO } from "./peliculas/peliculas.model";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import CarruselPeliculas from "./utils/CarruselPeliculas";
import axios, { AxiosResponse } from "axios";
import { urlPeliculas } from "./utils/endpoints";
import AlertaContext from "./utils/AlertaContext";
import Autorizado from "./auth/Autorizado";

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
  const peliculas1 = [
    { id: 1, titulo: "Deadpool", poster: "https://lascronicasdeaxa.wordpress.com/wp-content/uploads/2018/06/deadpool-2_2018_banner.jpg" },
    { id: 2, titulo: "Deadpool and Wolverine", poster: "https://i.redd.it/vs0sop0uel1d1.png" },
    { id: 3, titulo: "Película 3", poster: "https://pbs.twimg.com/media/FNV1USxXMAA71Mh?format=jpg&name=4096x4096" },
    { id: 4, titulo: "Película 4", poster: "https://pbs.twimg.com/media/FNV1USxXMAA71Mh?format=jpg&name=4096x4096" },
  ];

  return (
    <>
  
    <AlertaContext.Provider value={()=> cargarDatos()}>
    <div className=" bg-gray-800 text-white w-full h-full">
      <div className="max-w-full mx-auto p-4 align-center">
        {/* <h3 className="text-2xl font-bold mb-4">Carrusel de Estrenos</h3>
        <CarruselPeliculas peliculas={peliculas.carrusel || []} /> */}
       <div className="max w-full mx-auto">
        <CarruselPeliculas peliculas={peliculas1}/> 
        </div> 

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

