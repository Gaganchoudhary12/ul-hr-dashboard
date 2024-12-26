import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const UserRating =mongoose.models.userratings || mongoose.model("userratings", SchemaCommon);;

export default UserRating;
