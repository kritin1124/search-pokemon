export interface PokemonProps  {
  id: string;
  types: Array<string>;
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
export interface PokemonData {
  pokemon: PokemonProps;
}