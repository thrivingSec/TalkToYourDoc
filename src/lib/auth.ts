import { User } from "@/models/user.model";
import { connectDB } from "@/shared/db";
import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials"
import { IUSER } from "@/models/user.model"
import bcrypt from "bcryptjs";
import { env } from "@/shared/env";
export const authOptions:NextAuthOptions = {
  // providers
  providers:[
   CredentialsProvider({
      name:'Credentials',
      credentials:{
        email:{label:'email', type:'text'},
        password:{label:'password', type:'password'}
      },
      async authorize(credentials) {
        if(!credentials?.email || !credentials?.password){
          throw new Error('Error from authorize :: missing credetials email or password')
        }
        try {
          // databse connection
          await connectDB();
          // user
          let user = await User.findOne<IUSER>({email:credentials.email})

          if(!user){
            throw new Error('User not found.')
          }

          const userPass = user.password;

          const validate = await bcrypt.compare(credentials.password, userPass)
          if(!validate){
            throw new Error("Invalid Credentials")
          }

          return {
            id:user._id.toString(),
            email:user.email
          }

        } catch (error) {
          console.log('Error is user signin :: ', error);
          throw error
        }
      },
    })
  ],
  // callbacks
  callbacks:{
    jwt({token, user}) {
      if(user){
        token.id = user.id
      }
      return token
    },
    session({session, token}){
      if(session.user){
        session.user.id = token.id as string
      }
      return session
    },
    async redirect({url, baseUrl}){
      return baseUrl + "/dashboard"
    }
  },
  pages:{
    signIn:"/signin",
    error:"/signin"
  },
  session:{
    strategy:'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  secret:env.NEXT_AUTH_SECRET
}
