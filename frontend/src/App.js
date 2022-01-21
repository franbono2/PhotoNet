import './App.css';
import {BrowserRouter, useRoutes} from 'react-router-dom';
import Login from './Login'
import Home from './Home'
import SubirImagen from './SubirImagen'
import SubirImagesClass from './SubirImagenClass'
import ActualizarImagen from './ActualizarImagen';

const App = () => {

  let routes = useRoutes([
    {path: "/", element: <Login/>},
    {path: "/home", element: <Home/>},
    //{path: "/upload", element: <SubirImagen/>}
    {path: "/upload", element: <SubirImagesClass/>},
    {path: "/put", element: <ActualizarImagen/>}
  ]);
  return routes;
}

const AppWrapper = () => {
  return (
    <body>
        <BrowserRouter>
          <App />
        </BrowserRouter>
    </body>
  );
}

export default AppWrapper;
