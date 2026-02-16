import { Trash2, ShoppingCart, Heart } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { toast } from 'sonner';
import { useState } from 'react';
import { useApp } from '../../context/AppContext';

export function MyWishlist() {
    const { addToCart } = useApp();
    const [items, setItems] = useState([
        {
            id: 1,
            title: 'Abstract Harmony Canvas',
            price: 12000,
            originalPrice: 15000,
            image: 'https://images.unsplash.com/photo-1549887552-93f8efb873a4?w=500&q=80',
            inStock: true
        },
        {
            id: 2,
            title: 'Golden Sunrise Print',
            price: 8500,
            originalPrice: 10000,
            image: 'https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80',
            inStock: true
        },
        {
            id: 3,
            title: 'Geometric Blue Art',
            price: 5000,
            originalPrice: 6500,
            image: 'https://images.unsplash.com/photo-1550684848-fac1c5b4e853?w=500&q=80',
            inStock: false
        }
    ]);

    const handleRemove = (id: number) => {
        setItems(items.filter(i => i.id !== id));
        toast.success('Removed from wishlist');
    };

    const handleAddToCart = (item: any) => {
        if (!item.inStock) {
            toast.error('Item is out of stock');
            return;
        }
        addToCart({
            id: item.id,
            title: item.title,
            price: item.price,
            image: item.image,
        });
        toast.success('Item added to cart');
    };

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Wishlist ({items.length})</h2>

            {items.length === 0 ? (
                <div className="text-center py-16 bg-white rounded-lg border border-dashed">
                    <Heart className="w-16 h-16 text-gray-200 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Your wishlist is empty</h3>
                    <p className="text-gray-500 mb-6">Save items you want to buy later</p>
                    <Button>Start Shopping</Button>
                </div>
            ) : (
                <div className="space-y-4">
                    {items.map((item) => (
                        <Card key={item.id} className="overflow-hidden group hover:shadow-md transition-shadow">
                            <CardContent className="p-4 flex gap-4">
                                <div className="w-24 h-24 bg-gray-100 rounded-md overflow-hidden shrink-0">
                                    <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300" />
                                </div>
                                <div className="flex-1 flex flex-col justify-between">
                                    <div>
                                        <div className="flex justify-between items-start">
                                            <h3 className="font-semibold text-gray-900 line-clamp-1">{item.title}</h3>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-red-500 hover:bg-red-50"
                                                onClick={() => handleRemove(item.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="font-bold text-gray-900">₹{item.price.toLocaleString()}</span>
                                            <span className="text-sm text-gray-500 line-through">₹{item.originalPrice.toLocaleString()}</span>
                                            <span className="text-xs text-green-600 font-medium">
                                                {Math.round(((item.originalPrice - item.price) / item.originalPrice) * 100)}% OFF
                                            </span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between mt-2">
                                        {item.inStock ? (
                                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50">In Stock</Badge>
                                        ) : (
                                            <Badge variant="outline" className="text-red-600 border-red-200 bg-red-50">Out of Stock</Badge>
                                        )}
                                        <Button
                                            size="sm"
                                            className="gap-2 bg-[#D4AF37] hover:bg-[#B8941F]"
                                            disabled={!item.inStock}
                                            onClick={() => handleAddToCart(item)}
                                        >
                                            <ShoppingCart className="w-4 h-4" /> Add to Cart
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </div>
    );
}
