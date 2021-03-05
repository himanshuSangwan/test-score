const mongoose = require("mongoose");
const { Schema } = mongoose;
const { ObjectId } = Schema;

const score = new Schema(
  {
    score1: {
      type: Number,
      min: 0,
      max: 10,
    },
    score2: {
      type: Number,
      min: 0,
      max: 10,
    },
    score3: {
      type: Number,
      min: 0,
      max: 10,
    },

    user: {
      type: ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Score", score);
