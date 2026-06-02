import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PIZZAS } from './data';
import { Pizza, CartItem, Order } from './types';

// Import our custom sub-components
import SplashSection from './components/SplashSection';
import Header from './components/Header';
import BottomNav from './components/BottomNav';
import HomeSection from './components/HomeSection';
import MenuSection from './components/MenuSection';
import DetailSection from './components/DetailSection';
import RewardsSection from './components/RewardsSection';
import CartSection from './components/CartSection';
import CheckoutSection from './components/CheckoutSection';
import TrackingSection from './components/TrackingSection';
import ProfileSection from './components/ProfileSection';

export default function App() {
  // Navigation & History Router State
  const [screen, setScreen] = useState<string>('splash');
  const [history, setHistory] = useState<string[]>(['home']);

  // Shared Application States
  const [selectedPizza, setSelectedPizza] = useState<Pizza | null>(null);
  const [userPoints, setUserPoints] = useState<number>(1250);
  const [userAddress, setUserAddress] = useState<string>('123 Via Roma, Apt 4B');
  const [activeCategory, setActiveCategory] = useState<'Clásicas' | 'Premium' | 'Acompañamientos' | 'Bebidas' | 'Postres'>('Premium');
  const [activeOrder, setActiveOrder] = useState<Order | null>(null);
  
  // Pre-initialize past orders to populate Profile History
  const [pastOrders, setPastOrders] = useState<Order[]>([
    {
      id: '4828',
      items: [
        {
          id: 'pre-1',
          pizza: PIZZAS.find(p => p.id === 'margherita-prime') || PIZZAS[0],
          quantity: 1,
          totalPrice: 14.50
        },
        {
          id: 'pre-2',
          pizza: PIZZAS.find(p => p.id === 'truffle-garlic-bread') || PIZZAS[9],
          quantity: 2,
          totalPrice: 11.00
        }
      ],
      subtotal: 25.50,
      deliveryFee: 2.50,
      pointsDiscount: 0,
      couponDiscount: 0,
      tax: 2.00,
      total: 30.00,
      deliveryType: 'delivery',
      address: '123 Via Roma, Apt 4B',
      instructions: 'Llamar al timbre dos veces',
      paymentMethod: 'visa',
      status: 'delivered',
      timestamp: 'Ayer, 20:30'
    }
  ]);

  // Pre-populate Cart with exact items from screenshots to make it spectacular and accurate
  const [cart, setCart] = useState<CartItem[]>([
    {
      id: 'prefilled-margherita',
      pizza: PIZZAS.find(p => p.id === 'margherita-prime') || PIZZAS[0],
      customization: {
        size: 'M',
        crust: 'Fina y Crujiente',
        extras: ['ext_queso']
      },
      quantity: 1,
      totalPrice: 18.50 // $18.50 from screenshot
    },
    {
      id: 'prefilled-truffle-mushroom',
      pizza: {
        id: 'truffle-mushroom',
        name: 'Truffle Mushroom',
        description: 'Base blanca con aceite de trufas rústico, queso de cabra derretido y champiñones silvestres.',
        price: 24.00,
        category: 'Premium',
        image: 'https://lh3.googleusercontent.com/aida-public/AB6AXuAM9fDD5E9Yk4UJdj3BvUieHDLOxgPrHP5KM78NJ_5Pf1qnmmk16LcIA-y3gvlpy_q_xBR-cxdrVJIv1T-Q49zxPMLRF1whgo8qrEmV8AHiuON_Bpad1F82zUo71zKPQCIDk6GHzvDIGf8PK6Te2M9ShM4RKCFdglNMokfM4v08M7CsfzN4AnyCzKHW7tXDPX90_btc3QTNBXoJnDrhxtzyKPuEObqI0Uy_ILKHcjD2fBCsIFy7feLZJFazoufbPCUFJGxi914GLvrX'
      },
      customization: {
        size: 'M',
        crust: 'Tradicional',
        extras: []
      },
      quantity: 1,
      totalPrice: 24.00 // $24.00 from screenshot
    }
  ]);

  // Points tracking for checkout state synchronization
  const [pointsDiscountApplied, setPointsDiscountApplied] = useState(false);
  const [couponCodeApplied, setCouponCodeApplied] = useState('');

  // Custom Router Navigation Procedures
  const navigateTo = (newScreen: string) => {
    // If navigating to main navigation views, reset the history chain
    if (['home', 'menu', 'rewards', 'profile'].includes(newScreen)) {
      setHistory(['home', newScreen]);
    } else {
      setHistory((prev) => [...prev, newScreen]);
    }
    setScreen(newScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length <= 1) {
      setScreen('home');
      setHistory(['home']);
      return;
    }
    const newHistory = [...history];
    newHistory.pop(); // Remove current screen
    const targetScreen = newHistory[newHistory.length - 1];
    setHistory(newHistory);
    setScreen(targetScreen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Direct Selection Actions
  const handleSelectPizzaForDetails = (pizza: Pizza) => {
    setSelectedPizza(pizza);
    navigateTo('detail');
  };

  const handleSelectCategoryFromHome = (category: typeof activeCategory) => {
    setActiveCategory(category);
  };

  // Cart operations
  const handleAddToCartDirectly = (pizza: Pizza) => {
    // Add default configuration: Mediana, Tradicional, no extras
    setCart((prevCart) => {
      const existing = prevCart.find(
        (item) => item.pizza.id === pizza.id && !item.customization
      );
      if (existing) {
        return prevCart.map((item) =>
          item.id === existing.id 
            ? { ...item, quantity: item.quantity + 1, totalPrice: item.totalPrice + pizza.price }
            : item
        );
      } else {
        const newItem: CartItem = {
          id: `${pizza.id}-default-${Date.now()}`,
          pizza,
          quantity: 1,
          totalPrice: pizza.price
        };
        return [...prevCart, newItem];
      }
    });
    alert(`¡"${pizza.name}" añadida al carrito con éxito!`);
  };

  const handleAddToCartWithCustomizations = (item: CartItem) => {
    setCart((prevCart) => [...prevCart, item]);
    alert(`¡"${item.pizza.name}" personalizada añadida al carrito!`);
    navigateTo('cart');
  };

  const handleUpdateCartQty = (itemId: string, increment: boolean) => {
    setCart((prevCart) => {
      return prevCart.map((item) => {
        if (item.id === itemId) {
          const newQty = increment ? item.quantity + 1 : item.quantity - 1;
          if (newQty < 1) return item; // limit to min Qty 1

          const itemPriceUnit = item.totalPrice / item.quantity;
          return {
            ...item,
            quantity: newQty,
            totalPrice: itemPriceUnit * newQty
          };
        }
        return item;
      });
    });
  };

  const handleRemoveCartItem = (itemId: string) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  // Loyalty Points Redemptions (Spend Points)
  const handleRedeemPoints = (rewardId: string, cost: number, rewardLabel: string) => {
    if (userPoints < cost) {
      alert("No tienes suficientes puntos para realizar este canje.");
      return;
    }
    setUserPoints((prev) => prev - cost);
    alert(`¡Recompensa "${rewardLabel}" canjeada con éxito! Te costó ${cost} puntos.`);
  };

  // Triggers checkout screen transition with discounts pre-locked
  const handleProceedToCheckout = (applyPoints: boolean, coupon: string) => {
    setPointsDiscountApplied(applyPoints);
    setCouponCodeApplied(coupon);
    navigateTo('checkout');
  };

  // Place Order confirmation
  const handleConfirmOrder = (orderData: {
    deliveryType: 'delivery' | 'pickup';
    address: string;
    instructions: string;
    paymentMethod: 'visa' | 'mastercard';
    total: number;
  }) => {
    
    const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const pointsDiscount = pointsDiscountApplied ? 5.00 : 0.00;
    
    let couponDiscount = 0;
    if (couponCodeApplied.toUpperCase() === 'PRIME20') {
      couponDiscount = subtotal * 0.20;
    }

    const newOrder: Order = {
      id: Math.floor(1000 + Math.random() * 9000).toString(),
      items: [...cart],
      subtotal,
      deliveryFee: orderData.deliveryType === 'delivery' ? 3.50 : 0.00,
      pointsDiscount,
      couponDiscount,
      tax: 2.00,
      total: orderData.total,
      deliveryType: orderData.deliveryType,
      address: orderData.address,
      instructions: orderData.instructions,
      paymentMethod: orderData.paymentMethod,
      status: 'preparing', // Start on preparation
      timestamp: 'Hoy, ' + new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    // Update orders history list
    setPastOrders((prev) => [newOrder, ...prev]);
    setActiveOrder(newOrder);

    // If points discount applied, deduct 400 points from the gold user
    if (pointsDiscountApplied) {
      setUserPoints((prev) => Math.max(0, prev - 400));
    } else {
      // Add points for purchase! E.g. $1 spent = 5 points!
      const pointsEarned = Math.floor(newOrder.total * 5);
      setUserPoints((prev) => prev + pointsEarned);
    }

    // Flush active cart
    setCart([]);
    setPointsDiscountApplied(false);
    setCouponCodeApplied('');

    navigateTo('tracking');
    alert("¡Pedido realizado con éxito! Tu pizza se está horneando.");
  };

  // Header dynamic properties calculation
  const totalCartItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  const calculateSubtotal = () => cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const subtotalForCheckout = calculateSubtotal();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans select-none">
      
      {/* Dynamic Header Component */}
      <Header 
        currentScreen={screen}
        cartCount={totalCartItems}
        onNavigate={navigateTo}
        onGoBack={goBack}
        userAddress={userAddress}
        onSelectAddress={() => {
          const newAddr = prompt("Por favor ingresa tu nueva dirección de entrega:", userAddress);
          if (newAddr && newAddr.trim() !== '') {
            setUserAddress(newAddr);
          }
        }}
      />

      {/* Main viewport Container */}
      <main className="flex-1 w-full max-w-[1440px] mx-auto px-4 md:px-8 pt-20 pb-28 md:pb-12 h-full z-10">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.2 }}
            className="w-full h-full"
          >
            {screen === 'splash' && (
              <SplashSection onConfirm={() => navigateTo('home')} />
            )}

            {screen === 'home' && (
              <HomeSection 
                onNavigate={navigateTo}
                onSelectCategory={handleSelectCategoryFromHome}
                onAddToCartDirectly={handleAddToCartDirectly}
                onSelectPizza={handleSelectPizzaForDetails}
              />
            )}

            {screen === 'menu' && (
              <MenuSection 
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
                onSelectPizza={handleSelectPizzaForDetails}
              />
            )}

            {screen === 'detail' && selectedPizza && (
              <DetailSection 
                pizza={selectedPizza}
                onGoBack={goBack}
                onAddToCart={handleAddToCartWithCustomizations}
              />
            )}

            {screen === 'rewards' && (
              <RewardsSection 
                userPoints={userPoints}
                onRedeemPoints={handleRedeemPoints}
              />
            )}

            {screen === 'cart' && (
              <CartSection 
                cartItems={cart}
                onUpdateQty={handleUpdateCartQty}
                onRemoveItem={handleRemoveCartItem}
                onProceedToCheckout={handleProceedToCheckout}
              />
            )}

            {screen === 'checkout' && (
              <CheckoutSection 
                cartItems={cart}
                subtotal={subtotalForCheckout}
                pointsDiscount={pointsDiscountApplied ? 5.00 : 0.00}
                couponDiscount={couponCodeApplied.toUpperCase() === 'PRIME20' ? subtotalForCheckout * 0.20 : 0.00}
                userAddress={userAddress}
                onUpdateAddress={setUserAddress}
                onConfirmOrder={handleConfirmOrder}
              />
            )}

            {screen === 'tracking' && (
              <TrackingSection 
                order={activeOrder}
                onGoBack={() => navigateTo('home')}
              />
            )}

            {screen === 'profile' && (
              <ProfileSection 
                userAddress={userAddress}
                onUpdateAddress={setUserAddress}
                pastOrders={pastOrders}
              />
            )}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Bottom Navigation Menu */}
      <BottomNav 
        currentScreen={screen}
        onNavigate={navigateTo}
      />

    </div>
  );
}
