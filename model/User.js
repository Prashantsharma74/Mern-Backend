const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: Buffer, required: true },
  role: { type: String, required: true, default:'user' },
  addresses: { type: [Schema.Types.Mixed] }, 
  // for addresses, we can make a separate Schema like orders. but in this case we are fine
  name: { type: String },
  salt: Buffer,
  resetPasswordToken: {type: String, default:''}
},{timestamps: true});

// Define the virtual property 'id'
userSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting document to JSON
userSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
      // Remove the _id field from the JSON output
      delete ret._id;
  }
});
exports.User = mongoose.model('User', userSchema);