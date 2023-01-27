const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
  file: String,
});

module.exports = mongoose.model("Photo", PhotoSchema);
