
import React, { createContext, useContext, useEffect, useState } from 'react';
import { CartItem, Product } from '@/services/api';
import { 
  getCart, saveCart, addToCart as addToCartStorage, 
  removeFromCart as removeFromCartStorage, updateCartItemQuantity,
  getWishlist, saveWishlist, addToWishlist as addToWishlistStorage,
  removeFromWishlist as removeFromWishlistStorage
} from '@/services/storage';
import { toast } from "sonner";

interface ShopContextProps {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
  addToWishlist: (product: Product) => void;
  removeFromWishlist: (productId: number) => void;
  isInWishlist: (productId: number) => boolean;
  clearWishlist: () => void;
}

const ShopContext = createContext<ShopContextProps>({
  cart: [],
  wishlist: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  cartTotal: 0,
  cartCount: 0,
  addToWishlist: () => {},
  removeFromWishlist: () => {},
  isInWishlist: () => false,
  clearWishlist: () => {},
});

export const useShop = () => useContext(ShopContext);

export const ShopProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Load cart and wishlist from localStorage on mount
  useEffect(() => {
    setCart(getCart());
    setWishlist(getWishlist());
  }, []);

  // Calculate cart total
  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate cart item count
  const cartCount = cart.reduce((count, item) => count + item.quantity, 0);

  // Add to cart
  const addToCart = (product: Product, quantity: number = 1) => {
    const updatedCart = addToCartStorage(product, quantity);
    setCart(updatedCart);
    toast.success(`${product.title.substring(0, 20)}... added to cart`);
  };

  // Remove from cart
  const removeFromCart = (productId: number) => {
    const updatedCart = removeFromCartStorage(productId);
    setCart(updatedCart);
    toast.info("Item removed from cart");
  };

  // Update quantity
  const updateQuantity = (productId: number, quantity: number) => {
    const updatedCart = updateCartItemQuantity(productId, quantity);
    setCart(updatedCart);
  };

  // Clear cart
  const clearCart = () => {
    localStorage.removeItem('shop_cart_items');
    setCart([]);
    toast.info("Cart cleared");
  };

  // Add to wishlist
  const addToWishlist = (product: Product) => {
    const isAlreadyInWishlist = wishlist.some(item => item.id === product.id);
    
    if (isAlreadyInWishlist) {
      const updatedWishlist = removeFromWishlistStorage(product.id);
      setWishlist(updatedWishlist);
      toast.info(`${product.title.substring(0, 20)}... removed from wishlist`);
    } else {
      const updatedWishlist = addToWishlistStorage(product);
      setWishlist(updatedWishlist);
      toast.success(`${product.title.substring(0, 20)}... added to wishlist`);
    }
  };

  // Remove from wishlist
  const removeFromWishlist = (productId: number) => {
    const updatedWishlist = removeFromWishlistStorage(productId);
    setWishlist(updatedWishlist);
    toast.info("Item removed from wishlist");
  };

  // Check if item is in wishlist
  const isInWishlist = (productId: number) => {
    return wishlist.some(item => item.id === productId);
  };

  // Clear wishlist
  const clearWishlist = () => {
    localStorage.removeItem('shop_wishlist_items');
    setWishlist([]);
    toast.info("Wishlist cleared");
  };

  return (
    <ShopContext.Provider 
      value={{ 
        cart, 
        wishlist,
        addToCart, 
        removeFromCart, 
        updateQuantity, 
        clearCart, 
        cartTotal, 
        cartCount,
        addToWishlist,
        removeFromWishlist,
        isInWishlist,
        clearWishlist
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};
