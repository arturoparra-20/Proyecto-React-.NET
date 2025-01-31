import CrearActores from "./actores/CrearActores";
import EditarActores from "./actores/EditarActores";
import IndiceActores from "./actores/IndiceActores";
import CrearCines from "./cines/CrearCines";
import EditarCines from "./cines/EditarCines";
import IndiceCines from "./cines/IndiceCines";
import CrearGeneros from "./generos/CrearGeneros";
import EditarGeneros from "./generos/EditarGenero";
import IndiceGeneros from "./generos/IndiceGeneros";
import LandingPage from "./LandingPage";
import CrearPeliculas from "./peliculas/CrearPeliculas";
import DetallePeliculas from "./peliculas/DetallePeliculas";
import EditarPeliculas from "./peliculas/EditarPeliculas";
import FiltroPeliculas from "./peliculas/FiltroPeliculas";
import RedirectALanding from "./utils/RedirectALanding";

const rutas = [
    {path: '/generos/crear', componente: CrearGeneros},
    {path: '/generos/editar/:id', componente: EditarGeneros},
    {path: '/generos', componente: IndiceGeneros},

    {path: '/actores/crear', componente: CrearActores},
    {path: '/actores/editar/:id', componente: EditarActores},
    {path: '/actores', componente: IndiceActores},

    {path: '/cines/crear', componente: CrearCines},
    {path: '/cines/editar/:id', componente: EditarCines},
    {path: '/cines', componente: IndiceCines},

    {path: '/peliculas/crear', componente: CrearPeliculas},
    {path: '/pelicula/:id', componente: DetallePeliculas},
    {path: '/peliculas/editar/:id', componente: EditarPeliculas},
    {path: '/peliculas/filtro', componente: FiltroPeliculas},


    {path: '/', componente: LandingPage},

    {path: '*', componente: RedirectALanding}
]

export default rutas;