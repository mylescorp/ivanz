import { spawnSync } from "node:child_process";

const root = process.cwd();
const siteUrl = process.env.PRODUCTION_SITE_URL ?? "https://ivanz.mylescorptech.com";

function runConvex(args, input) {
  const result = spawnSync("npx", ["convex", ...args], {
    cwd: root,
    encoding: "utf8",
    input,
    shell: process.platform === "win32",
  });

  if (result.status !== 0) {
    const message = result.stderr?.trim() || result.stdout?.trim() || "convex command failed";
    throw new Error(message);
  }

  return result.stdout.trim();
}

function getDevEnv(name) {
  return runConvex(["env", "get", name]);
}

function setProdEnv(name, value) {
  runConvex(["env", "set", name, "--prod"], value);
}

console.log(`Setting Convex production SITE_URL to ${siteUrl}`);
setProdEnv("SITE_URL", siteUrl);

for (const key of ["JWT_PRIVATE_KEY", "JWKS"]) {
  const value = getDevEnv(key);
  if (!value) {
    throw new Error(`Missing dev Convex env var: ${key}`);
  }
  console.log(`Copying ${key} to production`);
  setProdEnv(key, value);
}

console.log("Convex production auth env synced.");
