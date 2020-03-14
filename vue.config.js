/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unused-vars */
const webpack = require("webpack");
const WebpackChain = require("webpack-chain");

const Configuration = webpack.Compiler.prototype.options;

//vue inspect

/**
 * @type { Configuration }
 */
const base = {
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
};

//vue inspect

const config = {
  /**
   * @param { Configuration } config
   */
  configureWebpack: config => {
    //todo ...
    config.optimization.minimize = config.mode == "production";
    Object.assign(config, base);
  },
  /**
   * @param { WebpackChain } config
   */
  chainWebpack: config => {
    config.output.filename("index.js");
    config.output.libraryTarget("umd");
    const tsRule = config.module.rule("ts");
    config.module.rules.clear();
    config.module.rules.set("ts", tsRule);
    config.optimization.splitChunks(false);
  }
};

module.exports = config;
