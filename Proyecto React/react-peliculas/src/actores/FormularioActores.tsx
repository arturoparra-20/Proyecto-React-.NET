import { Formik, FormikHelpers, Form } from "formik";
import { actorCreacionDTO } from "./actores.model";
import FormGroupText from "../utils/FormGroupText";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup'
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function FormularioActores (props: FormularioActoresProps){

    const navigate = useNavigate();
    return(

        <Formik
        initialValues={props.modelo}
        onSubmit={props.onSubmit}
        validationSchema={Yup.object({
                nombre: Yup.string().required('Este campo es requerido').primeraLetraMayuscula(),
                fechaNacimiento: Yup.date().nullable().required('Este campo es requerido')
            })}

            >

            {(formikProps) => (
                <Form>
                   <FormGroupText campo="nombre" label="Nombre"/>
                   <FormGroupFecha label="Fecha de Nacimiento" campo="fechaNacimiento"/>
                   <FormGroupImagen campo="foto" label="Foto" imagenURL={props.modelo.fotoURL}/>
                   <FormGroupMarkdown campo="biografia" label="Biografía"/> 

                   <Button disabled={formikProps.isSubmitting}
                    type="submit"
                   >Salvar</Button>
                   <button className="btn btn-secundary" onClick={() => navigate('/generos')}>Cancelar</button>
                </Form>
            )}
        </Formik>
    )
}

interface FormularioActoresProps{
    modelo: actorCreacionDTO;
    onSubmit(valores: actorCreacionDTO, acciones: FormikHelpers<actorCreacionDTO>): void;
}