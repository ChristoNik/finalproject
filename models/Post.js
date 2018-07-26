const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Post Schema
const PostSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "users"
  },
  title: {
    type: String,
    required: true
  },
  synthType: {
    type: String,
    required: true
  },
  notes: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = Post = mongoose.model("post", PostSchema);