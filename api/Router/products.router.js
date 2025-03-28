const express = require('express');
const router = express.Router();

const {
  getAllProduct,
  singleProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require('../Controller/products.controller');

router.route('/').get(getAllProduct).post(createProduct);
router
  .route('/:id')
  .get(singleProduct)
  .patch(updateProduct)
  .delete(deleteProduct);

module.exports = router;
