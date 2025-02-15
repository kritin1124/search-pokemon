import "./Pokemon.css";
import Link from "next/link";

import { PokemonData } from "../interfaces/type";
export function Pokemon({ pokemon }: PokemonData) {
  return (
    <Link href={`/pokemon/${pokemon.id}`} className="pokemon-link">
      <div className="pokemon-card">
        <div className="pokemon-number">
          <p>{pokemon.number}</p>
        </div>
        <div className="pokemon-image-container">
          <img
            src={pokemon.image}
            alt={pokemon.name}
            className="pokemon-image"
          />
        </div>
        <h2 className="pokemon-name">{pokemon.name}</h2>
        <div className="pokemon-types">
          {pokemon.types.map((type) => (
            <span
              key={type}
              className={`type-badge type-${type.toLowerCase()}`}
            >
              {type}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}

export default Pokemon;
