import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const Employees = mongoose.models.employees || mongoose.model("employees", SchemaCommon);

export default Employees;
