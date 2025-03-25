
import { CartItem, Product } from './api';

// LocalStorage keys
const CART_STORAGE_KEY = 'shop_cart_items';
const WISHLIST_STORAGE_KEY = 'shop_wishlist_items';

// Cart Storage
export const getCart = (): CartItem[] => {
  try {
    const cartData = localStorage.getItem(CART_STORAGE_KEY);
    return cartData ? JSON.parse(cartData) : [];
  } catch (error) {
    console.error('Error retrieving cart from storage:', error);
    return [];
  }
};

export const saveCart = (cart: CartItem[]): void => {
  try {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
  } catch (error) {
    console.error('Error saving cart to storage:', error);
  }
};

export const addToCart = (product: Product, quantity: number = 1): CartItem[] => {
  const cart = getCart();
  const existingItemIndex = cart.findIndex(item => item.id === product.id);

  if (existingItemIndex >= 0) {
    // Update quantity of existing item
    cart[existingItemIndex].quantity += quantity;
  } else {
    // Add new item to cart
    cart.push({ ...product, quantity });
  }

  saveCart(cart);
  return cart;
};

export const removeFromCart = (productId: number): CartItem[] => {
  const cart = getCart();
  const updatedCart = cart.filter(item => item.id !== productId);
  saveCart(updatedCart);
  return updatedCart;
};

export const updateCartItemQuantity = (productId: number, quantity: number): CartItem[] => {
  const cart = getCart();
  const updatedCart = cart.map(item => 
    item.id === productId ? { ...item, quantity: Math.max(1, quantity) } : item
  );
  saveCart(updatedCart);
  return updatedCart;
};

export const clearCart = (): void => {
  localStorage.removeItem(CART_STORAGE_KEY);
};

// Wishlist Storage
export const getWishlist = (): Product[] => {
  try {
    const wishlistData = localStorage.getItem(WISHLIST_STORAGE_KEY);
    return wishlistData ? JSON.parse(wishlistData) : [];
  } catch (error) {
    console.error('Error retrieving wishlist from storage:', error);
    return [];
  }
};

export const saveWishlist = (wishlist: Product[]): void => {
  try {
    localStorage.setItem(WISHLIST_STORAGE_KEY, JSON.stringify(wishlist));
  } catch (error) {
    console.error('Error saving wishlist to storage:', error);
  }
};

export const addToWishlist = (product: Product): Product[] => {
  const wishlist = getWishlist();
  if (!wishlist.some(item => item.id === product.id)) {
    wishlist.push(product);
    saveWishlist(wishlist);
  }
  return wishlist;
};

export const removeFromWishlist = (productId: number): Product[] => {
  const wishlist = getWishlist();
  const updatedWishlist = wishlist.filter(item => item.id !== productId);
  saveWishlist(updatedWishlist);
  return updatedWishlist;
};

export const isInWishlist = (productId: number): boolean => {
  const wishlist = getWishlist();
  return wishlist.some(item => item.id === productId);
};

export const clearWishlist = (): void => {
  localStorage.removeItem(WISHLIST_STORAGE_KEY);
};
