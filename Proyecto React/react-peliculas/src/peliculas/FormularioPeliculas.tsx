import { Form, Formik, FormikHelpers } from "formik";
import { peliculaCreacionDTO } from "./peliculas.model";
import * as Yup from 'yup';
import FormGroupText from "../utils/FormGroupText";
import FormGroupCheckbox from "../utils/FormGroupCheckbox";
import FormGroupFecha from "../utils/FormGroupFecha";
import FormGroupImagen from "../utils/FormGroupImagen";
import Button from "../utils/Button";
import { useNavigate } from "react-router-dom";
import SelectorMultiple, { SelectorMultipleModel } from "../utils/SelectorMultiple";
import { generoDTO } from "../generos/genero.model";
import { act, useState } from "react";
import { cineDTO } from "../cines/cines.model";
import TypeAheadActores from "../actores/TypeAheadActores";
import { actorPeliculaDTO } from "../actores/actores.model";
import FormGroupMarkdown from "../utils/FormGroupMarkdown";

export default function FormularioPeliculas (props: FormularioPeliculasProps){
    const [generosSeleccionados, setGenerosSeleccionados] = useState(mapear(props.generosSeleccionados));
    const [generosNoSeleccionados, setGenerosNoSeleccionados] = useState(mapear(props.generosNoSeleccionados));
    
    const [cinesSeleccionados, setCinesSeleccionados] = useState(mapear(props.cinesSeleccionados));
    const [cinesNoSeleccionados, setCinesNoSeleccionados] = useState(mapear(props.cinesNoSeleccionados));

    const [actoresSeleccionados, setActoresSeleccionados] = 
    useState<actorPeliculaDTO[]>(props.actoresSeleccionados);

    function mapear(arreglo: {id: number, nombre: string}[]): SelectorMultipleModel[]{
        return arreglo.map(valor => {
            return {llave: valor.id, valor: valor.nombre}
        })
    }
    const handleAdd = (actores: actorPeliculaDTO[]) => {
        setActoresSeleccionados(actores);
    };


    const handleRemove = (actor: actorPeliculaDTO) => {
        setActoresSeleccionados((prevActores) =>
            prevActores.filter((a) => a.id !== actor.id)
        );
    };



    const navigate = useNavigate();
    return(
        <Formik
        initialValues={props.modelo}
        onSubmit={(valores, acciones) => {
            valores.generosIds = generosSeleccionados.map(valor => valor.llave);
            valores.cinesIds = cinesSeleccionados.map(valor => valor.llave);
            valores.actores = actoresSeleccionados;
            props.onSubmit(valores, acciones);
        }}
        validationSchema={Yup.object({
            titulo: Yup.string().required('Este campo es requerido').primeraLetraMayuscula()
        })}
        >
            {formikProps => (
                <Form >
                    <FormGroupText label="Titulo" campo="titulo"/>
                    <FormGroupCheckbox label="En Cines" campo= "enCines"/>
                    <FormGroupText label="Trailer" campo ="trailer"/>
                    <FormGroupFecha campo="fechaLanzamiento" label="Fecha Lanzamiento"/>
                    <FormGroupImagen campo="poster" label="Poster" imagenURL={props.modelo.posterURL}/>
                    <FormGroupMarkdown campo="resumen" label="resumen"/>  

                    <div className="form-group">
                    <label>Generos</label>    
                    
                    <SelectorMultiple seleccionados={generosSeleccionados}
                    noSeleccionados={generosNoSeleccionados}
                    onChange={(seleccionados, noSeleccionados)=> {
                         setGenerosSeleccionados(seleccionados)
                         setGenerosNoSeleccionados(noSeleccionados)
                    }}
                    />
                    </div>

                    <div className="form-group">
                    <label>Cines</label>    
                    
                    <SelectorMultiple seleccionados={cinesSeleccionados}
                    noSeleccionados={cinesNoSeleccionados}
                    onChange={(seleccionados, noSeleccionados)=> {
                         setCinesSeleccionados(seleccionados)
                         setCinesNoSeleccionados(noSeleccionados)
                    }}
                    />
                    </div>

                    <div className="from-group">
                        <TypeAheadActores
                        onAdd={handleAdd}
                        onRemove={handleRemove}
                        actores = {actoresSeleccionados}
                        // listadoActores={listadoActores}
                        placeholder="Buscar un Actor"
                        
                        
                        />

                    </div>



                    <Button disabled={formikProps.isSubmitting} type="submit">Enviar</Button>
                    <button className="btn btn-secundary" onClick={() => navigate('/')}>Cancelar</button>
                </Form>
            )}

        </Formik>

    )
}
interface FormularioPeliculasProps {
    modelo: peliculaCreacionDTO;
    onSubmit(valores: peliculaCreacionDTO, acciones: FormikHelpers<peliculaCreacionDTO>): void;
    generosSeleccionados: generoDTO[];
    generosNoSeleccionados: generoDTO[];
    cinesSeleccionados: cineDTO[];
    cinesNoSeleccionados: cineDTO[];
    actoresSeleccionados: actorPeliculaDTO[];

}