import mongoose, { Schema } from "mongoose";
const CustomerModel = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
});
export default mongoose.model("CustomerModel", CustomerModel);
