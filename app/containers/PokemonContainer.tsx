import { useQuery } from "@apollo/client";
import {Pokemon} from "../components/Pokemon";
import { GET_POKEMONS } from "../graphql/get-pokemons";
export function PokemonContainer() {
  type Pokemon = {
    id: string;
    name: string;
    maxHP: number;
    maxCP: number;
    image: string;
    attacks:{
        special:{ 
            name: string;
            damage: number;
        }      
    }
  };
  const { data} = useQuery(GET_POKEMONS, {
    variables: { first: 100 },
  });
  const pokemons: Pokemon[] = data?.pokemons ?? [];
  return (
    <div className="container">
      <h1>My Pokemon</h1>
      <p>Here are my pokemon:</p>
      <>
        {pokemons?.map((pokemon:any) => (
          <Pokemon key={pokemon.id} pokemon={pokemon}/>
        ))}
      </>
    </div>
  );
}