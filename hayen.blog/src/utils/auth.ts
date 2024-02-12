import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import GithubProvider from "next-auth/providers/github";

export const authOptions: AuthOptions = {
    secret: process.env.SECRET_KEY,
    providers: [
        // GoogleProvider({
        //   clientId: process.env.GOOGLE_ID || '',
        //   clientSecret: process.env.GOOGLE_SECRET || '',
        // }),
        GithubProvider({
          clientId: process.env.GITHUB_ID || '',
          clientSecret: process.env.GITHUB_SECRET || '',
        }),
      ],
    callbacks: {
        session({session, token}: any) {
            console.log("SESSION: ",session, "TOKEN: ",token)
            session.user.name = `${session?.user?.name}_${token?.sub}`;
            return session
        }
    }
}