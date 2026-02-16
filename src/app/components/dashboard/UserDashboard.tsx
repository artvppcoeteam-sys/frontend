import { DashboardSection } from './types';
import { Sidebar } from './Sidebar';
import { ProfileInformation } from './ProfileInformation';
import { ManageAddresses } from './ManageAddresses';
import { MyOrders } from './MyOrders';
import { MyWishlist } from './MyWishlist';
import { Payments } from './Payments';
import { MyReviews } from './MyReviews';
import { MyCoupons } from './MyCoupons';
import { Notifications } from './Notifications';

import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { motion } from 'motion/react';
import { useEffect } from 'react';

interface UserDashboardProps {
    activeSection?: DashboardSection;
    onNavigate: (page: string, id?: string) => void;
}

export function UserDashboard({ activeSection = 'profile', onNavigate }: UserDashboardProps) {
    const { user } = useApp();

    const handleSidebarNavigate = (section: DashboardSection) => {
        switch (section) {
            case 'orders':
                onNavigate('orders');
                break;
            case 'wishlist':
                onNavigate('wishlist');
                break;
            case 'profile':
                onNavigate('profile');
                break;
            case 'addresses':
            case 'payments':
            case 'coupons':
            case 'reviews':
            case 'notifications':
            case 'notifications':
                onNavigate(section);
                break;
        }
    };

    const renderContent = () => {
        switch (activeSection) {
            case 'profile': return <ProfileInformation />;
            case 'addresses': return <ManageAddresses />;
            case 'orders': return <MyOrders />;
            case 'wishlist': return <MyWishlist />;
            case 'payments': return <Payments />;
            case 'reviews': return <MyReviews />;
            case 'coupons': return <MyCoupons />;
            case 'notifications': return <Notifications />;
            case 'notifications': return <Notifications />;
            default: return <ProfileInformation />;
        }
    };

    if (!user) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>Please log in to view your profile</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => onNavigate('login')} className="w-full bg-[#D4AF37] hover:bg-[#B8941F]">
                            Go to Login
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Sidebar */}
                    <Sidebar
                        activeSection={activeSection}
                        onNavigate={handleSidebarNavigate}
                        className="lg:w-1/4"
                    />

                    {/* Main Content */}
                    <div className="flex-1 lg:w-3/4">
                        <motion.div
                            key={activeSection}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            {renderContent()}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
