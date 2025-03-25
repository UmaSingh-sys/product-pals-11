
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { fetchProductById } from '@/services/api';
import { useShop } from '@/context/ShopContext';
import Layout from '@/components/Layout';
import ImageWithFallback from '@/components/ImageWithFallback';
import { HeartIcon, ChevronLeftIcon, ShoppingCartIcon, MinusIcon, PlusIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

const ProductDetail = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addToCart, isInWishlist, addToWishlist } = useShop();
  const [quantity, setQuantity] = useState(1);

  const { data: product, isLoading, error } = useQuery({
    queryKey: ['product', id],
    queryFn: () => fetchProductById(Number(id)),
    enabled: !!id
  });

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity);
    }
  };

  const handleQuantityChange = (newQuantity: number) => {
    setQuantity(Math.max(1, newQuantity));
  };

  if (isLoading) {
    return (
      <Layout>
        <div className="container px-4 py-8 mx-auto">
          <div className="animate-pulse">
            <div className="h-6 w-20 bg-muted rounded mb-8"></div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="aspect-square bg-muted rounded-xl"></div>
              <div>
                <div className="h-8 w-3/4 bg-muted rounded mb-4"></div>
                <div className="h-4 w-1/4 bg-muted rounded mb-6"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-full bg-muted rounded mb-2"></div>
                <div className="h-4 w-3/4 bg-muted rounded mb-8"></div>
                <div className="h-10 w-full bg-muted rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }

  if (error || !product) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto text-center">
          <h2 className="text-xl font-medium mb-4">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the product you're looking for.
          </p>
          <button 
            onClick={() => navigate('/')}
            className="bg-primary text-primary-foreground px-4 py-2 rounded-md"
          >
            Back to Products
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ChevronLeftIcon size={16} className="mr-1" />
          Back
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          {/* Product Image */}
          <div className="bg-white rounded-xl p-8 border border-border overflow-hidden flex items-center justify-center">
            <div className="w-full max-w-md mx-auto transition-all duration-500 hover:scale-105">
              <ImageWithFallback
                src={product.image}
                alt={product.title}
                className="w-full h-full object-contain"
              />
            </div>
          </div>

          {/* Product Details */}
          <div className="flex flex-col">
            <div className="mb-2">
              <span className="text-sm uppercase tracking-wide text-muted-foreground">
                {product.category}
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-semibold mb-4">{product.title}</h1>
            
            <div className="flex items-center mb-6">
              <div className="flex items-center gap-1 text-amber-500 mr-4">
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                <span className="font-medium">{product.rating.rate.toFixed(1)}</span>
              </div>
              <span className="text-muted-foreground text-sm">
                {product.rating.count} reviews
              </span>
            </div>

            <p className="text-xl font-semibold mb-6">${product.price.toFixed(2)}</p>

            <p className="text-muted-foreground mb-8">{product.description}</p>

            {/* Quantity selector */}
            <div className="flex items-center mb-6">
              <span className="text-sm font-medium mr-4">Quantity:</span>
              <div className="flex items-center border border-border rounded-md">
                <button
                  onClick={() => handleQuantityChange(quantity - 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                  disabled={quantity <= 1}
                >
                  <MinusIcon size={16} />
                </button>
                <div className="w-12 h-10 flex items-center justify-center border-x border-border">
                  {quantity}
                </div>
                <button
                  onClick={() => handleQuantityChange(quantity + 1)}
                  className="w-10 h-10 flex items-center justify-center hover:bg-secondary transition-colors"
                >
                  <PlusIcon size={16} />
                </button>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-auto">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-primary text-primary-foreground rounded-md py-3 px-6 font-medium transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
              >
                <ShoppingCartIcon size={18} />
                Add to Cart
              </button>
              
              <button
                onClick={() => addToWishlist(product)}
                className={cn(
                  "flex items-center justify-center gap-2 py-3 px-6 rounded-md border font-medium transition-all duration-200",
                  isInWishlist(product.id)
                    ? "bg-red-50 border-red-200 text-red-500 hover:bg-red-100"
                    : "border-border hover:bg-secondary"
                )}
              >
                <HeartIcon 
                  size={18} 
                  className={isInWishlist(product.id) ? "fill-red-500" : ""} 
                />
                {isInWishlist(product.id) ? "In Wishlist" : "Add to Wishlist"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetail;
