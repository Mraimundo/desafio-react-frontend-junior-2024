import { render } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import { Footer } from "./footer";
describe("Footer component", () => {
  test("should renders footer with correct text content", () => {
    const { getByText } = render(<Footer />);

    expect(getByText("Double-click to edit a todo")).toBeInTheDocument();
    expect(getByText("Template by")).toBeInTheDocument();
    expect(getByText("Sindre Sorhus")).toBeInTheDocument();
    expect(getByText("Created by Mouzinho Raimundo")).toBeInTheDocument();
  });
});
