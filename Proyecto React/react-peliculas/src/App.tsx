import { BrowserRouter, Route, Routes } from 'react-router-dom';
// import './App.css';
import rutas from './route-config';
import Menu from './utils/Menu';
import configurarValidaciones from './validaciones';
import Footer from './utils/Footer';
import { useState } from 'react';
import { claim } from './auth/auth.model';
import AuthContext, { AuthProvider } from './auth/AuthContext';
import { configurarInterceptor } from './utils/Interceptores';

configurarValidaciones();
configurarInterceptor();

function App() {
  const [claims, setClaims] = useState<claim[]>([]);
   

  function actualizar (claims: claim[]){
    setClaims(claims);
  }

  function esAdmin() {
    return claims.findIndex(claim => claim.nombre === 'role' && claim.valor === 'admin') > -1;
    
  }
  return (
    
    <div className='bg-gray-800 text-gray-50'>
      
      <BrowserRouter>
      <AuthProvider>
        <Menu />
        
          <main className='min-h-screen w-full h-full px-4'>
            <Routes>
              {rutas.map(ruta => (
                <Route
                  key={ruta.path}
                  path={ruta.path}
                  element={
                    
                    ruta.esAdmin && !esAdmin() ? (
                      
                      <>No tienes permiso de acceder a esta pagina</>
                    ) : (
                      <ruta.componente/>
                    )
                  }
                />
              ))}
            </Routes>
          </main>

        
       <Footer/> 
       </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
