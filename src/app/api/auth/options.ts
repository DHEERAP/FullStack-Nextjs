
// import { NextAuthOptions } from "next-auth"
// import Credentials from "next-auth/providers/credentials"
// import bcrypt from "bcryptjs"
// import dbConnect from "@/lib/dbConnect"
// import UserModel from "@/model/User"
  



// export const authOptions: NextAuthOptions = {
//   providers: [

//     Credentials({
//       id: 'credentials',
//       name: 'Credentials',

//       credentials: {
//         email: { label: "Email", type: "text" },
//         password: { label: "Password", type: "password" },
//       },

//       async authorize(credentials: any): Promise<any> {

//         await dbConnect()

//         try {

//           const user = await UserModel.findOne({
//             $or: [
//               { email: credentials.identifier },
//               { username: credentials.identifier }
//             ],
//           });


//           if (!user) {
//             throw new Error('No user found with this email')
//           }

//           if (!user.isVerified) {
//             throw new Error("Please Verify your account before login")
//           }

//           const isPasswordCorrect = await bcrypt.compare(
//             credentials.password,
//             user.password
//           );

//           if (isPasswordCorrect) {
//             return user;
//           }
//           else {
//             throw new Error('Incorrect Password')
//           }

//         } catch (error: any) {
//           throw new Error(error)
//         }
//       }

//     })

//   ],

//   callbacks: {

//     async jwt({ token, user }) {

//       if (user) {
//         token._id = user._id?.toString();
//         token.isVerified = user.isVerified;
//         token.isAcceptingMessages = user.isAcceptingMessages;
//         token.username = user.username;
//       }

//       return token;
//     },
//     async session({ session, token }) {

//       if (token) {
//         session.user._id = token._id
//         session.user.isVerified = token.isVerified
//         session.user.isAcceptingMessage = token.isAcceptingMessages
//         session.user.username = token.username
//       }

//       return session;
//     }

//   },

//   pages: {
//     signIn: '/sign-in'
//   },

//   session: {
//     strategy: "jwt"
//   },

//   secret: process.env.NEXTAUTH_SECRET,

// }













// import { NextAuthOptions } from 'next-auth';
// import CredentialsProvider from 'next-auth/providers/credentials';

// import bcrypt from "bcryptjs"
// import dbConnect from "@/lib/dbConnect"
// import UserModel from "@/model/User"

// export const authOptions: NextAuthOptions = {
//   providers: [
//     CredentialsProvider({
//       id: 'credentials',
//       name: 'Credentials',
//       credentials: {
//         identifier: { label: 'Email/Username', type: 'text' },
//         password: { label: 'Password', type: 'password' },
//       },
//       async authorize(credentials: any): Promise<any> {
//         await dbConnect();
//         try {
//           const user = await UserModel.findOne({
//             $or: [
//               { email: credentials.identifier },
//               { userName: credentials.identifier },
//             ],
//           });
//           if (!user) {
//             throw new Error('No user found with this email/username');
//           }
//           if (!user.isVerified) {
//             throw new Error('Please verify your account first');
//           }
//           const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
//           if (isPasswordCorrect) {
//             return user;
//           } else {
//             throw new Error('Incorrect password');
//           }
//         } catch (err: any) {
//           throw new Error(err.message);
//         }
//       },
//     }),
//   ],
//   callbacks: {
//     async jwt({ token, user }) {
//       if (user) {
//         token._id = user._id;
//         token.isVerified = user.isVerified;
//         token.isAcceptingMessages = user.isAcceptingMessages;
//         token.userName = user.username;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       if (token) {
//         session.user._id = token._id;
//         session.user.userName = token.userName;
//         session.user.isAcceptingMessages = token.isAcceptingMessages;
//         session.user.isVerified = token.isVerified;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: '/sign-in',
//   },
//   session: {
//     strategy: 'jwt',
//   },
//   secret: process.env.NEXTAUTH_SECRET,
// };


















import { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

import bcrypt from "bcryptjs";
import dbConnect from "@/lib/dbConnect";
import UserModel from "@/model/User";


export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Email/Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials: Record<"identifier" | "password", string> | undefined): Promise<any> {
        if (!credentials) {
          throw new Error('Credentials are required');
        }

        await dbConnect();
        try {
          const user = await UserModel.findOne({
            $or: [
              { email: credentials.identifier },
              { userName: credentials.identifier },
            ],
          });
          if (!user) {
            throw new Error('No user found with this email/username');
          }
          if (!user.isVerified) {
            throw new Error('Please verify your account first');
          }
          const isPasswordCorrect = await bcrypt.compare(credentials.password, user.password);
          if (isPasswordCorrect) {
            return user;
          } else {
            throw new Error('Incorrect password');
          }
        } catch (err: unknown) {
          if (err instanceof Error) {
            throw new Error(err.message);
          } else {
            throw new Error('An unknown error occurred');
          }
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = user._id;
        token.isVerified = user.isVerified;
        token.isAcceptingMessages = user.isAcceptingMessages;
        token.userName = user.username;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user._id = token._id;
        session.user.userName = token.userName;
        session.user.isAcceptingMessages = token.isAcceptingMessages;
        session.user.isVerified = token.isVerified;
      }
      return session;
    },
  },
  pages: {
    signIn: '/sign-in',
  },
  session: {
    strategy: 'jwt',
  },
  secret: process.env.NEXTAUTH_SECRET,
};








