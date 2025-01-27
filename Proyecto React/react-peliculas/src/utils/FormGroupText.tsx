import { Field, ErrorMessage } from "formik"
import MostrarErrorCampo from "./MostrarErrorCampo";

export default function FormGroupText(props: FormGroupTextProps) {
    return (

        <div className="form-group">
            {props.label ? <label htmlFor={props.campo}>{props.label}</label> : null}
            <Field name={props.campo} className="form-control"
                placeholder={props.placeholder} />
            <ErrorMessage name={props.campo}>{mensaje =>
                <MostrarErrorCampo mensaje={mensaje} />
            }</ErrorMessage>

        </div>
    )
}

interface FormGroupTextProps {
    campo: string;
    label?: string;
    placeholder?: string;

}