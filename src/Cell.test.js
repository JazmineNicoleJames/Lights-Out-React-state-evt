import { render } from "@testing-library/react";
import Cell from "./Cell";


it("should match snapshot", () => {
    const { asFragment } = render(<Cell />)

    expect(asFragment).toMatchSnapshot();
});

