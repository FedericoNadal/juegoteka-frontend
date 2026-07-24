import { BrowserRouter, Routes, Route, HashRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Perfil from "../pages/Perfil/Perfil";
import Libreta from "../pages/Libreta/Libreta";
import Mapa from "../pages/Mapa/Mapa";
import Mazo from "../pages/Mazo/Mazo";

function AppRouter() {
  return (
     //<BrowserRouter> //se usa temporalmente el hashrout para visualizar maquetado en githubpages
<HashRouter> 
   
      <Routes>
        <Route element={<MainLayout />}>

          <Route path="/" element={<Home />} />
          <Route path="/mazo" element={<Mazo />} />
          <Route path="/mapa" element={<Mapa />} />
          <Route path="/libreta" element={<Libreta />} />
          <Route path="/perfil" element={<Perfil />} />

        </Route>
      </Routes>
    
</HashRouter>
//</BrowserRouter>
  );
}

export default AppRouter;
