import React from "react";
import ReactDOM from "react-dom";
import Documentation from "./Documentation";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Documentation schema={{} as any} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders without crashing with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Documentation />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("render contentDescriptors", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Documentation
    schema={{ components: { contentDescriptors: { Foo: { name: "foo", schema: true } } } } as any}
  />, div);
  expect(div.innerHTML.includes("ContentDescriptors")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("doesnt render contentDescriptors if uiSchema contentDescriptors hidden is passed", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Documentation
    schema={{ components: { contentDescriptors: { Foo: { name: "foo", schema: true } } } } as any}
    uiSchema={{ contentDescriptors: { "ui:hidden": true } }}
  />, div);
  expect(div.innerHTML.includes("ContentDescriptors")).toBe(false);
  ReactDOM.unmountComponentAtNode(div);
});
