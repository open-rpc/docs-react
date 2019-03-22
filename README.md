# docs-react
OpenRPC documentation as a react component

#### What is this?
This is a react component that will render documentation for a given OpenRPC document.

**Screenshot**:

![image](https://user-images.githubusercontent.com/364566/54795109-1b1f5b80-4c08-11e9-9ba9-cc2f2d96c692.png)


#### How do I use this?

##### Installation:
```
npm install --save @open-rpc/docs-react
```
##### Usage:
```
import Documentation from "@open-rpc/docs-react";
```
and then use it somewhere:

```
<Documentation schema={schema} />
```

##### In a new project:
Here's how it would be used in a new `npx create-react-app <appname> --typescript`  project:
```
import React from "react";
import ReactDOM from "react-dom";
import Documentation from "@open-rpc/docs-react";

const schema = {
  "info": {
    "title": "My New API"
  }
};

ReactDOM.render(<Documentation schema={schema} />, document.getElementById("root"));
```
