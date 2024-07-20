import NextAuth from "next-auth";
import Providers from "next-auth/providers";

export default NextAuth({
  providers: [
    // Add authentication providers here (e.g., Google, Facebook, etc.)
  ],
  secret: process.env.NEXTAUTH_SECRET,
});
