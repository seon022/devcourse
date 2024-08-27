import mongoose from "mongoose";
import { Customer } from "../types";
declare const _default: mongoose.Model<Customer, {}, {}, {}, mongoose.Document<unknown, {}, Customer> & Customer & {
    _id: mongoose.Types.ObjectId;
}, any>;
export default _default;
