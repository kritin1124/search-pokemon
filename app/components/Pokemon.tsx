import "./Pokemon.css";
import Link from "next/link";
import { PokemonData } from "../interfaces/type";

export function Pokemon({ pokemon }: PokemonData) {
  return (
    <Link href={`/pokemonDetail/${pokemon.id}`} className="pokemon-link">
      <div className="pokemon-card">
        <div className="pokemon-number">
          <p>{pokemon.number}</p>
        </div>
        <div className="pokemon-cp">
            <span className="cp-label">MAX CP</span>
            <span className="cp-value">{pokemon.maxCP}</span>
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
        <div className="pokemon-attacks">
          <h3>Special Attacks</h3>
          <div className="attacks-list">
            {pokemon.attacks.special.slice(0, 2).map((attack) => (
              <div key={attack.name} className="attack-item">
                <span className="attack-name">{attack.name}</span>
                <span className="attack-damage">{attack.damage}</span>
              </div>
            ))}
          </div>
        </div>
        {pokemon.evolutions && pokemon.evolutions.length > 0 && (
          <div className="pokemon-evolutions">
            <h3>Evolves to</h3>
            <div className="evolution-chain">
              {pokemon.evolutions.map((evolution, index) => (
                <div key={evolution.id} className="evolution-item">
                  <img
                    src={evolution.image}
                    alt={evolution.name}
                    className="evolution-image"
                  />
                  <span className="evolution-name">{evolution.name}</span>
                  {index < pokemon.evolutions.length - 1 && (
                    <span className="evolution-arrow">→</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

export default Pokemon;
