import { Link } from "react-router-dom";
import './style.css';

function Header() {
  return (
    <header>
      <h2>Fatec - Franca 2023</h2>

      <div className="menu">
        <Link to="/">Home</Link>
        <Link to="/sobre">Sobre</Link>
        <Link to="/informacoes/contato">Contato</Link>
        <Link to="/loja">Loja</Link>
      </div>
    </header>
  );
}

export default Header;
