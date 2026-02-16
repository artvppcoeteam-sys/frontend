import { useState } from 'react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { VendorOverview } from './VendorOverview';
import { VendorArtworks, VendorOrders, VendorEarnings, VendorCustomers } from './VendorComponents';
import { VendorSettings } from './VendorPlaceholders';
import {
    LayoutDashboard, Image as ImageIcon, ShoppingBag,
    DollarSign, User, Settings, HelpCircle, MessageSquare, LogOut
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

interface VendorDashboardProps {
    onNavigate: (page: string) => void;
}

export function VendorDashboard({ onNavigate }: VendorDashboardProps) {
    const { user } = useApp();
    const [activeSection, setActiveSection] = useState('overview');

    if (user?.role !== 'vendor' && user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Access Restricted</CardTitle>
                        <CardDescription>This area is for Vendors/Artists only.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Button onClick={() => onNavigate('home')} className="w-full">
                            Return Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    const menuItems = [
        {
            title: 'MAIN',
            items: [
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
                { id: 'artworks', label: 'My Artworks', icon: ImageIcon },
                { id: 'add-artwork', label: 'Add New Artwork', icon: ImageIcon, path: '/add-artwork' }, // Logical placeholder
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { id: 'earnings', label: 'Earnings / Revenue', icon: DollarSign },
                { id: 'payouts', label: 'Payouts (Coming Soon)', icon: DollarSign },
            ]
        },
        {
            title: 'ACCOUNT',
            items: [
                { id: 'customers', label: 'Customers', icon: User },
                { id: 'messages', label: 'Messages', icon: MessageSquare },
                { id: 'settings', label: 'Profile Settings', icon: Settings },
                { id: 'support', label: 'Help & Support', icon: HelpCircle },
            ]
        }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview': return <VendorOverview />;
            case 'artworks': return <VendorArtworks />;
            case 'orders': return <VendorOrders />;
            case 'earnings': return <VendorEarnings />;
            case 'customers': return <VendorCustomers />;
            case 'settings': return <VendorSettings />;
            case 'add-artwork':
                // Simple redirect simulation or inline form
                return <VendorArtworks />; // Just show artworks for now, usually this opens a form
            default: return <VendorOverview />;
        }
    };

    return (
        <DashboardLayout
            menuItems={menuItems}
            activeSection={activeSection}
            onNavigate={(id) => setActiveSection(id)}
        >
            {renderContent()}
        </DashboardLayout>
    );
}
