import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { adminAnalyticsData } from '../../../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Zap, Users, ShoppingCart, Activity } from 'lucide-react';
import { Badge } from '../../ui/badge';

export function AdminReports() {
    const { topVendors } = adminAnalyticsData;

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">System Reports & Analytics</h2>

            {/* Platform Health */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">System Health</CardTitle>
                        <Activity className="h-4 w-4 text-green-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold text-green-600">99.9%</div>
                        <p className="text-xs text-muted-foreground">Uptime this week</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">New Signups</CardTitle>
                        <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">+128</div>
                        <p className="text-xs text-muted-foreground">in last 30 days</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">1,245</div>
                        <p className="text-xs text-muted-foreground">+8.2% conversion rate</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Active Vendors</CardTitle>
                        <Zap className="h-4 w-4 text-yellow-500" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">48</div>
                        <p className="text-xs text-muted-foreground">12 pending approval</p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Top Vendors */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Top Performing Vendors</CardTitle>
                        <CardDescription>Vendors with highest revenue this month</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            {topVendors.map((vendor, index) => (
                                <div key={index} className="flex items-center">
                                    <Avatar className="h-9 w-9">
                                        <AvatarImage src={vendor.avatar} alt="Avatar" />
                                        <AvatarFallback>V</AvatarFallback>
                                    </Avatar>
                                    <div className="ml-4 space-y-1">
                                        <p className="text-sm font-medium leading-none">{vendor.name}</p>
                                        <p className="text-sm text-muted-foreground">
                                            {vendor.orders} Orders
                                        </p>
                                    </div>
                                    <div className="ml-auto font-medium">
                                        +₹{vendor.revenue.toLocaleString()}
                                    </div>
                                    <Badge variant="outline" className="ml-4 bg-yellow-50 text-yellow-700 border-yellow-200">
                                        {vendor.rating} ★
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Recent Activities Placeholder */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Recent Activity</CardTitle>
                        <CardDescription>Platform-wide actions</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-8">
                            <div className="flex">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-blue-100 items-center justify-center text-blue-600 font-bold text-xs">A</span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Account Created</p>
                                    <p className="text-sm text-muted-foreground">2 min ago • user@example.com</p>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-green-100 items-center justify-center text-green-600 font-bold text-xs">P</span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Order #3201 Completed</p>
                                    <p className="text-sm text-muted-foreground">15 min ago • ₹12,500</p>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-yellow-100 items-center justify-center text-yellow-600 font-bold text-xs">S</span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">New Service Inquiry</p>
                                    <p className="text-sm text-muted-foreground">1 hour ago • Custom Portrait</p>
                                </div>
                            </div>
                            <div className="flex">
                                <span className="relative flex shrink-0 overflow-hidden rounded-full h-9 w-9 bg-red-100 items-center justify-center text-red-600 font-bold text-xs">R</span>
                                <div className="ml-4 space-y-1">
                                    <p className="text-sm font-medium leading-none">Report Flagged</p>
                                    <p className="text-sm text-muted-foreground">2 hours ago • Content Policy</p>
                                </div>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
