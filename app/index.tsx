import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./graphql/get-pokemons";
import "./index.css";
import { PokemonProps } from "./interfaces/type";
import Pokemon from "./components/Pokemon";
import { useState } from "react";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const { data } = useQuery(GET_POKEMONS, {
    variables: { first: 9 },
  });
  const pokemons: PokemonProps[] = data?.pokemons ?? [];
  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pokemon-container">
      <div className="pokemon-header">
        <h1>My Pokemon</h1>
        <p>Here are my pokemon:</p>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon: PokemonProps) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {filteredPokemons.length === 0 && (
        <div className="no-results">
          No Pokemon found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
