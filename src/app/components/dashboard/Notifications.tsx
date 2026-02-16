import { useState } from 'react';
import { Bell, CheckCheck, Trash2 } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { toast } from 'sonner';

export function Notifications() {
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            title: 'Order Shipped',
            message: 'Your order #ORD-2023-001 has been shipped via BlueDart.',
            date: '2 hours ago',
            read: false
        },
        {
            id: 2,
            title: 'New Arrival Alert',
            message: 'Discover our latest collection of abstract art prints.',
            date: '1 day ago',
            read: true
        },
        {
            id: 3,
            title: 'Review Request',
            message: 'How did you like your recent purchase? Leave a review and get 50 points.',
            date: '3 days ago',
            read: true
        }
    ]);

    const handleClearAll = () => {
        setNotifications([]);
        toast.success('All notifications cleared');
    };

    const handleMarkRead = (id: number) => {
        setNotifications(notifications.map(n => n.id === id ? { ...n, read: true } : n));
    };

    if (notifications.length === 0) {
        return (
            <div className="flex flex-col items-center justify-center py-12 text-center text-gray-500">
                <Bell className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-900">No Notifications</h3>
                <p>You're all caught up!</p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold">Notifications</h2>
                <Button variant="outline" size="sm" onClick={handleClearAll} className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50">
                    <Trash2 className="w-4 h-4" /> Clear All
                </Button>
            </div>
            <div className="space-y-2">
                {notifications.map((notification) => (
                    <Card key={notification.id} className={`transition-colors ${notification.read ? 'bg-white' : 'bg-blue-50/50 border-blue-100'}`}>
                        <CardContent className="p-4 flex gap-4 items-start">
                            <div className={`mt-1 w-2 h-2 rounded-full ${notification.read ? 'bg-gray-300' : 'bg-blue-600'}`} />
                            <div className="flex-1">
                                <div className="flex justify-between items-start">
                                    <h3 className={`font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>{notification.title}</h3>
                                    <span className="text-xs text-gray-500">{notification.date}</span>
                                </div>
                                <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                            </div>
                            {!notification.read && (
                                <Button variant="ghost" size="icon" className="h-6 w-6 text-blue-600" onClick={() => handleMarkRead(notification.id)} title="Mark as read">
                                    <CheckCheck className="w-4 h-4" />
                                </Button>
                            )}
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    );
}
