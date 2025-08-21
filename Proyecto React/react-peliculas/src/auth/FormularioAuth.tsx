import { Formik, Form, Field } from "formik";
import * as Yup from "yup";

interface formularioAuthProps {
    modelo: { email: string; password: string };
    onSubmit(valores: { email: string; password: string }): void;
}

export default function FormularioAuth(props: formularioAuthProps) {
    return (
        <Formik
            initialValues={props.modelo}
            onSubmit={props.onSubmit}
            validationSchema={Yup.object({
                email: Yup.string().email("Email inválido").required("Campo requerido"),
                password: Yup.string().required("Campo requerido")
            })}
        >
            {({ errors, touched }) => (
                <Form className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                            Correo electrónico
                        </label>
                        <Field
                            name="email"
                            type="email"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {touched.email && errors.email && (
                            <div className="text-red-400 text-sm mt-1">{errors.email}</div>
                        )}
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-1">
                            Contraseña
                        </label>
                        <Field
                            name="password"
                            type="password"
                            className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {touched.password && errors.password && (
                            <div className="text-red-400 text-sm mt-1">{errors.password}</div>
                        )}
                    </div>

                    <div className="text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
                        >
                            Iniciar Sesión
                        </button>
                    </div>
                </Form>
            )}
        </Formik>
    );
}
