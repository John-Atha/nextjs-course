import { NextAuthConfig } from 'next-auth';
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
  },
  providers: [],
  callbacks: {
    authorized({ auth, request }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = request.nextUrl.pathname.startsWith('/dashboard');
      console.log({ isLoggedIn, isOnDashboard });
      if (isOnDashboard) {
        if (isLoggedIn) {
          return true;
        } else {
          return Response.redirect(new URL('/login', request.nextUrl));
        }
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', request.nextUrl));
      }
      return true;
    },
  },
};
