import React, { Component } from "react";
import { types } from "@open-rpc/meta-schema";
import { Chip } from "@material-ui/core";
const hashColor = require("hash-color-material");

interface IProps {
  tags?: string[];
}

export default class Tags extends Component<IProps> {
  public render() {
    const { tags } = this.props;
    if (!tags || tags.length === 0) {
      return null;
    }
    return (
      <>
        {
          tags.map((tag: any, k: number) => {
            return (
              <Chip
                key={tag}
                label={tag}
                style={{ backgroundColor: hashColor.getColorFromString(tag, false) }} />
            );
          })
        }
      </>
    );
  }
}
