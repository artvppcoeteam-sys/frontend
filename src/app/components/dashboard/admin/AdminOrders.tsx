import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, Eye, Truck, CheckCircle, AlertTriangle } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../../ui/tabs';
import { platformOrders } from '../../../data/mockData';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { toast } from 'sonner';

// Extended Mock Data for Orders
const mockOrders = [
    ...platformOrders,
    { id: 'ORD-2024-004', customer: 'Rohan G.', product: 'Abstract #4', amount: 15000, status: 'shipped', date: '2024-02-15' },
    { id: 'ORD-2024-005', customer: 'Priya S.', product: 'Portrait Commission', amount: 8000, status: 'processing', date: '2024-02-16' },
];

export function AdminOrders() {
    const [searchTerm, setSearchTerm] = useState('');
    const [orders, setOrders] = useState(mockOrders);
    const [statusFilter, setStatusFilter] = useState('all');

    const filteredOrders = orders.filter(order => {
        const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
            order.customer.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleStatusUpdate = (orderId: string, newStatus: string) => {
        setOrders(orders.map(o => o.id === orderId ? { ...o, status: newStatus } : o));
        toast.success(`Order ${orderId} status updated to ${newStatus}`);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'delivered': return 'bg-green-100 text-green-700 hover:bg-green-100';
            case 'shipped': return 'bg-blue-100 text-blue-700 hover:bg-blue-100';
            case 'processing': return 'bg-yellow-100 text-yellow-700 hover:bg-yellow-100';
            case 'cancelled': return 'bg-red-100 text-red-700 hover:bg-red-100';
            default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100';
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Order Management</h2>
                    <p className="text-muted-foreground">Track and manage customer orders.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search orders..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Tabs defaultValue="all" className="w-full" onValueChange={setStatusFilter}>
                <TabsList>
                    <TabsTrigger value="all">All Orders</TabsTrigger>
                    <TabsTrigger value="processing">Processing</TabsTrigger>
                    <TabsTrigger value="shipped">Shipped</TabsTrigger>
                    <TabsTrigger value="delivered">Delivered</TabsTrigger>
                    <TabsTrigger value="cancelled">Cancelled</TabsTrigger>
                </TabsList>

                <TabsContent value="all" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Orders List</CardTitle>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Product/Service</TableHead>
                                        <TableHead>Date</TableHead>
                                        <TableHead>Amount</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead className="text-right">Update Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {filteredOrders.length > 0 ? filteredOrders.map((order) => (
                                        <TableRow key={order.id}>
                                            <TableCell className="font-medium text-blue-600">{order.id}</TableCell>
                                            <TableCell>{order.customer}</TableCell>
                                            <TableCell>{order.product}</TableCell>
                                            <TableCell>{order.date}</TableCell>
                                            <TableCell>₹{order.amount.toLocaleString()}</TableCell>
                                            <TableCell>
                                                <Badge className={getStatusColor(order.status)} variant="outline">
                                                    {order.status.toUpperCase()}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="text-right">
                                                <Select
                                                    defaultValue={order.status}
                                                    onValueChange={(val) => handleStatusUpdate(order.id, val)}
                                                >
                                                    <SelectTrigger className="w-[130px] ml-auto h-8 text-xs">
                                                        <SelectValue placeholder="Status" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectItem value="processing">Processing</SelectItem>
                                                        <SelectItem value="shipped">Shipped</SelectItem>
                                                        <SelectItem value="delivered">Delivered</SelectItem>
                                                        <SelectItem value="cancelled">Cancelled</SelectItem>
                                                    </SelectContent>
                                                </Select>
                                            </TableCell>
                                        </TableRow>
                                    )) : (
                                        <TableRow>
                                            <TableCell colSpan={7} className="text-center h-24 text-muted-foreground">
                                                No orders found matching criteria.
                                            </TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
                {/* Available tabs map to the same content since filtering is handled by state/filtering logic */}
                <TabsContent value="processing" className="mt-4">{/* Same structure rendered via state filter */}</TabsContent>
                <TabsContent value="shipped" className="mt-4">{/* Same structure rendered via state filter */}</TabsContent>
                <TabsContent value="delivered" className="mt-4">{/* Same structure rendered via state filter */}</TabsContent>
                <TabsContent value="cancelled" className="mt-4">{/* Same structure rendered via state filter */}</TabsContent>
            </Tabs>
        </div>
    );
}
