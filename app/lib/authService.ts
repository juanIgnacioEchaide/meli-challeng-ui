"use server";

import { cookies } from "next/headers";

export async function getAccessToken() {
  console.log('hola')
  if (typeof window !== "undefined") {
    
    return localStorage.getItem('access_token');
  } else {

    const cookieStore = await cookies();
    return cookieStore.get('access_token')?.value || null;
  }
}

export async function getRefreshToken() {
  if (typeof window !== "undefined") {
    return localStorage.getItem('refresh_token');
  } else {
    const cookieStore = await cookies();
    return cookieStore.get('refresh_token')?.value || null;
  }
}

export async function saveTokens({ access_token, refresh_token }: { access_token: string, refresh_token?: string }) {
  if (typeof window !== "undefined") {
    localStorage.setItem('access_token', access_token);
    
    if (refresh_token) {
      localStorage.setItem('refresh_token', refresh_token);
    }
  } else {
    console.warn("Intentando guardar tokens en el servidor: ignorado.");
  }
}

