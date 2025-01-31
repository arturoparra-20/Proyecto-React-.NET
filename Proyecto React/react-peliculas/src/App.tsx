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
        <div className='flex flex-col min-h-screen justify-center bg-gray-800 text-white'>
          <main className='flex-1 container mx-auto px-4 py-8'>
            <Routes>
              {rutas.map(ruta => (
                <Route
                  key={ruta.path}
                  path={ruta.path}
                  element={<ruta.componente />}
                />
              ))}
            </Routes>
          </main>

        </div>
       <Footer/> 
      </BrowserRouter>
    </>
  );
}

export default App;
