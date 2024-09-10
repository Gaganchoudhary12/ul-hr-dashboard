import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const User = mongoose.models.users || mongoose.model("users", SchemaCommon);

export default User;
