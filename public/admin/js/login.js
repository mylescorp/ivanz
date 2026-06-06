import { createAuthClient } from "./auth.js";

const config = window.IVANZ_ADMIN_CONFIG;
if (!config?.convexUrl) {
  throw new Error("Convex URL is not configured");
}

const auth = createAuthClient({
  convexUrl: config.convexUrl,
  convexSiteUrl: config.convexSiteUrl,
});

const form = document.getElementById("login-form");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const emailButton = form?.querySelector('button[type="submit"]');
const googleButton = document.getElementById("google-sign-in");
const errorEl = document.getElementById("login-error");

function showError(message) {
  if (!errorEl) return;
  errorEl.textContent = message;
  errorEl.classList.remove("hidden");
}

async function routeAfterAuth() {
  const viewer = await auth.queryViewer();
  if (!viewer) {
    showError("Signed in but profile is unavailable. Try again.");
    return;
  }

  if (viewer.status === "pending") {
    window.location.href = "./pending.html";
    return;
  }

  if (viewer.status !== "active") {
    showError("This account is not active. Contact the Owner.");
    await auth.signOut();
    return;
  }

  window.location.href = "./index.html";
}

async function init() {
  if (emailButton) emailButton.disabled = false;
  if (googleButton) googleButton.disabled = false;

  const handled = await auth.handleOAuthCallback();
  if (handled) {
    await routeAfterAuth();
    return;
  }

  const existing = await auth.queryViewer();
  if (existing?.status === "active") {
    window.location.href = "./index.html";
  }
}

form?.addEventListener("submit", async (event) => {
  event.preventDefault();
  showError("");
  emailButton.disabled = true;

  try {
    await auth.signInWithPassword(emailInput.value.trim(), passwordInput.value);
    await routeAfterAuth();
  } catch (error) {
    const message =
      error instanceof Error ? error.message : "Unable to sign in";
    if (message.toLowerCase().includes("pending")) {
      window.location.href = "./pending.html";
      return;
    }
    showError(message);
  } finally {
    emailButton.disabled = false;
  }
});

googleButton?.addEventListener("click", async () => {
  showError("");
  googleButton.disabled = true;
  try {
    await auth.signInWithGoogle();
  } catch (error) {
    showError(error instanceof Error ? error.message : "Google sign-in failed");
    googleButton.disabled = false;
  }
});

init();
