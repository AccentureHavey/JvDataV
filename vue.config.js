module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/GitDataV/" : "/",
  devServer: {
    port: 8080,
    proxy: {
      "/api": {
        target: "http://localhost:8081",
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          "^/api": ""
        }
      }
    }
  }
};
