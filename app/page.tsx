"use client";

import Image from "next/image";
import styles from "./page.module.css";
import { ApolloClient, ApolloProvider, InMemoryCache, } from "@apollo/client";
import { PokemonContainer } from "./containers/PokemonContainer";

export default function Home() {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    cache,
    uri: 'https://graphql-pokemon2.vercel.app/',
  });
  return (
    <ApolloProvider client={client}>
      <main>
        <PokemonContainer></PokemonContainer>
      </main>

    </ApolloProvider>
    
  );
}
