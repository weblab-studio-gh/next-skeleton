import NextAuth from 'next-auth';

import CredentialsProvider from 'next-auth/providers/credentials';

import bycrypt from 'bcrypt';

import { PrismaAdapter } from '@next-auth/prisma-adapter';
import prisma from '@/lib/db/db';

export const authOptions = {
  adapter: PrismaAdapter(prisma),
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
    updateAge: 24 * 60 * 60, // 24 hours
  },

  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',

      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'jsmith@example.com',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials, req) {
        const email = credentials.email;
        const password = credentials.password;

        const user = await prisma.user.findUnique({
          where: { email: email },
        });

        if (!user) {
          throw new Error('No user found');
        }

        const passwordMatch = await bycrypt.compare(password, user.password);

        if (!passwordMatch) {
          throw new Error('Password does not match');
        }

        return user;
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user, account, profile, isNewUser }) => {
      if (user) {
        token.user = { id: user.id, image: user.image, type: user.type };
        return token;
      }
      return token;
    },
    session: async ({ session, token, user }) => {
      if (session && session.user) {
        session.user = token.user;
        session.token = token;
        return session;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
