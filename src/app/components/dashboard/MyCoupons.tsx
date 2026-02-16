import { useState } from 'react';
import { Ticket, Copy, Check } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';

export function MyCoupons() {
    const [coupons, setCoupons] = useState([
        {
            id: 1,
            code: 'WELCOME20',
            description: 'Get 20% off on your first order',
            expiry: 'Valid until 31 Dec 2024',
            minOrder: 'Min. order ₹500'
        },
        {
            id: 2,
            code: 'ARTLOVER10',
            description: 'Flat 10% off on all paintings',
            expiry: 'Valid until 30 Jun 2024',
            minOrder: 'No min. order'
        }
    ]);

    const handleCopy = (code: string) => {
        navigator.clipboard.writeText(code);
        toast.success('Coupon code copied!');
    };

    if (coupons.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <Ticket className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">No Coupons Available</h3>
                <p>You don't have any active coupons at the moment.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Coupons ({coupons.length})</h2>
            <div className="grid gap-4 md:grid-cols-2">
                {coupons.map((coupon) => (
                    <Card key={coupon.id} className="relative overflow-hidden border-dashed border-2 bg-gradient-to-r from-orange-50 to-amber-50 border-orange-200">
                        <div className="absolute top-0 right-0 p-2 opacity-10">
                            <Ticket className="w-24 h-24" />
                        </div>
                        <CardContent className="p-6 relative z-10">
                            <div className="flex justify-between items-start mb-4">
                                <div>
                                    <h3 className="text-2xl font-bold text-gray-900 tracking-wider">{coupon.code}</h3>
                                    <p className="text-sm text-gray-600 mt-1">{coupon.description}</p>
                                </div>
                                <Button size="icon" variant="outline" className="h-8 w-8 bg-white" onClick={() => handleCopy(coupon.code)}>
                                    <Copy className="w-4 h-4" />
                                </Button>
                            </div>
                            <div className="flex justify-between items-end border-t border-orange-200/50 pt-4">
                                <span className="text-xs font-semibold text-orange-700 bg-orange-100 px-2 py-1 rounded">{coupon.expiry}</span>
                                <span className="text-xs text-gray-500">{coupon.minOrder}</span>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
