import { createAuthClient } from "./auth.js";

const config = window.IVANZ_ADMIN_CONFIG;
if (!config?.convexUrl) {
  throw new Error("Convex URL is not configured");
}

const auth = createAuthClient({
  convexUrl: config.convexUrl,
  convexSiteUrl: config.convexSiteUrl,
});

const signOutButton = document.getElementById("sign-out");
const roleBadge = document.getElementById("role-badge");
const userName = document.getElementById("user-name");

async function init() {
  const viewer = await auth.queryViewer();

  if (!viewer) {
    window.location.href = "./login.html";
    return;
  }

  if (viewer.status === "pending") {
    window.location.href = "./pending.html";
    return;
  }

  if (viewer.status !== "active") {
    window.location.href = "./login.html";
    return;
  }

  if (roleBadge && viewer.role) {
    roleBadge.textContent =
      viewer.role.charAt(0).toUpperCase() + viewer.role.slice(1);
  }

  if (userName) {
    userName.textContent = viewer.name || viewer.email || "Staff";
  }

  document.querySelectorAll("[data-role]").forEach((node) => {
    const allowed = node.getAttribute("data-role")?.split(",") ?? [];
    if (!viewer.role || !allowed.includes(viewer.role)) {
      node.classList.add("hidden");
    }
  });
}

signOutButton?.addEventListener("click", async () => {
  await auth.signOut();
  window.location.href = "./login.html";
});

init();
