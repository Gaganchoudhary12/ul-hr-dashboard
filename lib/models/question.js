import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const Questions = mongoose.models.questions || mongoose.model("questions", SchemaCommon);

export default Questions;
