/**
 * Convex client bootstrap for the IvanZ admin panel.
 * Full auth and subscriptions are wired in Phase 2–4.
 */
(function initConvexClient() {
  const config = window.IVANZ_ADMIN_CONFIG;
  if (!config?.convexUrl || config.convexUrl.includes("your-deployment")) {
    return;
  }

  window.IVANZ_CONVEX = {
    url: config.convexUrl,
    ready: false,
  };

  // Convex JS SDK loads here once npm convex/browser is bundled for admin (Phase 2).
})();
