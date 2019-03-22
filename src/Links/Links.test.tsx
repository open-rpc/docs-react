import React from "react";
import ReactDOM from "react-dom";
import Links from "./Links";
import { types } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Links />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Links />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty links", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Links links={[]}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a link method for a given schema link", () => {
  const div = document.createElement("div");
  const link = {
    method: "get_user_address",
  };
  ReactDOM.render(<Links links={[link]} />, div);
  expect(div.innerHTML.includes("get_user_address")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a link params for a given schema link", () => {
  const div = document.createElement("div");
  const link = {
    params: {
      foo: "$params.id",
    },
  };
  ReactDOM.render(<Links links={[link]} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("$params.id")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a link description for a given schema link", () => {
  const div = document.createElement("div");
  const link = {
    description: "my description",
  };
  ReactDOM.render(<Links links={[link]} />, div);
  expect(div.innerHTML.includes("my description")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a link server url for a given schema link", () => {
  const div = document.createElement("div");
  const link = {
    server: {
      url: "http://localhost:9210",
    },
  };
  ReactDOM.render(<Links links={[link]} />, div);
  expect(div.innerHTML.includes("localhost:9210")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a link server url for a given schema link", () => {
  const div = document.createElement("div");
  const link = {
    server: {
      url: "http://localhost:9210",
    },
  };
  ReactDOM.render(<Links links={[link]} />, div);
  expect(div.innerHTML.includes("localhost:9210")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
