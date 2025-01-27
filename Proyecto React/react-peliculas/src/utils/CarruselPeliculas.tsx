import React from "react";
import Slider from "react-slick";

interface Pelicula {
  id: number;
  titulo: string;
  poster: string;
}

interface CarruselPeliculasProps {
  peliculas: Pelicula[];
}

export default function CarruselPeliculas({ peliculas }: CarruselPeliculasProps) {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: true,
  };

  return (
    <Slider {...settings}>
      {peliculas.map((pelicula) => (
        <div key={pelicula.id} className="p-2">
          <img
            src={pelicula.poster}
            alt={pelicula.titulo}
            className="mx-auto rounded-lg shadow-lg"
            style={{ maxHeight: "400px", objectFit: "cover" }}
          />
          <h4 className="text-center mt-2 font-semibold">{pelicula.titulo}</h4>
        </div>
      ))}
    </Slider>
  );
}
