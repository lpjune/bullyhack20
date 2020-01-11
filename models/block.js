var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var BlockSchema = new Schema({
  name: { type: String, required: true },
  location: { type: String, required: true },
  date: { type: String, required: false },
  description: { type: String, required: true },
  organizer: { type: String, required: true },
});

// Virtual for this block instance URL.
BlockSchema.virtual("url").get(function() {
  return "/catalog/block/" + this._id;
});

BlockSchema.virtual("name").get(function() {
  return this.lastName + ", " + this.firstName;
});

// Export model.
module.exports = mongoose.model("Block", BlockSchema);
