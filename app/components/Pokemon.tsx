import "./Pokemon.css";

import { PokemonData, PokemonProps } from "../interfaces/type";
export function Pokemon({ pokemon }: PokemonData) {
  
  function decodeBase64Id(encodedId: string): string {
    const decoded = atob(encodedId);
    const match = decoded.match(/\d+/);
    return match ? match[0].padStart(3, "0") : "???";
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-number">
        <p>
          #{decodeBase64Id(pokemon.id)} {pokemon.name}
        </p>
      </div>
      <div className="pokemon-image-container">
        <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
      </div>
      <h2 className="pokemon-name">{pokemon.name}</h2>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span key={type} className={`type-badge type-${type.toLowerCase()}`}>
            {type}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Pokemon;
