import React from "react";
import { describe, it, expect, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useLocalStorage } from "@/hooks/useLocalStorage";

function TestComponent() {
  const [value, setValue] = useLocalStorage<number>("counter_test", 0);

  return (
    <div>
      <div data-testid="value">{value}</div>
      <button
        type="button"
        onClick={() => {
          setValue((prev) => prev + 1);
          setValue((prev) => prev + 1);
        }}
      >
        Inc2
      </button>
    </div>
  );
}

describe("useLocalStorage", () => {
  beforeEach(() => {
    window.localStorage.clear();
  });

  it("applies functional updates without stale state", async () => {
    const user = userEvent.setup();
    render(<TestComponent />);

    expect(screen.getByTestId("value").textContent).toBe("0");

    await user.click(screen.getByRole("button", { name: "Inc2" }));

    expect(screen.getByTestId("value").textContent).toBe("2");
    expect(window.localStorage.getItem("counter_test")).toBe("2");
  });
});
