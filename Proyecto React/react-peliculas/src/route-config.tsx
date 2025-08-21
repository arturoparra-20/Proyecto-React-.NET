import CrearActores from "./actores/CrearActores";
import EditarActores from "./actores/EditarActores";
import IndiceActores from "./actores/IndiceActores";
import Login from "./auth/Login";
import Registro from "./auth/Registro";
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
    {path: '/generos/crear', componente: CrearGeneros, esAdmin: true},
    {path: '/generos/editar/:id', componente: EditarGeneros, esAdmin: true},
    {path: '/generos', componente: IndiceGeneros, esAdmin: true},

    {path: '/actores/crear', componente: CrearActores, esAdmin: true},
    {path: '/actores/editar/:id', componente: EditarActores, esAdmin: true},
    {path: '/actores', componente: IndiceActores, esAdmin: true},

    {path: '/cines/crear', componente: CrearCines, esAdmin: true},
    {path: '/cines/editar/:id', componente: EditarCines, esAdmin: true},
    {path: '/cines', componente: IndiceCines, esAdmin: true},

    {path: '/peliculas/crear', componente: CrearPeliculas, esAdmin: true},
    {path: '/pelicula/:id', componente: DetallePeliculas},
    {path: '/peliculas/editar/:id', componente: EditarPeliculas, esAdmin: true},
    {path: '/peliculas/filtro', componente: FiltroPeliculas},

    {path: 'registro', componente: Registro},
    {path: 'login', componente: Login},


    {path: '/', componente: LandingPage},

    {path: '*', componente: RedirectALanding}
]

export default rutas;