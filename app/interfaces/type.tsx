export interface PokemonProps {
  id: string;
  types: Array<string>;
  name: string;
  number: number;
  maxHP: number;
  maxCP: number;
  image: string;
  attacks: {
    special: Array<{
      name: string;
      damage: number;
    }>;
  };
  evolutions: {
    id: string;
    name: string;
    number: number;
    maxHP: number;
    maxCP: number;
    image: string;
    types: Array<string>;
    attacks: {
      special: Array<{
        name: string;
        damage: number;
      }>;
    };
  }[];
}

export interface PokemonData {
  pokemon: PokemonProps;
}

export interface PokemonListData {
  pokemons: PokemonProps[];
}
