import { NextAuthOptions } from "next-auth";
import bcrypt from "bcryptjs";
import { CredentialsProvider } from "next-auth/providers/credentials";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/model/User";
