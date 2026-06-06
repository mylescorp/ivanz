const JWT_KEY = "__convexAuthJWT";
const REFRESH_KEY = "__convexAuthRefreshToken";
const VERIFIER_KEY = "__convexAuthOAuthVerifier";

function storageKey(key, namespace) {
  return `${namespace}.${key}`;
}

export function createAuthClient(config) {
  const namespace = config.convexUrl;
  const siteUrl = config.convexSiteUrl;

  const key = (name) => storageKey(name, namespace);

  async function storageGet(name) {
    return localStorage.getItem(key(name));
  }

  async function storageSet(name, value) {
    localStorage.setItem(key(name), value);
  }

  async function storageRemove(name) {
    localStorage.removeItem(key(name));
  }

  async function callSignIn(body) {
    const response = await fetch(`${config.convexUrl}/api/action`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Convex-Client": "ivanz-admin",
      },
      body: JSON.stringify({
        path: "auth:signIn",
        format: "convex_encoded_json",
        args: [body],
      }),
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({}));
      throw new Error(error?.message || "Sign in failed");
    }

    const payload = await response.json();
    if (payload?.status === "error") {
      throw new Error(payload.errorMessage || "Sign in failed");
    }
    return payload?.value ?? payload;
  }

  async function setTokens(tokens) {
    if (!tokens) {
      await storageRemove(JWT_KEY);
      await storageRemove(REFRESH_KEY);
      return;
    }
    await storageSet(JWT_KEY, tokens.token);
    await storageSet(REFRESH_KEY, tokens.refreshToken);
  }

  async function signInWithPassword(email, password) {
    const result = await callSignIn({
      provider: "password",
      params: {
        email,
        password,
        flow: "signIn",
      },
    });

    if (result?.redirect) {
      window.location.href = result.redirect;
      return;
    }

    if (result?.tokens) {
      await setTokens(result.tokens);
      return;
    }

    throw new Error("Unexpected sign-in response");
  }

  async function signInWithGoogle() {
    const redirectTo = `${window.location.origin}${window.location.pathname.replace(/login\.html$/, "index.html")}`;
    const result = await callSignIn({
      provider: "google",
      params: { redirectTo },
    });

    if (result?.redirect) {
      if (result.verifier) {
        await storageSet(VERIFIER_KEY, result.verifier);
      }
      window.location.href = result.redirect;
      return;
    }

    if (result?.tokens) {
      await setTokens(result.tokens);
    }
  }

  async function handleOAuthCallback() {
    const params = new URLSearchParams(window.location.search);
    const code = params.get("code");
    if (!code) return false;

    const verifier = await storageGet(VERIFIER_KEY);
    await storageRemove(VERIFIER_KEY);

    const result = await callSignIn({
      params: { code },
      verifier: verifier ?? undefined,
    });

    if (result?.tokens) {
      await setTokens(result.tokens);
      window.history.replaceState({}, "", window.location.pathname);
      return true;
    }

    return false;
  }

  async function getAccessToken() {
    return storageGet(JWT_KEY);
  }

  async function signOut() {
    const token = await getAccessToken();
    if (token) {
      await fetch(`${config.convexUrl}/api/action`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          path: "auth:signOut",
          format: "convex_encoded_json",
          args: [{}],
        }),
      }).catch(() => undefined);
    }
    await setTokens(null);
  }

  async function queryViewer() {
    const token = await getAccessToken();
    if (!token) return null;

    const response = await fetch(`${config.convexUrl}/api/query`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Convex-Client": "ivanz-admin",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        path: "users:viewer",
        format: "convex_encoded_json",
        args: [{}],
      }),
    });

    if (!response.ok) {
      if (response.status === 401) {
        await setTokens(null);
      }
      return null;
    }

    const data = await response.json();
    return data?.value ?? null;
  }

  return {
    siteUrl,
    signInWithPassword,
    signInWithGoogle,
    handleOAuthCallback,
    getAccessToken,
    signOut,
    queryViewer,
  };
}
