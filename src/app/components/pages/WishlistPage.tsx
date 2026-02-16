import { useState } from 'react';
import { Heart, ShoppingCart, Trash2, Eye, Share2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { motion, AnimatePresence } from 'motion/react';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

interface WishlistPageProps {
  onNavigate: (page: string, id?: string) => void;
}

const mockWishlistItems = [
  {
    id: '1',
    name: 'Abstract Wall Art',
    artist: 'Sarah Johnson',
    price: 12500,
    originalPrice: 15000,
    image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400',
    inStock: true,
    category: 'Paintings'
  },
  {
    id: '2',
    name: 'Modern Sculpture',
    artist: 'Michael Chen',
    price: 8900,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=400',
    inStock: true,
    category: 'Sculptures'
  },
  {
    id: '3',
    name: 'Canvas Print',
    artist: 'Emma Wilson',
    price: 4500,
    originalPrice: 6000,
    image: 'https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400',
    inStock: false,
    category: 'Prints'
  },
  {
    id: '4',
    name: 'Oil Painting',
    artist: 'David Kumar',
    price: 25000,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?w=400',
    inStock: true,
    category: 'Paintings'
  },
  {
    id: '5',
    name: 'Ceramic Vase',
    artist: 'Priya Sharma',
    price: 3200,
    originalPrice: 4000,
    image: 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?w=400',
    inStock: true,
    category: 'Ceramics'
  },
  {
    id: '6',
    name: 'Digital Art Print',
    artist: 'Alex Martinez',
    price: 1500,
    originalPrice: null,
    image: 'https://images.unsplash.com/photo-1547891654-e66ed7ebb968?w=400',
    inStock: true,
    category: 'Digital Art'
  }
];

export function WishlistPage({ onNavigate }: WishlistPageProps) {
  const { user, addToCart } = useApp();
  const [wishlistItems, setWishlistItems] = useState(mockWishlistItems);

  const handleRemoveFromWishlist = (id: string) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
    toast.success('Removed from wishlist');
  };

  const handleAddToCart = (item: typeof mockWishlistItems[0]) => {
    if (!item.inStock) {
      toast.error('This item is currently out of stock');
      return;
    }
    addToCart({
      id: item.id,
      title: item.name,
      price: item.price,
      image: item.image,
    });
    toast.success('Added to cart!');
  };

  const handleAddAllToCart = () => {
    const inStockItems = wishlistItems.filter(item => item.inStock);
    if (inStockItems.length === 0) {
      toast.error('No items in stock');
      return;
    }
    inStockItems.forEach(item => {
      addToCart({
        id: item.id,
        title: item.name,
        price: item.price,
        image: item.image,
      });
    });
    toast.success(`Added ${inStockItems.length} items to cart!`);
  };

  const handleShare = () => {
    toast.success('Wishlist link copied to clipboard!');
  };

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Card className="max-w-md w-full">
          <CardContent className="pt-6">
            <div className="text-center">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h2 className="text-2xl font-bold mb-2">Access Denied</h2>
              <p className="text-gray-600 mb-6">Please log in to view your wishlist</p>
              <Button onClick={() => onNavigate('login')} className="w-full bg-[#D4AF37] hover:bg-[#B8941F]">
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  const totalValue = wishlistItems.reduce((sum, item) => sum + item.price, 0);
  const totalSavings = wishlistItems.reduce((sum, item) =>
    sum + (item.originalPrice ? item.originalPrice - item.price : 0), 0
  );

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2 flex items-center gap-3">
                <Heart className="w-8 h-8 text-[#8B4049] fill-current" />
                My Wishlist
              </h1>
              <p className="text-gray-600">
                {wishlistItems.length} {wishlistItems.length === 1 ? 'item' : 'items'} saved
              </p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleShare} className="gap-2">
                <Share2 className="w-4 h-4" />
                Share
              </Button>
              <Button
                onClick={handleAddAllToCart}
                className="bg-[#D4AF37] hover:bg-[#B8941F] gap-2"
                disabled={wishlistItems.filter(item => item.inStock).length === 0}
              >
                <ShoppingCart className="w-4 h-4" />
                Add All to Cart
              </Button>
            </div>
          </div>
        </motion.div>

        {/* Stats */}
        {wishlistItems.length > 0 && (
          <div className="grid md:grid-cols-3 gap-4 mb-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Total Value</p>
                    <p className="text-2xl font-bold text-[#D4AF37]">
                      ₹{totalValue.toLocaleString('en-IN')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">Total Savings</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{totalSavings.toLocaleString('en-IN')}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <p className="text-sm text-gray-500 mb-1">In Stock</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {wishlistItems.filter(item => item.inStock).length}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        )}

        {/* Wishlist Items */}
        {wishlistItems.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center py-16"
          >
            <Card className="max-w-2xl mx-auto">
              <CardContent className="pt-12 pb-12">
                <Heart className="w-24 h-24 text-gray-300 mx-auto mb-6" />
                <h2 className="text-2xl font-bold text-gray-900 mb-4">Your Wishlist is Empty</h2>
                <p className="text-gray-600 mb-8">
                  Save your favorite items here to keep track of them
                </p>
                <Button onClick={() => onNavigate('shop')} className="bg-[#D4AF37] hover:bg-[#B8941F]">
                  Start Shopping
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            <AnimatePresence>
              {wishlistItems.map((item, index) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Card className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
                    <div className="relative">
                      {/* Image */}
                      <div className="relative overflow-hidden aspect-square">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                        {!item.inStock && (
                          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                            <Badge className="bg-red-600 text-white">Out of Stock</Badge>
                          </div>
                        )}
                        {item.originalPrice && (
                          <Badge className="absolute top-3 left-3 bg-green-600 text-white">
                            Save {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}%
                          </Badge>
                        )}

                        {/* Quick Actions Overlay */}
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                          <Button
                            size="sm"
                            variant="secondary"
                            className="gap-2"
                            onClick={() => onNavigate('product-detail', item.id)}
                          >
                            <Eye className="w-4 h-4" />
                            View
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleRemoveFromWishlist(item.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>

                      {/* Remove Button (visible on mobile) */}
                      <Button
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2 md:hidden w-8 h-8 p-0 bg-white/90 hover:bg-white"
                        onClick={() => handleRemoveFromWishlist(item.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>

                    <CardContent className="p-4">
                      {/* Category */}
                      <Badge variant="outline" className="mb-2">{item.category}</Badge>

                      {/* Title */}
                      <h3 className="font-semibold text-lg mb-1 line-clamp-1">{item.name}</h3>

                      {/* Artist */}
                      <p className="text-sm text-gray-600 mb-3">by {item.artist}</p>

                      {/* Price */}
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">
                          ₹{item.price.toLocaleString('en-IN')}
                        </span>
                        {item.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">
                            ₹{item.originalPrice.toLocaleString('en-IN')}
                          </span>
                        )}
                      </div>

                      {/* Add to Cart Button */}
                      <Button
                        className="w-full gap-2 bg-[#D4AF37] hover:bg-[#B8941F]"
                        onClick={() => handleAddToCart(item)}
                        disabled={!item.inStock}
                      >
                        <ShoppingCart className="w-4 h-4" />
                        {item.inStock ? 'Add to Cart' : 'Out of Stock'}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        )}

        {/* Continue Shopping */}
        {wishlistItems.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="mt-12 text-center"
          >
            <Card className="bg-gradient-to-r from-[#D4AF37]/10 to-[#8B4049]/10">
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-2">Looking for More?</h3>
                <p className="text-gray-600 mb-4">Discover more amazing art pieces</p>
                <Button onClick={() => onNavigate('shop')} variant="outline">
                  Continue Shopping
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </div>
    </div>
  );
}
