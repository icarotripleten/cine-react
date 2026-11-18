const { defineConfig, devices } = require("@playwright/test");

module.exports = defineConfig({
    testDir: "./e2e",
    timeout: 30_000,
    retries: process.env.CI ? 1 : 0,
    reporter: [["list"], ["html", { open: "never" }]],

    use: {
        baseURL: "http://localhost:5173",
        trace: "retain-on-failure",
        screenshot: "only-on-failure",
    },

    projects: [{ name: "chromium", use: { ...devices["Desktop Chrome"] } }],

    webServer: [
        {
            // API com banco em memoria (porta 3001: a 3000 e a do "npm run dev")
            command: "npm run start:e2e",
            cwd: "./backend",
            url: "http://localhost:3001/movies",
            env: { PORT: "3001" },
            reuseExistingServer: false,
            timeout: 120_000, // 1a vez: o mongodb-memory-server baixa o binario
        },
        {
            // Frontend (Vite) apontando para a API de E2E
            command: "npm run dev -- --port 5173 --strictPort",
            cwd: "./frontend",
            url: "http://localhost:5173",
            env: {
                VITE_API_URL: "http://localhost:3001",
                BROWSER: "none", // nao abrir o navegador do Vite (o Playwright abre o dele)
            },
            reuseExistingServer: false,
        },
    ],
});