import { NavLink } from "react-router-dom";

export default function Menu() {
    return (
        <nav className="bg-gray-800 text-gray-100 p-4 shadow-lg">
            <div className="container mx-auto flex justify-between items-center">
                <NavLink
                    to="/"
                    className={({ isActive }) =>
                        `font-bold no-underline transition-all duration-300 ${isActive
                            ? "text-blue-500 text-2xl"
                            : "text-white text-2xl hover:text-blue-400"
                        }`
                    }
                >
                    React Peliculas
                </NavLink>
                <ul className="font-bold flex space-x-8 ml-8 ">
                    <li>
                        <NavLink
                            to="/generos"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "nav-link-active" : "nav-link-hover"}`
                            }
                        >
                            Géneros
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/peliculas/filtro"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "nav-link-active" : "nav-link-hover"}`
                            }
                        >
                            Filtro Películas
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/actores"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "nav-link-active" : "nav-link-hover"}`
                            }
                        >
                            Actores
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/cines"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "nav-link-active" : "nav-link-hover"}`
                            }
                        >
                            Cines
                        </NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/peliculas/crear"
                            className={({ isActive }) =>
                                `nav-link ${isActive ? "nav-link-active" : "nav-link-hover"}`
                            }
                        >
                            Crear Películas
                        </NavLink>
                    </li>
                </ul>
            </div>
        </nav>
    );
}
