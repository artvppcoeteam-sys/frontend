import { useState } from 'react';
import { MapPin, Plus, MoreVertical, Trash2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { toast } from 'sonner';

interface Address {
    id: number;
    type: string;
    name: string;
    phone: string;
    address: string;
    isDefault: boolean;
}

export function ManageAddresses() {
    const [addresses, setAddresses] = useState<Address[]>([
        {
            id: 1,
            type: 'Home',
            name: 'John Doe',
            phone: '+91 98765 43210',
            address: '123 MG Road, Bangalore, Karnataka - 560001',
            isDefault: true
        },
        {
            id: 2,
            type: 'Office',
            name: 'John Doe',
            phone: '+91 98765 43210',
            address: '456 Brigade Road, Bangalore, Karnataka - 560025',
            isDefault: false
        }
    ]);

    const handleDelete = (id: number) => {
        setAddresses(addresses.filter(a => a.id !== id));
        toast.success('Address deleted successfully');
    };

    const handleSetDefault = (id: number) => {
        setAddresses(addresses.map(a => ({ ...a, isDefault: a.id === id })));
        toast.success('Default address updated');
    };

    const [isOpen, setIsOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);
    const [formData, setFormData] = useState({
        type: 'Home',
        name: '',
        phone: '',
        address: '',
        isDefault: false
    });

    const resetForm = () => {
        setFormData({
            type: 'Home',
            name: '',
            phone: '',
            address: '',
            isDefault: false
        });
        setEditingId(null);
    };

    const handleAddNew = () => {
        resetForm();
        setIsOpen(true);
    };

    const handleEdit = (address: Address) => {
        setFormData({
            type: address.type,
            name: address.name,
            phone: address.phone,
            address: address.address,
            isDefault: address.isDefault
        });
        setEditingId(address.id);
        setIsOpen(true);
    };

    const handleSave = () => {
        if (editingId) {
            setAddresses(addresses.map(a => a.id === editingId ? { ...formData, id: editingId } : a));
            toast.success('Address updated successfully');
        } else {
            const newId = Math.max(...addresses.map(a => a.id), 0) + 1;
            setAddresses([...addresses, { ...formData, id: newId }]);
            toast.success('New address added successfully');
        }
        setIsOpen(false);
        resetForm();
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Manage Addresses</h2>
                <Button onClick={handleAddNew} className="gap-2 bg-blue-600 hover:bg-blue-700">
                    <Plus className="w-4 h-4" />
                    Add New Address
                </Button>
            </div>

            <div className="space-y-4">
                {addresses.map((address) => (
                    <Card key={address.id} className="relative group hover:shadow-md transition-shadow">
                        <CardContent className="p-6">
                            <div className="flex justify-between items-start">
                                <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                        <Badge variant="outline" className="text-gray-500 uppercase text-xs tracking-wider">{address.type}</Badge>
                                        {address.isDefault && <Badge className="bg-gray-100 text-gray-600 hover:bg-gray-200">Default</Badge>}
                                    </div>
                                    <h3 className="font-semibold text-lg">{address.name}</h3>
                                    <p className="text-gray-600">{address.address}</p>
                                    <p className="text-gray-900 font-medium pt-2">Phone: {address.phone}</p>
                                </div>

                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                            <MoreVertical className="w-4 h-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuItem onClick={() => handleEdit(address)}>Edit</DropdownMenuItem>
                                        {!address.isDefault && (
                                            <DropdownMenuItem onClick={() => handleSetDefault(address.id)}>Set as Default</DropdownMenuItem>
                                        )}
                                        <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(address.id)}>
                                            Delete
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            {/* Address Modal (Dialog) would go here if using Dialog component, 
                but for simplicity and to avoid complex imports if Dialog isn't fully set up, 
                we'll use a simple conditional rendering or assume Dialog is available. 
                Let's use a simple overlay or check if we can import Dialog. 
                We checked and Dialog exists. Importing it now. */}

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
                    <div className="bg-white rounded-lg p-6 w-full max-w-md space-y-4 shadow-xl">
                        <h3 className="text-lg font-semibold">{editingId ? 'Edit Address' : 'Add New Address'}</h3>
                        <div className="space-y-3">
                            <div>
                                <label className="text-sm font-medium">Type (Home/Office)</label>
                                <select
                                    className="w-full border rounded p-2"
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value })}
                                >
                                    <option value="Home">Home</option>
                                    <option value="Office">Office</option>
                                    <option value="Other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="text-sm font-medium">Name</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="Full Name"
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Phone</label>
                                <input
                                    className="w-full border rounded p-2"
                                    value={formData.phone}
                                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                                    placeholder="+91..."
                                />
                            </div>
                            <div>
                                <label className="text-sm font-medium">Address</label>
                                <textarea
                                    className="w-full border rounded p-2"
                                    value={formData.address}
                                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                                    placeholder="Enter full address"
                                    rows={3}
                                />
                            </div>
                            <div className="flex items-center gap-2">
                                <input
                                    type="checkbox"
                                    id="isDefault"
                                    checked={formData.isDefault}
                                    onChange={(e) => setFormData({ ...formData, isDefault: e.target.checked })}
                                />
                                <label htmlFor="isDefault" className="text-sm">Set as default address</label>
                            </div>
                        </div>
                        <div className="flex justify-end gap-2 pt-2">
                            <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
                            <Button onClick={handleSave}>Save Address</Button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
