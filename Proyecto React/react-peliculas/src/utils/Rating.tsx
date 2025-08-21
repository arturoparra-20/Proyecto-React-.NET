import { useContext, useEffect, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Rating.css'
import AuthContext from "../auth/AuthContext";
import Swal from "sweetalert2";

export default function Rating(props: RatingProps) {

  const { claims } = useContext(AuthContext);
  const [maximoValorArr, setMaximoValorArr] = useState<number[]>([]);
  const [valorSeleccionado, setValorSeleccionado] = useState(props.valorSeleccionado);



  function manejarMouseOver(voto: number) {
    setValorSeleccionado(voto);
  }

  function manejarClick(voto: number) {
    if (claims.length === 0) {
      Swal.fire({ title: "Error", text: "Debes estar logueado para poder votar", icon: "error" });
      return;
    }

    setValorSeleccionado(voto);
    props.onChange(voto);
  }
  useEffect(() => {
    setValorSeleccionado(props.valorSeleccionado);
  }, [props.valorSeleccionado]);


  useEffect(() => {
    setMaximoValorArr(Array(props.maximoValor).fill(0));
  }, [props.maximoValor])
  return (
    <>
      {maximoValorArr.map((valor, indice) => <FontAwesomeIcon
        icon="star"
        onMouseOver={() => manejarMouseOver(indice + 1)}
        onClick={() => manejarClick(indice + 1)}
        key={indice}
        className={`fa-lg pointer ${valorSeleccionado >= indice + 1 ? 'checked' : null}`}

      />)}
    </>

  )

}

interface RatingProps {
  maximoValor: number;
  valorSeleccionado: number;
  onChange(voto: number): void;
}