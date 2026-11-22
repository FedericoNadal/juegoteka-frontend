


import { Routes, Route, HashRouter } from "react-router-dom";
import Home from "../pages/Home/Home";
import MainLayout from "../layouts/MainLayout";
import Estudio from "../pages/Estudio/Estudio";
import DetalleJuego from "../pages/Juegos/DetalleJuego";
import AdminRoute from "./AdminRoute";
import Admin from "../pages/Admin/Admin";

function AppRouter() {
  return (
     //<BrowserRouter> //se usa temporalmente el hashrout para visualizar maquetado en githubpages Es una solución práctica para hosting estático.
<HashRouter>

      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/estudio" element={<Estudio />} />
          <Route path="/juegos/:id" element={<DetalleJuego />} />
          <Route element={<AdminRoute />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>

</HashRouter>
//</BrowserRouter>
  );
}

export default AppRouter;
