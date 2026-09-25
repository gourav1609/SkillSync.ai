import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email) return null;

        const normalizedEmail = credentials.email.toLowerCase().trim();
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(normalizedEmail)) {
          return null;
        }

        let user = await prisma.user.findUnique({
          where: { email: normalizedEmail },
        });

        // If user already exists
        if (user) {
          // If a password was provided, verify it
          if (credentials.password) {
            const isValid = await bcrypt.compare(credentials.password, user.password);
            if (!isValid) return null;
          }
          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        }

        // If user does not exist, automatically register account for frictionless access
        const defaultName = normalizedEmail
          .split("@")[0]
          .replace(/[._]/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase());
        const defaultPassword = credentials.password || "student123";
        const hashedPassword = await bcrypt.hash(defaultPassword, 10);

        user = await prisma.user.create({
          data: {
            email: normalizedEmail,
            name: defaultName || "Student",
            password: hashedPassword,
            onboardingCompleted: false,
          },
        });

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        };
      },
    }),
  ],
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  pages: {
    signIn: "/login",
    newUser: "/onboarding",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as { id: string }).id = token.id as string;
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "skillsync_super_secret_jwt_key_2026",
};
