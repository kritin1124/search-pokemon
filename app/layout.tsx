'use client'
import { ApolloProviderWrapper } from "@/app/providers/ApolloProvider";
import "./globals.css";
import { ApolloClient, ApolloProvider, InMemoryCache } from "@apollo/client";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const client = new ApolloClient({
    uri: "https://graphql-pokemon2.vercel.app/",
    cache: new InMemoryCache(),
  });
  return (
    <html lang="en">
      <body>
        <ApolloProvider client={client}>{children}</ApolloProvider>
      </body>
    </html>
  );
}
