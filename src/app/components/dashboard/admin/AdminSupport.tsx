import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, MessageSquare, Send, CheckCircle, Clock } from 'lucide-react';
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetHeader,
    SheetTitle,
} from "../../ui/sheet";
import { Textarea } from '../../ui/textarea';
import { ScrollArea } from '../../ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import { toast } from 'sonner';

// Mock Ticket Data
const mockTickets = [
    {
        id: 'TKT-1001', user: 'Amit S.', subject: 'Payment Issue - Order #1234', status: 'open', priority: 'high', date: '2024-02-17', messages: [
            { sender: 'user', text: 'I tried to pay specifically with UPI but it failed twice. Money deducted.', time: '10:00 AM' }
        ]
    },
    {
        id: 'TKT-1002', user: 'Sarah K.', subject: 'Return Request for Painting', status: 'pending', priority: 'medium', date: '2024-02-16', messages: [
            { sender: 'user', text: 'The painting frame is slightly damaged. Can I return it?', time: 'Yesterday' },
            { sender: 'admin', text: 'Hi Sarah, could you please send us a photo of the damage?', time: 'Yesterday' }
        ]
    },
    { id: 'TKT-1003', user: 'Meera R.', subject: 'Vendor Application Inquiry', status: 'closed', priority: 'low', date: '2024-02-15', messages: [] },
];

export function AdminSupport() {
    const [searchTerm, setSearchTerm] = useState('');
    const [tickets, setTickets] = useState(mockTickets);
    const [selectedTicket, setSelectedTicket] = useState<any>(null);
    const [replyText, setReplyText] = useState('');

    const filteredTickets = tickets.filter(t =>
        t.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        t.user.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleSendReply = () => {
        if (!replyText.trim()) return;

        const updatedTickets = tickets.map(t => {
            if (t.id === selectedTicket.id) {
                return {
                    ...t,
                    messages: [...t.messages, { sender: 'admin', text: replyText, time: 'Just now' }]
                };
            }
            return t;
        });

        setTickets(updatedTickets);
        // Also update local selected ticket state to show new message immediately
        setSelectedTicket({
            ...selectedTicket,
            messages: [...selectedTicket.messages, { sender: 'admin', text: replyText, time: 'Just now' }]
        });

        setReplyText('');
        toast.success("Reply sent.");
    };

    const handleCloseTicket = () => {
        setTickets(tickets.map(t => t.id === selectedTicket.id ? { ...t, status: 'closed' } : t));
        setSelectedTicket(null);
        toast.success("Ticket closed.");
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">Support Tickets</h2>
                    <p className="text-muted-foreground">Manage customer inquiries and issues.</p>
                </div>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search tickets..."
                            className="pl-8"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Tickets</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Ticket ID</TableHead>
                                <TableHead>User</TableHead>
                                <TableHead>Subject</TableHead>
                                <TableHead>Priority</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Date</TableHead>
                                <TableHead className="text-right">Action</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredTickets.map((ticket) => (
                                <TableRow key={ticket.id} className="cursor-pointer hover:bg-gray-50" onClick={() => setSelectedTicket(ticket)}>
                                    <TableCell className="font-medium">{ticket.id}</TableCell>
                                    <TableCell>{ticket.user}</TableCell>
                                    <TableCell>{ticket.subject}</TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            ticket.priority === 'high' ? 'bg-red-50 text-red-700 border-red-200' :
                                                ticket.priority === 'medium' ? 'bg-orange-50 text-orange-700 border-orange-200' :
                                                    'bg-blue-50 text-blue-700 border-blue-200'
                                        }>
                                            {ticket.priority}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className={
                                            ticket.status === 'open' ? 'bg-green-100 text-green-800' :
                                                ticket.status === 'closed' ? 'bg-gray-100 text-gray-800' :
                                                    'bg-yellow-100 text-yellow-800'
                                        }>
                                            {ticket.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{ticket.date}</TableCell>
                                    <TableCell className="text-right">
                                        <Button variant="ghost" size="sm">View</Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <Sheet open={!!selectedTicket} onOpenChange={(open) => !open && setSelectedTicket(null)}>
                <SheetContent className="w-[400px] sm:w-[540px] flex flex-col h-full">
                    <SheetHeader>
                        <SheetTitle className="flex items-center gap-2">
                            {selectedTicket?.id}
                            <Badge variant="outline">{selectedTicket?.status}</Badge>
                        </SheetTitle>
                        <SheetDescription>
                            Subject: <span className="font-medium text-foreground">{selectedTicket?.subject}</span>
                        </SheetDescription>
                    </SheetHeader>

                    <div className="flex-1 flex flex-col gap-4 py-4 overflow-hidden">
                        <ScrollArea className="flex-1 pr-4">
                            <div className="space-y-4">
                                {selectedTicket?.messages.map((msg: any, i: number) => (
                                    <div key={i} className={`flex gap-3 ${msg.sender === 'admin' ? 'flex-row-reverse' : ''}`}>
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={`https://avatar.vercel.sh/${msg.sender}`} />
                                            <AvatarFallback>{msg.sender[0].toUpperCase()}</AvatarFallback>
                                        </Avatar>
                                        <div className={`rounded-lg p-3 max-w-[80%] ${msg.sender === 'admin'
                                                ? 'bg-blue-600 text-white'
                                                : 'bg-gray-100 text-gray-900'
                                            }`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <span className={`text-[10px] mt-1 block opacity-70 ${msg.sender === 'admin' ? 'text-blue-100' : 'text-gray-500'
                                                }`}>
                                                {msg.time}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                                {selectedTicket?.messages.length === 0 && (
                                    <p className="text-center text-muted-foreground text-sm italic py-10">No messages yet.</p>
                                )}
                            </div>
                        </ScrollArea>

                        <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                            <Textarea
                                placeholder="Type your reply..."
                                value={replyText}
                                onChange={(e) => setReplyText(e.target.value)}
                                className="min-h-[100px]"
                            />
                            <div className="flex justify-between items-center">
                                <Button variant="outline" className="text-red-600 border-red-200 hover:bg-red-50" onClick={handleCloseTicket}>
                                    <CheckCircle className="w-4 h-4 mr-2" /> Close Ticket
                                </Button>
                                <Button onClick={handleSendReply}>
                                    <Send className="w-4 h-4 mr-2" /> Send Reply
                                </Button>
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
}
