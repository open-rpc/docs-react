import React from "react";
import ReactDOM from "react-dom";
import Servers from "./Servers";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Servers />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no servers", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Servers />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty servers", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Servers servers={[]} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema servers", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Servers servers={[]} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema servers", () => {
  const div = document.createElement("div");
  const servers = [
    {
      description: "foobar",
      name: "Pet Store",
      url: "http://petstore.openrpc.io/api",
    },
  ];
  ReactDOM.render(<Servers servers={servers} />, div);
  expect(div.innerHTML.includes("Pet Store")).toBe(true);
  expect(div.innerHTML.includes("http://petstore.openrpc.io/api")).toBe(true);
  expect(div.innerHTML.includes("foobar")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema servers with variables", () => {
  const div = document.createElement("div");
  const servers = [
    {
      description: "foobar",
      name: "Pet Store",
      url: "http://{username}.open-rpc.org:{port}/{basePath}/{exampleName}",
      variables: {
        basePath: {
          default: "jsonrpc",
        },
        exampleName: {
          default: "petstore",
        },
        port: {
          default: "443",
          enum: [
            "8545",
            "443",
          ],
        },
        username: {
          default: "demo",
          description: "this is applied to the url as the subdomain",
        },
      },
    },
  ];
  ReactDOM.render(<Servers servers={servers} />, div);
  expect(div.innerHTML.includes("open-rpc.org")).toBe(true);
  expect(div.innerHTML.includes("petstore")).toBe(true);
  expect(div.innerHTML.includes("jsonrpc")).toBe(true);
  expect(div.innerHTML.includes("443")).toBe(true);
  expect(div.innerHTML.includes("8545")).toBe(true);
  expect(div.innerHTML.includes("demo")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
