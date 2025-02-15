import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "../graphql/get-pokemons";
import './PokemonContainer.css';
import { PokemonProps } from "../interfaces/type";
import Pokemon from "../components/Pokemon";

export function PokemonContainer() {
  
  const { data} = useQuery(GET_POKEMONS, {
    variables: { first: 9 },
  });
  const pokemons: PokemonProps[] = data?.pokemons ?? [];
  return (
    <div className="pokemon-container">
      <div className="pokemon-header">
        <h1>My Pokemon</h1>
        <p>Here are my pokemon:</p>
      </div>
      <div className="pokemon-grid">
        {pokemons?.map((pokemon: PokemonProps) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
    </div>
  );
}