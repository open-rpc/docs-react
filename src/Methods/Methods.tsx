import React, { Component } from "react";
import { withStyles, Theme, WithStyles } from "@material-ui/core/styles";
import Accordion from "@material-ui/core/Accordion";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import _ from "lodash";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ReactMarkdown from "react-markdown";
import Params from "../Params/Params";
import ContentDescriptor from "../ContentDescriptor/ContentDescriptor";
import ExamplePairings from "../ExamplePairings/ExamplePairings";
import Errors from "../Errors/Errors";
import {
  OpenrpcDocument,
  MethodObject,
  ContentDescriptorObject,
  ErrorObject,
  ExamplePairingObject,
  LinkObject,
} from "@open-rpc/meta-schema";
import Links from "../Links/Links";
import Tags from "../Tags/Tags";

const styles = (theme: Theme) => ({
  description: {
    color: theme.palette.text.primary,
  },
  heading: {
    flexBasis: "33.33%",
    flexShrink: 0,
    fontSize: theme.typography.pxToRem(15),
  },
  root: {
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(3),
    width: "100%",
  },
  secondaryHeading: {
    color: theme.palette.text.secondary,
    fontSize: theme.typography.pxToRem(15),
  },
});

export interface IMethodPluginProps {
  openrpcMethodObject: MethodObject;
}

interface IProps extends WithStyles<typeof styles> {
  schema?: OpenrpcDocument;
  uiSchema?: any;
  reactJsonOptions?: object;
  methodPlugins?: Array<React.FC<IMethodPluginProps>>;
  disableTransitionProps?: boolean;
}

class Methods extends Component<IProps> {
  public render() {
    const { schema, classes, uiSchema, disableTransitionProps } = this.props;
    if (!schema) {
      return null;
    }
    const methods: MethodObject[] = schema.methods;
    const methodsExist = methods && methods.length > 0;
    if (!schema || !schema.methods || !methodsExist) { return null; }
    return (
      <div className={classes.root}>
        <Typography variant="h3" gutterBottom>Methods</Typography>
        {schema.methods.map((method, i) => (
          <Accordion
            key={i + method.name}
            TransitionProps={{ unmountOnExit: disableTransitionProps ? false : true }}
            defaultExpanded={uiSchema && uiSchema.methods["ui:defaultExpanded"]}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography key={method.name} className={classes.heading}>{method.name}</Typography>
              <Typography key={method.summary} className={classes.secondaryHeading}>{method.summary}</Typography>
            </AccordionSummary>

            {method.tags && method.tags.length > 0 &&
              <AccordionDetails key="tags">
                <Tags tags={method.tags as any} />
              </AccordionDetails>
            }
            {method.description &&
              <AccordionDetails key="description">
                <ReactMarkdown source={method.description} className={classes.description} />
              </AccordionDetails>
            }
            {method.params && method.params.length > 0 &&
              <AccordionDetails key="params-title">
                <Typography variant="h5">Params</Typography>
              </AccordionDetails>
            }
            {method.params &&
              <AccordionDetails key="params">
                <Params params={method.params as ContentDescriptorObject[]} uiSchema={uiSchema} />
              </AccordionDetails>
            }
            {method.result &&
              <AccordionDetails key="result-title">
                <Typography variant="h5">Result</Typography>
              </AccordionDetails>
            }
            {method.result && (method.result as ContentDescriptorObject).schema &&
              <AccordionDetails key="result">
                <ContentDescriptor
                  contentDescriptor={method.result as ContentDescriptorObject}
                  hideRequired={true} uiSchema={uiSchema} />
              </AccordionDetails>
            }
            {method.errors && method.errors.length > 0 &&
              <AccordionDetails key="errors">
                <Errors errors={method.errors as ErrorObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </AccordionDetails>
            }
            <ExamplePairings
              examples={method.examples as ExamplePairingObject[]}
              method={method}
              reactJsonOptions={this.props.reactJsonOptions} />
            {method.links && method.links.length > 0 &&
              <AccordionDetails key="links-title">
                <Typography variant="h5">Links</Typography>
              </AccordionDetails>
            }
            {method.links && method.links.length > 0 &&
              <AccordionDetails key="links">
                <Links links={method.links as LinkObject[]} reactJsonOptions={this.props.reactJsonOptions} />
              </AccordionDetails>
            }
            {this.props.methodPlugins && this.props.methodPlugins.length > 0 &&
              <AccordionDetails key="method-plugins">
                {this.props.methodPlugins.map((CompDef: any) => {
                  return (
                    <CompDef openrpcMethodObject={method} />
                  );
                })}
              </AccordionDetails>
            }
          </Accordion>
        ))}
      </div>
    );
  }
}

export default withStyles(styles)(Methods);
