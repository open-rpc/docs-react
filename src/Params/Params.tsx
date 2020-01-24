import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import { ContentDescriptorObject } from "@open-rpc/meta-schema";

const styles = (theme: Theme) => ({
  schema: {
    marginLeft: theme.spacing(8),
  },
  table: {
    padding: theme.spacing(2),
  },
  tableEnd: {
    paddingRight: `${theme.spacing(20)}px !important`,
  },
  tableStart: {
    paddingLeft: theme.spacing(3),
  },
});

interface IProps extends WithStyles<typeof styles> {
  params?: ContentDescriptorObject[];
  disableTransitionProps?: boolean;
  uiSchema?: any;
}

class Params extends Component<IProps> {
  public render() {
    const { params, classes, uiSchema } = this.props;
    if (!params || params.length === 0) {
      return null;
    }
    return (
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell key={1} className={classes.tableStart}>Parameter Name</TableCell>
            <TableCell key={2} align="right">Summary</TableCell>
            <TableCell key={3} align="right" className={classes.tableEnd}>Required</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6}>
              {
                params.map((row) =>
                  <ContentDescriptor
                    key={row.name}
                    contentDescriptor={row}
                    uiSchema={uiSchema}
                    disableTransitionProps={this.props.disableTransitionProps}
                  />,
                )
              }
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(Params);
