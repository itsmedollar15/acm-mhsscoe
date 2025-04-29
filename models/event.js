import { Schema, model, models } from "mongoose";

const { String, Number, Boolean, Date, ObjectId } = Schema.Types;

const eventSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    poster: { type: String },
    startDate: { type: Date },
    endDate: { type: Date },
    registrationEndDate: { type: Date },
    entryFees: { type: Number },
    membersEntryFees: { type: Number },
    registrationLink: { type: String },
    blog: { type: String },
  },
  { versionKey: false }
);

const Event = models.Event || model("Event", eventSchema);

export default Event;
