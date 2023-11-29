export default {
  apps: [
    {
      name: "BackOffice",
      script: "npm",
      args: "run start",
      cwd: "/Turismo Cuyen/login", // Ruta absoluta hacia tu proyecto frontend
      autorestart: true,
      watch: true,
      ignore_watch: ["node_modules"],
      instances: 1,
      exec_mode: "fork",
      env: {
        NODE_ENV: "production",
      },
    },
  ],
};
