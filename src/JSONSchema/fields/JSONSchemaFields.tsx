import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import _ from "lodash";
import { JSONSchema4 } from "json-schema";
import SchemaRenderer from "../SchemaRenderer";

const styles = (theme: Theme) => ({
  table: {
    background: theme.palette.grey[50],
  },
});

interface IProps extends WithStyles<typeof styles> {
  schema?: JSONSchema4;
  name?: string;
  required?: boolean;
  hideHeader?: boolean;
}

class JSONSchemaFields extends Component<IProps> {
  public render() {
    const { schema, classes, name, required, hideHeader } = this.props;
    if (!schema) { return null; }
    if (_.isEmpty(schema)) { return null; }
    return (
      <>
        {!hideHeader &&
          <Table className={classes.table}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Title</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Pattern</TableCell>
                <TableCell>Required</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <SchemaRenderer schema={schema} required={required} name={name} />
            </TableBody>
          </Table>
        }
        {hideHeader &&
          <SchemaRenderer schema={schema} required={required} name={name} />
        }
      </>
    );
  }
}
const WrappedJSONSchemaFields = withStyles(styles)(JSONSchemaFields);

export default WrappedJSONSchemaFields;
