import { cpSync, existsSync, mkdirSync, readdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { join } from "node:path";

function loadEnvFile(path) {
  if (!existsSync(path)) return {};
  const env = {};
  for (const line of readFileSync(path, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const index = trimmed.indexOf("=");
    if (index === -1) continue;
    env[trimmed.slice(0, index)] = trimmed.slice(index + 1);
  }
  return env;
}

function syncAdminConfig(targetDir, env) {
  const convexUrl =
    env.ADMIN_CONVEX_URL || env.NEXT_PUBLIC_CONVEX_URL || env.CONVEX_URL;
  const convexSiteUrl =
    env.ADMIN_CONVEX_SITE_URL ||
    env.NEXT_PUBLIC_CONVEX_SITE_URL ||
    env.CONVEX_SITE_URL;
  if (!convexUrl) return;

  const configPath = join(targetDir, "js", "config.js");
  const contents = `window.IVANZ_ADMIN_CONFIG = {
  convexUrl: "${convexUrl}",
  convexSiteUrl: "${convexSiteUrl || convexUrl.replace(".cloud", ".site")}",
  siteName: "${env.NEXT_PUBLIC_SITE_NAME || "IvanZ Construction"}",
  siteLabel: "Admin Panel",
};
`;
  writeFileSync(configPath, contents);
}

const root = process.cwd();
const source = join(root, "admin");
const target = join(root, "public", "admin");

function copyDir(src, dest) {
  mkdirSync(dest, { recursive: true });
  for (const entry of readdirSync(src)) {
    if (entry === "node_modules" || entry === "src" || entry === "package-lock.json") {
      continue;
    }
    const from = join(src, entry);
    const to = join(dest, entry);
    if (statSync(from).isDirectory()) {
      copyDir(from, to);
    } else {
      cpSync(from, to);
    }
  }
}

if (!existsSync(source)) {
  console.error("admin/ folder not found");
  process.exit(1);
}

copyDir(source, target);

const env = {
  ...loadEnvFile(join(root, ".env")),
  ...loadEnvFile(join(root, ".env.local")),
};
syncAdminConfig(target, env);

console.log("Synced admin/ → public/admin/");
