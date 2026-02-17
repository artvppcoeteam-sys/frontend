import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { Check, X, MessageSquare, Eye, Store, Upload, Send } from 'lucide-react';
import { toast } from 'sonner';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../../ui/dialog';
import { Textarea } from '../../ui/textarea';
import { Label } from '../../ui/label';
import { Input } from '../../ui/input';
import { vendorApplications } from '../../../data/mockData';

// Re-mocking/Extending data
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

    // Suggestion Modal State
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false);
    const [suggestionVendor, setSuggestionVendor] = useState<any>(null);
    const [suggestionText, setSuggestionText] = useState('');
    const [suggestionFile, setSuggestionFile] = useState<File | null>(null);

    const handleStatusChange = (id: string, newStatus: string) => {
        setVendors(vendors.map(v => v.id === id ? { ...v, status: newStatus } : v));
        toast.success(`Vendor ${newStatus === 'active' ? 'approved' : 'rejected'}`);
    };

    const openSuggestionModal = (vendor: any) => {
        setSuggestionVendor(vendor);
        setSuggestionText('');
        setSuggestionFile(null);
        setIsSuggestionOpen(true);
    };

    const handleSendSuggestion = () => {
        if (!suggestionText.trim()) {
            toast.error("Please enter a suggestion message.");
            return;
        }

        // Mock API call
        console.log(`Sending suggestion to ${suggestionVendor.name}:`, suggestionText, suggestionFile);

        toast.success(`Suggestion sent to ${suggestionVendor.name}`);
        setIsSuggestionOpen(false);
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
                                                <Button size="sm" variant="outline" onClick={() => openSuggestionModal(vendor)}>
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

            {/* Vendor Profile Detail Modal */}
            <Dialog open={!!selectedVendor} onOpenChange={(open) => !open && setSelectedVendor(null)}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>Vendor Details</DialogTitle>
                        <DialogDescription>Review vendor information and performance.</DialogDescription>
                    </DialogHeader>
                    {selectedVendor && (
                        <div className="space-y-6">
                            <div className="flex items-center gap-4">
                                <Avatar className="w-16 h-16">
                                    <AvatarImage src={selectedVendor.avatar} />
                                    <AvatarFallback>{selectedVendor.name.charAt(0)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h3 className="text-lg font-bold">{selectedVendor.name}</h3>
                                    <p className="text-sm text-muted-foreground">{selectedVendor.email}</p>
                                    <div className="mt-2 flex gap-2">
                                        <Badge>{selectedVendor.specialty}</Badge>
                                        <Badge variant="outline">{selectedVendor.status}</Badge>
                                    </div>
                                </div>
                            </div>

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

                            <div className="flex justify-end gap-2">
                                <Button variant="outline" onClick={() => { setSelectedVendor(null); openSuggestionModal(selectedVendor); }}>
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
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Suggestion Modal */}
            <Dialog open={isSuggestionOpen} onOpenChange={setIsSuggestionOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Send Suggestion</DialogTitle>
                        <DialogDescription>
                            Send a suggestion or feedback to <span className="font-semibold">{suggestionVendor?.name}</span>.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="space-y-4 py-4">
                        <div className="space-y-2">
                            <Label htmlFor="suggestion">Suggestion / Feedback</Label>
                            <Textarea
                                id="suggestion"
                                placeholder="Enter your suggestion here..."
                                className="min-h-[100px]"
                                value={suggestionText}
                                onChange={(e) => setSuggestionText(e.target.value)}
                            />
                            <div className="text-xs text-muted-foreground text-right">
                                {suggestionText.length} characters
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="file">Attachment (Optional)</Label>
                            <div className="flex items-center gap-2">
                                <Input
                                    id="file"
                                    type="file"
                                    className="cursor-pointer"
                                    onChange={(e) => setSuggestionFile(e.target.files?.[0] || null)}
                                />
                            </div>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="ghost" onClick={() => setIsSuggestionOpen(false)}>Cancel</Button>
                        <Button onClick={handleSendSuggestion} className="bg-green-600 hover:bg-green-700 text-white">
                            <Send className="w-4 h-4 mr-2" />
                            Send Suggestion
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
