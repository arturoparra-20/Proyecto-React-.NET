import { NavLink, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Autorizado from "../auth/Autorizado";
import Button from "./Button";
import { obtenerClaims, logout } from "../auth/manejadorJWT";
import { useContext } from "react";
import AuthContext from "../auth/AuthContext";

export default function Menu() {

    const { claims, actualizar } = useContext(AuthContext);
    console.log("claims", claims)

    function obtenerNombreUser(): string {
        const email = claims.find(x => x.nombre === "email")?.valor;

        if (!email) return "";

        const nombre = email.split("@")[0];
        return nombre.toUpperCase();
    }



    return (
        <nav className="bg-gray-800 text-gray-100 p-4 rounded-xl shadow-xl mb-3">
            <div className="container mx-auto flex justify-between items-center">

                {/* Sección izquierda: título + filtro */}
                <div className="flex items-center space-x-8">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `font-bold no-underline transition-all duration-300 ${isActive
                                ? "text-blue-500 text-2xl"
                                : "text-white text-2xl hover:text-blue-400"
                            }`
                        }
                    >
                        EcuaMovies
                    </NavLink>

                    <NavLink
                        to="/peliculas/filtro"
                        className={({ isActive }) =>
                            `text-lg font-bold no-underline px-3 py-1 rounded-md transition duration-200
                             ${isActive ? "bg-gray-900 text-white" : "text-white hover:text-white  hover:bg-gray-900"}`
                        }
                    >
                        Filtro Películas
                    </NavLink>

                    {/* Admin */}
                    <Autorizado role="admin" autorizado={
                        <div className="flex space-x-6 ml-6">
                            <NavLink to="/generos" className={navLinkClass}>Géneros</NavLink>
                            <NavLink to="/actores" className={navLinkClass}>Actores</NavLink>
                            <NavLink to="/cines" className={navLinkClass}>Cines</NavLink>
                            <NavLink to="/peliculas/crear" className={navLinkClass}>Crear Películas</NavLink>
                        </div>
                    } />
                </div>

                {/* Sección derecha: login y registro */}
                <div className="flex space-x-4">
                    <Autorizado
                        autorizado={<>
                            <span className="text-lg font-bold mt-1.5"> Hola, {obtenerNombreUser()}</span>
                            <Button onClick={() => {
                                logout();
                                actualizar([]);


                            }}
                                className="bg-gray-800 hover:bg-gray-900 text-white no-underline px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                            >Log out</Button>
                        </>}
                        noAutorizado={<>
                            <NavLink
                                to="/login"
                                className="bg-gray-800 hover:bg-gray-900 text-white no-underline px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                            >
                                <FontAwesomeIcon icon="right-to-bracket" />
                                <span>Login</span>
                            </NavLink>
                            <NavLink
                                to="/registro"
                                className="bg-gray-800 hover:bg-gray-900 text-white no-underline px-4 py-2 rounded-lg flex items-center space-x-2 transition"
                            >
                                <FontAwesomeIcon icon="user-plus" />
                                <span>Registro</span>
                            </NavLink>

                        </>}
                    />

                </div>
            </div>
        </nav>
    );
}

const navLinkClass = ({ isActive }: { isActive: boolean }) =>
    `text-base font-semibold px-3 py-1 rounded-md transition duration-200 ${isActive
        ? "bg-blue-500 text-white"
        : "text-gray-300 hover:text-white hover:bg-gray-700"
    }`;
