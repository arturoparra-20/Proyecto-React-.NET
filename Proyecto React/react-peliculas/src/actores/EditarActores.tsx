import EditarEntidad from "../utils/EditarEntidad"
import { urlActores } from "../utils/endpoints"
import { convertirActorFormData } from "../utils/formDataUtils"
import { actorCreacionDTO, actorDTO } from "./actores.model"
import FormularioActores from "./FormularioActores"
export default function EditarActores() {

    const transformar = (actor: actorDTO) => {
        return {
            nombre: actor.nombre, 
            fotoURL: actor.foto, 
            biografia: actor.biografia,
            fechaNacimiento: new Date(actor.fechaNacimiento)
        }

    }

    return (
        <>
            <EditarEntidad<actorCreacionDTO, actorDTO>
                url={urlActores} urlIndice="/actores" nombreEntidad="Actores"
                transformarFormData={convertirActorFormData}
                transformar={transformar}>
                {(entidad, editar) => 
                <FormularioActores modelo={entidad}
                 
                    onSubmit={async valores => await editar(valores)}
                />}
            </EditarEntidad>

        </>
    )
}