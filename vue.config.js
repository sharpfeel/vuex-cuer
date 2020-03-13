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
  entry: {
    app: "./src/index.ts"
  },
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
    Object.assign(config, base);
  },
  /**
   * @param { WebpackChain } config
   */
  chainWebpack: config => {
    config.output.filename("[name].js");
  }
};

module.exports = config;
