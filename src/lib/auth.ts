import { PrismaAdapter } from "@next-auth/prisma-adapter";
import bcrypt from "bcrypt";
import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "./prisma";

export const authOptions: AuthOptions = {
  secret: process.env.SECRET,

  jwt: {
    secret: process.env.SECRET,
  },

  session: {
    strategy: "jwt",
  },

  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          role: profile.role ? profile.role : "USER",
        };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "claudio.lins@email.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req): Promise<any> {
        if (!credentials?.email || !credentials.password)
          throw new Error("Dados de login necessários");

        const user = await prisma.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user || !user.hashedPassword)
          throw new Error("Usuário não encontrado");

        const isPasswordValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword,
        );
        if (!isPasswordValid) throw new Error("Senha inválida");
        return user;
      },
    }),
  ],

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return { ...token, ...user };
      } else {
        return token;
      }
    },
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
  },

  pages: {
    signIn: "/auth/login",
  },
  // debug: process.env.NODE_ENV === "development",
};
