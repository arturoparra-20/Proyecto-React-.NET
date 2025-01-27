export default function MostrarErrores(props: MostrarErroresProps) {
    const style = { color: 'red' };
  
    // // Validar que props.errores es un array
    // if (!Array.isArray(props.errores) || props.errores.length === 0) {
    //   return null; // No renderiza nada si no hay errores o no es un array
    // }
  
    return (
      <> 
      {props.errores ? <ul style={style}>
      {props.errores?.map((error, indice) => <li key={indice}>{error}</li> )}
        </ul>: null }
      </>
    )
  }
  
  interface MostrarErroresProps {
    errores?: string[]; // Opcional y espera un array de strings
  }
  