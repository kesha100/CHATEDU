// Define authOptions object with NEXTAUTH_SECRET and NEXTAUTH_URL
const authOptions = {
    // Your secret key here
    secret: 'say_lalisa_love_me_lalisa_love_me_hey',
    // Your NextAuth URL here
    serverURL: 'https://front.dzawj2e4iqic4.amplifyapp.com/' // Update this with your actual NextAuth URL
};

// Importing getServerSession and NextResponse
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// Export GET handler function
export const GET = async (req: Request) => {
    // Get session using authOptions
    const session = await getServerSession({ ...authOptions });

    // Return JSON response indicating authentication status
    return NextResponse.json({ authenticated: !!session });
};


