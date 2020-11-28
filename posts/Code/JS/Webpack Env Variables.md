```js
// webpack.config.js
const webpack = require('webpack');
const prod = process.argv.indexOf('-p') !== -1;
 
module.exports = {
  ...
  plugins: [
    new webpack.DefinePlugin({
      process: {
        env: {
          NODE_ENV: prod? `"production"`: '"development"'
        }
      }
    }),
    ...
  ]
};
```

<br/>

In case of the above script is not sufficient, I am sharing the package.json flags.

```json
/* Optional: package.json commands (in case of need)*/
  "scripts": {
    "start": "webpack-dev-server --env.dev --open --hot --mode development ",
    "build": "webpack --mode production  --env.dev",
  },
```

