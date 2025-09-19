const concurrently = require("concurrently");
const path = require("path");

const homeDir = process.env.HOME;

const { result } = concurrently(
  [
    "npm:watch-*", // Run all npm scripts matching watch-*
    {
      command: "nodemon",
      name: "zcore",
      cwd: path.resolve(homeDir, "src/github.com/evgnomon/zygote"), // Working directory relative to $HOME
    },
    {
      command: "npm run watch",
      name: "tap",
      env: { PUBLIC_KEY: "your-public-key-here" },
      cwd: path.resolve(homeDir, "src/github.com/evgnomon/tap"), // Working directory relative to $HOME
    },
    {
      command: "npm start",
      name: "rw",
      cwd: path.resolve(homeDir, "src/github.com/evgnomon/rw"), // Working directory relative to $HOME
    },
  ],
  {
    prefix: "name",
    killOthers: ["failure", "success"],
    restartTries: 3,
    cwd: path.resolve(homeDir, "projects"), // Global working directory relative to $HOME
  }
);

result.then(
  () => console.log("All processes completed successfully"),
  (err) => console.error("A process failed:", err)
);
