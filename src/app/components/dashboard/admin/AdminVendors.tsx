import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Check, X, MessageSquare, Eye, Store } from 'lucide-react';
import { toast } from 'sonner';
import { vendorApplications } from '../../../data/mockData'; // Assuming I can reuse or need to mock this

// Re-mocking data here for self-containment if needed or extending imported data
const initialVendors = [
    ...vendorApplications,
    {
        id: 'v-101', name: 'Arjun Verma', avatar: 'https://github.com/shadcn.png',
        specialty: 'Oil Painting', status: 'active', email: 'arjun@art.com',
        joined: '2023-11-15', revenue: 45000, products: 12
    },
    {
        id: 'v-102', name: 'Zara Khan', avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100',
        specialty: 'Digital Art', status: 'active', email: 'zara@digital.com',
        joined: '2024-01-10', revenue: 28000, products: 8
    }
];

export function AdminVendors() {
    const [vendors, setVendors] = useState(initialVendors);
    const [selectedVendor, setSelectedVendor] = useState<any>(null);

    const handleStatusChange = (id: string, newStatus: string) => {
        setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
        toast.success(`Vendor ${newStatus === 'active' ? 'approved' : 'rejected'}`);
    };

    const handleSuggestion = (id: string) => {
        toast.info("Suggestion sent to vendor (Mock)");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Vendor Management</h2>
                    <p className="text-muted-foreground">Approve, reject, or manage platform sellers.</p>
                </div>
                <div className="flex gap-2">
                    <Card className="p-2 flex items-center gap-2 bg-blue-50 border-blue-100">
                        <Store className="w-4 h-4 text-blue-600" />
                        <span className="font-bold text-blue-700">{vendors.length}</span>
                        <span className="text-xs text-blue-600">Total Vendors</span>
                    </Card>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>All Vendors & Applications</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Vendor Profile</TableHead>
                                <TableHead>Specialty</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Stats</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {vendors.map((vendor) => (
                                <TableRow key={vendor.id}>
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <Avatar>
                                                <AvatarImage src={vendor.avatar} />
                                                <AvatarFallback>{vendor.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <p className="font-medium">{vendor.name}</p>
                                                <p className="text-xs text-muted-foreground">{vendor.email}</p>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>{vendor.specialty}</TableCell>
                                    <TableCell>
                                        <Badge variant={
                                            vendor.status === 'active' ? 'default' :
                                                vendor.status === 'rejected' ? 'destructive' : 'secondary'
                                        } className={
                                            vendor.status === 'active' ? 'bg-green-600' :
                                                vendor.status === 'pending' ? 'bg-yellow-500 hover:bg-yellow-600' : ''
                                        }>
                                            {vendor.status.toUpperCase()}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <div className="text-xs text-muted-foreground">
                                            <p>{(vendor as any).products || 0} Products</p>
                                            <p>₹{((vendor as any).revenue || 0).toLocaleString()} Sales</p>
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            {vendor.status === 'pending' && (
                                                <>
                                                    <Button size="sm" variant="outline" className="text-green-600 border-green-200 hover:bg-green-50"
                                                        onClick={() => handleStatusChange(vendor.id, 'active')}>
                                                        <Check className="w-4 h-4 mr-1" /> Approve
                                                    </Button>
                                                    <Button size="sm" variant="outline" className="text-red-600 border-red-200 hover:bg-red-50"
                                                        onClick={() => handleStatusChange(vendor.id, 'rejected')}>
                                                        <X className="w-4 h-4 mr-1" /> Reject
                                                    </Button>
                                                </>
                                            )}
                                            {vendor.status === 'active' && (
                                                <Button size="sm" variant="outline" onClick={() => handleSuggestion(vendor.id)}>
                                                    <MessageSquare className="w-4 h-4 mr-1" /> Suggestion
                                                </Button>
                                            )}
                                            <Button size="sm" variant="ghost" onClick={() => setSelectedVendor(vendor)}>
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            {/* Vendor Profile Detail Modal (Mock) */}
            {selectedVendor && (
                <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
                    <Card className="w-full max-w-2xl bg-white animate-in zoom-in-95">
                        <CardHeader className="flex flex-row items-start justify-between">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={selectedVendor.avatar} />
                                    <AvatarFallback>{selectedVendor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <CardTitle>{selectedVendor.name}</CardTitle>
                                    <CardDescription>{selectedVendor.email}</CardDescription>
                                    <div className="mt-2 flex gap-2">
                                        <Badge>{selectedVendor.specialty}</Badge>
                                        <Badge variant="outline">{selectedVendor.status}</Badge>
                                    </div>
                                </div>
                            </div>
                            <Button variant="ghost" size="icon" onClick={() => setSelectedVendor(null)}>
                                <X className="w-4 h-4" />
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">Detailed Info</h4>
                                    <p className="text-sm text-gray-600">Experience: {selectedVendor.experience || 'N/A'}</p>
                                    <p className="text-sm text-gray-600">Joined: {selectedVendor.joined || 'Pending'}</p>
                                </div>
                                <div className="p-4 bg-gray-50 rounded-lg">
                                    <h4 className="font-semibold mb-2">Performance</h4>
                                    <p className="text-sm text-gray-600">Total Sales: ₹{selectedVendor.revenue?.toLocaleString() || 0}</p>
                                    <p className="text-sm text-gray-600">Products Listed: {selectedVendor.products || 0}</p>
                                </div>
                            </div>
                            <div className="mt-6 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => handleSuggestion(selectedVendor.id)}>
                                    <MessageSquare className="w-4 h-4 mr-2" />
                                    Send Suggestion
                                </Button>
                                {selectedVendor.status === 'pending' ? (
                                    <>
                                        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => { handleStatusChange(selectedVendor.id, 'rejected'); setSelectedVendor(null); }}>
                                            Reject Application
                                        </Button>
                                        <Button className="bg-green-600 hover:bg-green-700 text-white" onClick={() => { handleStatusChange(selectedVendor.id, 'active'); setSelectedVendor(null); }}>
                                            Approve Vendor
                                        </Button>
                                    </>
                                ) : (
                                    <Button variant="destructive">Suspend Vendor</Button>
                                )}
                            </div>
                        </CardContent>
                    </Card>
                </div>
            )}
        </div>
    );
}
