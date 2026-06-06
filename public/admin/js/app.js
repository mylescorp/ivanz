const config = window.IVANZ_ADMIN_CONFIG ?? {
  siteName: "IvanZ Construction",
  siteLabel: "Admin Panel",
};

function initShell() {
  document.querySelectorAll("[data-site-name]").forEach((el) => {
    el.textContent = config.siteName;
  });

  document.querySelectorAll("[data-site-label]").forEach((el) => {
    el.textContent = config.siteLabel;
  });

  const yearEl = document.querySelector("[data-current-year]");
  if (yearEl) {
    yearEl.textContent = String(new Date().getFullYear());
  }
}

function showFatalError(message) {
  const banner = document.getElementById("admin-error-banner");
  if (!banner) return;
  banner.textContent = message;
  banner.classList.remove("hidden");
}

function requireConfig() {
  if (!config.convexUrl || config.convexUrl.includes("your-deployment")) {
    showFatalError(
      "Convex is not configured. Copy admin/js/config.example.js to admin/js/config.js and set convexUrl.",
    );
    return false;
  }
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  initShell();
  if (document.body.dataset.requireConvex === "true") {
    requireConfig();
  }
});
