import NextAuth from "next-auth/next";
import { authOptions } from "@/lib/auth"; // Forcing re-evaluation of this module

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
