import { Schema, model, models } from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import Event from "@/models/event";
import Team from "@/models/team";
import Post from "@/models/post";

const { String, Number, Boolean, ObjectId } = Schema.Types;

const userSchema = new Schema(
  {
    role: { type: String },
    profilePicture: { type: String },
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, select: false },
    rollno: { type: Number },
    branch: { type: String },
    year: { type: Number },
    membershipId: { type: Number },
    links: [{ _id: false, label: { type: String }, url: { type: String } }],
    teams: [
      {
        _id: false,
        team: { type: ObjectId, ref: "Team" },
        section: { type: ObjectId, ref: "Team.sections" },
        post: { type: ObjectId, ref: "Post" },
      },
    ],
  },
  { versionKey: false }
);

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hash(this.password, 10);
  }

  next();
});

userSchema.methods.matchPassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: 60 * 30,
  });
};

const User = models.User || model("User", userSchema);

export default User;
