import React, { useEffect, useState } from "react";
import "./style.css";
import "./App.css";

function App() {
  const [pokemon, setPokemon] = useState([]);
  const [id, setId] = useState(0);
  const [search, setSearch] = useState(""); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadAPI();
  }, []);

  async function handleId(isAdd) {
    try {
      if (isAdd === "add") {
        setId(id + 1);
      } else if (id === 0) {
        setId(0);
      } else {
        setId(id - 1);
      }
    } catch {}
  }

  function handleName(name) {
    const found = pokemon.find(
      (p) => p.name.toLowerCase() === name.toLowerCase() 
    );

    if (found) {
      setId(pokemon.indexOf(found)); 
    }
  }

  async function loadAPI() {
    try {
      const url = "https://pokeapi.co/api/v2/pokemon?limit=1025&offset=0";
      const response = await fetch(url);
      const data = await response.json();

      const details = await Promise.all(
        data.results.map((p) => fetch(p.url).then((r) => r.json())),
      );

      setPokemon(details);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  if (loading) return <div>Carregando...</div>;
  if (error) return <div>Erro: {error}</div>;

  let pokeId = pokemon[id];

  return (
    <div>
      <header>
        <strong>Pokemon API</strong>
      </header>
      <div className="container">
        <div className="pokedex">
          <div key={pokeId.id} className="image">
            <img src={pokeId.sprites.front_default} alt={pokeId.name} />
          </div>
          <div className="desc">
            <div>Name: {pokeId.name}</div>
            <div>Tipos: {pokeId.types.map((t) => t.type.name).join(", ")}</div>
            <div>Nº: {pokeId.id}</div>
            <div>Peso: {pokeId.weight / 10}</div>
            <div>Altura: {pokeId.height / 10}</div>
          </div>
        </div>
        <div className="filter">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleName(search)}
            placeholder="Digite o nome do pokémon..."
          />
          <button onClick={() => handleName(search)}>Buscar</button>
          <button onClick={() => handleId("remove")}>-1</button>
          <button onClick={() => handleId("add")}>+1</button>
        </div>
      </div>
    </div>
  );
}

export default App;