import mongoose, { Schema, Document } from "mongoose";
//creating a interface for data safety
export interface Message extends Document {
  content: string;
  createdAt: Date;
}
// create message schema
const MessageSchema: Schema<Message> = new Schema({
  content: { type: String, required: true },
  createdAt: { type: Date, default: Date.now, required: true },
});

//creating user interface
export interface User extends Document {
  name: string;
  email: string;
  password: string;
  verifyCode: string;
  verifuCodeExpires: Date;
  isVerified: boolean;
  isAcceptingMessages: boolean;
  messages: Message[];
}
// create user schema
const UserSchema: Schema<User> = new Schema({
  name: {
    type: String,
    required: [true, "UserName is required"],
    trim: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    require: [true, "Email is required"],
    unique: true,
    //match the email
    match: [
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      "Please enter a valid email",
    ],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    unique: true,
    //match the email
  },
  verifyCode: { type: String, required: [true, "Verify Code is reqiured"] },
  verifuCodeExpires: {
    type: Date,
    required: [true, "Verify Code Expires is reqiured"],
  },
  isVerified: { type: Boolean, default: false },
  isAcceptingMessages: { type: Boolean, default: true },
  messages: [MessageSchema],
});
//export the model
//if the model is already created then use that model otherwise create a new model
const UserModel =
  (mongoose.models.User as mongoose.Model<User>) ||
  mongoose.model<User>("User", UserSchema);
