const mongoose = require('mongoose');
const {Schema} = mongoose;


const cartSchema = new Schema({
    quantity: { type : Number, required: true},
    product: { type: Schema.Types.ObjectId, ref: 'Product', required: true},
    user:{ type: Schema.Types.ObjectId, ref: 'User', required: true},
    size: { type : Schema.Types.Mixed},
    color: { type : Schema.Types.Mixed},
})

// Define the virtual property 'id'
cartSchema.virtual('id').get(function () {
    return this._id.toHexString();
});

// Ensure virtuals are included when converting document to JSON
cartSchema.set('toJSON', {
    virtuals: true,
    versionKey: false,
    transform: function (doc, ret) {
        // Remove the _id field from the JSON output
        delete ret._id;
    }
});


exports.Cart = mongoose.model('Cart',cartSchema)