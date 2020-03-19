/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const webpack = require("webpack");
const WebpackChain = require("webpack-chain");
const path = require("path");

const Configuration = webpack.Compiler.prototype.options;

//vue inspect

/**
 * @param {Configuration} config
 * @param {Configuration} options
 */
function mix(config, options) {
  Object.assign(config, options);
}
console.log(path.resolve("./src/index.ts"));

const config = {
  /**
   * @param { Configuration } config
   */
  configureWebpack: config => {
    //development
    if (config.mode == "development") {
      config.resolve.alias = {
        "@": path.resolve("./src/example/"),
        "vuex-cuer": path.resolve("./src/index.ts")
      };
      mix(config, {
        entry: {
          app: ["./src/example/main.ts"]
        }
      });
    }

    //production
    if (config.mode == "production") {
      mix(config, {
        mode: "production",
        entry: "./src/index.ts",
        externals: {
          vue: "Vue",
          vuex: "Vuex"
        },
        resolve: {
          extensions: [".ts"]
        },
        plugins: []
      });
    }
  },
  /**
   * @param { WebpackChain } config
   */
  chainWebpack: config => {
    /**
     * @type { Configuration["mode"] }
     */
    const mode = config.get("mode");

    //development
    if (mode == "development") {
      //...
    }

    //production
    if (mode == "production") {
      config.output.filename("index.js");
      config.output.libraryTarget("umd");
      const tsRule = config.module.rule("ts");
      config.module.rules.clear();
      config.module.rules.set("ts", tsRule);
      config.optimization.splitChunks(false);
      //config.optimization.minimize(false);
    }
  }
};

module.exports = config;
