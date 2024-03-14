import { render } from "@testing-library/react";
import Board from "./Board";

it("should match snapshot", () => {
    const { asFragment } = render(<Board nrows={3} ncols={3} chanceLightStartsOn={0}/>)

    expect(asFragment).toMatchSnapshot();
});

