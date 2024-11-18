import AppError from "@/lib/App-Error";
import prisma from "@/lib/db";
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import { JWT } from 'next-auth/jwt';

export interface AuthToken extends JWT {
  id: string;
  isRegistered: boolean;
}

const handler = NextAuth({
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        phoneNumber: { },
        password: { },
      },
      async authorize(credentials) {
        if (!credentials?.phoneNumber || !credentials?.password) {
          throw new AppError("Missing credentials", 400);
        }

        try {
          const user = await prisma.user.findUnique({
            where: {
              phoneNumber: credentials.phoneNumber,
            }
          });

          if(!user) {
            throw new AppError('Invalid credentials', 401);
          }

          const isPasswordMatch = await bcrypt.compare(credentials.password, user.password);
          if(!isPasswordMatch) {
            throw new AppError('Invalid credentials', 401);
          }

          return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName,
            phoneNumber: user.phoneNumber,
            isRegistered: user.isRegistered
          }
        }
        catch (error) {
          if (error instanceof AppError ) {
            throw error;
          }
          throw new AppError('Internal Server Error', 500);
        }

      },
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }) => {
      if (user) {
          (token as AuthToken).id = user.id;
          (token as AuthToken).isRegistered = user?.isRegistered
      }
      return token;
    },
    // session: ({ session, token }) => {
    //   if (session.user) {
    //       session.user.id = token.id;
    //   }
    //   return session
    // }
  },
  pages: {
    signIn: '/auth/signin'
  }
})

export { handler as GET, handler as POST }