module.exports = {
    apps: [
        {
            name: "quix",
            script: "./dist/index.js",
            args: "-m app-account",
            exec_mode: "cluster",
            instances: Number(process.env.INSTANCES) || 2,
            max_memory_restart: "512M",
            wait_ready: true,
            env: {
                NODE_ENV: "production",
            },
        },
    ],
};
