import { useState } from 'react';
import { motion } from 'motion/react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { CheckCircle2, Upload, AlertCircle } from 'lucide-react';

export function SellArtPage() {
    const [status, setStatus] = useState<'idle' | 'pending' | 'approved' | 'rejected'>('idle');
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        mobile: '',
        bio: '',
        category: '',
        portfolio: ''
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Simulate API call and state change to pending
        setTimeout(() => {
            setStatus('pending');
        }, 1000);
    };

    if (status === 'pending') {
        return (
            <div className="min-h-screen py-20 px-4 flex items-center justify-center bg-gray-50">
                <Card className="max-w-md w-full text-center p-6">
                    <CardHeader>
                        <div className="mx-auto w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mb-4">
                            <AlertCircle className="w-8 h-8 text-yellow-600" />
                        </div>
                        <CardTitle className="text-2xl">Application Submitted</CardTitle>
                        <CardDescription>
                            Your vendor request has been submitted and is pending approval from our admin team.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-gray-500 mb-6">
                            You wil be notified via email once your account is approved. This usually takes 24-48 hours.
                        </p>
                        <Button variant="outline" onClick={() => setStatus('idle')} className="w-full">
                            Back to Home
                        </Button>
                    </CardContent>
                </Card>
            </div>
        );
    }

    return (
        <div className="min-h-screen relative bg-gray-900">
            {/* Extended Background Image */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1513364776144-60967b0f800f?q=80&w=2071&auto=format&fit=crop')] bg-cover bg-center opacity-30"></div>
                <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-gray-900/30 to-gray-900"></div>
            </div>

            <div className="relative z-10 flex flex-col items-center">
                {/* Hero Section */}
                <div className="w-full max-w-4xl mx-auto text-center space-y-6 py-24 px-4">
                    <motion.h1
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-4xl md:text-6xl font-serif font-bold tracking-tight text-white"
                    >
                        Great Art... Delivered to World
                    </motion.h1>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-lg md:text-xl text-gray-200 max-w-2xl mx-auto"
                    >
                        Join our curated community of artists. Apply to sell your artworks on ARTVPP and reach collectors globally.
                    </motion.p>
                </div>

                {/* Application Section */}
                <div className="w-full max-w-3xl px-4 pb-24">
                    <Card className="border-none shadow-2xl bg-white/95 backdrop-blur-sm">
                        <CardHeader className="text-center border-b pb-8">
                            <CardTitle className="text-3xl font-serif">Become a Vendor</CardTitle>
                            <CardDescription className="text-base text-gray-600">
                                Complete the application below. Our team reviews every portfolio to ensure quality.
                            </CardDescription>
                        </CardHeader>
                        <CardContent className="pt-8">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="fullName">Full Name</Label>
                                        <Input
                                            id="fullName"
                                            required
                                            placeholder="John Doe"
                                            value={formData.fullName}
                                            onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="email">Email Address</Label>
                                        <Input
                                            id="email"
                                            type="email"
                                            required
                                            placeholder="john@example.com"
                                            value={formData.email}
                                            onChange={e => setFormData({ ...formData, email: e.target.value })}
                                            className="bg-white"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <Label htmlFor="mobile">Mobile Number</Label>
                                        <Input
                                            id="mobile"
                                            required
                                            placeholder="+91 98765 43210"
                                            value={formData.mobile}
                                            onChange={e => setFormData({ ...formData, mobile: e.target.value })}
                                            className="bg-white"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="category">Primary Art Category</Label>
                                        <Select
                                            value={formData.category}
                                            onValueChange={v => setFormData({ ...formData, category: v })}
                                        >
                                            <SelectTrigger className="bg-white">
                                                <SelectValue placeholder="Select category" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="painting">Painting</SelectItem>
                                                <SelectItem value="sculpture">Sculpture</SelectItem>
                                                <SelectItem value="photography">Photography</SelectItem>
                                                <SelectItem value="digital">Digital Art</SelectItem>
                                                <SelectItem value="mixed">Mixed Media</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="bio">About You / Artist Statement</Label>
                                    <Textarea
                                        id="bio"
                                        placeholder="Tell us about your artistic journey and style..."
                                        className="min-h-[100px] bg-white"
                                        value={formData.bio}
                                        onChange={e => setFormData({ ...formData, bio: e.target.value })}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="portfolio">Portfolio Link (Optional)</Label>
                                    <Input
                                        id="portfolio"
                                        placeholder="https://instagram.com/yourart"
                                        value={formData.portfolio}
                                        onChange={e => setFormData({ ...formData, portfolio: e.target.value })}
                                        className="bg-white"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label>Sample Artworks (Upload)</Label>
                                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:bg-gray-50 transition-colors cursor-pointer bg-white/50">
                                        <Upload className="mx-auto h-8 w-8 text-gray-400 mb-2" />
                                        <p className="text-sm text-gray-500">Click to upload or drag and drop</p>
                                        <p className="text-xs text-gray-400 mt-1">
                                            JPG, PNG or WEBP (Max 5MB each)
                                        </p>
                                    </div>
                                </div>

                                <div className="pt-4">
                                    <Button type="submit" className="w-full bg-[#D4AF37] hover:bg-[#C19B2A] text-white py-6 text-lg">
                                        Submit Application
                                    </Button>
                                    <p className="text-xs text-center text-gray-500 mt-4">
                                        By submitting, you agree to ARTVPP's Vendor Terms & Conditions.
                                    </p>
                                </div>
                            </form>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
