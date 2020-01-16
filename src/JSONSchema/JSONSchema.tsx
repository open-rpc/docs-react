import React, { Component } from "react";
import _ from "lodash";
import JSONSchemaFields from "./fields/JSONSchemaFields";
import { JSONSchema4 } from "json-schema";

interface IProps {
  schema?: JSONSchema4;
}

class JSONSchema extends Component<IProps> {
  public render() {
    const { schema } = this.props;
    return <JSONSchemaFields schema={schema} />;
  }
}

export default JSONSchema;
