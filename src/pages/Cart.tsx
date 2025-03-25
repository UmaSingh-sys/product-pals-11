
import React from 'react';
import { useNavigate } from 'react-router-dom';
import Layout from '@/components/Layout';
import { useShop } from '@/context/ShopContext';
import CartItem from '@/components/CartItem';
import { ShoppingCartIcon, ArrowRightIcon } from 'lucide-react';
import { toast } from "sonner";

const Cart = () => {
  const navigate = useNavigate();
  const { cart, cartTotal, clearCart } = useShop();

  const handleCheckout = () => {
    toast.success("Order placed successfully!");
    clearCart();
    navigate('/');
  };

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="container px-4 py-16 mx-auto max-w-2xl">
          <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
          
          <div className="bg-white rounded-xl border border-border p-8 text-center">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-secondary flex items-center justify-center">
              <ShoppingCartIcon size={24} className="text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium mb-2">Your cart is empty</h2>
            <p className="text-muted-foreground mb-6">
              Looks like you haven't added anything to your cart yet.
            </p>
            <button
              onClick={() => navigate('/')}
              className="bg-primary text-primary-foreground px-4 py-2 rounded-md inline-flex items-center"
            >
              Start Shopping
            </button>
          </div>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="container px-4 py-8 mx-auto max-w-4xl">
        <h1 className="text-2xl font-semibold mb-8">Shopping Cart</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="md:col-span-2">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="font-medium">Items ({cart.length})</h2>
                  <button
                    onClick={clearCart}
                    className="text-sm text-muted-foreground hover:text-destructive transition-colors"
                  >
                    Clear Cart
                  </button>
                </div>
                
                <div className="divide-y divide-border">
                  {cart.map(item => (
                    <CartItem key={item.id} item={item} />
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          {/* Order Summary */}
          <div className="md:col-span-1">
            <div className="bg-white rounded-xl border border-border overflow-hidden">
              <div className="p-6">
                <h2 className="font-medium mb-4">Order Summary</h2>
                
                <div className="space-y-4 mb-6">
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>Free</span>
                  </div>
                  <div className="pt-4 border-t border-border flex items-center justify-between font-medium">
                    <span>Total</span>
                    <span>${cartTotal.toFixed(2)}</span>
                  </div>
                </div>
                
                <button
                  onClick={handleCheckout}
                  className="w-full bg-primary text-primary-foreground rounded-md py-3 font-medium transition-all duration-200 hover:opacity-90 flex items-center justify-center gap-2"
                >
                  Checkout
                  <ArrowRightIcon size={16} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
