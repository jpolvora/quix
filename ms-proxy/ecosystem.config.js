module.exports = {
    apps: [
        {
            name: "app-proxy",
            script: "./dist/app-proxy/index.js",
            exec_mode: "cluster",
            instances: Number(process.env.INSTANCES) || 1,
            max_memory_restart: "512M",
            wait_ready: true,
            env: {
                NODE_ENV: "production",
                PORT: 3000
            },
        },
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
        },
        {
            name: "app-transactions",
            script: "./dist/index.js",
            args: "-m app-transactions",
            exec_mode: "cluster",
            instances: Number(process.env.INSTANCES) || 1,
            max_memory_restart: "512M",
            wait_ready: true,
            env: {
                NODE_ENV: "production",
                PORT: 3002
            },
        },
    ],
};
