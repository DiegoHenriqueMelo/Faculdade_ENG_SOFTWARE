import { useState } from "react";
import FormUser from "./components/FormUser";

function App() {
  const [aluno, setAluno] = useState("Aluno");
  function handleChangeName(nome) {
    setAluno(nome);
  }

  return (
    <div className="App">
      <h1>Bem-vindo ao meu projeto!</h1>
      <h2>Olá {aluno}</h2>
      <FormUser />
    </div>
  );
}

export default App;
