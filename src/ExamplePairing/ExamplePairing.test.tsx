import React from "react";
import ReactDOM from "react-dom";
import ExamplePairing from "./ExamplePairing";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

it("renders handles no method", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing method={undefined} examplePosition={0}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders handles no method examples", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing method={{} as any} examplePosition={0} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders handles no examplePosition", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as OpenrpcDocument;
  ReactDOM.render(<ExamplePairing method={simpleMath.methods[0]} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as OpenrpcDocument;
  ReactDOM.render(<ExamplePairing method={simpleMath.methods[0]} examplePosition={0} />, div);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with params by-name", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing method={{
    examples: [
      {
        name: "fooExample",
        params: [
          {
            name: "foo",
            value: "bar",
          },
        ],
        result: {
          name: "exampleResultThing",
          value: "potato",
        },
      },
    ],
    name: "myMethod",
    paramStructure: "by-name",
    params: [{
      name: "foo",
      schema: {
        type: "string",
      },
    }],
    result: {
      name: "resultThing",
      schema: {
        type: "string",
      },
    },
  }} examplePosition={0} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
