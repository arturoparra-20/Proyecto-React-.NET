import { Field, useFormikContext } from "formik";
import ReactMarkdown from "react-markdown";
import './FormGroupMarkdown.css'

export default function FormGroupMarkdown (props: FormGroupMarkdownProps){
    const {values} = useFormikContext<any>();
    return(
        <div className="form-group form-markdown">
            <div>
                <label>{props.label}</label>
                <div>
                    <Field name ={props.campo} as="textarea" className="form-textarea"/>
                </div>
            </div>

            <div>
                <label>{props.label} (preview):</label>
                <div className="markdown-container">
                    <ReactMarkdown>{values[props.campo]}</ReactMarkdown>
                </div>
            </div>

        </div>
    )

}
interface FormGroupMarkdownProps{
    campo: string;
    label: string;
}