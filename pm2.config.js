module.exports = {
    apps: [
      {
        name: "mi-aplicacion-react",
        script: "serve",
        args: "-s build",
        env: {
          PM2_SERVE_PATH: "./build",
          PM2_SERVE_PORT: 80,
          PM2_SERVE_SPA: "true",
          PM2_SERVE_HOMEPAGE: "/index.html",
        },
      },
    ],
  };