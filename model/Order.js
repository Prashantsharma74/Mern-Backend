const mongoose = require('mongoose');
const { Schema } = mongoose;

const paymentMethods = {
  values: ['card', 'cash'],
  message: 'enum validator failed for payment Methods'
}
const orderSchema = new Schema(
  {
    items: { type: [Schema.Types.Mixed], required: true },
    totalAmount: { type: Number },
    totalItems: { type: Number },
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    paymentMethod: { type: String, required: true, enum: paymentMethods },
    paymentStatus: { type: String, default: 'pending' },
    status: { type: String, default: 'pending' },
    selectedAddress: { type: Schema.Types.Mixed, required: true },
  },
  { timestamps: true }
);

// Define the virtual property 'id'
orderSchema.virtual('id').get(function () {
  return this._id.toHexString();
});

// Ensure virtuals are included when converting document to JSON
orderSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    // Remove the _id field from the JSON output
    delete ret._id;
  }
});

exports.Order = mongoose.model('Order', orderSchema);