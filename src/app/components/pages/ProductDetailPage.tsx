import { useState } from 'react';
import { ChevronRight, Heart, Share2, Star, ZoomIn, ShoppingBag, Info, Truck, Shield, ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Separator } from '../ui/separator';
import { useApp } from '../../context/AppContext';
import { allProducts } from '../../data/mockData';
import { toast } from 'sonner';
import { motion } from 'motion/react';

interface ProductDetailPageProps {
  productId: string | null;
  onNavigate: (page: string, productId?: string) => void;
}

export function ProductDetailPage({ productId, onNavigate }: ProductDetailPageProps) {
  const { addToCart } = useApp();
  const [selectedImage, setSelectedImage] = useState(0);
  const [selectedSize, setSelectedSize] = useState('original');
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(false);

  const product = allProducts.find(p => p.id === productId);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h2 className="text-3xl font-light mb-6">Artwork not found</h2>
          <Button onClick={() => onNavigate('shop')} className="bg-gray-900 text-white hover:bg-gray-800">
            Back to Collection
          </Button>
        </div>
      </div>
    );
  }

  const images = [product.image, product.image, product.image];

  const handleAddToCart = () => {
    addToCart({
      id: `${product.id}-${selectedSize}`,
      title: product.title,
      price: product.price,
      image: product.image,
      size: selectedSize,
    });
    toast.success('Added to cart!');
  };

  const reviews = [
    { id: 1, author: 'Priya Sharma', rating: 5, date: 'January 28, 2026', comment: 'Absolutely stunning artwork! The colors are even more vibrant in person. The quality exceeded my expectations.' },
    { id: 2, author: 'Amit Kumar', rating: 5, date: 'January 15, 2026', comment: 'High quality and beautifully packaged. Very satisfied with my purchase. Will definitely buy again.' },
    { id: 3, author: 'Sneha Reddy', rating: 4, date: 'January 10, 2026', comment: 'Lovely piece that fits perfectly in my living room. Shipping took a bit longer than expected but worth the wait.' },
  ];

  const relatedProducts = allProducts.filter(p => p.id !== product.id).slice(0, 4);

  return (
    <div className="min-h-screen bg-white">
      {/* Back Button */}
      <div className="bg-gray-50 border-b py-4">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <Button
            variant="ghost"
            onClick={() => onNavigate('shop')}
            className="font-light hover:text-[#D4AF37]"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Collection
          </Button>
        </div>
      </div>

      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Breadcrumbs */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-8 font-light">
          <button onClick={() => onNavigate('home')} className="hover:text-[#D4AF37] transition-colors">
            Home
          </button>
          <ChevronRight className="w-4 h-4" />
          <button onClick={() => onNavigate('shop')} className="hover:text-[#D4AF37] transition-colors">
            Collection
          </button>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{product.title}</span>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 mb-20">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Main Image */}
            <div className="aspect-[3/4] bg-gray-100 overflow-hidden mb-6 relative group sticky top-24">
              <img
                src={images[selectedImage]}
                alt={product.title}
                className="w-full h-full object-cover"
              />

              {/* Wishlist Button */}
              <button
                onClick={() => {
                  setIsWishlisted(!isWishlisted);
                  toast.success(isWishlisted ? 'Removed from wishlist' : 'Added to wishlist');
                }}
                className="absolute top-6 right-6 bg-white rounded-full p-4 shadow-lg hover:bg-gray-100 transition-colors"
              >
                <Heart className={`w-6 h-6 ${isWishlisted ? 'fill-red-500 text-red-500' : 'text-gray-900'}`} />
              </button>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-3 gap-4">
              {images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square overflow-hidden bg-gray-100 border-2 transition-all ${selectedImage === index ? 'border-gray-900' : 'border-transparent hover:border-gray-300'
                    }`}
                >
                  <img src={image} alt={`View ${index + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            {/* Artist & Category */}
            <div className="mb-6">
              <p className="text-sm text-gray-600 font-light mb-1">by</p>
              <h2 className="text-xl font-medium text-[#D4AF37] mb-4">{product.artist}</h2>
              <Badge variant="secondary" className="bg-gray-100 text-gray-700">
                {product.category}
              </Badge>
            </div>

            {/* Title */}
            <h1 className="text-4xl lg:text-5xl font-light mb-6 text-gray-900 tracking-tight">
              {product.title}
            </h1>

            {/* Rating */}
            <div className="flex items-center gap-3 mb-8">
              <div className="flex gap-1">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                ))}
              </div>
              <span className="text-sm text-gray-600 font-light">4.8 (127 reviews)</span>
            </div>

            {/* Price */}
            <div className="mb-10">
              <div className="text-5xl font-light text-gray-900 mb-2">
                ₹{product.price.toLocaleString()}
              </div>
              <p className="text-sm text-gray-600 font-light">Inclusive of all taxes</p>
            </div>

            <Separator className="my-8" />

            {/* Details */}
            <div className="space-y-6 mb-10">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-gray-600 font-light mb-1">Medium</p>
                  <p className="text-gray-900 font-medium">{product.medium}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 font-light mb-1">Dimensions</p>
                  <p className="text-gray-900 font-medium">{product.dimensions}</p>
                </div>
              </div>
            </div>

            {/* Size/Type Selection */}
            {product.category === 'Prints & Merchandise' && (
              <div className="mb-8">
                <label className="text-sm font-medium text-gray-900 mb-3 block">Select Size</label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full rounded-none">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="small">Small - 12" × 18" (₹{(product.price * 0.5).toLocaleString()})</SelectItem>
                    <SelectItem value="medium">Medium - 18" × 24" (₹{(product.price * 0.75).toLocaleString()})</SelectItem>
                    <SelectItem value="original">Original Size - {product.dimensions}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Quantity */}
            <div className="mb-10">
              <label className="text-sm font-medium text-gray-900 mb-3 block">Quantity</label>
              <div className="flex items-center gap-4">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-10 h-10 rounded-none"
                >
                  -
                </Button>
                <span className="text-lg font-medium w-12 text-center">{quantity}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-10 h-10 rounded-none"
                >
                  +
                </Button>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="space-y-4 mb-10">
              <Button
                size="lg"
                onClick={handleAddToCart}
                className="w-full bg-[#D4AF37] hover:bg-[#C19B2A] text-white py-7 text-lg rounded-none font-medium tracking-wide"
              >
                <ShoppingBag className="mr-3 h-5 w-5" />
                ADD TO CART
              </Button>

              <Button
                size="lg"
                variant="outline"
                onClick={() => {
                  handleAddToCart();
                  onNavigate('checkout');
                }}
                className="w-full border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white py-7 text-lg rounded-none font-medium tracking-wide"
              >
                BUY NOW
              </Button>
            </div>

            {/* Features */}
            <div className="grid grid-cols-3 gap-6 border-t border-b py-8">
              <div className="text-center">
                <Shield className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-light text-gray-600">Authenticity<br />Guaranteed</p>
              </div>
              <div className="text-center">
                <Truck className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-light text-gray-600">Free Shipping<br />Nationwide</p>
              </div>
              <div className="text-center">
                <Info className="w-8 h-8 mx-auto mb-2 text-gray-600" />
                <p className="text-xs font-light text-gray-600">30-Day<br />Returns</p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="max-w-[1200px] mx-auto mb-20">
          <Tabs defaultValue="description" className="w-full">
            <TabsList className="w-full justify-start border-b rounded-none bg-transparent h-auto p-0">
              <TabsTrigger
                value="description"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-8 py-4 text-base"
              >
                Description
              </TabsTrigger>
              <TabsTrigger
                value="details"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-8 py-4 text-base"
              >
                Details
              </TabsTrigger>
              <TabsTrigger
                value="reviews"
                className="rounded-none data-[state=active]:border-b-2 data-[state=active]:border-gray-900 px-8 py-4 text-base"
              >
                Reviews ({reviews.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="py-10">
              <div className="prose max-w-none">
                <p className="text-lg text-gray-700 font-light leading-relaxed">
                  This exquisite piece showcases the artist's masterful technique and unique vision.
                  Created with meticulous attention to detail, each brushstroke tells a story and invites
                  the viewer into a world of color and emotion.
                </p>
                <p className="text-lg text-gray-700 font-light leading-relaxed mt-4">
                  The artwork has been carefully crafted using premium materials to ensure longevity
                  and vibrancy. It comes with a certificate of authenticity signed by the artist.
                </p>
              </div>
            </TabsContent>

            <TabsContent value="details" className="py-10">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Artist</p>
                    <p className="text-gray-900 font-medium">{product.artist}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Medium</p>
                    <p className="text-gray-900 font-medium">{product.medium}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Dimensions</p>
                    <p className="text-gray-900 font-medium">{product.dimensions}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Category</p>
                    <p className="text-gray-900 font-medium">{product.category}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Year</p>
                    <p className="text-gray-900 font-medium">2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600 font-light mb-1">Edition</p>
                    <p className="text-gray-900 font-medium">Original / Unique</p>
                  </div>
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="py-10">
              <div className="space-y-8">
                {reviews.map((review) => (
                  <Card key={review.id} className="border-0 shadow-sm">
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <div className="flex gap-1 mb-2">
                            {[...Array(review.rating)].map((_, i) => (
                              <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                            ))}
                          </div>
                          <h4 className="font-medium text-gray-900">{review.author}</h4>
                        </div>
                        <span className="text-sm text-gray-500 font-light">{review.date}</span>
                      </div>
                      <p className="text-gray-700 font-light leading-relaxed">{review.comment}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Related Products */}
        <div className="border-t pt-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-light tracking-tight text-gray-900 mb-4">
              You May Also Like
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {relatedProducts.map((relatedProduct) => (
              <motion.div
                key={relatedProduct.id}
                whileHover={{ y: -8 }}
                onClick={() => onNavigate('product-detail', relatedProduct.id)}
                className="group cursor-pointer"
              >
                <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4">
                  <img
                    src={relatedProduct.image}
                    alt={relatedProduct.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <h3 className="text-lg font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors mb-1">
                  {relatedProduct.title}
                </h3>
                <p className="text-sm text-gray-600 font-light mb-2">{relatedProduct.artist}</p>
                <p className="text-xl font-light text-gray-900">
                  ₹{relatedProduct.price.toLocaleString()}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
