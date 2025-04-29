import { Schema, model, models } from "mongoose";
import User from "./user";

const { String, Number, ObjectId } = Schema.Types;

const postSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: ObjectId, ref: "User", required: true },
    level: {
      type: Number,
      required: true,
      min: 0,
      max: 3,
    },
  },
  { versionKey: false }
);

const Post = models.Post || model("Post", postSchema);

export default Post;
