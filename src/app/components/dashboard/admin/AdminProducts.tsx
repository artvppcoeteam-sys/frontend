import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Input } from '../../ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Search, Filter, ShoppingBag, Layers, Eye } from 'lucide-react';
import { vendorProducts, platformOrders } from '../../../data/mockData';

interface AdminProductsProps {
    activeTab?: string;
}

export function AdminProducts({ activeTab = 'products' }: AdminProductsProps) {
    return (
        <div className="space-y-6">
            <h2 className="text-2xl font-bold tracking-tight">Platform Content</h2>
            <Tabs defaultValue={activeTab}>
                <TabsList>
                    <TabsTrigger value="products">All Products</TabsTrigger>
                    <TabsTrigger value="services">All Services</TabsTrigger>
                    <TabsTrigger value="requests">Requested/Ordered</TabsTrigger>
                </TabsList>

                {/* All Products Tab */}
                <TabsContent value="products" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <div className="flex justify-between items-center">
                                <CardTitle>Product Listings</CardTitle>
                                <div className="flex gap-2">
                                    <div className="relative w-64">
                                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                                        <Input placeholder="Search products..." className="pl-8" />
                                    </div>
                                    <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                                </div>
                            </div>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Product</TableHead>
                                        <TableHead>Vendor</TableHead>
                                        <TableHead>Price</TableHead>
                                        <TableHead>Stock</TableHead>
                                        <TableHead>Status</TableHead>
                                        <TableHead>Actions</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {vendorProducts.map((p) => (
                                        <TableRow key={p.id}>
                                            <TableCell className="font-medium">
                                                <div className="flex items-center gap-2">
                                                    <img src={p.image} className="w-8 h-8 rounded object-cover" alt="" />
                                                    {p.name}
                                                </div>
                                            </TableCell>
                                            <TableCell>Vendor #123</TableCell> {/* Mock vendor linking */}
                                            <TableCell>₹{p.price.toLocaleString()}</TableCell>
                                            <TableCell>{p.stock}</TableCell>
                                            <TableCell><Badge variant="outline">{p.status}</Badge></TableCell>
                                            <TableCell>
                                                <Button size="sm" variant="ghost"><Eye className="w-4 h-4" /></Button>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* All Services Tab (Mock content as data might be missing) */}
                <TabsContent value="services" className="space-y-4">
                    <Card>
                        <CardHeader><CardTitle>Service Listings</CardTitle></CardHeader>
                        <CardContent>
                            <div className="text-center py-8 text-muted-foreground">
                                <Layers className="w-12 h-12 mx-auto mb-4 opacity-50" />
                                <p>Service listings (Workshops, Commissions) will appear here.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Requested/Ordered Tab */}
                <TabsContent value="requests" className="space-y-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Recent Requests & Orders</CardTitle>
                            <CardDescription>Track what users are buying or requesting</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Table>
                                <TableHeader>
                                    <TableRow>
                                        <TableHead>Order ID</TableHead>
                                        <TableHead>Item</TableHead>
                                        <TableHead>Type</TableHead>
                                        <TableHead>Customer</TableHead>
                                        <TableHead>Status</TableHead>
                                    </TableRow>
                                </TableHeader>
                                <TableBody>
                                    {platformOrders.map((o) => (
                                        <TableRow key={o.id}>
                                            <TableCell>{o.id}</TableCell>
                                            <TableCell>{o.product}</TableCell>
                                            <TableCell>
                                                <Badge variant="secondary">
                                                    {o.product.includes('Workshop') ? 'Service' : 'Product'}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>{o.customer}</TableCell>
                                            <TableCell><Badge>{o.status}</Badge></TableCell>
                                        </TableRow>
                                    ))}
                                </TableBody>
                            </Table>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
