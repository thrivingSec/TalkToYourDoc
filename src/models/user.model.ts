import bcrypt from "bcryptjs";
import mongoose, {model, models, Schema, Document} from "mongoose";

export interface IUSER extends Document {
  name:string;
  email:string;
  password:string;
}

const userSchema = new Schema<IUSER>({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  }
}, {
  timestamps:true
})

userSchema.pre("save", async function(){
  if(this.isModified("password")){
    this.password = await bcrypt.hash(this.password, 10);
  }
})

export const User = models?.User || model<IUSER>('User', userSchema);
