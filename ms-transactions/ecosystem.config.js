module.exports = {
    apps: [
        {
            name: "app-account",
            script: "./dist/index.js",
            args: "-m app-account",
            exec_mode: "cluster",
            instances: Number(process.env.INSTANCES) || 1,
            max_memory_restart: "512M",
            wait_ready: true,
            env: {
                NODE_ENV: "production",
                PORT: 3001,
                DATABASE_URL: "postgresql://postgres:pgsql@localhost:5432/quix-accounts?schema=public"
            },
        }
    ],
};
