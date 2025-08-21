import { ReactElement, useContext, useEffect, useState } from "react"
import AuthContext from "./AuthContext";

export default function Autorizado(props: autorizadoProps) {
    const [estaAutorizado, setEstaAutorizado] = useState(false);
    const { claims } = useContext(AuthContext);

    useEffect(() => {
        if (props.role) {
            setEstaAutorizado(
                claims.some(claim => claim.nombre === 'role' && claim.valor === props.role)
            );
        } else {
            setEstaAutorizado(claims.length > 0);
        }
    }, [claims, props.role]);

    return (

        <>
            {estaAutorizado ? props.autorizado : props.noAutorizado}
        </>

    )
}
interface autorizadoProps {
    autorizado: ReactElement;
    noAutorizado?: ReactElement;
    role?: string;
}