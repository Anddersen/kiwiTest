import React from "react";
import { MemoryRouter } from "react-router-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import axios from "axios";
import moment from "moment";

import Main from "../Main";

import { mockMos } from "../mockData";

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("main tests", () => {
  test("main page choose From location", async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockMos));

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText(/Search/)).toBeInTheDocument();
    userEvent.click(screen.getAllByRole("combobox")[0]);
    expect(screen.getByText("No Data")).toBeInTheDocument();

    userEvent.type(screen.getAllByRole("combobox")[0], "mos");

    expect(await screen.findAllByText(/Moscow/)).toHaveLength(2);

    userEvent.click(screen.getAllByText(/Moscow/)[0]);

    expect(screen.getAllByText(/Moscow/)).toHaveLength(3);
  });

  test("main page choose to location", async () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockMos));

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    expect(screen.getByText(/Search/)).toBeInTheDocument();
    userEvent.click(screen.getAllByRole("combobox")[1]);
    expect(screen.getByText("No Data")).toBeInTheDocument();

    userEvent.type(screen.getAllByRole("combobox")[1], "mos");

    expect(await screen.findAllByText(/Mossoro/)).toHaveLength(1);

    userEvent.click(screen.getAllByText(/Mossoro/)[0]);

    expect(screen.getAllByText(/Mossoro/)).toHaveLength(2);
  });

  test("main page choose dates", () => {
    mockedAxios.get.mockImplementationOnce(() => Promise.resolve(mockMos));

    render(
      <MemoryRouter>
        <Main />
      </MemoryRouter>
    );

    const dateNow = moment().format("DD-MM-YYYY");
    const dateNexDay = moment().add(2, "days").format("DD-MM-YYYY");

    expect(screen.getByText(/Search/)).toBeInTheDocument();
    expect(screen.getAllByPlaceholderText("Select date")[0]).toHaveValue(
      dateNow
    );
    userEvent.type(
      screen.getAllByPlaceholderText("Select date")[1],
      dateNexDay
    );
    expect(screen.getAllByPlaceholderText("Select date")[1]).toHaveValue(
      dateNexDay
    );
  });
});
