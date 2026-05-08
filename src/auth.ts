import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import { db } from "./lib/db"
import bcrypt from "bcryptjs"

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: '/login',
  },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Invalid credentials")
        }
        
        const user = await db.user.findUnique({
          where: { email: credentials.email as string }
        });
        
        if (!user || !user.passwordHash) {
          throw new Error("Invalid credentials")
        }
        
        const isCorrectPassword = await bcrypt.compare(
          credentials.password as string,
          user.passwordHash
        );
        
        if (!isCorrectPassword) {
          throw new Error("Invalid credentials")
        }
        
        return {
          id: user.id,
          name: user.name,
          email: user.email,
        }
      }
    })
  ],
  secret: process.env.AUTH_SECRET?.trim(),
  session: { strategy: "jwt" },
  trustHost: true,
  callbacks: {
    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      return token;
    }
  }
})
