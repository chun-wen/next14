import type { NextAuthConfig } from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

// 文件 https://next-auth.js.org/configuration/options#secret
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      if (isOnDashboard) {
        if (!isLoggedIn) return false; // Redirect unauthenticated users to login page
        return true;
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [Credentials({})], // Add providers with an empty array for now
} satisfies NextAuthConfig;
