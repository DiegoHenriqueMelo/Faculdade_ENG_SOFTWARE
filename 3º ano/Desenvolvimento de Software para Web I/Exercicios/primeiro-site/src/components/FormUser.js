import { useState } from "react";

function FormUser() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [idade, setIdade] = useState();
  return (
    <div>
      <form>
        <label>Nome:</label>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
        />
        <br/>
        <label>Email:</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <br/>
        <label>Idade:</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
        />
        <br/>
        <button type="submit">Enviar</button>
      </form>

      <div>
        <p>Nome: {nome}</p>
        <p>Email: {email}</p>
        <p>Idade: {idade}</p>
      </div>
    </div>
  );
}

export default FormUser;