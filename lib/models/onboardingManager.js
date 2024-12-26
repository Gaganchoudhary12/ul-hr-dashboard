import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const ManagerOnboardings = mongoose.models.bymanageronboardings || mongoose.model("bymanageronboardings", SchemaCommon);

export default ManagerOnboardings;
