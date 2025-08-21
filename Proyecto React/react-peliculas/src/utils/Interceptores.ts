import axios from "axios";
import { obtenerToken } from "../auth/manejadorJWT";

export function configurarInterceptor(){
    axios.interceptors.request.use(
        function(config){
            const token = obtenerToken();
            // console.log("Token en interceptor:", token);


            if (token){
                config.headers.Authorization = `bearer ${token}`;

            }
            return config
        },
        function (error){
            return Promise.reject(error);
        }
    )
}