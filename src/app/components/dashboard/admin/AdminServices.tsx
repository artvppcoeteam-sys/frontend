import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Search, Plus, MoreHorizontal, Edit, Trash, ToggleLeft, Palette, Camera, Video, PenTool, Check, Monitor } from 'lucide-react';
import { services as mockServices } from '../../../data/mockData';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "../../ui/select";
import { toast } from 'sonner';

// Helper to render icon
const renderIcon = (iconName: string) => {
    switch (iconName) {
        case 'Palette': return <Palette className="w-5 h-5" />;
        case 'Camera': return <Camera className="w-5 h-5" />;
        case 'Video': return <Video className="w-5 h-5" />;
        case 'PenTool': return <PenTool className="w-5 h-5" />;
        case 'Monitor': return <Monitor className="w-5 h-5" />;
        default: return <Palette className="w-5 h-5" />;
    }
};

export function AdminServices() {
    const [searchTerm, setSearchTerm] = useState('');
    // Initialize services with an 'active' status if not present in mockData
    const [services, setServices] = useState(mockServices.map(s => ({ ...s, active: true, iconName: 'Palette' })));
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingId, setEditingId] = useState<number | null>(null);

    // Form State
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        startingPrice: '',
        deliveryTime: '',
        iconName: 'Palette'
    });

    const filteredServices = services.filter(service =>
        service.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        service.category.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const resetForm = () => {
        setFormData({
            title: '',
            category: '',
            startingPrice: '',
            deliveryTime: '',
            iconName: 'Palette'
        });
        setEditingId(null);
    };

    const handleOpenAdd = () => {
        resetForm();
        setIsDialogOpen(true);
    };

    const handleOpenEdit = (service: any) => {
        setFormData({
            title: service.title,
            category: service.category,
            startingPrice: service.startingPrice.toString(),
            deliveryTime: service.deliveryTime,
            iconName: service.iconName || 'Palette'
        });
        setEditingId(service.id);
        setIsDialogOpen(true);
    };

    const handleSave = () => {
        if (!formData.title || !formData.category || !formData.startingPrice) {
            toast.error("Please fill in all required fields.");
            return;
        }

        if (editingId) {
            // Edit existing service
            setServices(services.map(s => s.id === editingId ? {
                ...s,
                ...formData,
                startingPrice: Number(formData.startingPrice),
                // @ts-ignore - simple icon mapping for demo
                icon: renderIcon(formData.iconName)
            } : s));
            toast.success("Service updated successfully.");
        } else {
            // Add new service
            const newId = Math.max(...services.map(s => s.id)) + 1;
            setServices([...services, {
                id: newId,
                ...formData,
                startingPrice: Number(formData.startingPrice),
                active: true,
                // @ts-ignore
                icon: renderIcon(formData.iconName)
            }]);
            toast.success("Service added successfully.");
        }
        setIsDialogOpen(false);
        resetForm();
    };

    const handleDelete = (id: number) => {
        setServices(services.filter(s => s.id !== id));
        toast.error("Service deleted.");
    };

    const handleToggleStatus = (id: number) => {
        setServices(services.map(s => s.id === id ? { ...s, active: !s.active } : s));
        const status = services.find(s => s.id === id)?.active ? "deactivated" : "activated";
        toast.success(`Service ${status}.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Service Management</h2>
                <Button onClick={handleOpenAdd} className="bg-[#D4AF37] hover:bg-[#C19B2A]">
                    <Plus className="mr-2 h-4 w-4" /> Add New Service
                </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                        <DialogTitle>{editingId ? 'Edit Service' : 'Add New Service'}</DialogTitle>
                        <DialogDescription>
                            {editingId ? 'Modify service details below.' : 'Create a new service offering for the marketplace.'}
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="title" className="text-right">Title</Label>
                            <Input
                                id="title"
                                value={formData.title}
                                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                className="col-span-3"
                                placeholder="e.g. Custom Portrait"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="category" className="text-right">Category</Label>
                            <Select
                                onValueChange={(val) => setFormData({ ...formData, category: val })}
                                value={formData.category}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select category" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Commission">Commission</SelectItem>
                                    <SelectItem value="Workshop">Workshop</SelectItem>
                                    <SelectItem value="Restoration">Restoration</SelectItem>
                                    <SelectItem value="Framing">Framing</SelectItem>
                                    <SelectItem value="Digital">Digital Art</SelectItem>
                                    <SelectItem value="Media Services">Media Services</SelectItem>
                                    <SelectItem value="3D Art">3D Art</SelectItem>
                                    <SelectItem value="Rental">Rental</SelectItem>
                                    <SelectItem value="Wall Art">Wall Art</SelectItem>
                                    <SelectItem value="Display Art">Display Art</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="price" className="text-right">Price (₹)</Label>
                            <Input
                                id="price"
                                type="number"
                                value={formData.startingPrice}
                                onChange={(e) => setFormData({ ...formData, startingPrice: e.target.value })}
                                className="col-span-3"
                                placeholder="e.g. 5000"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="time" className="text-right">Delivery Time</Label>
                            <Input
                                id="time"
                                value={formData.deliveryTime}
                                onChange={(e) => setFormData({ ...formData, deliveryTime: e.target.value })}
                                className="col-span-3"
                                placeholder="e.g. 2-3 weeks"
                            />
                        </div>
                        <div className="grid grid-cols-4 items-center gap-4">
                            <Label htmlFor="icon" className="text-right">Icon</Label>
                            <Select
                                onValueChange={(val) => setFormData({ ...formData, iconName: val })}
                                value={formData.iconName}
                            >
                                <SelectTrigger className="col-span-3">
                                    <SelectValue placeholder="Select Icon" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Palette">Palette</SelectItem>
                                    <SelectItem value="Camera">Camera</SelectItem>
                                    <SelectItem value="Video">Video</SelectItem>
                                    <SelectItem value="PenTool">Pen Tool</SelectItem>
                                    <SelectItem value="Monitor">Monitor</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <DialogFooter>
                        <Button type="submit" onClick={handleSave}>
                            {editingId ? 'Update Service' : 'Save Service'}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <Card>
                <CardHeader>
                    <div className="flex justify-between items-center">
                        <div>
                            <CardTitle>Active Services</CardTitle>
                            <CardDescription>Manage Artvpp service offerings and packages.</CardDescription>
                        </div>
                        <div className="relative w-64">
                            <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search services..."
                                className="pl-8"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                    </div>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Service Name</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Delivery Time</TableHead>
                                <TableHead>Starting Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredServices.map((service) => (
                                <TableRow key={service.id} className={!service.active ? 'opacity-50 bg-gray-50' : ''}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-700">
                                                {renderIcon(service.iconName || 'Palette')}
                                            </div>
                                            <span>{service.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary">{service.category}</Badge>
                                    </TableCell>
                                    <TableCell>{service.deliveryTime}</TableCell>
                                    <TableCell>₹{service.startingPrice.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge className={service.active ? 'bg-green-100 text-green-700 hover:bg-green-200' : 'bg-gray-100 text-gray-500 hover:bg-gray-200'}>
                                            {service.active ? 'Active' : 'Inactive'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleOpenEdit(service)}>
                                                    <Edit className="mr-2 h-4 w-4" /> Edit Service
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleToggleStatus(service.id)}>
                                                    <ToggleLeft className="mr-2 h-4 w-4" />
                                                    {service.active ? 'Deactivate' : 'Activate'}
                                                </DropdownMenuItem>
                                                <DropdownMenuItem className="text-red-600" onClick={() => handleDelete(service.id)}>
                                                    <Trash className="mr-2 h-4 w-4" /> Delete
                                                </DropdownMenuItem>
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>
        </div>
    );
}
