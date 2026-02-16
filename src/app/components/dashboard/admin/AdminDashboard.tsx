import { useState } from 'react';
import { DashboardLayout } from '../shared/DashboardLayout';
import { AdminOverview } from './AdminOverview';
import { AdminVendors } from './AdminVendors';
import { AdminProducts } from './AdminProducts';
import { AdminUsers } from './AdminUsers';
import { AdminArtworks } from './AdminArtworks';
import { AdminServices } from './AdminServices';
import { AdminRevenue } from './AdminRevenue';
import { AdminReports } from './AdminReports';
import {
    LayoutDashboard, Users, Store as StoreIcon, Image as ImageIcon,
    FileText, ShoppingBag, Settings, PieChart, Layers, Box,
    CreditCard, HelpCircle, Palette
} from 'lucide-react';
import { useApp } from '../../../context/AppContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../ui/card';
import { Button } from '../../ui/button';

interface AdminDashboardProps {
    onNavigate: (page: string) => void;
}

export function AdminDashboard({ onNavigate }: AdminDashboardProps) {
    const { user } = useApp();
    const [activeSection, setActiveSection] = useState('overview');

    if (user?.role !== 'admin') {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-50">
                <Card className="max-w-md w-full">
                    <CardHeader>
                        <CardTitle>Access Denied</CardTitle>
                        <CardDescription>This area is restricted to Administrators only.</CardDescription>
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
            title: 'OVERVIEW',
            items: [
                { id: 'overview', label: 'Overview', icon: LayoutDashboard },
            ]
        },
        {
            title: 'MANAGEMENT',
            items: [
                { id: 'vendors', label: 'Sellers / Vendors', icon: StoreIcon },
                { id: 'users', label: 'Users', icon: Users },
                { id: 'artworks', label: 'Artworks', icon: ImageIcon },
                { id: 'orders', label: 'Orders', icon: ShoppingBag },
            ]
        },
        {
            title: 'DISCOVER & SERVICES',
            items: [
                { id: 'categories', label: 'Categories', icon: Layers },
                { id: 'services', label: 'Services', icon: Palette },
            ]
        },
        {
            title: 'FINANCE',
            items: [
                { id: 'revenue', label: 'Revenue & Commission', icon: CreditCard },
                { id: 'reports', label: 'Reports & Analytics', icon: PieChart },
            ]
        },
        {
            title: 'PLATFORM',
            items: [
                { id: 'content', label: 'Content Management', icon: FileText },
                { id: 'settings', label: 'Platform Settings', icon: Settings },
                { id: 'support', label: 'Support Tickets', icon: HelpCircle },
            ]
        }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'overview': return <AdminOverview />;

            // Management
            case 'vendors': return <AdminVendors />;
            case 'users': return <AdminUsers />;
            case 'artworks': return <AdminArtworks />;
            case 'orders': return <AdminProducts activeTab="products" />; // Reusing AdminProducts logic for now or specific order view

            // Discover
            case 'categories': return <AdminProducts activeTab="products" />; // Managing categories often happens with products
            case 'services': return <AdminServices />;

            // Finance
            case 'revenue': return <AdminRevenue />;
            case 'reports': return <AdminReports />;

            // Platform
            case 'content': return <AdminReports />; // Placeholder
            default: return <AdminOverview />;
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
