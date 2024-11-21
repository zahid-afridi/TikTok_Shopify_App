import mongoose, { Schema, model } from "mongoose";


const packageSchema = new Schema(
  {
    packageName: { type: String },
    packageDesc: { type: String },
    packagePrice: { type: String },
    packageTikTokImportNumber: { type: Number },
    // packageCSVImportBoolean: { type: String },
    // packageCsvImportNumber: { type: Number },
  },
  { timestamps: true, versionKey: false }
);

const TikTok_Packages_Modal= mongoose.model("TikTok_Packages", packageSchema)

export default TikTok_Packages_Modal