import React from "react";
import ReactDOM from "react-dom";
import ContentDescriptors from "./ContentDescriptors";
import { OpenRPC } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentDescriptors />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<ContentDescriptors />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  const emptySchema = {} as OpenRPC;
  ReactDOM.render(<ContentDescriptors schema={emptySchema}/>, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders a name", () => {
  const div = document.createElement("div");
  const schema = {
    components: {
      contentDescriptors: {
        foo: {
          name: "foo",
        },
      },
    },
  } as any;
  ReactDOM.render(<ContentDescriptors schema={schema} disableTransitionProps={true}/>, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
