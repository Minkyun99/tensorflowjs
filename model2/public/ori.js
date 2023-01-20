const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const PhotoSchema = new Schema({
  name: String,
  img: String,
});

module.exports = mongoose.model("Photo", PhotoSchema);
