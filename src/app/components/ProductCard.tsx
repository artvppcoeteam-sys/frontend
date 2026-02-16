import React from 'react';
import { Heart, ShoppingCart } from 'lucide-react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

export interface Product {
  id: string;
  title: string;
  artist: string;
  price: number;
  image: string;
  category?: string;
  isFeatured?: boolean;
  isNew?: boolean;
}

interface ProductCardProps {
  product: Product;
  onViewDetails?: (product: Product) => void;
  onAddToCart?: (product: Product) => void;
}

export function ProductCard({ product, onViewDetails, onAddToCart }: ProductCardProps) {
  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="group overflow-hidden transition-all hover:shadow-2xl cursor-pointer border-2 border-transparent hover:border-[#D4AF37]/30">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <motion.img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover"
            onClick={() => onViewDetails?.(product)}
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.4 }}
          />
          
          {/* Gradient overlay on hover */}
          <motion.div
            className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          />
          
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {product.isFeatured && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
              >
                <Badge className="bg-[#D4AF37] text-white">Featured</Badge>
              </motion.div>
            )}
            {product.isNew && (
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-[#8B4049] text-white">New</Badge>
              </motion.div>
            )}
          </div>

          {/* Action Buttons */}
          <motion.div 
            className="absolute top-3 right-3 flex flex-col gap-2"
            initial={{ x: 20, opacity: 0 }}
            whileHover={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg"
              >
                <Heart className="h-4 w-4" />
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                size="sm"
                variant="secondary"
                className="h-9 w-9 p-0 bg-white/90 hover:bg-white shadow-lg"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </motion.div>
          </motion.div>
        </div>

        <CardContent className="p-4" onClick={() => onViewDetails?.(product)}>
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">by {product.artist}</p>
            <h3 className="line-clamp-1 group-hover:text-[#D4AF37] transition-colors">{product.title}</h3>
            <div className="flex items-center justify-between pt-2">
              <p className="text-[#D4AF37] font-semibold">₹{product.price.toLocaleString('en-IN')}</p>
              {product.category && (
                <span className="text-xs text-muted-foreground bg-gray-100 px-2 py-1 rounded">{product.category}</span>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}