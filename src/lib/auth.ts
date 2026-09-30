import { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";

// Ensure NEXTAUTH_SECRET and NEXTAUTH_URL have robust fallbacks for Vercel and local
if (!process.env.NEXTAUTH_SECRET) {
  process.env.NEXTAUTH_SECRET = "skillsync_super_secret_jwt_key_2026";
}

if (!process.env.NEXTAUTH_URL) {
  if (process.env.VERCEL_PROJECT_PRODUCTION_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`;
  } else if (process.env.VERCEL_URL) {
    process.env.NEXTAUTH_URL = `https://${process.env.VERCEL_URL}`;
  } else {
    process.env.NEXTAUTH_URL = "https://skill-sync-ai-eta.vercel.app";
  }
}

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

        try {
          let user = await prisma.user.findUnique({
            where: { email: normalizedEmail },
          });

          // If user already exists
          if (user) {
            // Direct access for demo account
            if (normalizedEmail === "alex@skillsync.ai" && credentials.password === "password123") {
              return {
                id: user.id,
                email: user.email,
                name: user.name,
              };
            }

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
          const defaultName =
            normalizedEmail === "alex@skillsync.ai"
              ? "Alex Rivera"
              : normalizedEmail
                  .split("@")[0]
                  .replace(/[._]/g, " ")
                  .replace(/\b\w/g, (c) => c.toUpperCase());
          const defaultPassword = credentials.password || "password123";
          const hashedPassword = await bcrypt.hash(defaultPassword, 10);

          user = await prisma.user.create({
            data: {
              email: normalizedEmail,
              name: defaultName || "Student",
              password: hashedPassword,
              educationLevel: "Undergraduate",
              learningGoals: "Master DBMS concepts and SQL query optimization",
              preferredStyle: "Visual & Hands-on",
              onboardingCompleted: normalizedEmail === "alex@skillsync.ai",
            },
          });

          return {
            id: user.id,
            email: user.email,
            name: user.name,
          };
        } catch (authError) {
          console.error("[Auth] Error during authorize:", authError);
          return null;
        }
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
        token.email = user.email;
        token.name = user.name;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user = {
          ...session.user,
          id: (token.id as string) || "",
          email: (token.email as string) || "",
          name: (token.name as string) || "",
        };
      }
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET || "skillsync_super_secret_jwt_key_2026",
};
