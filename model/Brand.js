const mongoose = require('mongoose');
const { Schema } = mongoose;

const brandSchema = new Schema({
  label: { type: String, required: true, unique: true },
  value: { type: String, required: true, unique: true },
});

// Define the virtual property 'id'
brandSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting document to JSON
brandSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // Remove the _id field from the JSON output
      delete ret._id;
  }
});

exports.Brand = mongoose.model('Brand', brandSchema);