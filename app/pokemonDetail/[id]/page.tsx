"use client";

import { GET_POKEMON } from "@/app/graphql/get-pokemons";
import { useQuery } from "@apollo/client";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import "./pokemonDetail.css";

function cleanBase64Id(encodedId: string): string {
  return encodedId.replace(/%3D*$/, "");
}

interface Pokemon {
  id: string;
  name: string;
  image: string;
  number: string;
  types: string[];
  height: number;
  weight: number;
  abilities: string[];
  stats: {
    name: string;
    value: number;
  }[];
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
    skip: !pokemonId, // ข้าม query ถ้ายังไม่มี pokemonId
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

  const goToHome = () => {
    router.push('/');
  };

  if (!pokemonId) {
    return (
      <div className="error-container">
        <h2>ไม่พบ ID ของโปเกมอน</h2>
        <button onClick={goToHome} className="back-button">
          กลับไปหน้าหลัก
        </button>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p>กำลังโหลดข้อมูล...</p>
      </div>
    );
  }

  if (error || !data?.pokemon) {
    return (
      <div className="error-container">
        <h2>เกิดข้อผิดพลาด!</h2>
        <p>{error ? error.message : "ไม่พบข้อมูลโปเกมอน"}</p>
        <button onClick={goToHome} className="back-button">
          กลับไปหน้าหลัก
        </button>
      </div>
    );
  }

  const pokemon: Pokemon = data.pokemon;

  return (
    <div className="pokemon-detail-container">
      <button onClick={goToHome} className="back-button">
        <span className="arrow-left"></span>
        กลับไปหน้าหลัก
      </button>

      <div className="pokemon-card">
        <div className="pokemon-header" style={{ backgroundColor: mainColor }}>
          <div className="pokemon-image-container">
            <img src={pokemon.image} alt={pokemon.name} className="pokemon-image" />
          </div>
          
          <div className="pokemon-title">
            <span className="pokemon-number">#{pokemon.number || 'N/A'}</span>
            <h1 className="pokemon-name">{pokemon.name}</h1>
            
            <div className="pokemon-types">
              {pokemon.types && pokemon.types.map((type, index) => (
                <span key={index} className={`type-badge ${type.toLowerCase()}`}>
                  {type}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="pokemon-info">
          <div className="info-section">
            <h2 style={{ borderBottomColor: mainColor }}>ข้อมูลพื้นฐาน</h2>
            <div className="info-grid">
              <div className="info-item">
                <span className="info-label">ส่วนสูง:</span>
                <span className="info-value">{pokemon.height ? `${pokemon.height / 10} m` : 'N/A'}</span>
              </div>
              <div className="info-item">
                <span className="info-label">น้ำหนัก:</span>
                <span className="info-value">{pokemon.weight ? `${pokemon.weight / 10} kg` : 'N/A'}</span>
              </div>
            </div>
          </div>

          {pokemon.abilities && pokemon.abilities.length > 0 && (
            <div className="info-section">
              <h2 style={{ borderBottomColor: mainColor }}>ความสามารถ</h2>
              <ul className="abilities-list">
                {pokemon.abilities.map((ability, index) => (
                  <li key={index} className="ability-item">{ability}</li>
                ))}
              </ul>
            </div>
          )}

          {pokemon.stats && pokemon.stats.length > 0 && (
            <div className="info-section">
              <h2 style={{ borderBottomColor: mainColor }}>สถิติ</h2>
              <div className="stats-container">
                {pokemon.stats.map((stat, index) => (
                  <div key={index} className="stat-item">
                    <span className="stat-name">{stat.name}</span>
                    <div className="stat-bar-container">
                      <div 
                        className="stat-bar"
                        style={{ 
                          width: `${Math.min(100, (stat.value / 255) * 100)}%`,
                          backgroundColor: mainColor
                        }}
                      ></div>
                    </div>
                    <span className="stat-value">{stat.value}</span>
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
