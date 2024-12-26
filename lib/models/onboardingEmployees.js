import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const EmployeeOnboardings = mongoose.models.employeonboardings || mongoose.model("employeonboardings", SchemaCommon);

export default EmployeeOnboardings;
