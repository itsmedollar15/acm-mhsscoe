import { Schema, model, models } from "mongoose";

const { String } = Schema.Types;

const magazineSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    pages: [{ type: String }],
  },
  { versionKey: false }
);

const Magazine = models.Magazine || model("Magazine", magazineSchema);

export default Magazine;
