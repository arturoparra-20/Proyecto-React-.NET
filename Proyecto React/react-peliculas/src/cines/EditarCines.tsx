import EditarEntidad from "../utils/EditarEntidad";
import { urlCines } from "../utils/endpoints";
import { cineCreacionDTO, cineDTO } from "./cines.model";
import FormularioCines from "./FormularioCines";

export default function EditarCines(){

    return(
        <>
        <EditarEntidad<cineCreacionDTO, cineDTO>
          url={urlCines} urlIndice="/cines" nombreEntidad="Generos">
          {(entidad, editar)=>  <FormularioCines modelo={entidad}
               onSubmit={async valores => {
                  await editar(valores)
               }}
          
          />}
        </EditarEntidad>
        </>

    )
}