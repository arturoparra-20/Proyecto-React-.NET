export default function MostrarErrores({ errores = [] }: MostrarErroresProps) {
  // Verifica que errores sea un array antes de intentar mapearlo
  if (!Array.isArray(errores) || errores.length === 0) {
    return null; // No muestra nada si no hay errores
  }

  return (
    <ul style={{ color: "red" }}>
      {errores.map((error, indice) => (
        <li key={indice}>{error}</li>
      ))}
    </ul>
  );
}

interface MostrarErroresProps {
  errores?: string[]; // Opcional y espera un array de strings
}
