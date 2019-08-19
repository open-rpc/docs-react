import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import { Card, CardContent, Theme, withStyles, WithStyles } from "@material-ui/core";
import ReactJson from "react-json-view";
import ReactMarkdown from "react-markdown";
import { MethodObject, ExampleObject, ExamplePairingObject } from "@open-rpc/meta-schema";
import _ from "lodash";

interface IProps extends WithStyles<typeof styles> {
  examplePosition?: number;
  method?: MethodObject;
  reactJsonOptions?: any;
}

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
  },
});

class ExamplePairing extends Component<IProps, {}> {
  public render() {
    const { examplePosition, method, classes } = this.props;
    if (_.isUndefined(examplePosition)) {
      return null;
    }
    let example;
    if (method && method.examples && method.examples[examplePosition]) {
      example = method.examples[examplePosition] as ExamplePairingObject;
    }
    if (!example || _.isEmpty(example)) {
      return null;
    }
    return (
      <Grid container spacing={24}>
        <Grid item xs={12}>
          <ReactMarkdown source={example.description} className={classes.description}/>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.params && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                method: method && method.name,
                params: (example.params as ExampleObject[]).map(((p) => p.value)),
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={6}>
          <Card>
            <CardContent>
              {example.result && <ReactJson src={{
                id: 1,
                jsonrpc: "2.0",
                result: (example.result as ExampleObject).value,
              }} {...this.props.reactJsonOptions} />}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    );
  }
}

export default withStyles(styles)(ExamplePairing);
