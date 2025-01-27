import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import rutas from './route-config';
import Menu from './utils/Menu';
import configurarValidaciones from './validaciones';
import Footer from './utils/Footer';

configurarValidaciones();

function App() {
  return (
    <>
      <BrowserRouter>
        <Menu />
        <div className='flex-grow mx-auto py-8 grid-container bg-gray-800'>
          <div className='container'>
            <Routes>
              {rutas.map(ruta => (
                <Route
                  key={ruta.path}
                  path={ruta.path}
                  element={<ruta.componente />}
                />
              ))}
            </Routes>
          </div>

        </div>
       <Footer/> 
      </BrowserRouter>
    </>
  );
}

export default App;
