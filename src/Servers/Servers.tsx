import React, { Component } from "react";
import { withStyles } from "@material-ui/core/styles";
import Link from "@material-ui/core/Link";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import { Typography } from "@material-ui/core";
import { types } from "@open-rpc/meta-schema";

interface IProps {
  servers?: types.ServerObject[];
  noTitle?: boolean;
}

class Servers extends Component<IProps> {
  public render() {
    const { servers, noTitle } = this.props;
    if (!servers || servers.length === 0) {
      return null;
    }
    return (
      <>
        {noTitle ? null : <Typography variant="h2">Servers</Typography>}
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Url</TableCell>
              <TableCell align="right">Description</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {servers.map((server) => (
              <TableRow key={server.url}>
                <TableCell component="th" scope="row">
                  {server.name}
                </TableCell>
                <TableCell align="right"><Link href={server.url}>{server.url}</Link></TableCell>
                <TableCell align="right">{server.description}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </>
    );
  }
}

export default Servers;
