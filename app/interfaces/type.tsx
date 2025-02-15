export interface PokemonProps  {
  id: string;
  types: Array<string>;
  name: string;
  number: number;
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
export interface PokemonData {
  pokemon: PokemonProps;
}