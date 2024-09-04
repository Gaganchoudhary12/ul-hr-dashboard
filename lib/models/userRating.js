import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const UserRating = mongoose.model("userRating", SchemaCommon, "userRating");

export default UserRating;
