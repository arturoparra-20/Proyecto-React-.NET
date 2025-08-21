import { createContext, useEffect, useState } from "react";
import { claim } from "./auth.model";
import { obtenerClaims, obtenerToken } from "./manejadorJWT";

const AuthContext = createContext<{
  claims: claim[];
  actualizar(claims: claim[]): void;
}>({
  claims: [],
  actualizar: () => {},
});

export default AuthContext;

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [claims, setClaims] = useState<claim[]>([]);

  useEffect(() => {
    const token = obtenerToken();
    if (token) {
      const nuevosClaims = obtenerClaims();
      setClaims(nuevosClaims);
    }
  }, []);

  function actualizar(nuevosClaims: claim[]) {
    setClaims(nuevosClaims);
  }

  console.log("claims al cargar contexto", claims);


  return (
    <AuthContext.Provider value={{ claims, actualizar }}>
      {children}
    </AuthContext.Provider>
  );
}
