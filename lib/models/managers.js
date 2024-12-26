import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const Managers =mongoose.models.managers || mongoose.model("managers", SchemaCommon);;

export default Managers;