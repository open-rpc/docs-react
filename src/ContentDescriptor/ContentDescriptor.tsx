import React, { Component } from "react";
import { Typography, withStyles, Theme, WithStyles } from "@material-ui/core";
import ExpansionPanel from "@material-ui/core/ExpansionPanel";
import ExpansionPanelSummary from "@material-ui/core/ExpansionPanelSummary";
import ExpansionPanelDetails from "@material-ui/core/ExpansionPanelDetails";
import JSONSchema from "../JSONSchema/JSONSchema";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import { ContentDescriptorObject } from "@open-rpc/meta-schema";

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  secondaryHeading: {
    alignSelf: "end",
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

interface IProps extends WithStyles<typeof styles> {
  contentDescriptor?: ContentDescriptorObject;
  hideIcon?: boolean;
  hideRequired?: boolean;
  disableTransitionProps?: boolean;
  uiSchema?: any;
}

class ContentDescriptor extends Component<IProps> {
  public render() {
    const { contentDescriptor, classes, hideIcon, hideRequired, uiSchema, disableTransitionProps } = this.props;
    if (!contentDescriptor) { return null; }
    const entries = Object.entries(contentDescriptor);
    if (entries.length === 0) { return null; }
    return (
      <ExpansionPanel
        style={{ width: "100%" }}
        TransitionProps={{unmountOnExit: disableTransitionProps ? false : true}}
        defaultExpanded={uiSchema && uiSchema.params["ui:defaultExpanded"]}
        expanded={contentDescriptor.name ? undefined : true}>
        <ExpansionPanelSummary
          expandIcon={(!contentDescriptor.name || hideIcon) ? null : <ExpandMoreIcon />}
          style={{ justifyContent: "space-between" }}>
          <div style={{ display: "flex", justifyContent: "space-between", width: "100%", height: "100%" }}>
            <Typography className={classes.heading}>{contentDescriptor.name}</Typography>
            <Typography className={classes.secondaryHeading}>{contentDescriptor.summary}</Typography>
            {hideRequired ? null : <Typography className={classes.secondaryHeading}>
              {contentDescriptor.required ? "true" : "false"}
            </Typography>}
          </div>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails style={{ display: "block", overflowX: "auto" }}>
          <>
            {contentDescriptor.description &&
              <ReactMarkdown source={contentDescriptor.description} className={classes.description} />
            }
            {contentDescriptor.schema &&
              <>
                <Typography variant="body1" color="primary">schema</Typography>
                <JSONSchema schema={contentDescriptor.schema} />
              </>
            }
          </>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    );
  }
}
export default withStyles(styles)(ContentDescriptor);
