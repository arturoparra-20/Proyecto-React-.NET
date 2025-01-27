import { Formik, Form, FormikHelpers} from "formik"
import * as Yup from 'yup'
import FormGroupText from "../utils/FormGroupText"
import Button from "../utils/Button"
import { useNavigate } from "react-router-dom"
import { generoCreacionDTO } from "./genero.model"

export default function FormularioGeneros(props: FormularioGenerosProps){

    const navigate = useNavigate();
    return(
        <> 
        
        <Formik 
        initialValues={props.modelo}
            onSubmit={props.onSubmit}


            validationSchema={Yup.object({
                nombre: Yup.string().required('Este campo es requerido')
                .max(50, 'La longitud maxima es de 50 caracteres')
                .primeraLetraMayuscula()
            })}
        >
            <Form>
                <FormGroupText campo="nombre" label="Nombre" placeholder="Nombre del Genero" />
                <Button type="submit">Salvar</Button>
                <button className="btn btn-secundary" onClick={() => navigate('/generos')}>Cancelar</button>
            </Form>

        </Formik>
     

        </>
    )
}

interface FormularioGenerosProps{
    modelo: generoCreacionDTO;
    onSubmit(valores: generoCreacionDTO, accion: FormikHelpers<generoCreacionDTO>): void;
}