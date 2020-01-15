import React from "react";
import { JSONSchema4 } from "json-schema";
import { TableRow, TableCell, Typography } from "@material-ui/core";
import JSONSchemaFields from "./fields/JSONSchemaFields";
import _ from "lodash";

interface IProps {
  schema: JSONSchema4;
  required?: boolean;
  name?: string;
}

const styles = {
  cellWidth: {
    margin: "5px",
    padding: "5px",
    width: "70px",
  },
};

const SchemaRenderer: React.FC<IProps> = ({ schema, required, name }) => {
  if (schema.type === "object" || schema.properties) {
    return (
      <TableRow>
        <TableCell colSpan={1} style={styles.cellWidth}>
          {schema.title || name}
        </TableCell>
        <TableCell colSpan={1} style={styles.cellWidth}>
          <Typography variant="body1" color="primary">object</Typography>
        </TableCell>
        <TableCell colSpan={5}>
          {schema.properties && Object.entries(schema.properties).map(([n, prop]: [string, JSONSchema4], i: number) => {
            return (
              <JSONSchemaFields
                key={n}
                schema={prop}
                name={n}
                hideHeader={i !== 0}
                required={schema.required && schema.required.includes(n)}
              />
            );
          })}
        </TableCell>
      </TableRow>
    );
  }
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
  if (schema.type === "array" && schema.items instanceof Array) {
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
  if (schema.type === "array" && schema.items) {
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
  return (
    <TableRow key={schema.title}>
      <TableCell component="th" scope="row" style={styles.cellWidth}>
        {schema.title || name}
      </TableCell>
      <TableCell style={styles.cellWidth}>{schema.type}</TableCell>
      <TableCell style={styles.cellWidth}>{schema.pattern}</TableCell>
      <TableCell style={styles.cellWidth}>{required ? "required" : "optional"}</TableCell>
      <TableCell style={styles.cellWidth}>{schema.description}</TableCell>
    </TableRow>
  );
};

export default SchemaRenderer;
