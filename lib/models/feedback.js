import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const Feedback = mongoose.models.feedback || mongoose.model("feedback", SchemaCommon);

export default Feedback;
