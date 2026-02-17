import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../ui/tabs';
import { Plus, Trash2, Image as ImageIcon, ExternalLink, Save } from 'lucide-react';
import { toast } from 'sonner';

// Mock Data
const initialBanners = [
    { id: 1, title: 'Summer Sale', image: 'https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=800&q=80', active: true, link: '/collections/summer' },
    { id: 2, title: 'New Artist Spotlight', image: 'https://images.unsplash.com/photo-1513364776144-60967b0f800f?w=800&q=80', active: true, link: '/artists/featured' },
];

export function AdminContent() {
    const [banners, setBanners] = useState(initialBanners);

    const handleDeleteBanner = (id: number) => {
        setBanners(banners.filter(b => b.id !== id));
        toast.success("Banner removed.");
    };

    const handleSave = () => {
        toast.success("Content changes saved successfully.");
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Content Management</h2>
                    <p className="text-muted-foreground">Manage homepage banners, featured sections, and announcements.</p>
                </div>
            </div>

            <Tabs defaultValue="banners" className="w-full">
                <TabsList>
                    <TabsTrigger value="banners">Banners</TabsTrigger>
                    <TabsTrigger value="featured">Featured Section</TabsTrigger>
                    <TabsTrigger value="announcements">Announcements</TabsTrigger>
                </TabsList>

                <TabsContent value="banners" className="mt-4 space-y-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between">
                            <div>
                                <CardTitle>Homepage Banners</CardTitle>
                                <CardDescription>Manage the main carousel images on the homepage.</CardDescription>
                            </div>
                            <Button className="bg-[#D4AF37] hover:bg-[#C19B2A]">
                                <Plus className="mr-2 h-4 w-4" /> Add Banner
                            </Button>
                        </CardHeader>
                        <CardContent>
                            <div className="grid gap-6">
                                {banners.map((banner) => (
                                    <div key={banner.id} className="flex items-start gap-4 p-4 border rounded-lg bg-gray-50/50">
                                        <div className="w-48 h-24 bg-gray-200 rounded-md overflow-hidden flex-shrink-0">
                                            <img src={banner.image} alt={banner.title} className="w-full h-full object-cover" />
                                        </div>
                                        <div className="flex-1 space-y-2">
                                            <div className="grid grid-cols-2 gap-4">
                                                <div className="space-y-1">
                                                    <Label htmlFor={`title-${banner.id}`}>Title</Label>
                                                    <Input id={`title-${banner.id}`} defaultValue={banner.title} />
                                                </div>
                                                <div className="space-y-1">
                                                    <Label htmlFor={`link-${banner.id}`}>Link URL</Label>
                                                    <Input id={`link-${banner.id}`} defaultValue={banner.link} />
                                                </div>
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <Button size="sm" variant="outline" className="text-red-600 hover:text-red-700 hover:bg-red-50" onClick={() => handleDeleteBanner(banner.id)}>
                                                    <Trash2 className="w-4 h-4 mr-2" /> Remove
                                                </Button>
                                                <Button size="sm" variant="ghost">
                                                    <ImageIcon className="w-4 h-4 mr-2" /> Change Image
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </CardContent>
                    </Card>
                    <div className="flex justify-end">
                        <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                            <Save className="w-4 h-4 mr-2" /> Save Changes
                        </Button>
                    </div>
                </TabsContent>

                <TabsContent value="featured" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Featured Collections</CardTitle>
                            <CardDescription>Select which collections appear on the home page.</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="p-8 text-center text-muted-foreground border-2 border-dashed rounded-lg">
                                <p>Featured collection selector would go here.</p>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                <TabsContent value="announcements" className="mt-4">
                    <Card>
                        <CardHeader>
                            <CardTitle>Site-wide Announcements</CardTitle>
                            <CardDescription>Banner message displayed at the top of every page.</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label>Announcement Text</Label>
                                <Input placeholder="e.g. Free shipping on all orders over ₹5000!" />
                            </div>
                            <div className="space-y-2">
                                <Label>Link (Optional)</Label>
                                <Input placeholder="/sale" />
                            </div>
                            <div className="flex items-center gap-2">
                                <Button onClick={() => toast.success("Announcement updated")}>Update Announcement</Button>
                                <Button variant="outline" onClick={() => toast.info("Announcement cleared")}>Clear</Button>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    );
}
