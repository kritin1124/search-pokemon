import { describe, expect,  it } from "@jest/globals";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/jest-globals";
import { HomePage } from ".";
import { MockedProvider, MockedResponse } from "@apollo/client/testing";
import { GET_POKEMONS } from "./graphql/get-pokemons";

export const pokemonMocks: MockedResponse[] = [
  {
    request: {
      query: GET_POKEMONS,
      variables: { first: 10 },
    },
    result: {
      data: {
        pokemons: [
          {
            id: "UG9rZW1vbjowMDE=",
            name: "Bulbasaur",
            number: "001",
            maxHP: 1071,
            maxCP: 951,
            image: "https://img.pokemondb.net/artwork/bulbasaur.jpg",
            types: ["Grass", "Poison"],
            attacks: {
              special: [
                {
                  name: "Power Whip",
                  damage: 70,
                },
                {
                  name: "Seed Bomb",
                  damage: 40,
                },
                {
                  name: "Sludge Bomb",
                  damage: 55,
                },
              ],
            },
            evolutions: [
              {
                id: "UG9rZW1vbjowMDI=",
                name: "Ivysaur",
                number: "002",
                maxHP: 1632,
                maxCP: 1483,
                image: "https://img.pokemondb.net/artwork/ivysaur.jpg",
                types: ["Grass", "Poison"],
                attacks: {
                  special: [
                    {
                      name: "Power Whip",
                      damage: 70,
                    },
                    {
                      name: "Sludge Bomb",
                      damage: 55,
                    },
                    {
                      name: "Solar Beam",
                      damage: 120,
                    },
                  ],
                },
              },
            ],
          },
          {
            id: "UG9rZW1vbjowMDQ=",
            name: "Charmander",
            number: "004",
            maxHP: 955,
            maxCP: 841,
            image: "https://img.pokemondb.net/artwork/charmander.jpg",
            types: ["Fire"],
            attacks: {
              special: [
                {
                  name: "Flame Burst",
                  damage: 30,
                },
                {
                  name: "Flame Charge",
                  damage: 25,
                },
                {
                  name: "Flamethrower",
                  damage: 55,
                },
              ],
            },
            evolutuions: [
              {
                id: "UG9rZW1vbjowMDU=",
                name: "Charmeleon",
                number: "005",
                maxHP: 1557,
                maxCP: 1411,
                image: "https://img.pokemondb.net/artwork/charmeleon.jpg",
                types: ["Fire"],
                attacks: {
                  special: [
                    {
                      name: "Fire Punch",
                      damage: 40,
                    },
                    {
                      name: "Flame Burst",
                      damage: 30,
                    },
                    {
                      name: "Flamethrower",
                      damage: 55,
                    },
                  ],
                },
              },
              {
                id: "UG9rZW1vbjowMDY=",
                name: "Charizard",
                number: "006",
                maxHP: 2602,
                maxCP: 2413,
                image: "https://img.pokemondb.net/artwork/charizard.jpg",
                types: ["Fire", "Flying"],
                attacks: {
                  special: [
                    {
                      name: "Dragon Claw",
                      damage: 35,
                    },
                    {
                      name: "Fire Blast",
                      damage: 100,
                    },
                    {
                      name: "Flamethrower",
                      damage: 55,
                    },
                  ],
                },
              },
            ],
          },
          {
            id: "UG9rZW1vbjowMDc=",
            name: "Squirtle",
            number: "007",
            maxHP: 1008,
            maxCP: 891,
            image: "https://img.pokemondb.net/artwork/squirtle.jpg",
            types: ["Water"],
            attacks: {
              special: [
                {
                  name: "Aqua Jet",
                  damage: 25,
                },
                {
                  name: "Aqua Tail",
                  damage: 45,
                },
                {
                  name: "Water Pulse",
                  damage: 35,
                },
              ],
            },
            evolutions: [
              {
                id: "UG9rZW1vbjowMDg=",
                name: "Wartortle",
                number: "008",
                maxHP: 1582,
                maxCP: 1435,
                image: "https://img.pokemondb.net/artwork/wartortle.jpg",
                types: ["Water"],
                attacks: {
                  special: [
                    {
                      name: "Aqua Jet",
                      damage: 25,
                    },
                    {
                      name: "Gunk Shot",
                      damage: 65,
                    },
                    {
                      name: "Hydro Pump",
                      damage: 90,
                    },
                    {
                      name: "Ice Beam",
                      damage: 65,
                    },
                  ],
                },
              },
              {
                id: "UG9rZW1vbjowMDk=",
                name: "Blastoise",
                number: "009",
                maxHP: 2542,
                maxCP: 2355,
                image: "https://img.pokemondb.net/artwork/blastoise.jpg",
                types: ["Water"],
                attacks: {
                  special: [
                    {
                      name: "Flash Cannon",
                      damage: 60,
                    },
                    {
                      name: "Gunk Shot",
                      damage: 65,
                    },
                    {
                      name: "Hydro Pump",
                      damage: 90,
                    },
                    {
                      name: "Ice Beam",
                      damage: 65,
                    },
                  ],
                },
              },
              {
                id: "UG9rZW1vbjowMDk=",
                name: "Blastoise",
                number: "009",
                maxHP: 2542,
                maxCP: 2355,
                image: "https://img.pokemondb.net/artwork/blastoise.jpg",
                types: ["Water"],
                attacks: {
                  special: [
                    {
                      name: "Flash Cannon",
                      damage: 60,
                    },
                    {
                      name: "Gunk Shot",
                      damage: 65,
                    },
                    {
                      name: "Hydro Pump",
                      damage: 90,
                    },
                    {
                      name: "Ice Beam",
                      damage: 65,
                    },
                  ],
                },
              },
            ],
          },
        ],
      },
    },
  },
];

describe("PokemonList", () => {
  it("renders pokemon list correctly", async () => {
    render(
      <MockedProvider mocks={pokemonMocks} addTypename={true}>
        <HomePage />
      </MockedProvider>
    );

    await screen.findByText("Bulbasaur");

    expect(screen.getByText("Bulbasaur")).toBeInTheDocument();
    expect(screen.getByText("001")).toBeInTheDocument();
    expect(screen.getByText("Grass")).toBeInTheDocument();
    expect(screen.getByText("Charmander")).toBeInTheDocument();
    expect(screen.getByText("004")).toBeInTheDocument();
    expect(screen.getByText("Fire")).toBeInTheDocument();
    expect(screen.getByText("Squirtle")).toBeInTheDocument();
    expect(screen.getByText("007")).toBeInTheDocument();
    expect(screen.getByText("Water")).toBeInTheDocument();
  });
});
