
import React from 'react';
import { CartItem as CartItemType } from '@/services/api';
import { useShop } from '@/context/ShopContext';
import { Link } from 'react-router-dom';
import ImageWithFallback from './ImageWithFallback';
import { MinusIcon, PlusIcon, TrashIcon } from 'lucide-react';

interface CartItemProps {
  item: CartItemType;
}

const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const { updateQuantity, removeFromCart } = useShop();

  const decreaseQuantity = () => {
    if (item.quantity > 1) {
      updateQuantity(item.id, item.quantity - 1);
    }
  };

  const increaseQuantity = () => {
    updateQuantity(item.id, item.quantity + 1);
  };

  return (
    <div className="flex items-center gap-4 py-4 border-b border-border animate-fade-in">
      <div className="w-16 h-16 relative bg-white rounded-md border border-border overflow-hidden flex-shrink-0">
        <Link to={`/product/${item.id}`}>
          <ImageWithFallback
            src={item.image}
            alt={item.title}
            className="w-full h-full object-contain p-2"
          />
        </Link>
      </div>
      
      <div className="flex-grow min-w-0">
        <Link 
          to={`/product/${item.id}`}
          className="text-sm font-medium line-clamp-1 hover:text-primary transition-colors duration-200"
        >
          {item.title}
        </Link>
        <div className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)}</div>
      </div>
      
      <div className="flex items-center gap-2">
        <div className="flex items-center">
          <button
            onClick={decreaseQuantity}
            className="w-6 h-6 flex items-center justify-center border border-border rounded-l-md bg-background hover:bg-secondary transition-colors"
            disabled={item.quantity <= 1}
          >
            <MinusIcon size={14} />
          </button>
          
          <div className="w-8 h-6 flex items-center justify-center border-y border-border bg-background text-xs">
            {item.quantity}
          </div>
          
          <button
            onClick={increaseQuantity}
            className="w-6 h-6 flex items-center justify-center border border-border rounded-r-md bg-background hover:bg-secondary transition-colors"
          >
            <PlusIcon size={14} />
          </button>
        </div>
        
        <button
          onClick={() => removeFromCart(item.id)}
          className="ml-2 w-6 h-6 flex items-center justify-center text-muted-foreground hover:text-destructive transition-colors"
          aria-label="Remove item"
        >
          <TrashIcon size={16} />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
