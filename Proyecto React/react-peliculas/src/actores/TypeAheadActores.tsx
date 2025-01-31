import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { actorPeliculaDTO } from "./actores.model";
import axios, { AxiosResponse } from "axios";
import { urlActores } from "../utils/endpoints";

export default function TypeAheadActores(props: TypeAheadActoresProps) {
  const [elementoArrastrado, setElementoArrastrado] = 
    useState<actorPeliculaDTO | undefined>(undefined);

  const [estaCargando, setEstaCargando] = useState(false);
  const [opciones, setOpciones] = useState<actorPeliculaDTO[]>([]);

  function manejarBusqueda(query: string) {
    setEstaCargando(true);
    axios
      .get(`${urlActores}/buscarPorNombre/${query}`)
      .then((respuesta: AxiosResponse<actorPeliculaDTO[]>) => {
        setOpciones(respuesta.data);
        setEstaCargando(false);
      });
  }

  function manejarDragStart(actor: actorPeliculaDTO) {
    setElementoArrastrado(actor);
  }

  function manejarDragOver(actor: actorPeliculaDTO) {
    if (!elementoArrastrado) return;

    if (actor.id !== elementoArrastrado.id) {
      const actoresActualizados = [...props.actores];
      const elementoArrastradoIndice = actoresActualizados.findIndex(x => x.id === elementoArrastrado.id);
      const actorIndice = actoresActualizados.findIndex(x => x.id === actor.id);

      [actoresActualizados[actorIndice], actoresActualizados[elementoArrastradoIndice]] =
        [actoresActualizados[elementoArrastradoIndice], actoresActualizados[actorIndice]];

      props.onAdd(actoresActualizados);
    }
  }

  function handleCharacterChange(id: number, value: string) {
    const actoresActualizados = props.actores.map((actor) =>
      actor.id === id ? { ...actor, personaje: value } : actor
    );

    props.onAdd(actoresActualizados);
  }

  return (
    <>
      <label>Actores</label>
      <AsyncTypeahead
        id="typeahead-actores"
        onChange={(actores) => {
          if (
            actores.length > 0 &&
            !props.actores.some((x) => x.id === (actores[0] as actorPeliculaDTO).id)
          ) {
            const nuevoActor = actores[0] as actorPeliculaDTO;
            props.onAdd([...props.actores, nuevoActor]);
          }
        }}
        options={opciones}
        placeholder={props.placeholder}
        labelKey="nombre"
        filterBy={() => true}
        isLoading={estaCargando}
        onSearch={manejarBusqueda}
        selected={[]} 
        renderMenuItemChildren={(option) => {
          const actor = option as actorPeliculaDTO;
          return (
            <div key={actor.id}>
              <img
                src={actor.foto}
                alt={actor.nombre}
                style={{ width: "50px", marginRight: "10px" }}
              />
              <span>{actor.nombre}</span>
            </div>
          );
        }}
      />
      <ul className="list-group mt-3">
        {props.actores.map((actor, index) => (
          <li
            key={actor.id}
            className="list-group-item list-group-item-action"
            draggable
            onDragStart={() => manejarDragStart(actor)}
            onDragOver={() => manejarDragOver(actor)}
          >
            <img
              alt={actor.nombre}
              src={actor.foto}
              style={{ width: "50px", marginRight: "10px" }}
            />
            {actor.nombre}
            <input
              type="text"
              placeholder="Nombre del personaje"
              value={actor.personaje || ""}
              onChange={(e) => handleCharacterChange(actor.id, e.target.value)}
              className="form-control mt-2"
            />
            <span
              className="badge badge-danger badge-pill float-right text-black"
              style={{ cursor: "pointer" }}
              onClick={() => props.onRemove(actor)}
            >
              X
            </span>
          </li>
        ))}
      </ul>
    </>
  );
}

interface TypeAheadActoresProps {
  onAdd: (actores: actorPeliculaDTO[]) => void;
  onRemove: (actor: actorPeliculaDTO) => void;
  actores: actorPeliculaDTO[];
  placeholder: string;
}
