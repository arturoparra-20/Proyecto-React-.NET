import { useEffect, useState } from "react";
import { landingPageDTO } from "./peliculas/peliculas.model";
import ListadoPeliculas from "./peliculas/ListadoPeliculas";
import CarruselPeliculas from "./utils/CarruselPeliculas";

export default function LandingPage() {
  const [peliculas, SetPeliculas] = useState<landingPageDTO>({});

  useEffect(() => {
    const timerId = setTimeout(() => {
      SetPeliculas({
        enCartelera: [
          {
            id: 1,
            titulo: "SpiderMan Far From Home",
            poster: "https://preview.redd.it/1vso0vrm42j31.jpg?auto=webp&s=560d753f03d61e4fd76bfd42f4ed9fd5a0232ddc",
          },
          {
            id: 2,
            titulo: "Mohana",
            poster: "https://resizer.glanacion.com/resizer/v2/FEQBNKCWQFERFMTLKZT7IVDBK4.png?auth=597b673543ad7c7870ee40a44eb667eab2a3a791090a7732afbb0c2776f34feb&width=210&height=300&smart=true",
          },
        ],
        proximosEstrenos: [
          {
            id: 3,
            titulo: "Soul",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTayKbVeMZsxTVNEsUolbgYwFEgg6KtDC2mRQ&s",
          },
        ],
        carrusel: [
          {
            id: 1,
            titulo: "Deadpool",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRPPezEWZORRev9NjF1KpzBd4puhdzWDHqw&s",
          },
          {
            id: 1,
            titulo: "Deadpool",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRPPezEWZORRev9NjF1KpzBd4puhdzWDHqw&s",
          },
          {
            id: 1,
            titulo: "Deadpool",
            poster: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRvRPPezEWZORRev9NjF1KpzBd4puhdzWDHqw&s",
          },
        
        ],


      });
    }, 1000);

    return () => clearTimeout(timerId);
  });

  return (
    <div className="bg-gray-800 min-h-screen text-white">
      <div className="max-w-full mx-auto p-4 align-center">
        {/* <h3 className="text-2xl font-bold mb-4">Carrusel de Estrenos</h3>
        <CarruselPeliculas peliculas={peliculas.carrusel || []} /> */}

        <h3 className="text-2xl font-bold mt-8 mb-4">En cartelera</h3>
        <ListadoPeliculas peliculas={peliculas.enCartelera} />

        <h3 className="text-2xl font-bold mt-8 mb-4">Próximos Estrenos</h3>
        <ListadoPeliculas peliculas={peliculas.proximosEstrenos} />
      </div>
    </div>
  );
}

