import mongoose from "mongoose";
import mongooseSequence from 'mongoose-sequence';

const tiktokSchema = new mongoose.Schema({
  video_id: {
    type: String,
  },
  username: {
    type: String,
  },
  description: {
    type: String,
  },
  download_url: {
    type: String,
  },
  avatar: {
    type: String,
  },
  embed_url: {
    type: String,
  },
  check_count: {
    type: Number,
    unique: true,
  },
  is_shopify: {
    type: Number,
    default: 0,
  },
  shopify_product_id: {
    type: String,
    default: null,
  },
  shop_id: {
    type: String,
  },
  Video_url: {
    type: String,
  },
}, { timestamps: true });

// Apply the mongoose-sequence plugin to `check_count`
const AutoIncrement = mongooseSequence(mongoose);
tiktokSchema.plugin(AutoIncrement, { inc_field: 'check_count' });

const TiktokModel = mongoose.model('ticktokproduct', tiktokSchema);

export default TiktokModel;
