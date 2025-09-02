import Saudacao from "./components/Saudacao";
import Botao from "./components/Botao";
import { useState } from "react";

export default function App() {
  const [nome, setNome] = useState("User Undefined");

  function dizerOla() {
    alert("Você clicou no botão!");
  }

  return (
    <div style={{ padding: 20 }}>
      {/* Passando uma variável (string) como prop */}
      <Saudacao nome={nome} />

      {/* Passando uma função como prop */}
      <Botao prop={dizerOla} />

      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
        placeholder="Digite seu nome"
      />
    </div>
  );
}
