const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, 'Product title is required'],
      trim: true,
      minlength: [3, 'Title must be at least 3 characters long'],
    },
    shortDesc: {
      type: String,
      trim: true,
      maxlength: [150, 'Short description cannot exceed 150 characters'],
    },
    longDesc: {
      type: String,
      trim: true,
    },
    price: {
      type: Number,
      required: [true, 'Price is required'],
      min: [0, 'Price cannot be negative'],
    },
    category: {
      type: String,
      required: [true, 'Category is required'],
      enum: ['Fruits', 'Vegetables', 'Dairy', 'Beverages', 'Snacks'],
    },
    quantity: {
      type: Number,
      default: 0,
      min: [0, 'Quantity cannot be negative'],
    },
    rating: {
      type: Number,
      default: 0,
      min: [0, 'Rating cannot be lower than 0'],
      max: [5, 'Rating cannot be higher than 5'],
    },
    thumbnail: {
      type: String,
      validate: {
        validator: function (v) {
          return /^(http|https):\/\/[^ "]+$/.test(v);
        },
        message: 'Invalid image URL',
      },
    },
  },
  { timestamps: true } // Automatically adds createdAt & updatedAt fields
);

module.exports = mongoose.model('Product', productSchema);
