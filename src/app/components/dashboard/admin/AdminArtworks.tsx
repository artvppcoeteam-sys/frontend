import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, Eye, Check, X, Star } from 'lucide-react';
import { allProducts } from '../../../data/mockData';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
    SheetFooter,
    SheetClose,
} from "../../ui/sheet";
import { toast } from 'sonner';

export function AdminArtworks() {
    const [searchTerm, setSearchTerm] = useState('');
    const [artworks, setArtworks] = useState(allProducts);
    const [selectedArtwork, setSelectedArtwork] = useState<any>(null);

    const filteredArtworks = artworks.filter(art =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleApprove = (id: number) => {
        setArtworks(artworks.map(art => art.id === id ? { ...art, status: 'approved' } : art)); // Mock status update
        toast.success("Artwork approved successfully.");
        if (selectedArtwork?.id === id) setSelectedArtwork(null);
    };

    const handleReject = (id: number) => {
        setArtworks(artworks.map(art => art.id === id ? { ...art, status: 'rejected' } : art)); // Mock status update
        toast.error("Artwork rejected.");
        if (selectedArtwork?.id === id) setSelectedArtwork(null);
    };

    const toggleFeatured = (id: number) => {
        // Toggle logic (mock)
        toast.success("Featured status updated.");
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">Artwork Moderation</h2>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search artworks..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                    <Button variant="outline" size="icon"><Filter className="w-4 h-4" /></Button>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Artwork Submissions</CardTitle>
                    <CardDescription>Review and approve new artwork listings from vendors.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Artwork</TableHead>
                                <TableHead>Artist</TableHead>
                                <TableHead>Category</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredArtworks.map((art) => (
                                <TableRow key={art.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="h-12 w-12 rounded bg-gray-100 overflow-hidden">
                                                <img src={art.image} alt={art.title} className="h-full w-full object-cover" />
                                            </div>
                                            <span>{art.title}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>{art.artist}</TableCell>
                                    <TableCell>{art.category}</TableCell>
                                    <TableCell>₹{art.price.toLocaleString()}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            (art as any).status === 'approved' ? "bg-green-50 text-green-700 border-green-200" :
                                                (art as any).status === 'rejected' ? "bg-red-50 text-red-700 border-red-200" :
                                                    "bg-yellow-50 text-yellow-700 border-yellow-200"
                                        }>
                                            {(art as any).status || 'Pending Review'}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" title="View Details" onClick={() => setSelectedArtwork(art)}>
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0" title="Approve" onClick={() => handleApprove(art.id)}>
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" className="h-8 w-8 p-0" title="Reject" onClick={() => handleReject(art.id)}>
                                                <X className="h-4 w-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Sheet open={!!selectedArtwork} onOpenChange={(open) => !open && setSelectedArtwork(null)}>
                <SheetContent className="sm:max-w-md overflow-y-auto">
                    <SheetHeader>
                        <SheetTitle>Artwork Details</SheetTitle>
                        <SheetDescription>Review artwork specifications.</SheetDescription>
                    </SheetHeader>
                    {selectedArtwork && (
                        <div className="space-y-6 py-6">
                            <div className="rounded-lg overflow-hidden border border-gray-200">
                                <img src={selectedArtwork.image} alt={selectedArtwork.title} className="w-full h-auto object-cover" />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold">{selectedArtwork.title}</h3>
                                <p className="text-muted-foreground">{selectedArtwork.artist}</p>
                                <div className="mt-2 flex gap-2">
                                    <Badge>{selectedArtwork.category}</Badge>
                                    <Badge variant="secondary">₹{selectedArtwork.price.toLocaleString()}</Badge>
                                </div>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Description</h4>
                                <p className="text-sm text-gray-600">
                                    This is a masterpiece created by {selectedArtwork.artist}. It represents the
                                    finest quality of {selectedArtwork.category.toLowerCase()} art.
                                    (Mock description for demo purposes).
                                </p>
                            </div>
                            <div className="space-y-2">
                                <h4 className="font-semibold text-sm">Dimensions & Details</h4>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="text-gray-500">Dimensions:</span>
                                        <p>24" x 36"</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Medium:</span>
                                        <p>Acrylic on Canvas</p>
                                    </div>
                                    <div>
                                        <span className="text-gray-500">Year:</span>
                                        <p>2024</p>
                                    </div>
                                </div>
                            </div>
                            <div className="pt-4 flex flex-col gap-3">
                                <Button variant="outline" className="w-full" onClick={() => toggleFeatured(selectedArtwork.id)}>
                                    <Star className="w-4 h-4 mr-2" /> Toggle Featured
                                </Button>
                                <div className="grid grid-cols-2 gap-3">
                                    <Button variant="destructive" onClick={() => handleReject(selectedArtwork.id)}>
                                        Reject
                                    </Button>
                                    <Button className="bg-green-600 hover:bg-green-700" onClick={() => handleApprove(selectedArtwork.id)}>
                                        Approve
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}
                </SheetContent>
            </Sheet>
        </div>
    );
}
