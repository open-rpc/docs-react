import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import { types } from "@open-rpc/meta-schema";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";

const styles = (theme: Theme) => ({
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  root: {
    marginBottom: theme.spacing.unit,
    marginTop: theme.spacing.unit * 3,
    width: "100%",
  },
  secondaryHeading: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IProps extends WithStyles<typeof styles> {
  headers?: string[];
  children: any;
}

class ExpansionTable extends Component<IProps> {
  public render() {
    const { headers, children, classes } = this.props;
    if (!headers || headers.length === 0) { return null; }
    return (
      <Table>
        <TableHead>
          <TableRow>
            {headers.map((header, i) => {
              return (
                <TableCell key={i} align={i === 0 ? undefined : "right"}>{header}</TableCell>
              );
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {children}
        </TableBody>
      </Table>
    );
  }
}

export default withStyles(styles)(ExpansionTable);
