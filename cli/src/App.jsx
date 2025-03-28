import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import CheckoutForm from './components/CheckoutForm';
import ProductCard from './components/ProductCard';

const stripePromise = loadStripe(
  'pk_test_51R61J0CZ2kLTrYVYE9WQTKQfW3pfUXk24wvYy2ZnBiylVvfjMdCXhTPuDnFIzJhbAOG45ZC0EN45mqH5Kqsr4HPw005XK2Dm4F'
); // Use your Stripe public key

const productData = [
  {
    id: 1,
    name: 'Organic Apples',
    description: 'Fresh, organic apples from local farms.',
    price: 80.55, // Price in dollars
    category: 'Fruits',
    inStock: true,
    stock: 123,
    thumbnail: './img/2_1.jpg',
  },
  {
    id: 2,
    name: 'Whole Wheat Bread',
    description: '100% whole wheat, no preservatives.',
    price: 2.5,
    category: 'Bakery',
    inStock: true,
    stock: 123,
    thumbnail: './img/2_2.jpg',
  },
  {
    id: 3,
    name: 'Almond Milk',
    description: 'Unsweetened, 1L carton.',
    price: 5,
    category: 'Dairy Alternatives',
    inStock: true,
    stock: 123,
    thumbnail: './img/2_3.jpg',
  },
];

const App = () => {
  const [selectedProduct, setSelectedProduct] = useState(productData[0]); // Default product
  console.log(selectedProduct);

  return (
    <div className='p-6'>
      <h1 className='text-2xl font-bold text-center mb-4'>Product Store</h1>

      {/* Product List */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        {productData.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onSelect={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {/* Checkout Form */}
      <Elements stripe={stripePromise}>
        <CheckoutForm product={selectedProduct} />
      </Elements>
    </div>
  );
};

export default App;
