import React from "react";
import { render } from "@testing-library/react";
import { Button } from ".";

describe("<Button />", () => {
  it("renders without crashing", () => {
    const { getByText } = render(
      <Button onClick={() => {}}>버튼</Button>
    );
    expect(getByText("버튼")).toBeInTheDocument();
  });
});
