import mongoose, {model, models, Schema, Document} from "mongoose";
import { User } from "./user.model";
import { Documents } from "./document.model";

export interface IMESSAGE extends Document {
  userID:mongoose.Types.ObjectId;
  docID:mongoose.Types.ObjectId,
  role: "user" | "agent";
  content:string
}

const messageSchema = new Schema<IMESSAGE>({
  userID:{
    type:mongoose.Types.ObjectId,
    ref:"User"
  },
  docID:{
    type:mongoose.Types.ObjectId,
    ref:"Documents"
  },
  role:{
    type:String,
    enum:["user", "agent"],
    required:true
  },
  content:{
    type:String,
    required:true
  }
}, {timestamps:true})

export const Message = models?.Message || model<IMESSAGE>('Message', messageSchema)