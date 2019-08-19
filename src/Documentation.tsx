import React from "react";
import Info from "./Info/Info";
import Servers from "./Servers/Servers";
import Methods, { IMethodPluginProps } from "./Methods/Methods";
import ContentDescriptors from "./ContentDescriptors/ContentDescriptors";
import { OpenRPC } from "@open-rpc/meta-schema";

interface IProps {
  schema: OpenRPC;
  uiSchema?: any;
  reactJsonOptions?: any;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
}

export default class Documentation extends React.Component<IProps> {
  constructor(props: IProps) {
    super(props);
  }
  public render() {
    const { schema, uiSchema, reactJsonOptions } = this.props;
    if (!schema) {
      return null;
    }
    return (
      <>
        <Info schema={schema} />
        <Servers servers={schema.servers} reactJsonOptions={reactJsonOptions} />
        <Methods
          schema={schema}
          uiSchema={uiSchema}
          reactJsonOptions={reactJsonOptions}
          methodPlugins={this.props.methodPlugins}
        />
        <ContentDescriptors schema={schema} uiSchema={uiSchema}></ContentDescriptors>
      </>
    );
  }
}
