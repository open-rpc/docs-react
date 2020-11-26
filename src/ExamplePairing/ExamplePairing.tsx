import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Theme, withStyles, WithStyles } from "@material-ui/core";
import ReactJson from "react-json-view";
import ReactMarkdown from "react-markdown";
import { ExampleObject, ExamplePairingObject } from "@open-rpc/meta-schema";
import _ from "lodash";
import MarkdownDescription from "../MarkdownDescription/MarkdownDescription";

export type TParamStructure = "either" | "by-name" | "by-position";

interface IProps extends WithStyles<typeof styles> {
  examplePairing?: ExamplePairingObject;
  paramStructure?: TParamStructure;
  methodName?: string;
  uiSchema?: any;
  reactJsonOptions?: any;
}

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
  },
});

class ExamplePairing extends Component<IProps, {}> {
  public render() {
    const { examplePairing, paramStructure, classes, methodName, uiSchema } = this.props;
    if (_.isUndefined(examplePairing)) {
      return null;
    }
    if (_.isUndefined(methodName)) {
      return null;
    }
    const params = paramStructure === "by-name"
      ? (examplePairing.params as ExampleObject[]).reduce(((memo, p) => {
        memo[p.name] = p.value;
        return memo;
      }), {} as any)
      : (examplePairing.params as ExampleObject[]).map(((p) => p.value));

    return (
      <Grid container spacing={10}>
        <Grid item xs={12}>
          <MarkdownDescription
            uiSchema={uiSchema}
            source={examplePairing.description}
            className={classes.description}
          />
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {examplePairing.params && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                method: methodName,
                params,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {examplePairing.result && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                result: (examplePairing.result as ExampleObject).value,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExamplePairing);
