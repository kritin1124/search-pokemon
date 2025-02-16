"use client";

import { GET_POKEMON } from "@/app/graphql/get-pokemons";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./pokemonDetail.css";
import { PokemonProps } from "@/app/interfaces/type";
import Link from "next/link";

function cleanBase64Id(encodedId: string): string {
  return encodedId.replace(/%3D*$/, "");
}

const typeColorMap: Record<string, string> = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  grass: "#7AC74C",
  electric: "#F7D02C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dark: "#705746",
  dragon: "#6F35FC",
  steel: "#B7B7CE",
  fairy: "#D685AD",
};

export default function PokemonDetail() {
  const router = useRouter();
  const params = useParams();
  const [mainColor, setMainColor] = useState<string>("#f0f0f0");
  const [pokemonId, setPokemonId] = useState<string | null>(null);

  const { data, loading, error } = useQuery(GET_POKEMON, {
    variables: { id: pokemonId },
  });

  useEffect(() => {
    if (params.id) {
      setPokemonId(cleanBase64Id(params.id as string));
    }
  }, [params.id]);


  useEffect(() => {
    if (data?.pokemon?.types?.[0]) {
      const type = data.pokemon.types[0].toLowerCase();
      setMainColor(typeColorMap[type] || "#f0f0f0");
    }
  }, [data]);

  const getTypeColor = (type: string) => {
    return typeColorMap[type.toLowerCase()] || "#f0f0f0";
  };

  const getTypeColorLight = (type: string) => {
    const baseColor = getTypeColor(type);
    return `${baseColor}99`;
  };

  const goToHome = () => {
    router.push("/");
  };

  if (!pokemonId) {
    return (
      <div className="error-container">
        <h2>Pokemon ID not found!</h2>
        <button onClick={goToHome} className="back-button">
          Back
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !data?.pokemon) {
    return (
      <div className="error-container">
        <h2>Error!</h2>
        <p>{error ? error.message : "Pokemon not found!"}</p>
        <button onClick={goToHome} className="back-button">
          Back
        </button>
      </div>
    );
  }
  const goToEvolutionDetail = (id: string) => {
    console.log("id", id);
    router.push(`/pokemonDetail/${id}`);
  };

  const pokemon: PokemonProps = data.pokemon;

  return (
    <div className="pokemon-detail-container">
      <button onClick={goToHome} className="back-button">
        <span className="arrow-left"></span>
        Back
      </button>

      <div className="pokemon-card">
        <div className="pokemon-header">
          <div className="pokemon-image-container">
            <img
              src={pokemon.image}
              alt={pokemon.name}
              className="pokemon-image"
            />
          </div>

          <div className="pokemon-title">
            <span className="pokemon-number">#{pokemon.number || "N/A"}</span>
            <h1 className="pokemon-name">{pokemon.name}</h1>
            <div className="pokemon-cp">
              <span className="cp-label">MAX CP: </span>
              <span className="cp-value">{pokemon.maxCP}</span>
            </div>

            <div className="pokemon-types">
              {pokemon.types &&
                pokemon.types.map((type, index) => (
                  <span
                    key={index}
                    className={`type-badge ${type.toLowerCase()}`}
                    style={{ backgroundColor: getTypeColorLight(type) }}
                  >
                    {type}
                  </span>
                ))}
            </div>
          </div>
        </div>

        <div className="pokemon-info">
          <div className="info-section">
            <h2 style={{ borderBottomColor: mainColor }}>Information </h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">Height: </span>
                <span className="info-value">
                  {pokemon.height ? `${pokemon.height.maximum}` : "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">Weight: </span>
                <span className="info-value">
                  {pokemon.weight ? `${pokemon.weight.maximum}` : "N/A"}
                </span>
              </div>
              <div className="info-item">
                <span className="info-label">MAX-HP: </span>
                <span className="info-value">
                  {pokemon.maxHP ? `${pokemon.maxHP}` : "N/A"}
                </span>
              </div>
            </div>
          </div>

          {pokemon.attacks && pokemon.attacks.special.length > 0 && (
            <div className="info-section">
              <h2 style={{ borderBottomColor: mainColor }}>Special Attack</h2>
              <ul className="abilities-list">
                {pokemon.attacks.special.map((ability, index) => (
                  <li key={index} className="ability-item">
                    {ability.name}
                    <span className="damage">({ability.damage})</span>{" "}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {pokemon.evolutions && pokemon.evolutions.length > 0 && (
            <div className="evolutions-section">
              <h2 className="evolutions-title">Evolutions</h2>
              <div className="evolutions-grid">
                {pokemon.evolutions.map((evolution) => (
                  <div
                    key={evolution.id}
                    className="evolution-card"
                    onClick={() => goToEvolutionDetail(evolution.id)}
                  >
                    <div
                      className="evolution-header"
                      style={{ backgroundColor: "#3a4049" }}
                    >
                      <div className="evolution-image-container">
                        <img
                          src={evolution.image}
                          alt={evolution.name}
                          className="evolution-image"
                        />
                      </div>
                      <h3 className="evolution-name">{evolution.name}</h3>
                      <span className="evolution-number">
                        #{evolution.number}
                      </span>
                      <div className="evolution-types">
                        {evolution.types.map((type, index) => (
                          <span
                            key={index}
                            className="evolution-type-badge"
                            style={{ backgroundColor: getTypeColorLight(type) }}
                          >
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>
                    <div className="evolution-body">
                      <div className="evolution-stats">
                        <div className="evolution-stat-item">
                          <span className="evolution-stat-label">Max HP: </span>
                          <span className="evolution-stat-value">
                            {evolution.maxHP}
                          </span>
                        </div>
                        <div className="evolution-stat-item">
                          <span className="evolution-stat-label">Max CP: </span>
                          <span className="evolution-stat-value">
                            {evolution.maxCP}
                          </span>
                        </div>
                        <Link
                          href={`/pokemonDetail/${evolution.id}`}
                          className="pokemon-link"
                        >
                          more details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
