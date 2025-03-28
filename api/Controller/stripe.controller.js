// export const paymentIntent = async (req, res) => {
//   const { amount } = req.body;

//   if (!amount) {
//     return res.status(400).json({ error: 'Amount is required' });
//   }

//   try {
//     const paymentIntent = await stripe.paymentIntents.create({
//       amount,
//       currency: 'usd',
//       payment_method_types: ['card'],
//     });

//     res.json({ clientSecret: paymentIntent.client_secret });
//   } catch (error) {
//     res.status(400).send({ error: error.message });
//   }
// };

const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY); // Add your Stripe secret key here

// Create a Stripe Checkout Session
const createCheckoutSession = async (req, res) => {
  try {
    const { products } = req.body; // Assume `products` is an array of items to be bought

    // Create line items for the checkout session
    const line_items = products.map((product) => ({
      price_data: {
        currency: 'usd', // Currency
        product_data: {
          name: product.name, // Product name
          description: product.description, // Product description
        },
        unit_amount: product.price * 100, // Price in cents (Stripe expects this)
      },
      quantity: product.quantity,
    }));

    // Create the checkout session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: line_items,
      mode: 'payment', // 'payment' for one-time payments
      success_url: `https://mts-e-commerce.netlify.app/success`, // Success URL after payment
      cancel_url: `https://mts-e-commerce.netlify.app/cancel`, // Cancel URL if payment is cancelled
    });

    // Send back the session ID
    res.status(200).json({ sessionId: session.id });
  } catch (error) {
    console.error('Error creating checkout session:', error);
    res.status(500).json({ message: 'Server Error' });
  }
};

module.exports = { createCheckoutSession };
