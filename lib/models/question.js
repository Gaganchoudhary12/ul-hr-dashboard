import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema({}, { strict: false });
const Questions = mongoose.model("questions", SchemaCommon, "questions");

export default Questions;
