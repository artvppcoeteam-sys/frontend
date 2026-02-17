import React, { createContext, useContext, useState, useEffect } from 'react';

export interface CartItem {
  id: string;
  title: string;
  price: number;
  image: string;
  quantity: number;
  size?: string;
  format?: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  avatar?: string;
}

export interface CheckoutState {
  shippingInfo: {
    fullName: string;
    email: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: string;
}

export interface Order {
  id: string;
  date: string;
  items: CartItem[];
  total: number;
  status: 'Placed' | 'Processing' | 'Shipped' | 'Delivered' | 'Cancelled';
  shippingInfo: CheckoutState['shippingInfo'];
  paymentMethod: string;
  deliveryDate: string;
}

interface AppContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (item: Omit<CartItem, 'quantity'>) => void;
  removeFromCart: (id: string) => void;
  updateCartQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  cartCount: number;
  cartTotal: number;
  loginAsCustomer: () => void;
  loginAsVendor: () => void;
  loginAsAdmin: () => void;
  checkoutState: CheckoutState;
  updateCheckoutState: (updates: Partial<CheckoutState>) => void;
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'date' | 'status' | 'deliveryDate'>) => void;
  loginWithGoogle: () => void;
}

// Create context with a default value that will be overridden by the provider
const defaultContextValue: AppContextType = {
  user: null,
  setUser: () => { },
  logout: () => { },
  cart: [],
  addToCart: () => { },
  removeFromCart: () => { },
  updateCartQuantity: () => { },
  clearCart: () => { },
  cartCount: 0,
  cartTotal: 0,
  loginAsCustomer: () => { },
  loginAsVendor: () => { },
  loginAsAdmin: () => { },
  checkoutState: {
    shippingInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    paymentMethod: 'razorpay'
  },
  updateCheckoutState: () => { },
  orders: [],
  addOrder: () => { },
  loginWithGoogle: () => { }
};

const AppContext = createContext<AppContextType>(defaultContextValue);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>({
    id: 'dummy-user-123',
    name: 'Artvpp User',
    email: 'user@artvpp.com',
    role: 'customer',
    avatar: 'https://github.com/shadcn.png'
  });
  const [cart, setCart] = useState<CartItem[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart and orders from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('artvpp-cart');
      if (savedCart) {
        setCart(JSON.parse(savedCart));
      }
      const savedOrders = localStorage.getItem('artvpp-orders');
      if (savedOrders) {
        setOrders(JSON.parse(savedOrders));
      }
    } catch (error) {
      console.error('Error loading data from localStorage:', error);
    }
    setIsLoaded(true);
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('artvpp-cart', JSON.stringify(cart));
    } catch (error) {
      console.error('Error saving cart to localStorage:', error);
    }
  }, [cart]);

  // Save orders to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('artvpp-orders', JSON.stringify(orders));
    } catch (error) {
      console.error('Error saving orders to localStorage:', error);
    }
  }, [orders]);

  const addToCart = (item: Omit<CartItem, 'quantity'>) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(i =>
        i.id === item.id && i.size === item.size && i.format === item.format
      );

      if (existingItem) {
        return prevCart.map(i =>
          i.id === item.id && i.size === item.size && i.format === item.format
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string) => {
    setCart(prevCart => prevCart.filter(item => item.id !== id));
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const addOrder = (orderData: Omit<Order, 'id' | 'date' | 'status' | 'deliveryDate'>) => {
    const newOrder: Order = {
      ...orderData,
      id: `ORD-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      status: 'Placed',
      deliveryDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) // 7 days from now
    };
    setOrders(prev => [newOrder, ...prev]);
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartTotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  const loginAsCustomer = () => {
    setUser({
      id: 'customer-123',
      name: 'John Doe',
      email: 'john@example.com',
      role: 'customer',
      avatar: 'https://github.com/shadcn.png'
    });
  };

  const loginAsVendor = () => {
    setUser({
      id: 'vendor-456',
      name: 'Artist A',
      email: 'artist@artvpp.com',
      role: 'vendor',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100'
    });
  };

  const loginAsAdmin = () => {
    setUser({
      id: 'admin-789',
      name: 'Dr. Satyamangal Rege',
      email: 'admin@artvpp.com',
      role: 'admin',
      avatar: 'https://github.com/shadcn.png'
    });
  };

  const loginWithGoogle = () => {
    // Mock Google Login
    setUser({
      id: 'google-user-123',
      name: 'Google User',
      email: 'google.user@gmail.com',
      role: 'customer',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq8d9x7_tO_wZ3y4F_u_v8Z9x7_tO_wZ3y4F_u_v8Z=s96-c'
    });
    // Store in local storage to persist
    localStorage.setItem('artvpp-user', JSON.stringify({
      id: 'google-user-123',
      name: 'Google User',
      email: 'google.user@gmail.com',
      role: 'customer',
      avatar: 'https://lh3.googleusercontent.com/a/ACg8ocIq8d9x7_tO_wZ3y4F_u_v8Z9x7_tO_wZ3y4F_u_v8Z=s96-c'
    }));
  };

  const logout = () => {
    setUser(null);
  };

  // Checkout State
  const [checkoutState, setCheckoutState] = useState({
    shippingInfo: {
      fullName: '',
      email: '',
      phone: '',
      address: '',
      city: '',
      state: '',
      pincode: ''
    },
    paymentMethod: 'razorpay'
  });

  const updateCheckoutState = (updates: Partial<typeof checkoutState>) => {
    setCheckoutState(prev => ({ ...prev, ...updates }));
  };

  return (
    <AppContext.Provider value={{
      user,
      setUser,
      logout,
      loginAsCustomer,
      loginAsVendor,
      loginAsAdmin,
      cart,
      addToCart,
      removeFromCart,
      updateCartQuantity,
      clearCart,
      cartCount,
      cartTotal,
      checkoutState,
      updateCheckoutState,
      orders,
      addOrder,
      loginWithGoogle
    }}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (context === undefined) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}