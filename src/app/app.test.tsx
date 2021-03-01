import React from "react";
import { screen, waitFor } from "@testing-library/react";

import { renderWithContext } from "../tests-utils";
import { mockTickets, mockUsers } from "./__fixtures__/mockData";

import App from "./app";

jest.mock("./api/tickets", () => {
  const mockGetTickets = () => mockTickets;

  return {
    getTickets: mockGetTickets,
  };
});
jest.mock("./api/users", () => {
  const mopckGetUsers = () => mockUsers;

  return {
    getUsers: mopckGetUsers,
  };
});

test("App renders correctly", () => {
  renderWithContext(<App />);
  screen.findByText(/tickets Assignment/i);
});

test("App renders both defailt tickets", async () => {
  renderWithContext(<App />);

  await waitFor(() => {
    const tickets = screen.getAllByTestId("ticket-elem");
    expect(tickets).toHaveLength(2);
  });
});
