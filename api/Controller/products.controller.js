const asyncHandler = require('express-async-handler');
const Product = require('../Models/products.models');

// ✅ Get all products
const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Fetch all products from the database
    const products = await Product.find();

    // Respond with the list of products
    res.status(200).json(products);
  } catch (error) {
    // Handle any potential errors and respond with an error message
    console.error('Error fetching products:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Get a single product
const singleProduct = asyncHandler(async (req, res) => {
  try {
    // Fetch the product by its ID
    const product = await Product.findById(req.params.id);

    // If the product is not found, respond with a 404 error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the product data
    res.status(200).json(product);
  } catch (error) {
    // Handle potential errors like invalid ID format
    console.error('Error fetching product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Create a new product
const createProduct = asyncHandler(async (req, res) => {
  try {
    // 📝 Destructure request body
    const {
      title,
      shortDesc,
      longDesc,
      price,
      category,
      quantity,
      rating,
      thumbnail,
    } = req.body;

    // 🔍 Validate required fields
    if (!title || !price || !category) {
      return res
        .status(400)
        .json({ message: 'Title, price, and category are required' });
    }

    // 🏗️ Create new product instance
    const product = new Product({
      title,
      shortDesc,
      longDesc,
      price,
      category,
      quantity: quantity || 0, // Default to 0 if not provided
      rating: rating || 0, // Default to 0 if not provided
      thumbnail,
    });

    // 🔄 Save product to database
    const savedProduct = await product.save();

    // ✅ Send success response
    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: savedProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ success: false, message: 'Internal Server Error' });
  }
});

// ✅ Update a product
const updateProduct = asyncHandler(async (req, res) => {
  try {
    // Attempt to find the product by ID and update it with the request body
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true, // Return the updated document
      runValidators: true, // Ensure validation is run on the updated data
    });

    // If the product is not found, respond with a 404 error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with the updated product data
    res.status(200).json(product);
  } catch (error) {
    // Handle potential errors (e.g., invalid product ID)
    console.error('Error updating product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

// ✅ Delete a product
const deleteProduct = asyncHandler(async (req, res) => {
  try {
    // Attempt to find and delete the product by ID
    const product = await Product.findByIdAndDelete(req.params.id);

    // If the product is not found, respond with a 404 error
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    // Respond with a success message upon successful deletion
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    // Handle potential errors (e.g., invalid product ID)
    console.error('Error deleting product:', error);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = {
  getAllProduct,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
