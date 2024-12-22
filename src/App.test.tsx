import "@testing-library/jest-dom/extend-expect";
import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import App from "./App";

describe("App Component", () => {
  it("renders the heading", () => {
    render(<App />);
    expect(
      screen.getByRole("heading", { name: /Kickstarter Projects/i })
    ).toBeInTheDocument();
  });

  it("displays loading message initially", () => {
    render(<App />);
    expect(screen.getByRole("status")).toHaveTextContent("Loading...");
  });

  it("renders table after loading", async () => {
    render(<App />);
    const table = await screen.findByRole("table");
    expect(table).toBeInTheDocument();
  });

  it("navigates to next page", async () => {
    render(<App />);
    const nextButton = await screen.findByRole("button", {
      name: /Next Page/i,
    });
    fireEvent.click(nextButton);
    expect(screen.getByText(/Page 2 of/i)).toBeInTheDocument();
  });

  it("disables the previous button on the first page", async () => {
    render(<App />);
    const prevButton = await screen.findByRole("button", {
      name: /Previous Page/i,
    });
    expect(prevButton).toBeDisabled();
  });
});
