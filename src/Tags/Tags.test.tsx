import React from "react";
import ReactDOM from "react-dom";
import Tags from "./Tags";

it("renders empty with empty tags", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Tags tags={[]} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema tags", () => {
  const div = document.createElement("div");
  const tags = ["salad", "mytag"];
  ReactDOM.render(<Tags tags={tags} />, div);
  expect(div.innerHTML.includes("salad")).toBe(true);
  expect(div.innerHTML.includes("mytag")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
