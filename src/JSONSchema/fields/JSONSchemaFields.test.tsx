import React from "react";
import ReactDOM from "react-dom";
import JSONSchemaFields from "./JSONSchemaFields";
import { JSONSchema4 } from "json-schema";

it("renders empty with no schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchemaFields />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders empty with empty schema", () => {
  const div = document.createElement("div");
  ReactDOM.render(<JSONSchemaFields schema={{}} />, div);
  expect(div.innerHTML).toBe("");
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a schema", () => {
  const div = document.createElement("div");
  const schema = {
    /* tslint:disable */
    type: "object",
    properties: {
      name: {
        type: "string",
      },
      tag: {
        type: "string",
      },
    },
    /* tslint:disable */
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("name")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);

  expect(div.innerHTML.includes("tag")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a schema required", () => {
  const div = document.createElement("div");
  const schema = {
    properties: {
      name: {
        type: "string",
      },
    },
    required: [
      "name",
    ],
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("required")).toBe(true);

  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a schema without required", () => {
  const div = document.createElement("div");
  const schema = {
    properties: {
      name: {
        type: "string",
      },
    },
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("optional")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested schema object", () => {
  const div = document.createElement("div");
  const schema = {
    properties: {
      name: {
        type: "object",
        properties: {
          foo: {
            type: "string"
          }
        }
      },
    },
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("object")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a anyOf with nested objects", () => {
  const div = document.createElement("div");
  const schema = {
    anyOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  expect(div.innerHTML.includes("baz")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a allOf with nested objects", () => {
  const div = document.createElement("div");
  const schema = {
    allOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  expect(div.innerHTML.includes("baz")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});


it("renders with a oneOf with nested objects", () => {
  const div = document.createElement("div");
  const schema = {
    oneOf: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  expect(div.innerHTML.includes("baz")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested arrays of objects", () => {
  const div = document.createElement("div");
  const schema = {
    title: "MyPotatoObject",
    type: "array",
    items: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      },
      {
        title: "bar",
        properties: {
          name: {
            type: "object",
            properties: {
              baz: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("bar")).toBe(true);
  expect(div.innerHTML.includes("baz")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("MyPotatoObject")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested arrays of object", () => {
  const div = document.createElement("div");
  const schema = {
    title: "MyPotatoObject",
    type: "array",
    items: {
      title: "foo",
      properties: {
        name: {
          type: "object",
          properties: {
            potato: {
              type: "string"
            }
          }
        },
      },
    }
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("object")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("MyPotatoObject")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested arrays of object with name passed explicitly", () => {
  const div = document.createElement("div");
  const schema = {
    type: "array",
    items: {
      title: "foo",
      properties: {
        name: {
          type: "object",
          properties: {
            potato: {
              type: "string"
            }
          }
        },
      },
    }
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} name={"My Name"} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("object")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("My Name")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested arrays of objects with name passed explicitly", () => {
  const div = document.createElement("div");
  const schema = {
    type: "array",
    items: [
      {
        title: "foo",
        properties: {
          name: {
            type: "object",
            properties: {
              potato: {
                type: "string"
              }
            }
          },
        },
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} name={"My Name"} />, div);
  expect(div.innerHTML.includes("foo")).toBe(true);
  expect(div.innerHTML.includes("object")).toBe(true);
  expect(div.innerHTML.includes("potato")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("My Name")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});

it("renders with a nested oneOf with nested allOf", () => {
  const div = document.createElement("div");
  const schema = {
    title: "MyPotatoObject",
    oneOf: [
      {
        title: "Apple",
        allOf: [
          {
            title: "Banana",
            type: "string"
          },
          {
            title: "Pear",
            type: "string"
          },
        ]
      }
    ]
  } as JSONSchema4;
  ReactDOM.render(<JSONSchemaFields schema={schema} />, div);
  expect(div.innerHTML.includes("MyPotatoObject")).toBe(true);
  expect(div.innerHTML.includes("Apple")).toBe(true);
  expect(div.innerHTML.includes("Banana")).toBe(true);
  expect(div.innerHTML.includes("string")).toBe(true);
  expect(div.innerHTML.includes("Pear")).toBe(true);
  ReactDOM.unmountComponentAtNode(div);
});
