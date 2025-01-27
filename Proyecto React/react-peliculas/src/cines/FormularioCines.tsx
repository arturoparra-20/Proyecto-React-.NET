import { Formik, FormikHelpers, Form } from "formik";
import { cineCreacionDTO } from "./cines.model";
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";

import MapaFormulario from "../utils/MapaFormulario";
import { coordenadaDTO } from "../utils/coordenadas.model";

export default function FormularioCines (props: FormularioCinesProps){
    const navigate = useNavigate();

    function transoformarCoordenadas(): coordenadaDTO[] | undefined {
        if (props.modelo.latitud && props.modelo.longitud){
            const repuesta: coordenadaDTO = {lat: props.modelo.latitud, 
                lng: props.modelo.longitud}
                return[repuesta];
        }
        return undefined;
    }

    return(
        <Formik initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object ({
            nombre: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
        })}
        >
         {(formikProps) => (
            <Form>
                <FormGroupText label="Nombre" campo="nombre"/>

                <div style={{marginBottom: '1rem', marginTop: '1rem'}}>
                    <MapaFormulario campoLat="latitud" campoLng="longitud" 
                    coordenadas={transoformarCoordenadas()}
                    />
                </div>

                <Button disabled={formikProps.isSubmitting}
                type="submit"
                >Salvar</Button> 
                <button className="btn btn-secundary" onClick={() => navigate('/generos')}>Cancelar</button>
            </Form>


         )}

        </Formik>


    )

}

interface FormularioCinesProps {
    modelo: cineCreacionDTO;
    onSubmit(valores: cineCreacionDTO, acciones: FormikHelpers<cineCreacionDTO>): void;
}