import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
      number
      maxHP
      maxCP
      image 
      types 
      attacks {
        special{ 
            name
            damage
        }   
      }
        evolutions{
        id
        name
        number
        maxHP
        maxCP
        image 
        types
        attacks {
        special{ 
            name
            damage
        	}   
      	}
      }
    }
  }
`;

export const GET_POKEMON = gql`
  query GetPokemon($id: String!) {
    pokemon(id: $id) {
      id
      name
      number
      maxHP
      maxCP
      image
      types
      attacks {
        special {
          name
          damage
        }
      }
      evolutions{
        id
        name
        number
        maxHP
        maxCP
        image 
        types
        attacks {
        special{ 
            name
            damage
        	}   
      	}
      }
    }
  }
`;

export const GET_POKEMON_BY_NAME = gql`
  query GetPokemonByName($name: String!) {
    pokemon(name: $name) {
      id
      name
      number
      maxHP
      maxCP
      image
      types
      attacks {
        special {
          name
          damage
        }
      }
      evolutions{
        id
        name
        number
        maxHP
        maxCP
        image 
        types
        attacks {
        special{ 
            name
            damage
        	}   
      	}
      }
    }
  }
`;


