
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '@/services/api';
import { useShop } from '@/context/ShopContext';
import { HeartIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart, isInWishlist, addToWishlist } = useShop();
  const [imageLoaded, setImageLoaded] = useState(false);

  return (
    <div 
      className="group relative bg-white rounded-xl overflow-hidden shadow-sm border border-border hover:shadow-lg transition-all duration-300 card-hover flex flex-col"
    >
      <div className="absolute top-2 right-2 z-10">
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            addToWishlist(product);
          }}
          className="bg-white rounded-full p-2 shadow-sm transition-transform duration-300 hover:scale-110"
          aria-label={isInWishlist(product.id) ? "Remove from wishlist" : "Add to wishlist"}
        >
          <HeartIcon 
            size={16} 
            className={cn(
              "transition-colors duration-300",
              isInWishlist(product.id) 
                ? "fill-red-500 text-red-500" 
                : "text-gray-400 group-hover:text-gray-600"
            )} 
          />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="flex flex-col h-full">
        <div className="relative pt-[100%] overflow-hidden">
          <div className={cn("absolute inset-0 flex items-center justify-center", !imageLoaded && "shimmer")}>
            <img
              src={product.image}
              alt={product.title}
              onLoad={() => setImageLoaded(true)}
              className={cn(
                "object-contain w-full h-full p-6 transition-all duration-300 group-hover:scale-105",
                imageLoaded ? "opacity-100" : "opacity-0"
              )}
            />
          </div>
        </div>

        <div className="p-4 flex flex-col flex-grow">
          <div className="mb-2">
            <span className="text-xs uppercase tracking-wide text-muted-foreground">
              {product.category}
            </span>
          </div>
          <h3 className="font-medium text-sm text-foreground mb-1 line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {product.title}
          </h3>
          <div className="mt-auto pt-3 flex items-center justify-between">
            <span className="font-medium">${product.price.toFixed(2)}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
              </svg>
              <span className="text-xs font-medium">{product.rating.rate.toFixed(1)}</span>
            </div>
          </div>
        </div>
      </Link>

      <div className="px-4 pb-4">
        <button
          onClick={() => addToCart(product)}
          className="w-full bg-primary text-primary-foreground rounded-md py-2 text-sm font-medium transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="9" cy="21" r="1" />
            <circle cx="20" cy="21" r="1" />
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6" />
          </svg>
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
