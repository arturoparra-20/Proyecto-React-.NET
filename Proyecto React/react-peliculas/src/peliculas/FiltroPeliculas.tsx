import { Formik, Form, Field } from "formik";
import { generoDTO } from "../generos/genero.model";
import Button from "../utils/Button";
import { useEffect, useState } from "react";
import axios, { AxiosResponse } from "axios";
import { urlGeneros, urlPeliculas } from "../utils/endpoints";
import { peliculaDTO } from "./peliculas.model";
import ListadoPeliculas from "./ListadoPeliculas";
import { useLocation, useNavigate } from "react-router-dom";
import Paginacion from "../utils/Paginacion";

export default function FiltroPeliculas() {
    const query = new URLSearchParams(useLocation().search);
    const navigate = useNavigate();

    const valores: filtroPeliculasForm = {
        titulo: query.get('titulo') ?? '',
        generoId: query.get('generoId') ? parseInt(query.get('generoId')!, 10) : 0,
        proximosEstrenos: query.get('proximosEstrenos') === 'true',
        enCines: query.get('enCines') === 'true',
        pagina: query.get('pagina') ? parseInt(query.get('pagina')!, 10) : 1,
        recordsPorPagina: 10,
    };

    const [generos, setGeneros] = useState<generoDTO[]>([]);
    const [peliculas, setPeliculas] = useState<peliculaDTO[]>([]);
    const [totalPaginas, setTotalPaginas] = useState(0);

    useEffect(() => {
        axios.get(`${urlGeneros}/todos`)
            .then((respuesta: AxiosResponse<generoDTO[]>) => {
                setGeneros(respuesta.data);
            });
    }, []);

    useEffect(() => {
        buscarPeliculas(valores);
    }, []);

    function buscarPeliculas(valores: filtroPeliculasForm) {
        modificarURL(valores);
        axios.get(`${urlPeliculas}/filtrar`, { params: valores })
            .then((respuesta: AxiosResponse<peliculaDTO[]>) => {
                const totalDeRegistros = parseInt(respuesta.headers['cantidadtotalregistros'], 10);
                setTotalPaginas(Math.ceil(totalDeRegistros / valores.recordsPorPagina));
                setPeliculas(respuesta.data);
            });
    }

    function modificarURL(valores: filtroPeliculasForm) {
        const queryStrings: string[] = [];

        if (valores.titulo) queryStrings.push(`titulo=${valores.titulo}`);
        if (valores.generoId) queryStrings.push(`generoId=${valores.generoId}`);
        if (valores.proximosEstrenos) queryStrings.push(`proximosEstrenos=true`);
        if (valores.enCines) queryStrings.push(`enCines=true`);
        queryStrings.push(`pagina=${valores.pagina}`);

        navigate(`/peliculas/filtro?${queryStrings.join('&')}`);
    }

    return (
        <>
            <h3>Filtrar Películas</h3>

            <Formik
                initialValues={valores}
                enableReinitialize
                onSubmit={valores => {
                    valores.pagina = 1;
                    buscarPeliculas(valores);
                }}
            >
                {(formikProps) => (
                    <>
                        <Form>
                            <div className="d-flex align-items-center mb-3">
                                <div className="form-group mx-sm-3 mb-2">
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="titulo"
                                        placeholder="Título de la película"
                                        {...formikProps.getFieldProps('titulo')}
                                    />
                                </div>

                                <div className="form-group mx-sm-3 mb-2">
                                    <select className="form-control" {...formikProps.getFieldProps('generoId')}>
                                        <option value="0">--Seleccione un género--</option>
                                        {generos.map((genero) => (
                                            <option key={genero.id} value={genero.id}>
                                                {genero.nombre}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group mx-sm-3 mb-2">
                                    <Field className="form-check-input" id="proximosEstrenos"
                                        name="proximosEstrenos" type="checkbox" />
                                    <label className="form-check-label" htmlFor="proximosEstrenos">
                                        Próximos Estrenos
                                    </label>
                                </div>

                                <div className="form-group mx-sm-3 mb-2">
                                    <Field className="form-check-input" id="enCines"
                                        name="enCines" type="checkbox" />
                                    <label className="form-check-label" htmlFor="enCines">
                                        En Cines
                                    </label>
                                </div>

                                <Button className="btn btn-primary mb-2 mx-sm-3"
                                    onClick={() => formikProps.submitForm()}>
                                    Filtrar
                                </Button>

                                <Button className="btn btn-danger mb-2"
                                    onClick={() => {
                                        const valoresLimpios: filtroPeliculasForm = {
                                            titulo: '',
                                            generoId: 0,
                                            proximosEstrenos: false,
                                            enCines: false,
                                            pagina: 1,
                                            recordsPorPagina: 10
                                        };
                                        buscarPeliculas(valoresLimpios);
                                    }}>
                                    Limpiar
                                </Button>
                            </div>
                        </Form>

                        <ListadoPeliculas peliculas={peliculas} />

                        <Paginacion
                            cantidadTotalDePaginas={totalPaginas}
                            paginaActual={formikProps.values.pagina}
                            onChange={nuevaPagina => {
                                formikProps.setFieldValue('pagina', nuevaPagina);
                                buscarPeliculas({ ...formikProps.values, pagina: nuevaPagina });
                            }}
                        />
                    </>
                )}
            </Formik>
        </>
    );
}

interface filtroPeliculasForm {
    titulo: string;
    generoId: number;
    proximosEstrenos: boolean;
    enCines: boolean;
    pagina: number;
    recordsPorPagina: number;
}
