import { query } from "./_generated/server";

/** Schema verification query — used during Phase 0/1 setup. */
export const ping = query({
  args: {},
  handler: async () => {
    return { ok: true as const, service: "ivanz-admin" };
  },
});
