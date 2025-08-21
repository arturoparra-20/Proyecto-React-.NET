export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 py-6 mt-20">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          © 2025 React Películas. Todos los derechos reservados.
        </p>
        <ul className="flex justify-center space-x-6 mt-4">
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Términos y Condiciones
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Política de Privacidad
            </a>
          </li>
          <li>
            <a
              href="#"
              className="hover:text-white transition-colors duration-200"
            >
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
};

