module.exports = {
  publicPath: process.env.NODE_ENV === "production" ? "/" : "/",
  pwa: {
    // ...Other pwa config options
    themeColor: "#4DBA87",
    msTileColor: "#000000",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black",
    manifestOptions: {
      background_color: "#4DBA87",
      display: "standalone",
      orientation: "portrait",

    },
    icons: {
      favicon32: "img/icons/favicon-32x32.png",
      favicon16: "img/icons/favicon-16x16.png",
      appleTouchIcon: "img/icons/apple-touch-icon-152x152.png",
      maskIcon: "img/icons/safari-pinned-tab.svg",
      msTileImage: "img/icons/msapplication-icon-144x144.png",
    },
  }
};
