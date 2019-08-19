import React, { Component } from "react";
import { withStyles, WithStyles, Theme } from "@material-ui/core/styles";
import TableCell from "@material-ui/core/TableCell";
import TableRow from "@material-ui/core/TableRow";
import ReactMarkdown from "react-markdown";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { Typography, ExpansionPanelSummary, ExpansionPanelDetails, ExpansionPanel } from "@material-ui/core";
import { ServerObject } from "@open-rpc/meta-schema";
import ReactJson from "react-json-view";
import ExpansionTable from "../ExpansionTable/ExpansionTable";

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  paramsMargin: {
    marginTop: theme.spacing.unit,
  },
  secondaryHeading: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IProps extends WithStyles<typeof styles> {
  servers?: ServerObject[];
  uiSchema?: any;
  reactJsonOptions?: any;
  noTitle?: boolean;
}

class Servers extends Component<IProps> {
  public render() {
    const { servers, noTitle, reactJsonOptions, uiSchema, classes } = this.props;
    if (!servers || servers.length === 0) {
      return null;
    }
    return (
      <>
        {noTitle ? null : <Typography variant="h2">Servers</Typography>}
        <ExpansionTable headers={["Name", "Url", "Summary"]}>
          <TableRow>
            <TableCell colSpan={6}>
              {servers.map((server, i) => (
                <div style={{ width: "100%" }} key={i}>
                  <ExpansionPanel
                    style={{ width: "100%" }}
                    defaultExpanded={uiSchema && uiSchema.servers["ui:defaultExpanded"]} key={i}>
                    <ExpansionPanelSummary
                      style={{ justifyContent: "space-between" }} key="servers-header" expandIcon={<ExpandMoreIcon />}>
                      <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
                        <Typography className={classes.heading}>{server.name}</Typography>
                        <Typography className={classes.secondaryHeading}>{server.url}</Typography>
                        <Typography className={classes.secondaryHeading}>{server.summary}</Typography>
                      </div>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails style={{ display: "block" }} key="servers-body">
                      {server.description &&
                        <ReactMarkdown source={server.description} className={classes.description} />
                      }
                      {server.variables &&
                        <Typography variant="h6" gutterBottom className={classes.paramsMargin}>Variables</Typography>}
                      {server.variables && <ReactJson src={server.variables} {...reactJsonOptions} />}
                    </ExpansionPanelDetails>
                  </ExpansionPanel>
                </div>
              ))}
            </TableCell>
          </TableRow>
        </ExpansionTable>
      </>
    );
  }
}

export default withStyles(styles)(Servers);
