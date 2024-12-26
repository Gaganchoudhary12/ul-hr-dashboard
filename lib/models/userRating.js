import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const UserRating =mongoose.models.userRatings || mongoose.model("userRatings", SchemaCommon);;

export default UserRating;
