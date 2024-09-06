const mongoose = require("mongoose");
const todoSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true },
    text: { type: String, required: true },
    status: { type: Boolean, default: false },
});

module.exports = mongoose.model("Todo", todoSchema);
