import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Sobre from "./pages/Sobre";
import Error from "./pages/Error";
import Contato from "./pages/Contato";
import Produtos from "./pages/Produtos";
import Loja from "./pages/Loja";

import Header from "./components/Header";

//Configurando o componente de roteamento
function RoutesApp() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/sobre" element={<Sobre />} />
        <Route path="/informacoes/contato" element={<Contato />} />
        <Route path="/loja" element={<Loja />} />
        <Route path="/produtos/:id" element={<Produtos />} />

        <Route path="*" element={<Error />} />
      </Routes>
    </BrowserRouter>
  );
}

export default RoutesApp;
