import { execSync } from "node:child_process";

const email = process.env.ADMIN_SEED_EMAIL;
const password = process.env.ADMIN_SEED_PASSWORD;

if (!email || !password) {
  console.error(
    "Set ADMIN_SEED_EMAIL and ADMIN_SEED_PASSWORD, then run: node scripts/seed-owner.mjs",
  );
  process.exit(1);
}

const args = JSON.stringify(JSON.stringify({ email, password }));
const prodFlag = process.env.CONVEX_SEED_PROD === "1" ? " --prod" : "";

execSync(`npx convex run bootstrapSeed:seedOwner ${args}${prodFlag}`, {
  cwd: process.cwd(),
  stdio: "inherit",
  shell: true,
});
