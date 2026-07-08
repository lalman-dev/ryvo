import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import connectDB from "./lib/db";
import User from "./models/user.model";
import bcrypt from "bcryptjs";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "email",
          label: "Email",
          placeholder: "johndoe@gmail.com",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      async authorize(credentials, request) {
        if (!credentials.email || !credentials.password) {
          throw Error("Missing credentials");
        }
        const email = credentials.email;
        const password = credentials.password as string;
        await connectDB();
        const user = await User.findOne({ email });
        if (!user) {
          throw Error("User does not exist");
        }
        const isMatched = await bcrypt.compare(password, user.password);
        if (!isMatched) {
          throw Error("incorrect password");
        }
        return {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      ((token.name = user.name),
        (token.id = user.id),
        (token.email = user.email),
        (token.role = user.role));
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        ((session.user.name = token.name),
          (session.user.id = token.id as string),
          (session.user.email = token.email as string),
          (session.user.role = token.role as string));
      }
      return session;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
  session: {
    strategy: "jwt",
    maxAge: 10 * 24 * 60 * 60,
  },
  secret: process.env.AUTH_SECRET,
});
