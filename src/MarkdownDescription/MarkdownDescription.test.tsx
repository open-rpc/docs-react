import React from "react";
import ReactDOM from "react-dom";
import MarkdownDescription from "./MarkdownDescription";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarkdownDescription uiSchema={{}} />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a description", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarkdownDescription uiSchema={{}} source={"foo"}/>, div);
  expect(div.innerHTML).toContain("foo");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a description with syntax highlighting", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarkdownDescription uiSchema={{}} source={"```javascript\n\nconst foo = 'bar';\n\n```"}/>, div);
  expect(div.innerHTML).toContain("language-javascript");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a description with darkmode syntax highlighting", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarkdownDescription uiSchema={{appBar: {"ui:darkMode": true}}} source={"```javascript\n\nconst foo = 'bar';\n\n```"}/>, div);
  expect(div.innerHTML).toContain("language-javascript");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a description that errors", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MarkdownDescription uiSchema={{}} source={"```"}/>, div);
  ReactDOM.unmountComponentAtNode(div);
});
