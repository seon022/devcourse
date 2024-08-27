import mongoose, { Document, Schema } from "mongoose";
import { Customer } from "../types";

const CustomerModel: Schema = new Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    email: { type: String, required: true },
    description: { type: String, required: false },
});

export default mongoose.model<Customer>("CustomerModel", CustomerModel);
