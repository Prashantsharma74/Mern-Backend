const mongoose = require('mongoose');
const { Schema } = mongoose;

const categorySchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

// Define the virtual property 'id'
categorySchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting document to JSON
categorySchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // Remove the _id field from the JSON output
      delete ret._id;
  }
});

exports.Category = mongoose.model('Category', categorySchema);
