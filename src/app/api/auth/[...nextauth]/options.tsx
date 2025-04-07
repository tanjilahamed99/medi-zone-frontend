import axios from "axios";
import CredentialsProvider from "next-auth/providers/credentials";
import type { AuthOptions, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import { BASE_URL } from "@/utils/url";

interface Credentials {
  email: string;
  password: string;
}

interface ExtendedUser extends User {
  _id?: string;
  provider?: string;
  socialId?: string;
  status?: string;
  role?: string;
}

export const options: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials: Record<keyof Credentials, string> | undefined) {
        const { email, password } = credentials || {};
        if (!email || !password) return null;

        try {
          const response = await axios.post(`${BASE_URL}/auth/authorize-user`, {
            email,
            password,
          });

          const { status, data: user } = response.data;

          if (!status) return null;

          return {
            id: user?._id?.toString(),
            email: user?.email,
            name: user?.name,
            image: user?.image,
            provider: "credentials",
          } as ExtendedUser;
        } catch (error) {
          console.error("Error in authorization:", error);
          return null;
        }
      },
    }),
  ],
  secret: "secret-top",
  callbacks: {
    async signIn({ user, account }: { user: ExtendedUser; account: any }) {
      if (["google", "facebook"].includes(account.provider)) {
        try {
          const response = await axios.post(`${BASE_URL}/auth/register`, {
            name: user?.name,
            email: user?.email,
            provider: account?.provider,
            role: "user",
            socialId: user?.id,
          });

          const newUser = response?.data?.data;
          user._id = newUser?._id?.toString();
          user.email = newUser?.email;
          user.name = newUser?.name;
          user.socialId = newUser?.socialId;
          user.status = newUser?.status;
          user.role = newUser?.role;
          user.provider = newUser?.provider;

          return true;
        } catch (error: any) {
          console.error("Error in social sign-in:", error?.message);
          return false;
        }
      }

      return true;
    },

    async redirect({ url, baseUrl }: { url: string; baseUrl: string }) {
      if (url.startsWith("/")) return `${baseUrl}${url}`;
      else if (new URL(url).origin === baseUrl) return url;
      return baseUrl;
    },

    async session({ session, token }: { session: any; token: JWT }) {
      session.user = token?.user;
      return session;
    },

    async jwt({ token, user, account }: { token: JWT; user?: ExtendedUser; account?: any }) {
      if (account?.provider === "credentials") {
        try {
          const response = await axios.get(
            `${BASE_URL}/user/data?email=${user?.email}&provider=email/pass&socialId=${token?.sub}`
          );
          token.user = response.data;
        } catch (error: any) {
          console.error("Error fetching user data:", error?.message);
        }
      } else {
        if (user) {
          token.user = {
            _id: user._id,
            email: user.email,
            name: user.name,
            provider: user.provider,
            socialId: user.socialId,
            status: user.status,
            role: user.role,
          };
        }
      }
      return token;
    },
  },

  pages: {
    signIn: "/signin",
    error: "/signin",
  },

  session: {
    strategy: "jwt",
  },
};
