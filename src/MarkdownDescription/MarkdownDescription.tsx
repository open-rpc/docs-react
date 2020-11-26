import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { materialDark, materialLight } from "react-syntax-highlighter/dist/esm/styles/prism";
import ReactMarkdown from "react-markdown";
import { MethodObject } from "@open-rpc/meta-schema";

interface IProps {
  className?: string;
  source?: string;
  uiSchema: any;
}

const MarkdownDescription: React.FC<IProps> = ({source, className, uiSchema}) => {
  return (
    <ReactMarkdown
      renderers={{
        code: ({ language, value }) => {
          return <SyntaxHighlighter
            style={uiSchema && uiSchema.appBar["ui:darkMode"] ? materialDark : materialLight}
            language={language}
            children={value}
          />;
        },
      }}
      source={source}
      className={className}
    />
  );
};

export default MarkdownDescription;
