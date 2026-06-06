import Google from "@auth/core/providers/google";
import { Password } from "@convex-dev/auth/providers/Password";
import { convexAuth } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { AppRole } from "./lib/rbac";
import { now } from "./lib/rbac";

const PRODUCTION_SITE_URL = "https://ivanz-five.vercel.app";

export const { auth, signIn, signOut, store, isAuthenticated } = convexAuth({
  providers: [Google, Password],
  callbacks: {
    async redirect({ redirectTo }) {
      const allowed = [
        PRODUCTION_SITE_URL,
        "http://localhost:3000",
        "http://127.0.0.1:3000",
      ];
      if (
        redirectTo.startsWith("/") ||
        allowed.some((origin) => redirectTo.startsWith(origin))
      ) {
        return redirectTo;
      }
      return `${PRODUCTION_SITE_URL}/admin/login.html`;
    },
    async afterUserCreatedOrUpdated(ctx, { userId, existingUserId }) {
      const user = await ctx.db.get(userId);
      if (!user) return;

      const patch: Record<string, unknown> = {
        updatedAt: now(),
      };

      if (!user.createdAt) {
        patch.createdAt = now();
      }
      if (user.isDeleted === undefined) {
        patch.isDeleted = false;
      }
      if (!existingUserId) {
        patch.status = "pending";
        patch.role = "viewer" satisfies AppRole;
      }

      await ctx.db.patch(userId, patch);
    },
    async beforeSessionCreation(ctx, { userId }) {
      const user = await ctx.db.get(userId);
      if (!user || user.isDeleted) {
        throw new ConvexError("Account not found");
      }
      if (user.status === "deactivated") {
        throw new ConvexError("Account deactivated");
      }
      if (user.status !== "active") {
        throw new ConvexError("Account pending Owner approval");
      }
    },
  },
});
