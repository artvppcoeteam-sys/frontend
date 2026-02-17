import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Users, Store, DollarSign, Activity, TrendingUp, UserPlus, ShoppingCart, Clock, AlertCircle, ArrowUpRight, BarChart3, LineChart as LineChartIcon, PieChart as PieChartIcon, Calendar } from 'lucide-react';
import {
    LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
    PieChart, Pie, Cell, AreaChart, Area, BarChart, Bar
} from 'recharts';
import { Button } from '../../ui/button';
import { Badge } from '../../ui/badge';
import { ScrollArea } from '../../ui/scroll-area';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../ui/select';
import { Tabs, TabsList, TabsTrigger } from '../../ui/tabs';
import { useNavigate } from 'react-router-dom';

// --- Mock Data ---

const generateDailyData = (days: number) => {
    const data = [];
    const now = new Date();
    for (let i = days; i >= 0; i--) {
        const date = new Date(now);
        date.setDate(date.getDate() - i);
        data.push({
            name: date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
            revenue: Math.floor(Math.random() * 5000) + 1000,
            commission: Math.floor(Math.random() * 1000) + 200,
            vendors: Math.floor(Math.random() * 5) + 80,
            users: Math.floor(Math.random() * 20) + 12000,
        });
    }
    return data;
};

const data7Days = generateDailyData(7);
const data30Days = generateDailyData(30);
const data6Months = [
    { name: 'Jan', revenue: 15000, commission: 3000, vendors: 70, users: 11000 },
    { name: 'Feb', revenue: 22000, commission: 4400, vendors: 75, users: 11500 },
    { name: 'Mar', revenue: 18000, commission: 3600, vendors: 78, users: 11800 },
    { name: 'Apr', revenue: 28000, commission: 5600, vendors: 82, users: 12100 },
    { name: 'May', revenue: 25000, commission: 5000, vendors: 85, users: 12345 },
    { name: 'Jun', revenue: 32000, commission: 6400, vendors: 90, users: 12600 },
];

const userDistribution = [
    { name: 'Customers', value: 12345, color: '#FF8042' }, // Orange
    { name: 'Vendors', value: 85, color: '#8884d8' }, // Purple
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

// --- Components ---

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white p-3 border border-gray-100 shadow-xl rounded-lg">
                <p className="text-sm font-semibold mb-2">{label}</p>
                {payload.map((p: any, index: number) => (
                    <div key={index} className="flex items-center gap-2 text-xs mb-1">
                        <div className="w-2 h-2 rounded-full" style={{ backgroundColor: p.color }}></div>
                        <span className="text-gray-600 capitalize">{p.name === 'revenue' ? 'Revenue' : p.name}:</span>
                        <span className="font-medium">
                            {p.name === 'revenue' || p.name === 'commission' ? `₹${p.value.toLocaleString()}` : p.value}
                        </span>
                    </div>
                ))}
            </div>
        );
    }
    return null;
};

export function AdminOverview() {
    const [timeRange, setTimeRange] = useState('6m');
    const [chartType, setChartType] = useState('line');
    const [activeMetrics, setActiveMetrics] = useState(['revenue', 'commission']);
    const navigate = useNavigate();

    const getData = () => {
        switch (timeRange) {
            case '7d': return data7Days;
            case '30d': return data30Days;
            case '6m': return data6Months;
            default: return data6Months;
        }
    };

    const toggleMetric = (metric: string) => {
        setActiveMetrics(prev =>
            prev.includes(metric)
                ? prev.filter(m => m !== metric)
                : [...prev, metric]
        );
    };

    const renderChart = () => {
        const data = getData();
        const commonProps = {
            data: data,
            margin: { top: 10, right: 30, left: 0, bottom: 0 }
        };

        const renderLines = () => (
            <>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} tickFormatter={(value) => `₹${value}`} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {activeMetrics.includes('revenue') && (
                    <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} activeDot={{ r: 6 }} name="Revenue" />
                )}
                {activeMetrics.includes('commission') && (
                    <Line type="monotone" dataKey="commission" stroke="#3b82f6" strokeWidth={3} dot={{ r: 4 }} name="Commission" />
                )}
                {activeMetrics.includes('vendors') && (
                    <Line type="monotone" dataKey="vendors" stroke="#8b5cf6" strokeWidth={3} dot={{ r: 4 }} name="Vendors" />
                )}
                {activeMetrics.includes('users') && (
                    <Line type="monotone" dataKey="users" stroke="#f97316" strokeWidth={3} dot={{ r: 4 }} name="Users" />
                )}
            </>
        );

        const renderAreas = () => (
            <>
                <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                    </linearGradient>
                    <linearGradient id="colorCommission" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                    </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {activeMetrics.includes('revenue') && (
                    <Area type="monotone" dataKey="revenue" stroke="#10b981" fillOpacity={1} fill="url(#colorRevenue)" name="Revenue" />
                )}
                {activeMetrics.includes('commission') && (
                    <Area type="monotone" dataKey="commission" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCommission)" name="Commission" />
                )}
            </>
        );

        const renderBars = () => (
            <>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fill: '#888', fontSize: 12 }} />
                <Tooltip content={<CustomTooltip />} />
                <Legend />
                {activeMetrics.includes('revenue') && (
                    <Bar dataKey="revenue" fill="#10b981" radius={[4, 4, 0, 0]} name="Revenue" />
                )}
                {activeMetrics.includes('commission') && (
                    <Bar dataKey="commission" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Commission" />
                )}
            </>
        );

        if (chartType === 'area') {
            return <AreaChart {...commonProps}>{renderAreas()}</AreaChart>;
        } else if (chartType === 'bar') {
            return <BarChart {...commonProps}>{renderBars()}</BarChart>;
        }
        return <LineChart {...commonProps}>{renderLines()}</LineChart>;
    };

    return (
        <div className="space-y-6 animate-in fade-in duration-500">
            {/* Primary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-gradient-to-br from-green-50 to-white border-green-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => toggleMetric('revenue')}>
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
                <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => toggleMetric('commission')}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium text-blue-700">Platform Commission</CardTitle>
                        <Activity className="h-4 w-4 text-blue-600" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-blue-900">₹29,046.20</div>
                        <p className="text-xs text-blue-600 mt-1">20% Platform Fee</p>
                    </CardContent>
                </Card>
                <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => toggleMetric('vendors')}>
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
                <Card className="bg-gradient-to-br from-orange-50 to-white border-orange-100 shadow-sm hover:shadow-md transition-all duration-300 hover:scale-[1.02] cursor-pointer" onClick={() => toggleMetric('users')}>
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

            {/* Main Charts Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Left Column: Charts (Span 2) */}
                <div className="lg:col-span-2 space-y-6">
                    <Card className="shadow-sm border-t-4 border-t-yellow-500">
                        <CardHeader className="flex flex-row items-center justify-between pb-2">
                            <div>
                                <CardTitle>Platform Performance</CardTitle>
                                <CardDescription>Key metrics overview</CardDescription>
                            </div>
                            <div className="flex items-center gap-2">
                                <Tabs value={chartType} onValueChange={setChartType} className="h-8">
                                    <TabsList className="h-8">
                                        <TabsTrigger value="line" className="h-6 px-2"><LineChartIcon className="w-4 h-4" /></TabsTrigger>
                                        <TabsTrigger value="bar" className="h-6 px-2"><BarChart3 className="w-4 h-4" /></TabsTrigger>
                                        <TabsTrigger value="area" className="h-6 px-2"><Activity className="w-4 h-4" /></TabsTrigger>
                                    </TabsList>
                                </Tabs>
                                <Select value={timeRange} onValueChange={setTimeRange}>
                                    <SelectTrigger className="w-[120px] h-8">
                                        <Calendar className="w-3.5 h-3.5 mr-2 opacity-50" />
                                        <SelectValue placeholder="Range" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="7d">Last 7 days</SelectItem>
                                        <SelectItem value="30d">Last 30 days</SelectItem>
                                        <SelectItem value="6m">Last 6 months</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                        </CardHeader>
                        <CardContent className="h-[400px]">
                            <ResponsiveContainer width="100%" height="100%">
                                {renderChart()}
                            </ResponsiveContainer>
                        </CardContent>
                    </Card>

                    {/* Secondary Visuals */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <PieChartIcon className="w-4 h-4 text-gray-500" />
                                    User Demographics
                                </CardTitle>
                            </CardHeader>
                            <CardContent className="h-[250px] flex flex-col items-center justify-center">
                                <ResponsiveContainer width="100%" height="100%">
                                    <PieChart>
                                        <Pie
                                            data={userDistribution}
                                            cx="50%"
                                            cy="50%"
                                            innerRadius={60}
                                            outerRadius={80}
                                            paddingAngle={5}
                                            dataKey="value"
                                        >
                                            {userDistribution.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip content={<CustomTooltip />} />
                                        <Legend verticalAlign="bottom" height={36} />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="shadow-sm">
                            <CardHeader>
                                <CardTitle>Top Performing Vendors</CardTitle>
                                <CardDescription>Highest revenue generators</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topVendors.map((vendor, i) => (
                                        <div key={i} className="flex items-center justify-between border-b pb-2 last:border-0 last:pb-0 hover:bg-gray-50 p-2 rounded-md transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-yellow-100 text-yellow-700 flex items-center justify-center font-bold text-sm">
                                                    {i + 1}
                                                </div>
                                                <div>
                                                    <p className="text-sm font-medium">{vendor.name}</p>
                                                    <p className="text-xs text-muted-foreground">{vendor.orders} Orders</p>
                                                </div>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-sm font-bold text-green-600">{vendor.sales}</p>
                                                <Badge variant="secondary" className="text-[10px] h-5 bg-gray-100 text-gray-700">{vendor.status}</Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Right Column: Pending Actions & Activity */}
                <div className="space-y-6">

                    {/* Pending Actions Card */}
                    <Card className="shadow-md border-l-4 border-l-orange-500 overflow-hidden">
                        <CardHeader className="bg-orange-50/30 pb-3">
                            <CardTitle className="flex items-center gap-2 text-orange-900">
                                <AlertCircle className="w-5 h-5 text-orange-500" />
                                Pending Actions
                            </CardTitle>
                            <CardDescription>Items requiring your attention</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4 pt-4">
                            {/* Action Item 1: Vendors */}
                            <div className="block group cursor-pointer" onClick={() => navigate('/dashboard/admin/vendors?filter=pending')}>
                                <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm group-hover:shadow-md group-hover:border-orange-200 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-orange-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-orange-100 rounded-full text-orange-600 group-hover:bg-orange-500 group-hover:text-white transition-colors">
                                            <Store className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-orange-900">Vendor Applications</p>
                                            <p className="text-xs text-gray-500 group-hover:text-orange-700">5 waiting for review</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-200 border-0">5</Badge>
                                </div>
                            </div>

                            {/* Action Item 2: Reported Content */}
                            <div className="block group cursor-pointer" onClick={() => navigate('/dashboard/admin/artworks?filter=reported')}>
                                <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm group-hover:shadow-md group-hover:border-red-200 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-red-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-red-100 rounded-full text-red-600 group-hover:bg-red-500 group-hover:text-white transition-colors">
                                            <AlertCircle className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-red-900">Reported Content</p>
                                            <p className="text-xs text-gray-500 group-hover:text-red-700">3 items reported</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-red-100 text-red-700 hover:bg-red-200 border-0">3</Badge>
                                </div>
                            </div>

                            {/* Action Item 3: Refunds */}
                            <div className="block group cursor-pointer" onClick={() => navigate('/dashboard/admin/orders?filter=refund')}>
                                <div className="flex items-center justify-between p-3 bg-white border border-gray-100 rounded-lg shadow-sm group-hover:shadow-md group-hover:border-blue-200 transition-all duration-300 relative overflow-hidden">
                                    <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-400 opacity-0 group-hover:opacity-100 transition-opacity"></div>
                                    <div className="flex items-center gap-3">
                                        <div className="p-2 bg-blue-100 rounded-full text-blue-600 group-hover:bg-blue-500 group-hover:text-white transition-colors">
                                            <ShoppingCart className="w-4 h-4" />
                                        </div>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 group-hover:text-blue-900">Refund Requests</p>
                                            <p className="text-xs text-gray-500 group-hover:text-blue-700">2 pending refunds</p>
                                        </div>
                                    </div>
                                    <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 border-0">2</Badge>
                                </div>
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
                                        <div key={activity.id} className="relative pl-6 pb-2 border-l border-gray-100 last:border-0 hover:bg-gray-50/50 transition-colors p-2 rounded-r-lg group">
                                            <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-gray-200 ring-4 ring-white group-hover:bg-yellow-400 transition-colors"></div>
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
                                        <div key={`mock-${i}`} className="relative pl-6 pb-2 border-l border-gray-100 last:border-0 p-2">
                                            <div className="absolute -left-[5px] top-3 w-2.5 h-2.5 rounded-full bg-gray-100 ring-4 ring-white"></div>
                                            <div className="flex flex-col gap-1">
                                                <p className="text-sm text-gray-600">
                                                    <span className="font-medium text-gray-700">System</span> performed auto-optimization.
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
