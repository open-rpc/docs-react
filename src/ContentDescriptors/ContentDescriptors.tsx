import React, { Component } from "react";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import { Typography } from "@material-ui/core";
import { OpenrpcDocument, ContentDescriptorObject } from "@open-rpc/meta-schema";

interface IProps {
  schema?: OpenrpcDocument;
  disableTransitionProps?: boolean;
  uiSchema?: any;
}

export default class ContentDescriptors extends Component<IProps> {
  public render() {
    const { schema, disableTransitionProps } = this.props;
    if (!schema || !schema.components  || !schema.components.contentDescriptors) { return null; }
    const entries = Object.entries(schema.components.contentDescriptors);
    if (entries.length === 0) { return null; }
    return (
      <>
        <Typography variant="h3" gutterBottom>ContentDescriptors</Typography>
        {entries.map(([key, val]) => {
          return <ContentDescriptor
            key={key}
            contentDescriptor={val as ContentDescriptorObject}
            disableTransitionProps={disableTransitionProps}
            uiSchema={this.props.uiSchema}
            hideRequired={true} />;
        })}
      </>
    );
  }
}
