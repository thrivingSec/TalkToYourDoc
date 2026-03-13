import bcrypt from "bcryptjs";
import mongoose, { model, models, Schema, Document } from "mongoose";
import { User } from "./user.model";

export interface IDOCUMENT extends Document {
  userID: mongoose.Types.ObjectId;
  source: string;
  namespace?: string;
}

const documentSchema = new Schema<IDOCUMENT>(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    source: {
      type: String,
      required: true,
    },
    namespace: {
      type: String,
      enum: [
        "technical",
        "engineering",
        "architectural",
        "compliance",
        "legal",
        "internal_policies",
        "refund_policy",
        "product_manual",
        "report",
        "proposal",
        "essay",
        "philosophy",
        "story",
        "medical_doc",
        "academic_paper",
      ],
    },
  },
  { timestamps: true },
);

export const Documents =
  models?.Documents || model<IDOCUMENT>("Document", documentSchema);
