import React, { Component } from "react";
import Typography from "@material-ui/core/Typography";
import Chip from "@material-ui/core/Chip";
import Button from "@material-ui/core/Button";
import Table from "@material-ui/core/Table";
import TableHead from "@material-ui/core/TableHead";
import TableBody from "@material-ui/core/TableBody";
import TableRow from "@material-ui/core/TableRow";
import TableCell from "@material-ui/core/TableCell";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import ReactMarkdown from "react-markdown";
import { LinkObject } from "@open-rpc/meta-schema";
import { ExpansionPanel, ExpansionPanelSummary, ExpansionPanelDetails } from "@material-ui/core";
import ExpansionTable from "../ExpansionTable/ExpansionTable";
import Servers from "../Servers/Servers";
import ReactJson from "react-json-view";

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
  links?: LinkObject[];
  uiSchema?: any;
  reactJsonOptions?: any;
}

class Links extends Component<IProps> {
  public render() {
    const { links, uiSchema, reactJsonOptions, classes } = this.props;
    if (!links || links.length === 0) { return null; }
    return (
      <ExpansionTable headers={["Method", "Summary"]}>
        <TableRow>
          <TableCell colSpan={6}>
            {links.map((link, i) => (
              <div style={{ width: "100%" }} key={i}>
                <ExpansionPanel
                  style={{ width: "100%" }} defaultExpanded={uiSchema && uiSchema.links["ui:defaultExpanded"]} key={i}>
                  <ExpansionPanelSummary
                    style={{ justifyContent: "space-between" }} key="links-header" expandIcon={<ExpandMoreIcon />}>
                    <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
                      <Typography className={classes.heading}>{link.method}</Typography>
                      <Typography className={classes.secondaryHeading}>{link.summary}</Typography>
                    </div>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails style={{ display: "block" }} key="links-body">
                    {link.description && <ReactMarkdown source={link.description} className={classes.description} />}
                    {link.params && <Typography variant="h6" gutterBottom>Params</Typography>}
                    {link.params && <ReactJson src={link.params} {...reactJsonOptions} />}
                    {link.server &&
                      <Typography variant="h6" gutterBottom className={classes.paramsMargin}>Server</Typography>}
                    {link.server && <Servers
                      servers={[link.server]} noTitle={true} reactJsonOptions={reactJsonOptions} />}
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              </div>
            ))}
          </TableCell>
        </TableRow>
      </ExpansionTable>
    );
  }
}

export default withStyles(styles)(Links);
