import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, Eye, Check, X } from 'lucide-react';
import { allProducts } from '../../../data/mockData';

export function AdminArtworks() {
    const [searchTerm, setSearchTerm] = useState('');

    // Filter mainly logical products, excluding services for this view if needed, 
    // but allProducts contains mostly art products.
    const filteredArtworks = allProducts.filter(art =>
        art.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        art.artist.toLowerCase().includes(searchTerm.toLowerCase())
    );

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
                                        <Badge variant="outline" className="bg-yellow-50 text-yellow-700 border-yellow-200">
                                            Pending Review
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2">
                                            <Button size="sm" variant="ghost" title="View Details">
                                                <Eye className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" className="bg-green-600 hover:bg-green-700 h-8 w-8 p-0" title="Approve">
                                                <Check className="h-4 w-4" />
                                            </Button>
                                            <Button size="sm" variant="destructive" className="h-8 w-8 p-0" title="Reject">
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
        </div>
    );
}
