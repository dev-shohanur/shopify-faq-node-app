// Session store model to preserve sessions across restarts.
import mongoose from "mongoose";

const metaFiledSchema = new mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  shop_name: {
    type: String,
    required: true,
  },
  general: {
    type: Object,
    required: true,
  },
  createdAt: {
    type: Date,
  },
  lastUpdatedAt: {
    type: Date,
  },
});

const MetaFiledModel = mongoose.model("setting", metaFiledSchema);

export default MetaFiledModel;
