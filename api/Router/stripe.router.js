const express = require('express');
const router = express.Router();
const { createCheckoutSession } = require('../Controller/stripe.controller');

// Route to handle Stripe checkout session creation
router.post('/checkout', createCheckoutSession);

module.exports = router;
