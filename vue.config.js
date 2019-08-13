module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/GitDataV/" : "/",
  devServer: {
    port: 8081,
    proxy: {
      "/api": {
        target: "http://localhost:8090",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
