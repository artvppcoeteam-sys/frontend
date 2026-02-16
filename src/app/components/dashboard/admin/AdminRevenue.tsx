import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { adminAnalyticsData } from '../../../data/mockData';
import { ArrowUpRight, DollarSign, TrendingUp, CreditCard } from 'lucide-react';

export function AdminRevenue() {
    const { revenueByMonth, categoryRevenue } = adminAnalyticsData;
    const totalRevenue = revenueByMonth.reduce((acc, curr) => acc + curr.revenue, 0);

    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Revenue & Commission</h2>

            {/* Key Metrics */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                        <DollarSign className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{totalRevenue.toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            +20.1% from last month
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Commissions</CardTitle>
                        <TrendingUp className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹{(totalRevenue * 0.15).toLocaleString()}</div>
                        <p className="text-xs text-muted-foreground">
                            15% avg. platform fee
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Payouts Pending</CardTitle>
                        <CreditCard className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹18,975</div>
                        <p className="text-xs text-muted-foreground">
                            Next payout: Feb 20
                        </p>
                    </CardContent>
                </Card>
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                        <CardTitle className="text-sm font-medium">Avg. Order Value</CardTitle>
                        <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                        <div className="text-2xl font-bold">₹4,250</div>
                        <p className="text-xs text-muted-foreground">
                            +12% from last month
                        </p>
                    </CardContent>
                </Card>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
                {/* Revenue Overview Chart Placeholder */}
                <Card className="col-span-4">
                    <CardHeader>
                        <CardTitle>Revenue Overview</CardTitle>
                        <CardDescription>Monthly revenue performance for 2026</CardDescription>
                    </CardHeader>
                    <CardContent className="pl-2">
                        <div className="h-[300px] flex items-end justify-between px-4 gap-2">
                            {revenueByMonth.map((data, index) => (
                                <div key={index} className="flex flex-col items-center gap-2 w-full">
                                    <div
                                        className="w-full bg-[#D4AF37] rounded-t-sm transition-all hover:bg-[#C19B2A] relative group"
                                        style={{ height: `${(data.revenue / 130000) * 100}%` }}
                                    >
                                        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                                            ₹{data.revenue.toLocaleString()}
                                        </div>
                                    </div>
                                    <span className="text-xs text-muted-foreground font-medium">{data.month}</span>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Categories Breakdown */}
                <Card className="col-span-3">
                    <CardHeader>
                        <CardTitle>Revenue by Category</CardTitle>
                        <CardDescription>Top performing art categories</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-6">
                            {categoryRevenue.map((item, index) => (
                                <div key={index} className="space-y-2">
                                    <div className="flex items-center justify-between text-sm">
                                        <div className="font-medium">{item.name}</div>
                                        <div className="font-bold">₹{item.value.toLocaleString()}</div>
                                    </div>
                                    <div className="h-2 w-full bg-gray-100 rounded-full overflow-hidden">
                                        <div
                                            className="h-full rounded-full"
                                            style={{ width: `${(item.value / 250000) * 100}%`, backgroundColor: item.color }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
