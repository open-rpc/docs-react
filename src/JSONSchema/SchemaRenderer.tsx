import React from "react";
import { JSONSchema4 } from "json-schema";
import { TableRow, TableCell, Typography, Table, TableHead, TableBody } from "@material-ui/core";
import JSONSchemaFields from "./fields/JSONSchemaFields";
import _ from "lodash";
import { grey, green, purple, yellow, blue } from "@material-ui/core/colors";

interface IProps {
  schema: JSONSchema4;
  required?: boolean;
  name?: string;
}

const styles = {
  cellWidth: {
    width: "70px",
  },
};

const SchemaRenderer: React.FC<IProps> = ({ schema, required, name }) => {
  if (schema.anyOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">any of</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          {schema.anyOf.map((p, i) => <JSONSchemaFields schema={p} key={i} />)}
        </TableCell>
      </TableRow>
    );
  }
  if (schema.allOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">all of</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          {schema.allOf.map((p, i) => <JSONSchemaFields schema={p} key={i} />)}
        </TableCell>
      </TableRow>
    );
  }
  if (schema.oneOf) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">one of</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          {schema.oneOf.map((p, i) => <JSONSchemaFields schema={p} key={i} />)}
        </TableCell>
      </TableRow>
    );
  }
  if (schema.items instanceof Array) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">array of</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          {schema.items.map((p, i) => <JSONSchemaFields schema={p} key={i} />)}
        </TableCell>
      </TableRow>
    );
  }
  if (schema.items) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">array of</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <JSONSchemaFields schema={schema.items} />
        </TableCell>
      </TableRow>
    );
  }

  if (schema.properties) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">object</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Pattern</TableCell>
                <TableCell>Required</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {schema.properties &&
                Object.entries(schema.properties)
                  .map(([n, prop]: [string, JSONSchema4], i: number) => {
                    return (
                      <JSONSchemaFields
                        key={n}
                        schema={prop}
                        name={n}
                        hideHeader={true}
                        required={schema.required && schema.required.includes(n)}
                      />
                    );
                  })}
            </TableBody>
          </Table>
        </TableCell>
      </TableRow>
    );
  }

  const colorMap: { [k: string]: string } = {
    any: grey[500],
    array: blue[300],
    boolean: blue[500],
    integer: purple[800],
    null: yellow[900],
    number: purple[500],
    string: green[500],
    undefined: grey[500],
  };
  return (
    <TableRow key={schema.title}>
      <TableCell component="th" scope="row" style={styles.cellWidth}>
        {schema.title || name}
      </TableCell>
      <TableCell style={{
        ...styles.cellWidth,
        color: colorMap[schema.type as any],
      }}>{schema.type}</TableCell>
      <TableCell style={styles.cellWidth}>{schema.pattern}</TableCell>
      <TableCell style={styles.cellWidth}>{required ? "true" : "false"}</TableCell>
      <TableCell style={styles.cellWidth}>{schema.description}</TableCell>
    </TableRow>
  );
};

export default SchemaRenderer;
