import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { db } from "./db";

// Import the secret key from your environment or define it directly here
const secret = 'say_lalisa_love_me_lalisa_love_me_hey';

export const authOptions: NextAuthOptions = {
    pages: {
        signIn: '/auth/sign-in'
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: 'jwt'
    },
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email", placeholder: "jsmith@gmail.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const existingUser = await db.user.findUnique({
                    where: { email: credentials?.email }
                });

                if (!existingUser || !(await compare(credentials.password, existingUser.password))) {
                    return null;
                }

                return {
                    id: existingUser.id + '',
                    username: existingUser.username,
                    email: existingUser.email,
                    role: existingUser.role,
                };
            }
        })
    ],
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                return {
                    ...token,
                    role: token.role,
                    username: token.username
                };
            }
            return token;
        },
        async session({ session, user, token }) {
            return {
                ...session,
                user: {
                    ...session.user,
                    id: token.sub,
                    role: token.role,
                    username: token.username
                }
            };
        },
    },
    // Add the secret key here
    secret: secret
};

export default authOptions;
