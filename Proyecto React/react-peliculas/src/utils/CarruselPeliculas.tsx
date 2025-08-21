import React, { useRef } from "react";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Pelicula {
  id: number;
  titulo: string;
  poster: string;
}

interface CarruselPeliculasProps {
  peliculas: Pelicula[];
}

export default function CarruselPeliculas({ peliculas }: CarruselPeliculasProps) {
  const sliderRef = useRef<Slider>(null);

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false, // Desactivamos los botones internos, usaremos personalizados
    appendDots: (dots) => (
      <div className="pt-6 pb-8">
        <ul className="flex justify-center space-x-3 w-full mt-52">{dots}</ul>
      </div>
    ),
    customPaging: () => (
      <div className="w-4 h-4 bg-white rounded-full opacity-70 hover:opacity-100 transition items-center" />
    ),
  };

  return (
    <div className="relative w-full h-full:">
      {/* Slider principal */}
      <Slider ref={sliderRef} {...settings} className="h-[550px]">
        {peliculas.map((pelicula) => (
          <div key={pelicula.id} className="relative w-full h-full">
            <div className="w-full h-[500px] flex items-center justify-center bg-black  rounded-2xl overflow-hidden">
              <img
                src={pelicula.poster}
                alt={pelicula.titulo}
                className="max-w-full max-h-full object-cover"
              />
            </div>

            <div className="absolute bottom-10 left-10 bg-black bg-opacity-50 p-4 rounded-2xl">
              <h2 className="text-white text-xl md:text-2xl font-semibold items-center">
                {pelicula.titulo}
              </h2>
            </div>
          </div>
        ))}
      </Slider>

      {/* Botón Anterior */}
      <button
        onClick={() => sliderRef.current?.slickPrev()}
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 
        text-white w-10 h-10 flex items-center justify-center rounded-full text-3xl"
        aria-label="Anterior"
      >
        ‹
      </button>

      {/* Botón Siguiente */}
      <button
        onClick={() => sliderRef.current?.slickNext()}
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-20 bg-black/50 hover:bg-black/70 
        text-white w-10 h-10 flex items-center justify-center rounded-full text-3xl py-4"
        aria-label="Siguiente"
      >
        ›
      </button>
    </div>
  );
}
