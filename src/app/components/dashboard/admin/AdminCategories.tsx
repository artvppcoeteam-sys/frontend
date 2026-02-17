import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Plus, Trash2, Edit2, Tag } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "../../ui/dialog";
import { Label } from '../../ui/label';
import { toast } from 'sonner';

// Mock Categories
const initialCategories = [
    { id: 1, name: 'Oil Painting', slug: 'oil-painting', count: 120 },
    { id: 2, name: 'Digital Art', slug: 'digital-art', count: 85 },
    { id: 3, name: 'Sculpture', slug: 'sculpture', count: 42 },
    { id: 4, name: 'Photography', slug: 'photography', count: 65 },
    { id: 5, name: 'Watercolor', slug: 'watercolor', count: 90 },
];

export function AdminCategories() {
    const [categories, setCategories] = useState(initialCategories);
    const [newCategory, setNewCategory] = useState('');
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const handleAddCategory = () => {
        if (!newCategory.trim()) return;

        const slug = newCategory.toLowerCase().replace(/\s+/g, '-');
        const newId = Math.max(...categories.map(c => c.id)) + 1;

        setCategories([...categories, { id: newId, name: newCategory, slug, count: 0 }]);
        setNewCategory('');
        setIsDialogOpen(false);
        toast.success(`Category "${newCategory}" added successfully.`);
    };

    const handleDelete = (id: number) => {
        setCategories(categories.filter(c => c.id !== id));
        toast.error("Category deleted.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Category Management</h2>
                    <p className="text-muted-foreground">Manage artwork categories and filters.</p>
                </div>
                <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-[#D4AF37] hover:bg-[#C19B2A]">
                            <Plus className="mr-2 h-4 w-4" /> Add Category
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Add New Category</DialogTitle>
                            <DialogDescription>
                                Create a new category for artworks.
                            </DialogDescription>
                        </DialogHeader>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="name" className="text-right">
                                    Name
                                </Label>
                                <Input
                                    id="name"
                                    value={newCategory}
                                    onChange={(e) => setNewCategory(e.target.value)}
                                    className="col-span-3"
                                    placeholder="e.g. Surrealism"
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button type="submit" onClick={handleAddCategory}>Save Category</Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Active Categories</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Category Name</TableHead>
                                <TableHead>Slug</TableHead>
                                <TableHead>Product Count</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {categories.map((cat) => (
                                <TableRow key={cat.id}>
                                    <TableCell className="font-medium flex items-center gap-2">
                                        <Tag className="w-4 h-4 text-gray-500" />
                                        {cat.name}
                                    </TableCell>
                                    <TableCell className="text-muted-foreground">{cat.slug}</TableCell>
                                    <TableCell>{cat.count} items</TableCell>
                                    <TableCell className="text-right">
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0" onClick={() => toast.info(`Editing ${cat.name}`)}>
                                            <Edit2 className="h-4 w-4" />
                                        </Button>
                                        <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDelete(cat.id)}>
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
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
