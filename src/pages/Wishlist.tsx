
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import ProductCard from '@/components/ProductCard';
import { HeartIcon } from 'lucide-react';

const Wishlist = () => {
  const navigate = useNavigate();
  const { wishlist, clearWishlist } = useShop();

  if (wishlist.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold mb-8">My Wishlist</h1>
          
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <HeartIcon size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your wishlist is empty</h2>
            <p className="text-muted-foreground mb-6">
              Save items you love to your wishlist and find them easily when you're ready to shop.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
            >
              Discover Products
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-semibold">My Wishlist</h1>
          
          <button
            onClick={clearWishlist}
            className="text-sm text-muted-foreground hover:text-destructive transition-colors"
          >
            Clear Wishlist
          </button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {wishlist.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Wishlist;
