import { useQuery } from "@apollo/client";
import { GET_POKEMONS } from "./graphql/get-pokemons";
import "./index.css";
import { PokemonListData, PokemonProps } from "./interfaces/type";
import Pokemon from "./components/Pokemon";
import { ChangeEvent, useCallback, useEffect, useState } from "react";

export function HomePage() {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [limit, setLimit] = useState<number>(10);
  const [pokemons, setPokemons] = useState<PokemonProps[]>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { data, fetchMore } = useQuery<PokemonListData>(GET_POKEMONS, {
    variables: { first: limit },
  });

  const { data: Alldata } = useQuery<PokemonListData>(GET_POKEMONS, {
    variables: { first: 1000 },
  });



  useEffect(() => {
    const handleUrlChange = () => {
      const params = new URLSearchParams(window.location.search);
      const searchParam = params.get("search") ?? "";
      setSearchTerm(searchParam);
    };
    handleUrlChange();
    window.addEventListener("popstate", handleUrlChange);
    return () => window.removeEventListener("popstate", handleUrlChange);
  }, []);

  useEffect(() => {
    if (searchTerm) {
      setPokemons(Alldata?.pokemons ?? []);
      setIsLoading(true);
    } else {
      if (data?.pokemons) {
        setPokemons(data.pokemons);
        setIsLoading(true);

      }
    }
  }, [data, Alldata, searchTerm]);

  const loadMorePokemons = useCallback(() => {
    if (isFetching) { return; }
    else {
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
    }
  }, [fetchMore, limit, isFetching]);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + window.scrollY >=
        document.body.offsetHeight - 500
      ) {
        loadMorePokemons();
      }
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [loadMorePokemons]);



  const updateSearchAndUrl = (newSearchTerm: string) => {
    setSearchTerm(newSearchTerm);
    const params = new URLSearchParams(window.location.search);
    if (newSearchTerm) {
      params.set("search", newSearchTerm);
    } else {
      params.delete("search");
    }
    const newUrl = `${window.location.pathname}${params.toString() ? `?${params.toString()}` : ""
      }`;
    window.history.pushState({}, "", newUrl);
  };
  const handleSearchChange = (e: ChangeEvent<HTMLInputElement>): void => {
    updateSearchAndUrl(e.target.value);
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (

    <div className="pokemon-container">

      <div className="pokemon-header">
        <input
          type="text"
          placeholder="Search Pokemon..."
          value={searchTerm}
          onChange={handleSearchChange}
          className="search-input"
        />
      </div>

      <div className="pokemon-grid">
        {filteredPokemons.map((pokemon: PokemonProps) => (
          <Pokemon key={pokemon.id} pokemon={pokemon} />
        ))}
      </div>
      {isFetching && filteredPokemons.length === 0 && (
        <div className="no-results">

          No Pokemon found matching {searchTerm}
        </div>
      )}
      {!isLoading ? (<div className="loading">Loading...</div>) : null}

    </div>
  );
}