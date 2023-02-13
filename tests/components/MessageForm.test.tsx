import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import MessageForm from "@/components/MessageForm";

interface Dictionary {
  [key: string]: any;
}

const mockAddMessageFunction = (item: Dictionary) => {
  return;
};

describe("MessageForm component", () => {
  it("it renders", () => {
    render(<MessageForm addMessage={mockAddMessageFunction} />);

    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email address")).toBeInTheDocument();
    expect(screen.getByText("Message")).toBeInTheDocument();

    expect(screen.getByLabelText("Name")).toHaveAttribute("type", "text");
    expect(screen.getByLabelText("Email address")).toHaveAttribute(
      "type",
      "email"
    );
    expect(screen.getByLabelText("Message")).toHaveAttribute("type", "string");
  });

  it("submit button disabled for empty name", async () => {
    render(<MessageForm addMessage={mockAddMessageFunction} />);
    const nameInput = screen.getByLabelText("Name");
    fireEvent.change(nameInput, {'target': {'value': ''}});

    expect(screen.getByRole("button")).toHaveAttribute('disabled');
  });
});
