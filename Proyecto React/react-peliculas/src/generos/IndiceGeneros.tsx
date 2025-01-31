import { useNavigate } from "react-router-dom";
import Button from "../utils/Button";
import { urlGeneros } from "../utils/endpoints";
import IndiceEntidad from "../utils/IndiceEntidad";
import { generoDTO } from "./genero.model";

export default function IndiceGeneros() {
  const navigate = useNavigate();
  return (
    <IndiceEntidad<generoDTO>
      url={urlGeneros}
      urlCrear="generos/crear"
      titulo=""
      nombreEntidad=""
    >
      {(generos, botones) => (
        <div className="p-6 bg-gray-800 rounded-lg shadow-lg">
          <div className=" flex items-center justify-between mb-4 p-2">
            {/* Título */}
              <div className="bg-gray-800 p-0"> 
              <h3 className="bg-gray-800 text-gray-300">Géneros</h3>
              </div>

            {/* Botón "Agregar género" */}
            <Button className="btn btn-primary" onClick={() => navigate('/generos/crear')}>Crear Género</Button>
          </div>

          {/* Tabla */}
          <div className="overflow-x-auto">
            <table className="min-w-full border-collapse  rounded-lg shadow-sm">
              <thead className="bg-gray-800 text-gray-300 ">
                <tr>
                  <th className="px-6 py-3 text-left text-sm font-bold">Acciones</th>
                  <th className="px-6 py-3 text-left text-sm font-bold">Nombre</th>
                </tr>
              </thead>
              <tbody className="bg-gray-800 text-gray-300 divide-y divide-gray-700">
                {generos?.map((genero) => (
                  <tr
                    key={genero.id}
                    className="hover:bg-gray-700 transition duration-150 ease-in-out"
                  >
                    <td className="px-6 py-3">
                      {botones(`/generos/editar/${genero.id}`, genero.id)}
                    </td>
                    <td className="px-6 py-3">{genero.nombre}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </IndiceEntidad>
  );
}
