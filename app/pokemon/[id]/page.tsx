"use client";

import { GET_POKEMON } from "@/app/graphql/get-pokemons";
import { useQuery } from "@apollo/client";
import { useParams } from "next/navigation";

function cleanBase64Id(encodedId: string): string {
  return encodedId.replace(/%3D*$/, ""); 
}
export default function PokemonDetail() {

  const params = useParams();
  const pokemonId = cleanBase64Id(params.id as string);

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { id: pokemonId },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
      <h1>Pokemon Detail</h1>
      <p>ID: {pokemonId}</p>
      <h2>{data.pokemon.name}</h2>
      <img src={data.pokemon.image} alt={data.pokemon.name} width={200} />
    </div>
  );
}
