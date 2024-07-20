import { authOptions } from "../../../lib/auth";
import NextAuth from "next-auth";

// Import the secret key from your environment or define it directly here
const secret = 'say_lalisa_love_me_lalisa_love_me_hey';

// Merge the secret key into authOptions
const optionsWithSecret = {
    ...authOptions,
    secret: secret
};

const handler = NextAuth(optionsWithSecret);

export { handler as GET, handler as POST };

