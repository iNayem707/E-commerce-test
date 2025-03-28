import React, { useState } from 'react';
import { useStripe, useElements, CardElement } from '@stripe/react-stripe-js';

const CheckoutForm = ({ product }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) return;

    setLoading(true);
    setError(null);

    try {
      // Step 1: Create a Checkout session on your backend
      const response = await fetch(
        'http://localhost:5000/api/v1/stripe/checkout',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            products: [
              {
                name: product.name,
                description: product.description,
                price: product.price, // Price in cents
                quantity: 1,
              },
            ],
          }),
        }
      );

      const { sessionId } = await response.json();

      // Step 2: Redirect to Stripe Checkout
      const { error } = await stripe.redirectToCheckout({ sessionId });

      if (error) {
        setError('An error occurred during the payment process.');
        console.error('Error during Stripe checkout:', error);
      }
    } catch (err) {
      setError(err.message || 'An error occurred.');
      console.error('Error creating Stripe checkout session:', err);
    }

    setLoading(false);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className='max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg space-y-4'
    >
      {/* Product Display Section */}
      <div className='flex items-center border rounded'>
        <div>
          <img
            className='w-full h-32 object-cover'
            src={product.thumbnail}
            alt={product.name}
          />
        </div>

        <div className='ml-4'>
          <h2 className='text-lg font-semibold'>{product.name}</h2>
          <p className='text-lg font-bold'>${product.price.toFixed(2)}</p>
        </div>
      </div>

      {/* Error Message */}
      {error && <div className='text-red-600 text-sm'>{error}</div>}

      {/* Submit Button */}
      <button
        type='submit'
        disabled={loading}
        className={`w-full py-2 px-4 rounded-md text-white font-semibold ${
          loading ? 'bg-gray-400' : 'bg-indigo-600 hover:bg-indigo-700'
        } focus:outline-none focus:ring-2 focus:ring-indigo-500`}
      >
        {loading ? 'Processing...' : `Pay $${product.price.toFixed(2)}`}
      </button>
    </form>
  );
};

export default CheckoutForm;
