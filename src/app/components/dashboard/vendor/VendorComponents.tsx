import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Badge } from '../../ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import {
    ImagePlus, Search, Filter, MoreVertical, Edit,
    Trash2, Eye, DollarSign, TrendingUp, Download,
    ShoppingBag, User, Calendar
} from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';

// Mock Data
const artworks = [
    { id: 1, title: 'Abstract Harmony', price: 15000, status: 'Active', views: 1200, sales: 5, image: '/images/a.jpeg' },
    { id: 2, title: 'Golden Sunrise', price: 8500, status: 'Pending', views: 0, sales: 0, image: '/images/d.jpeg' },
    { id: 3, title: 'Geometric Blues', price: 6500, status: 'Active', views: 850, sales: 3, image: '/images/g.jpeg' },
    { id: 4, title: 'Silent Mountains', price: 12000, status: 'Rejected', views: 50, sales: 0, image: '/images/l.jpeg' },
];

const orders = [
    { id: 'ORD-7890', customer: 'Alice Smith', item: 'Abstract Harmony', date: '2024-02-15', amount: 15000, status: 'Processing' },
    { id: 'ORD-7891', customer: 'Bob Jones', item: 'Geometric Blues', date: '2024-02-14', amount: 6500, status: 'Shipped' },
    { id: 'ORD-7892', customer: 'Charlie Day', item: 'Abstract Harmony', date: '2024-02-10', amount: 15000, status: 'Delivered' },
    { id: 'ORD-7893', customer: 'David Lee', item: 'Geometric Blues', date: '2024-02-08', amount: 6500, status: 'Delivered' },
];

const earningData = [
    { month: 'Jan', revenue: 5000, commission: 500 },
    { month: 'Feb', revenue: 12000, commission: 1200 },
    { month: 'Mar', revenue: 8500, commission: 850 },
    { month: 'Apr', revenue: 15000, commission: 1500 },
    { month: 'May', revenue: 22000, commission: 2200 },
    { month: 'Jun', revenue: 18000, commission: 1800 },
];

export function VendorArtworks() {
    return (
        <div className="space-y-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h2 className="text-2xl font-bold tracking-tight">My Artworks</h2>
                <Button className="bg-[#D4AF37] hover:bg-[#C19B2A]">
                    <ImagePlus className="mr-2 h-4 w-4" /> Add New Artwork
                </Button>
            </div>

            <Card>
                <CardHeader className="pb-3">
                    <div className="flex items-center justify-between">
                        <div className="relative w-full max-w-sm">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
                            <Input placeholder="Search artworks..." className="pl-8" />
                        </div>
                        <Button variant="outline" size="icon">
                            <Filter className="h-4 w-4" />
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {artworks.map((art) => (
                            <div key={art.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-4">
                                    <div className="h-16 w-16 bg-gray-200 rounded-md overflow-hidden">
                                        <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                                    </div>
                                    <div>
                                        <h3 className="font-medium text-gray-900">{art.title}</h3>
                                        <p className="text-sm text-gray-500">₹{art.price.toLocaleString()}</p>
                                        <div className="flex items-center gap-3 mt-1 text-xs text-gray-500">
                                            <span className="flex items-center"><Eye className="w-3 h-3 mr-1" /> {art.views}</span>
                                            <span className="flex items-center"><ShoppingBag className="w-3 h-3 mr-1" /> {art.sales}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-4">
                                    <Badge variant={art.status === 'Active' ? 'default' : art.status === 'Pending' ? 'secondary' : 'destructive'}>
                                        {art.status}
                                    </Badge>
                                    <div className="flex gap-2">
                                        <Button variant="ghost" size="icon" className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-700 hover:bg-red-50"><Trash2 className="w-4 h-4" /></Button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function VendorOrders() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Orders</h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Total Orders</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold">128</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Pending</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-yellow-600">8</div></CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2"><CardTitle className="text-sm font-medium text-gray-500">Completed</CardTitle></CardHeader>
                    <CardContent><div className="text-2xl font-bold text-green-600">115</div></CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Order History</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                                <tr>
                                    <th className="px-4 py-3">Order ID</th>
                                    <th className="px-4 py-3">Customer</th>
                                    <th className="px-4 py-3">Item</th>
                                    <th className="px-4 py-3">Date</th>
                                    <th className="px-4 py-3">Amount</th>
                                    <th className="px-4 py-3">Status</th>
                                    <th className="px-4 py-3 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {orders.map((order) => (
                                    <tr key={order.id} className="border-b hover:bg-gray-50">
                                        <td className="px-4 py-3 font-medium">{order.id}</td>
                                        <td className="px-4 py-3">
                                            <div className="flex items-center gap-2">
                                                <User className="w-3 h-3 text-gray-400" /> {order.customer}
                                            </div>
                                        </td>
                                        <td className="px-4 py-3">{order.item}</td>
                                        <td className="px-4 py-3">{order.date}</td>
                                        <td className="px-4 py-3 font-medium">₹{order.amount.toLocaleString()}</td>
                                        <td className="px-4 py-3">
                                            <Badge variant={
                                                order.status === 'Pending' ? 'secondary' :
                                                    order.status === 'Processing' ? 'outline' :
                                                        'default'
                                            } className={
                                                order.status === 'Delivered' ? 'bg-green-100 text-green-800 hover:bg-green-200' :
                                                    order.status === 'Shipped' ? 'bg-blue-100 text-blue-800 hover:bg-blue-200' : ''
                                            }>
                                                {order.status}
                                            </Badge>
                                        </td>
                                        <td className="px-4 py-3 text-right">
                                            <Button variant="ghost" size="sm">Details</Button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}

export function VendorEarnings() {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Earnings & Payouts</h2>
                <Button variant="outline">
                    <Download className="mr-2 h-4 w-4" /> Export Report
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-green-50 border-green-100">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-green-800">Total Earnings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold text-green-900">₹80,500</div>
                        <p className="text-xs text-green-600 mt-1">Lifetime earnings</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">Pending Payout</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₹12,400</div>
                        <p className="text-xs text-muted-foreground mt-1">Scheduled for Feb 28</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium text-gray-500">This Month</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">₹22,000</div>
                        <p className="text-xs text-green-600 mt-1 flex items-center">
                            <TrendingUp className="w-3 h-3 mr-1" /> +15% vs last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Revenue vs Commission</CardTitle>
                    <CardDescription>Monthly breakdown of your earnings and platform fees</CardDescription>
                </CardHeader>
                <CardContent className="h-[400px]">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={earningData}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} />
                            <XAxis dataKey="month" />
                            <YAxis />
                            <Tooltip />
                            <Bar dataKey="revenue" name="Net Revenue" fill="#10b981" radius={[4, 4, 0, 0]} />
                            <Bar dataKey="commission" name="Platform Fee" fill="#94a3b8" radius={[4, 4, 0, 0]} />
                        </BarChart>
                    </ResponsiveContainer>
                </CardContent>
            </Card>
        </div>
    );
}

export function VendorCustomers() {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Customers</h2>
            <Card>
                <CardContent className="py-20 text-center">
                    <User className="h-12 w-12 mx-auto text-gray-300 mb-4" />
                    <h3 className="text-lg font-medium text-gray-900">Customer Insights</h3>
                    <p className="text-gray-500">This feature will show repeat buyers and demographics.</p>
                </CardContent>
            </Card>
        </div>
    );
}
