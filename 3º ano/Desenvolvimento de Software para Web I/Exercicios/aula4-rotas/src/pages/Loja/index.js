import { Link } from "react-router-dom";

function Loja() {
  return (
    <div style={{ padding: "16px" }}>
      <h1>Nossa Loja</h1>
      <br />
      <p>Confira nossos produtos:</p>
      <br />
      <ul style={{ listStyle: "none" }}>
        <li><Link to="/produtos/playstation">Console PlayStation 5</Link></li>
        <li><Link to="/produtos/xbox">Console Microsoft Xbox Series X</Link></li>
        <li><Link to="/produtos/atari">Atari 2600+</Link></li>
        <li><Link to="/produtos/super-nintendo">Super Nintendo (SNES)</Link></li>
      </ul>
    </div>
  );
}

export default Loja;
