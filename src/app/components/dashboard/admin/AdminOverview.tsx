import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Users, Store, DollarSign, Activity, TrendingUp, UserPlus, ShoppingCart, Clock, AlertCircle, ArrowUpRight } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, PieChart, Pie, Cell } from 'recharts';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';

const platformRevenueData = [
    { name: 'Jan', revenue: 15000, commission: 3000 },
    { name: 'Feb', revenue: 22000, commission: 4400 },
    { name: 'Mar', revenue: 18000, commission: 3600 },
    { name: 'Apr', revenue: 28000, commission: 5600 },
    { name: 'May', revenue: 25000, commission: 5000 },
    { name: 'Jun', revenue: 32000, commission: 6400 },
];

const userDistribution = [
    { name: 'Customers', value: 12345, color: '#FF8042' },
    { name: 'Vendors', value: 85, color: '#8884d8' },
];

const recentActivity = [
    { id: 1, user: 'Arjun V.', action: 'registered as a new Vendor', time: '2 mins ago', type: 'vendor' },
    { id: 2, user: 'Sarah K.', action: 'placed an order #ORD-2024-001', time: '15 mins ago', type: 'order' },
    { id: 3, user: 'System', action: 'Daily backup completed successfully', time: '1 hour ago', type: 'system' },
    { id: 4, user: 'Admin', action: 'approved vendor application #V-105', time: '2 hours ago', type: 'admin' },
    { id: 5, user: 'Rahul M.', action: 'posted a new review on "Sunset Bliss"', time: '3 hours ago', type: 'review' },
];

const topVendors = [
    { name: 'Gallery Artisto', sales: '₹1.2L', orders: 45, status: 'Trending' },
    { name: 'Creative Hands', sales: '₹85k', orders: 32, status: 'Stable' },
    { name: 'Digital Dreams', sales: '₹62k', orders: 28, status: 'Rising' },
];

export function AdminOverview() {
    return (
        <div className="space-y-6">
            {/* Primary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-green-700">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-green-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-900">₹1,45,231.00</div>
                        <p className="text-xs text-green-600 flex items-center mt-1">
                            <TrendingUp className="w-3 h-3 mr-1" /> +15% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700">Platform Commission</CardTitle>
                        <Activity className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">₹29,046.20</div>
                        <p className="text-xs text-blue-600 mt-1">20% Platform Fee</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-purple-700">Active Vendors</CardTitle>
                        <Store className="h-4 w-4 text-purple-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-purple-900">85</div>
                        <p className="text-xs text-purple-600 mt-1 flex items-center">
                            <ArrowUpRight className="w-3 h-3 mr-1" /> +5 pending approval
                        </p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-sm hover:shadow-md transition-shadow">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-orange-700">Total Users</CardTitle>
                        <Users className="h-4 w-4 text-orange-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-orange-900">12,345</div>
                        <p className="text-xs text-orange-600 mt-1 flex items-center">
                            <UserPlus className="w-3 h-3 mr-1" /> +120 new this week
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Main Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Charts (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Revenue Chart */}
                    <Card className="shadow-sm">
                        <CardHeader>
                            <CardTitle>Financial Performance</CardTitle>
                            <CardDescription>Revenue and commission trends over the last 6 months</CardDescription>
                        </CardHeader>
                        <CardContent className="h-[350px]">
                            <ResponsiveContainer width="100%" height="100%">
                                <LineChart data={platformRevenueData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                                    <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                                    <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                                    <Tooltip
                                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                                    />
                                    <Legend />
                                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Total Revenue" />
                                    <Line type="monotone" dataKey="commission" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Commission" />
                                </LineChart>
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Recent Orders / Transactions Table Placeholder or Secondary Chart */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>User Demographics</CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px] flex flex-col items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={50}
                                            outerRadius={70}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {userDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Top Performing Vendors</CardTitle>
                                <CardDescription>Highest revenue generators this month</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topVendors.map((vendor, i) => (
                                        <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center font-bold text-gray-600">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{vendor.name}</p>
                                                    <p className="text-xs text-muted-foreground">{(vendor as any).products || 0} Products</p>
                                                    <p className="text-xs text-muted-foreground">₹{((vendor as any).revenue || 0).toLocaleString()} Sales</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-green-600">{vendor.sales}</p>
                                                <Badge variant="outline" className="text-[10px] h-5">{vendor.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Activity & Actions (Span 1) */}
                <div className="space-y-6">

                    {/* Pending Actions Card */}
                    <Card className="shadow-sm border-l-4 border-l-orange-500">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                Pending Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex items-center justify-between p-3 bg-orange-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <Store className="w-5 h-5 text-orange-600" />
                                    <div>
                                        <p className="text-sm font-medium text-orange-900">New Vendor Applications</p>
                                        <p className="text-xs text-orange-700">5 waiting for review</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 border-orange-200 text-orange-700 hover:bg-orange-100">Review</Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-red-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <AlertCircle className="w-5 h-5 text-red-600" />
                                    <div>
                                        <p className="text-sm font-medium text-red-900">Reported Content</p>
                                        <p className="text-xs text-red-700">3 items reported</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 border-red-200 text-red-700 hover:bg-red-100">View</Button>
                            </div>

                            <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                                <div className="flex items-center gap-3">
                                    <ShoppingCart className="w-5 h-5 text-blue-600" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-900">Refund Requests</p>
                                        <p className="text-xs text-blue-700">2 pending refunds</p>
                                    </div>
                                </div>
                                <Button size="sm" variant="outline" className="h-8 border-blue-200 text-blue-700 hover:bg-blue-100">Process</Button>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Recent Activity Feed */}
                    <Card className="shadow-sm flex-1">
                        <CardHeader>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5 text-gray-500" />
                                Recent Activity
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <ScrollArea className="h-[400px] pr-4">
                                <div className="space-y-6">
                                    {recentActivity.map((activity) => (
                                        <div key={activity.id} className="relative pl-6 pb-2 border-l border-gray-100 last:border-0">
                                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-200 ring-4 ring-white"></div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-gray-800">
                                                    <span className="font-semibold">{activity.user}</span> {activity.action}
                                                </p>
                                                <span className="text-xs text-gray-400">{activity.time}</span>
                                            </div>
                                        </div>
                                    ))}
                                    {/* Mocking more history for display density */}
                                    {[...Array(5)].map((_, i) => (
                                        <div key={`mock-${i}`} className="relative pl-6 pb-2 border-l border-gray-100 last:border-0">
                                            <div className="absolute -left-[5px] top-0 w-2.5 h-2.5 rounded-full bg-gray-100 ring-4 ring-white"></div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium text-gray-700">Automated Bot</span> performed system check.
                                                </p>
                                                <span className="text-xs text-gray-400">{(i + 4)} hours ago</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
