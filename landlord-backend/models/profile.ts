import mongoose from "mongoose";

const searchSchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true }
});

const inquirySchema = new mongoose.Schema({
  id: { type: Number, required: true },
  name: { type: String, required: true },
  message: { type: String, required: true }
});
const userSchema = new mongoose.Schema({
  user_id: {type:Number,required:true },
  name: { type: String, required: true },
  role: { type: String, required: true },
  description: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true },
  location: { type: String, required: true },
  searches: [searchSchema],
  inquiries: [inquirySchema]
});

const profile = mongoose.model("profile", userSchema);
export default profile;