const { Schema, model } = require("mongoose");

const recipesSchema = Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
  },
  food: {
    type: [String],
    required: true,
  },
  guide: {
    type: String,
    required: true,
  },
  images: {
    type: String,
    default: "image.png",
  },
  date_recipe: {
    type: Date,
    default: Date.now,
  },
  like: {
    type: Number,
    default: 0,
  },
  dislike: {
    type: Number,
    default: 0,
  },
});

module.exports = model("Recipe", recipesSchema, "recipes");
