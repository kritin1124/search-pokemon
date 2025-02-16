import { describe,expect,test } from "@jest/globals";
import { render,screen } from "@testing-library/react";
import PokemonDetail from "./page";
import '@testing-library/jest-dom/jest-globals'

describe("render pokemonDetail", () => {
    test("should render pokemonDetail", () => {
        render(<PokemonDetail />);
        expect(screen.getByText("Pokemon Detail")).toBeInTheDocument();
    })
});