import React from "react";
import ReactDOM from "react-dom";
import ExamplePairing from "./ExamplePairing";
import examples from "@open-rpc/examples";
import refParser from "json-schema-ref-parser";
import { MethodObject, OpenrpcDocument, ExamplePairingObject } from "@open-rpc/meta-schema";

it("renders handles no method", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing methodName={undefined} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders handles no method examples", async () => {
  const div = document.createElement("div");
  ReactDOM.render(<ExamplePairing methodName={"foo"} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples", async () => {
  const div = document.createElement("div");
  const simpleMath = await refParser.dereference(examples.simpleMath) as OpenrpcDocument;
  ReactDOM.render(
    <ExamplePairing
      methodName={simpleMath.methods[0].name}
      examplePairing={simpleMath.methods[0].examples && simpleMath.methods[0].examples[0] as any}
    />
    , div);
  expect(div.innerHTML.includes("2")).toBe(true);
  expect(div.innerHTML.includes("4")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders examples with params by-name", async () => {
  const div = document.createElement("div");
  const method: MethodObject = {
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
  };
  ReactDOM.render(
    <ExamplePairing
      methodName={method.name}
      examplePairing={method.examples && method.examples[0] as ExamplePairingObject}
      paramStructure={method.paramStructure || "by-position"} />
    , div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
