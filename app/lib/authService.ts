"use server";

import axios from "axios";
import fs from "fs/promises";
import path from "path";

const CLIENT_ID = process.env.ML_CLIENT_ID!;
const CLIENT_SECRET = process.env.ML_CLIENT_SECRET!;
const REDIRECT_URI = process.env.ML_REDIRECT_URI!;

const TOKEN_PATH = path.resolve(process.cwd(), "tokens.json");

type TokenData = {
  access_token: string;
  refresh_token: string;
  expires_in: number;
  created_at: number;
};

async function saveTokens(tokens: TokenData) {
  await fs.writeFile(TOKEN_PATH, JSON.stringify(tokens, null, 2), "utf8");
}

async function loadTokens(): Promise<TokenData | null> {
  try {
    const data = await fs.readFile(TOKEN_PATH, "utf8");
    return JSON.parse(data);
  } catch {
    return null;
  }
}

function tokenExpired(tokenData: TokenData): boolean {
  const expiration = tokenData.created_at + tokenData.expires_in * 1000;
  return Date.now() >= expiration;
}

export async function getValidAccessToken(): Promise<string> {
  let tokens = await loadTokens();

  if (!tokens) {
    console.warn("No tokens available. Run manual OAuth flow first.");
    return "";
  }

  if (tokenExpired(tokens)) {
    console.log("Token expirado. Refrescando...");
    tokens = await refreshToken(tokens.refresh_token);
    await saveTokens(tokens);
  }

  return tokens.access_token;
}
export async function checkAuthentication() {
  const code = typeof window !== "undefined" ? new URLSearchParams(window.location.search).get("code") : null;

  if (code) {
    const tokens = await getAuthenticationToken(code);
    await saveTokens(tokens);
    return { token: tokens.access_token };
  }

  return getAuthorizationCode();
}

export async function getAuthorizationCode(): Promise<{ code: string }> {
  const authUrl = `https://auth.mercadolibre.com.ar/authorization?response_type=code&client_id=${CLIENT_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}`;
  
  if (typeof window !== "undefined") {
    window.location.href = authUrl;
  }

  return new Promise(() => {});
}

export async function getAuthenticationToken(code: string): Promise<TokenData> {
  const url = "https://api.mercadolibre.com/oauth/token";

  const params = new URLSearchParams();
  params.append("grant_type", "authorization_code");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("code", code);
  params.append("redirect_uri", REDIRECT_URI);

  const { data } = await axios.post(url, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log(" Autenticación exitosa.");

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    created_at: Date.now(),
  };
}

export async function refreshToken(refresh_token: string): Promise<TokenData> {
  const url = "https://api.mercadolibre.com/oauth/token";

  const params = new URLSearchParams();
  params.append("grant_type", "refresh_token");
  params.append("client_id", CLIENT_ID);
  params.append("client_secret", CLIENT_SECRET);
  params.append("refresh_token", refresh_token);

  const { data } = await axios.post(url, params, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  console.log("🔁 Token refrescado.");

  return {
    access_token: data.access_token,
    refresh_token: data.refresh_token,
    expires_in: data.expires_in,
    created_at: Date.now(),
  };
}
