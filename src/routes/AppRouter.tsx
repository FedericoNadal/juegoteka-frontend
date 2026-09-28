import { Routes, Route, HashRouter } from "react-router-dom";

import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
//import Mazo from "../pages/Mazo/Mazo";
import Estudio from "../pages/Estudio/Estudio";

function AppRouter() {
  return (
     //<BrowserRouter> //se usa temporalmente el hashrout para visualizar maquetado en githubpages
<HashRouter> 
   
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          {/*<Route path="/mazo" element={<Mazo />} />  */}   
          <Route path="/estudio" element={<Estudio />} />
        </Route>
      </Routes>
    
</HashRouter>
//</BrowserRouter>
  );
}

export default AppRouter;
