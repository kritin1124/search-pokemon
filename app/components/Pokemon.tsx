interface PokemonProps {
    pokemon:any;
  }
  
  export function Pokemon({pokemon }: PokemonProps) {
    return (
      <div>
        <h1>{pokemon.name}</h1>
        <img src={pokemon.image} alt="" />
      </div>
    );
  }
  