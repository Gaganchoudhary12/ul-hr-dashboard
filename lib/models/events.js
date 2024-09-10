import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false }
);
const Events = mongoose.models.events || mongoose.model("events", SchemaCommon);

export default Events;