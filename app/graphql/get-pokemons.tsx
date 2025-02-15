import { gql } from "@apollo/client";

export const GET_POKEMONS = gql`
  query GetPokemons($first: Int!) {
    pokemons(first: $first) {
      id
      name
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
`;
