import React, { useState } from "react";
import { AsyncTypeahead } from "react-bootstrap-typeahead";
import "react-bootstrap-typeahead/css/Typeahead.css";
import { actorPeliculaDTO } from "./actores.model";
import axios, { AxiosResponse } from "axios";
import { urlActores } from "../utils/endpoints";

export default function TypeAheadActores(props: TypeAheadActoresProps) {
  const seleccionados: actorPeliculaDTO[] = [];
  const [elementoArrastrado, setElementoArrastrado] = 
  useState<actorPeliculaDTO | undefined>(undefined);

  const [estaCargando, setEstaCargando] = useState(false);
  const [opciones, setOpciones] = useState<actorPeliculaDTO[]>([]);

  function manejarBusqueda (query: string)
  {
       setEstaCargando(true);

       axios.get(`${urlActores}/buscarPorNombre/${query}`)
       .then((respuesta: AxiosResponse<actorPeliculaDTO[]>) => {
           
           setOpciones(respuesta.data);
           setEstaCargando(false);
       })
  }

  function manejarDragStart(actor: actorPeliculaDTO){

    setElementoArrastrado(actor);

  }
  function manejarDragOver(actor: actorPeliculaDTO){
    if(!elementoArrastrado){
      return;
    }
    if(actor.id !== elementoArrastrado.id)
    {
      const elementoArrastradoIndice = 
      props.actores.findIndex(x => x.id === elementoArrastrado.id);
      
      const actorIndice =
      props.actores.findIndex(x => x.id === actor.id);

      const actores = [...props.actores];
      actores[actorIndice] = elementoArrastrado;
      actores[elementoArrastradoIndice] = actor;
      props.onAdd(actores);
    }

  }

  const handleCharacterChange = (id: number, value: string) => {
    const updatedActors = props.actores.map((actor) =>
      actor.id === id ? { ...actor, personaje: value } : actor
    );
    props.onAdd(updatedActors);
  };

  return (
    <>
      <label>Actores</label>
      <AsyncTypeahead
        id="typeahead-actores"
        onChange={(actores) => {
          if (
            actores.length > 0 &&
            !props.actores.find((x) => x.id === (actores[0] as actorPeliculaDTO).id)
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
        selected={seleccionados}
        renderMenuItemChildren={(option) => {
          const actor = option as actorPeliculaDTO;
          return (
            actor && (
              <div>
                <img
                  src={actor.foto}
                  alt={actor.nombre}
                  style={{ width: "50px", marginRight: "10px" }}
                />
                <span>{actor.nombre}</span>
              </div>
            )
          );
        }}
      />
      <ul className="list-group mt-3">
        {props.actores &&
          props.actores.map((actor, index) =>
            actor ? (
              <li className="list-group-item list-group-item-action" 
              draggable={true}
              onDragStart={()=> manejarDragStart(actor)}
              onDragOver={()=> manejarDragOver(actor)}
              key={index}
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
                  value={actor.personaje}
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
            ) : null
          )}
      </ul>
    </>
  );
}

interface TypeAheadActoresProps {
  onAdd: (actores: actorPeliculaDTO[]) => void;
  onRemove: (actor: actorPeliculaDTO) => void;
  actores: actorPeliculaDTO[];
  listadoActores: actorPeliculaDTO[];
  placeholder: string;
}
