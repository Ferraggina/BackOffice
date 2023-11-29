export const apps = [
  {
    name: "nBackOffice",
    script: "npm",
    args: "run start",
    cwd: "login/ecosystem.config.js",
    autorestart: true,
    watch: true,
    ignore_watch: ["node_modules"],
    instances: 1,
    exec_mode: "fork",
    env: {
      NODE_ENV: "production",
    },
  },
];
