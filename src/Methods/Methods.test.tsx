import React from "react";
import ReactDOM from "react-dom";
import Methods, { IMethodPluginProps } from "./Methods";
import { OpenrpcDocument } from "@open-rpc/meta-schema";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods />, div);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods schema={{} as any} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema methods", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Methods schema={{ methods: [] } as any} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods name", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        name: "get_pet",
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("get_pet")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("doesnt render collapsed contents", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} />, div);
  expect(div.innerHTML.includes("foobarz")).toBe(false);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders collapsed contents with defaultExpanded from uiSchema", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  const uiSchema = {
    links: {
    },
    methods: {
      "ui:defaultExpanded": true,
    },
    params: {
    },
  };
  ReactDOM.render(<Methods uiSchema={uiSchema} schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("aria-expanded=\"true\"")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders collapsed contents with defaultExpanded with the method from uiSchema", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        name: "foomethod",
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  const uiSchema = {
    links: {
    },
    methods: {
      "ui:defaultExpanded": {
        foomethod: true,
      },
    },
    params: {
    },
  };
  ReactDOM.render(<Methods uiSchema={uiSchema} schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("aria-expanded=\"true\"")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("doesnt render collapsed contents with wrong method name and defaultExpanded with method", () => {
  const div = document.createElement("div");
  const uiSchema = {
    links: {
    },
    methods: {
      "ui:defaultExpanded": {
        foomethod: true,
      },
    },
    params: {
    },
  };
  const schema = {
    methods: [
      {
        name: "foomethod2",
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  ReactDOM.render(<Methods uiSchema={uiSchema} schema={schema as any} />, div);
  expect(div.innerHTML.includes("foobarz")).toBe(false);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders collapsed contents with disableTransitionProps", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("foobarz")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema plugin", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        name: "get_pet",
      },
    ],
  };
  const TestComponent: React.FC<IMethodPluginProps> = (props) => {
    return (
      <div>
        Plugin Test
      </div>
    );
  };

  ReactDOM.render(
    <Methods schema={schema as any} methodPlugins={[TestComponent]} disableTransitionProps={true} />
  , div);
  expect(div.innerHTML.includes("get_pet")).toBe(true);
  expect(div.innerHTML.includes("Plugin Test")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods summary", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
        name: "get_pet",
        params: [],
        summary: "a short summary",
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("a short summary")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods description", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        description: "verbose get_pet description",
      },
    ],
  } as OpenrpcDocument;
  ReactDOM.render(<Methods schema={schema} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("verbose get_pet description")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods params", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        params: [{
          name: "foobarz",
        }],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("foobarz")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods result", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        result: {
          schema: {
            properties: {
              id: {
                format: "int64",
                type: "integer",
              },
              name: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: [
              "id",
            ],
          },
        },
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("Object")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods tags", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        name: "foobar",
        result: {
          schema: {
            properties: {
              id: {
                format: "int64",
                type: "integer",
              },
              name: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: [
              "id",
            ],
          },
        },
        tags: [
          {
            name: "tag3",
          },
          {
            name: "tag4",
          },
        ],
      },
      {
        result: {
          schema: {
            properties: {
              id: {
                format: "int64",
                type: "integer",
              },
              name: {
                type: "string",
              },
              tag: {
                type: "string",
              },
            },
            required: [
              "id",
            ],
          },
        },
        tags: [
          {
            name: "salad",
          },
          {
            name: "mytag",
          },
        ],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("Object")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods examples", () => {
  const div = document.createElement("div");
  const schema = {
    methods: [
      {
        examples: [
          {
            name: "foo",
          },
        ],
      },
    ],
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders schema methods examples with schema.examples fallback", () => {
  const div = document.createElement("div");
  const schema: OpenrpcDocument = {
    info: {
      title: "test",
      version: "0.0.0",
    },
    methods: [
      {
        name: "test-method",
        params: [{
          name: "testparam1",
          schema: {
            examples: ["bob"],
            type: "string",
          },
        }],
        result: {
          name: "test-method-result",
          schema: {
            examples: ["potato"],
            type: "string",
          },
        },
      },
    ],
    openrpc: "1.0.0",
  };
  ReactDOM.render(<Methods schema={schema as any} disableTransitionProps={true} />, div);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("bob")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
