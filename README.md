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

##### Example in a new project:

###### create a new typescript project with `create-react-app`

```
npx create-react-app <appname> --typescript
```

```
cd <appname>
npm install .
npm install @open-rpc/docs-react @open-rpc/meta-schema --save
```

###### index.ts
```
import React from 'react';
import ReactDOM from 'react-dom';
import Documentation from "@open-rpc/docs-react";
import { OpenRPC } from '@open-rpc/meta-schema';

const schema: OpenRPC = {
  openrpc: "1.0.0-rc1",
  info: {
    "version": "0.0.0-development",
    "title": "My New API"
  },
  methods: []
};

ReactDOM.render(<Documentation schema={schema} />, document.getElementById("root"));

```

###### screenshot
![image](https://user-images.githubusercontent.com/364566/54797953-920e2180-4c13-11e9-9ff8-723a836d0e2c.png)
