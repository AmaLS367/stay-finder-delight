import React from "react";
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import App from "@/App";

describe("routing smoke", () => {
  it("renders Home route", async () => {
    window.location.hash = "#/";

    render(<App />);

    const heading = await screen.findByText("Find your perfect stay");
    expect(heading).toBeInTheDocument();
  });

  it("renders Listing route for a known listing", async () => {
    window.location.hash = "#/listing/paris-1";

    render(<App />);

    const title = await screen.findByText("Elegant Parisian Apartment near Eiffel Tower");
    expect(title).toBeInTheDocument();
  });
});
