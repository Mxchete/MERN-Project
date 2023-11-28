const mongoose = require("mongoose");

const SongSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    imageURL: {
      type: String,
      required: true,
    },
    songUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("song", SongSchema);
