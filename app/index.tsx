import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./graphql/get-pokemons";
import "./index.css";
import { PokemonProps } from "./interfaces/type";
import Pokemon from "./components/Pokemon";
import { useCallback, useEffect, useState } from "react";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(10); 
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const { data, fetchMore } = useQuery(GET_POKEMONS, {
    variables: { first: limit },
  });

  useEffect(() => {
    if (data?.pokemons) {
      setPokemons(data.pokemons); 
    }
  }, [data]);

  const loadMorePokemons = useCallback(() => {
    if (isFetching) return; 

    setIsFetching(true);
    fetchMore({
      variables: { first: limit + 10 }, 
      updateQuery: (prevResult, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prevResult;
        return {
          pokemons: fetchMoreResult.pokemons,
        };
      },
    }).then(() => {
      setLimit((prevLimit) => prevLimit + 10); 
      setIsFetching(false);
    });
  }, [fetchMore, limit, isFetching]);

  
  useEffect(() => {
    function handleScroll() {
      if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
        loadMorePokemons();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePokemons]);


  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );



  return (
    <div className="pokemon-container">
      <div className="pokemon-header">
        <h1>My Pokemon</h1>
        <p>Here are my pokemon:</p>
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon: PokemonProps) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {filteredPokemons.length === 0 && (
        <div className="no-results">
          No Pokemon found matching "{searchTerm}"
        </div>
      )}
    </div>
  );
}
