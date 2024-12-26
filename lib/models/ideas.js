import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const Ideas = mongoose.models.ideas || mongoose.model("ideas", SchemaCommon);

export default Ideas;
