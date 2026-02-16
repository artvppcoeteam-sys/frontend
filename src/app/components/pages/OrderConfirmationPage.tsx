import { CheckCircle, Package, Truck, MapPin, Calendar, CreditCard, Mail, ArrowRight } from 'lucide-react';
import { useApp } from '../../context/AppContext';

interface OrderConfirmationPageProps {
    onNavigate?: (page: string) => void;
}

export function OrderConfirmationPage({ onNavigate }: OrderConfirmationPageProps) {
    const { cart } = useApp();

    // Generate mock order details
    const orderNumber = `KVP${Math.random().toString(36).substring(2, 9).toUpperCase()}`;
    const orderDate = new Date().toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const estimatedDelivery = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });

    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = subtotal > 5000 ? 0 : 150;
    const tax = subtotal * 0.18;
    const total = subtotal + shipping + tax;

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#FAFAFA] to-white py-16 px-4">
            <div className="max-w-4xl mx-auto">
                {/* Success Header */}
                <div className="text-center mb-12">
                    <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 mb-6 animate-bounce">
                        <CheckCircle className="w-12 h-12 text-white" />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-['Playfair_Display'] font-bold text-gray-900 mb-4">
                        Order Confirmed!
                    </h1>
                    <p className="text-xl text-gray-600 mb-2">
                        Thank you for your purchase
                    </p>
                    <p className="text-gray-500">
                        We've sent a confirmation email to your registered email address
                    </p>
                </div>

                {/* Order Details Card */}
                <div className="bg-white rounded-2xl shadow-xl border border-gray-200 overflow-hidden mb-8">
                    {/* Order Number Banner */}
                    <div className="bg-gradient-to-r from-[#D4AF37] to-[#C9A858] px-8 py-6">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                            <div>
                                <p className="text-sm text-white/80 mb-1">Order Number</p>
                                <p className="text-2xl font-bold text-white font-mono">{orderNumber}</p>
                            </div>
                            <div className="text-left md:text-right">
                                <p className="text-sm text-white/80 mb-1">Order Date</p>
                                <p className="text-lg font-semibold text-white">{orderDate}</p>
                            </div>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="p-8">
                        <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-6 flex items-center gap-3">
                            <Package className="w-6 h-6 text-[#8B4049]" />
                            Order Summary
                        </h2>

                        {/* Items */}
                        <div className="space-y-4 mb-8">
                            {cart.map((item) => (
                                <div key={item.id} className="flex gap-4 pb-4 border-b border-gray-200">
                                    <div className="w-20 h-20 bg-gray-100 rounded-lg flex-shrink-0">
                                        {/* Placeholder for product image */}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold text-gray-900">{item.title}</h3>
                                        <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold text-gray-900">₹{(item.price * item.quantity).toLocaleString('en-IN')}</p>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Price Breakdown */}
                        <div className="space-y-3 mb-6 pb-6 border-b border-gray-200">
                            <div className="flex justify-between text-gray-600">
                                <span>Subtotal</span>
                                <span>₹{subtotal.toLocaleString('en-IN')}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Shipping</span>
                                <span>{shipping === 0 ? 'Free' : `₹${shipping}`}</span>
                            </div>
                            <div className="flex justify-between text-gray-600">
                                <span>Tax (GST 18%)</span>
                                <span>₹{tax.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                            </div>
                        </div>

                        {/* Total */}
                        <div className="flex justify-between items-center text-xl font-bold text-gray-900">
                            <span>Total</span>
                            <span className="text-2xl text-[#D4AF37]">₹{total.toLocaleString('en-IN', { maximumFractionDigits: 0 })}</span>
                        </div>
                    </div>
                </div>

                {/* Delivery Information */}
                <div className="grid md:grid-cols-2 gap-6 mb-8">
                    {/* Estimated Delivery */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0">
                                <Truck className="w-6 h-6 text-green-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Estimated Delivery</h3>
                                <p className="text-gray-600">{estimatedDelivery}</p>
                                <p className="text-sm text-gray-500 mt-1">You'll receive tracking information via email</p>
                            </div>
                        </div>
                    </div>

                    {/* Shipping Address */}
                    <div className="bg-white rounded-xl p-6 border border-gray-200">
                        <div className="flex items-start gap-4">
                            <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center flex-shrink-0">
                                <MapPin className="w-6 h-6 text-blue-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900 mb-2">Shipping Address</h3>
                                <p className="text-gray-600 text-sm">
                                    [Delivery Address]<br />
                                    [City, State - PIN]
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Next Steps */}
                <div className="bg-gradient-to-br from-[#FFF8E7] to-white rounded-2xl p-8 border border-[#D4AF37]/20 mb-8">
                    <h2 className="text-2xl font-['Playfair_Display'] font-bold text-gray-900 mb-6">
                        What Happens Next?
                    </h2>
                    <div className="space-y-4">
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold flex-shrink-0">
                                1
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Order Processing</p>
                                <p className="text-sm text-gray-600">We'll prepare your items for shipment within 1-2 business days</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold flex-shrink-0">
                                2
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Shipment & Tracking</p>
                                <p className="text-sm text-gray-600">You'll receive tracking details via email and SMS</p>
                            </div>
                        </div>
                        <div className="flex items-start gap-4">
                            <div className="w-8 h-8 rounded-full bg-[#D4AF37] text-white flex items-center justify-center font-bold flex-shrink-0">
                                3
                            </div>
                            <div>
                                <p className="font-semibold text-gray-900">Delivery</p>
                                <p className="text-sm text-gray-600">Your order will arrive by {estimatedDelivery}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button
                        onClick={() => onNavigate?.('orders')}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A858] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
                    >
                        <Package className="w-5 h-5" />
                        Track Order
                    </button>

                    <button
                        onClick={() => onNavigate?.('shop')}
                        className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white border-2 border-[#D4AF37] text-[#D4AF37] rounded-full font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
                    >
                        Continue Shopping
                        <ArrowRight className="w-5 h-5" />
                    </button>
                </div>

                {/* Help Section */}
                <div className="mt-12 text-center">
                    <p className="text-gray-600 mb-4">
                        Need help with your order?
                    </p>
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm">
                        <button
                            onClick={() => onNavigate?.('contact')}
                            className="flex items-center gap-2 text-[#8B4049] hover:text-[#D4AF37] transition-colors"
                        >
                            <Mail className="w-4 h-4" />
                            Contact Support
                        </button>
                        <button
                            onClick={() => onNavigate?.('help')}
                            className="flex items-center gap-2 text-[#8B4049] hover:text-[#D4AF37] transition-colors"
                        >
                            <Calendar className="w-4 h-4" />
                            View FAQs
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
