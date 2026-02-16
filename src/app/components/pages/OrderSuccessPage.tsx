import { useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { CheckCircle, MapPin, Package } from 'lucide-react';
import { motion } from 'motion/react';

interface OrderSuccessPageProps {
    onNavigate: (page: string) => void;
}

export function OrderSuccessPage({ onNavigate }: OrderSuccessPageProps) {
    const { checkoutState, user } = useApp();
    const { shippingInfo } = checkoutState;
    const orderId = `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

    // If accessed directly without checkout state, redirect home
    useEffect(() => {
        if (!shippingInfo.fullName) {
            onNavigate('home');
        }
    }, [shippingInfo, onNavigate]);

    if (!shippingInfo.fullName) return null;

    return (
        <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl w-full text-center space-y-8">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", stiffness: 200, damping: 20 }}
                    className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto"
                >
                    <CheckCircle className="w-12 h-12 text-green-600" />
                </motion.div>

                <div>
                    <h1 className="text-3xl font-serif text-gray-900">Order Placed Successfully!</h1>
                    <p className="mt-2 text-lg text-gray-600">
                        Thank you {shippingInfo.fullName.split(' ')[0]}, your order has been confirmed.
                    </p>
                    <p className="text-sm text-gray-500 mt-1">Order ID: <span className="font-mono font-medium text-gray-900">{orderId}</span></p>
                </div>

                <Card className="text-left border-t-4 border-t-[#D4AF37]">
                    <CardContent className="p-6 space-y-6">
                        <div className="flex items-start gap-4">
                            <div className="bg-gray-100 p-2 rounded-full">
                                <MapPin className="w-5 h-5 text-gray-600" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-gray-900">Delivery Address</h3>
                                <p className="text-gray-600 mt-1">{shippingInfo.fullName}</p>
                                <p className="text-gray-600">{shippingInfo.address}</p>
                                <p className="text-gray-600">{shippingInfo.city}, {shippingInfo.state} {shippingInfo.pincode}</p>
                                <p className="text-gray-600">Phone: {shippingInfo.phone}</p>
                            </div>
                        </div>

                        <div className="border-t pt-6">
                            <div className="flex items-start gap-4">
                                <div className="bg-gray-100 p-2 rounded-full">
                                    <Package className="w-5 h-5 text-gray-600" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">Estimated Delivery</h3>
                                    <p className="text-gray-600 mt-1">
                                        {new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toLocaleDateString('en-IN', {
                                            weekday: 'long',
                                            year: 'numeric',
                                            month: 'long',
                                            day: 'numeric'
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button
                        variant="outline"
                        size="lg"
                        onClick={() => onNavigate('orders')}
                        className="w-full sm:w-auto"
                    >
                        Go to My Orders
                    </Button>
                    <Button
                        size="lg"
                        onClick={() => onNavigate('shop')}
                        className="w-full sm:w-auto bg-[#D4AF37] hover:bg-[#C19B2A] text-white"
                    >
                        Continue Shopping
                    </Button>
                </div>
            </div>
        </div>
    );
}
