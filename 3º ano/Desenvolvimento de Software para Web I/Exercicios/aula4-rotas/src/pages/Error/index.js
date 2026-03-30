import { Link } from "react-router-dom";

function Error() {
  return (
    <div>
      <h2>Ops, parece que a página que você está acessando não existe!</h2>
      <br />
      <span>Encontramos as seguintes páginas: </span><br />
      <Link to="/">Home</Link><br />
      <Link to="/sobre">Sobre</Link>
    </div>
  );
}

export default Error;
