import { useState } from 'react';
import { Star, ThumbsUp, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';

export function MyReviews() {
    const [reviews, setReviews] = useState([
        {
            id: 1,
            productName: "Abstract Harmony Canvas",
            productImage: "https://images.unsplash.com/photo-1549887552-93f8efb873a4?w=500&q=80",
            rating: 5,
            date: "12 Oct 2023",
            title: "Absolutely stunning!",
            comment: "The colors are even more vibrant in person. It perfectly matches my living room decor. Highly recommended!",
            likes: 12
        },
        {
            id: 2,
            productName: "Golden Sunrise Print",
            productImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=500&q=80",
            rating: 4,
            date: "05 Sep 2023",
            title: "Great quality, fast shipping",
            comment: "The print quality is top-notch. The frame is sturdy. Deducted one star because the packaging was slightly damaged, but the art was fine.",
            likes: 4
        }
    ]);

    const handleDelete = (id: number) => {
        setReviews(reviews.filter(r => r.id !== id));
        toast.success('Review deleted successfully');
    };

    if (reviews.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <Star className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">No Reviews Yet</h3>
                <p>You haven't written any reviews yet.</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <h2 className="text-xl font-semibold">My Reviews & Ratings ({reviews.length})</h2>
            <div className="space-y-4">
                {reviews.map((review) => (
                    <Card key={review.id} className="overflow-hidden">
                        <CardContent className="p-6">
                            <div className="flex gap-4 items-start">
                                <img
                                    src={review.productImage}
                                    alt={review.productName}
                                    className="w-20 h-20 object-cover rounded-md bg-gray-100"
                                />
                                <div className="flex-1 space-y-2">
                                    <div className="flex justify-between">
                                        <div>
                                            <h3 className="font-semibold text-gray-900">{review.productName}</h3>
                                            <div className="flex items-center gap-2 mt-1">
                                                <div className="flex bg-green-600 text-white px-1.5 py-0.5 rounded text-xs items-center gap-0.5 font-bold">
                                                    {review.rating} <Star className="w-3 h-3 fill-white" />
                                                </div>
                                                <span className="text-xs font-semibold">{review.title}</span>
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-end gap-2">
                                            <span className="text-xs text-gray-500">{review.date}</span>
                                            <Button
                                                variant="ghost"
                                                size="sm"
                                                className="text-gray-400 hover:text-red-600 h-8"
                                                onClick={() => handleDelete(review.id)}
                                            >
                                                <Trash2 className="w-4 h-4 mr-2" /> Delete
                                            </Button>
                                        </div>
                                    </div>
                                    <p className="text-sm text-gray-600 leading-relaxed">
                                        {review.comment}
                                    </p>
                                    <div className="flex items-center gap-4 pt-2">
                                        <div className="flex items-center gap-1 text-xs text-gray-500">
                                            <ThumbsUp className="w-3 h-3" />
                                            <span>{review.likes} found this helpful</span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
