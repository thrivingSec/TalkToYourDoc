import mongoose, { model, models, Schema, Document } from "mongoose";
import { User } from "./user.model";
import { Documents } from "./document.model";

export interface ICHUNK extends Document {
  userID: mongoose.Types.ObjectId;
  docID: mongoose.Types.ObjectId;
  text: string;
  embedding: number[];
  namespace: string;
  source: string;
  chunkID: number;
}

const chunkSchema = new Schema<ICHUNK>(
  {
    userID: {
      type: mongoose.Types.ObjectId,
      ref: "User",
    },
    docID: {
      type: mongoose.Types.ObjectId,
      ref: "Documents",
    },
    text: {
      type: String,
      required: true,
    },
    embedding: {
      type: [Number],
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
    source: {
      type: String,
      required: true,
    },
    chunkID: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

// Compound index for filtering speed
chunkSchema.index({
  userId: 1,
  documentId: 1,
  namespace: 1,
});

export const Chunk = models?.Chunk || model<ICHUNK>("Chunk", chunkSchema);
