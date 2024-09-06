import mongoose from "mongoose";

const SchemaCommon = new mongoose.Schema(
  {},
  { strict: false, versionKey: false }
);
const Banner = mongoose.models.banners || mongoose.model('banners', SchemaCommon);

export default Banner;