import React from "react";
import ReactDOM from "react-dom";
import JSONSchema from "./JSONSchema";
import { JSONSchema4 } from "json-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchema />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  const emptySchema = {} as JSONSchema4;
  ReactDOM.render(<JSONSchema schema={emptySchema}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders oneOf schema", () => {
  const div = document.createElement("div");
  const s = {
    oneOf: [
      {
        type: "string",
      },
      {
        type: "number",
      },
    ],
  } as JSONSchema4;
  ReactDOM.render(<JSONSchema schema={s}/>, div);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("number")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested schema object", () => {
  const div = document.createElement("div");
  const schema = {
    properties: {
      name: {
        properties: {
          foo: {
            type: "string",
          },
        },
        type: "object",
      },
    },
    type: "object",
  } as JSONSchema4;
  ReactDOM.render(<JSONSchema schema={schema}/>, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("object")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
