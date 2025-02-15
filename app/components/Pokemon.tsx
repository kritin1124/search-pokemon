import './Pokemon.css';


import {  PokemonData, PokemonProps } from '../interfaces/type';
export function Pokemon({ pokemon }: PokemonData) {
  return (
    <div className="pokemon-card">
      <div className="pokemon-number">
        #{pokemon.id.toString().padStart(4, '0')}
      </div>
      <div className="pokemon-image-container">
        <img 
          src={pokemon.image} 
          alt={pokemon.name} 
          className="pokemon-image"
        />
      </div>
      <h2 className="pokemon-name">
        {pokemon.name}
      </h2>
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