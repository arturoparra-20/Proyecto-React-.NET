import { useFormikContext } from "formik";
import { coordenadaDTO } from "./coordenadas.model"
import Mapa from "./Mapa";

export default function MapaFormulario(props: MapaFormularioProps){

    const {values} = useFormikContext<any>();
    function actualizarCampos(coordenadas: coordenadaDTO){
        values[props.campoLat] = coordenadas.lat;
        values[props.campoLng] = coordenadas.lng;
    }
    return(

       <Mapa
          coordenadas={props.coordenadas}
          manejarClickMapa={actualizarCampos}
       /> 

    )
}

interface MapaFormularioProps{
    coordenadas: coordenadaDTO[];
    campoLat: string;
    campoLng: string;
}

MapaFormulario.defaultProps = {
    coordenadas: []
}