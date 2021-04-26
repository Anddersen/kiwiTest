import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import axios from "axios";

import Flights from "../Flights";

import { mockFlights } from "../mockData";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("flights tests", () => {
  test("flights page render", async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockFlights));

    render(
      <MemoryRouter>
        <Flights />
      </MemoryRouter>
    );

    expect(await screen.findByText('157 €')).toBeInTheDocument();
    userEvent.click(screen.getByText('2'));
    expect(screen.getByText('180 €')).toBeInTheDocument();
  });
});
