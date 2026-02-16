import { useState } from 'react';
import { CreditCard, Wallet, Plus, Trash2 } from 'lucide-react';
import { Card, CardContent } from '../ui/card';
import { Button } from '../ui/button';
import { toast } from 'sonner';

export function Payments() {
    const [cards, setCards] = useState([
        { id: 1, type: 'Mastercard', number: '•••• •••• •••• 4242', holder: 'JOHN DOE', expiry: '12/25', logo: 'https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg' }
    ]);

    const [upi, setUpi] = useState([
        { id: 1, vpa: 'john.doe@okhdfcbank', app: 'Google Pay', icon: 'https://cdn-icons-png.flaticon.com/512/825/825454.png' }
    ]);

    const handleDeleteCard = (id: number) => {
        setCards(cards.filter(card => card.id !== id));
        toast.success('Card removed successfully');
    };

    const handleDeleteUpi = (id: number) => {
        setUpi(upi.filter(u => u.id !== id));
        toast.success('UPI ID removed successfully');
    };

    const handleAddCard = () => {
        const newCard = {
            id: Date.now(),
            type: 'Visa',
            number: '•••• •••• •••• 1234',
            holder: 'JOHN DOE',
            expiry: '01/28',
            logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg'
        };
        setCards([...cards, newCard]);
        toast.success('New card added successfully');
    };

    // ... (rest of the file remains similar but uses map for rendering)
    return (
        <div className="space-y-8">
            {/* Gift Cards - Keep Static for now or add basic state if needed, sticking to static for simplicity as requested primarily for edits/deletes */}
            <section>
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <Wallet className="w-5 h-5 text-blue-600" />
                    Gift Cards
                </h3>
                <Card className="bg-gradient-to-r from-blue-50 to-indigo-50 border-blue-100">
                    <CardContent className="flex justify-between items-center p-6">
                        <div>
                            <p className="text-sm text-gray-600 mb-1">Total Balance</p>
                            <p className="text-3xl font-bold text-gray-900">₹0</p>
                        </div>
                        <Button variant="outline" className="bg-white hover:bg-white/90">Add Gift Card</Button>
                    </CardContent>
                </Card>
            </section>

            {/* Saved Cards */}
            <section>
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-blue-600" />
                        Saved Cards
                    </h3>
                    <Button variant="outline" size="sm" className="gap-2" onClick={handleAddCard}>
                        <Plus className="w-4 h-4" />
                        Add New Card
                    </Button>
                </div>

                <div className="space-y-4">
                    {cards.length === 0 ? (
                        <p className="text-gray-500 text-sm">No saved cards.</p>
                    ) : (
                        cards.map(card => (
                            <Card key={card.id} className="max-w-md bg-gradient-to-br from-slate-900 to-slate-800 text-white">
                                <CardContent className="p-6">
                                    <div className="flex justify-between items-start mb-8">
                                        <CreditCard className="w-8 h-8 opacity-80" />
                                        <img src={card.logo} className="h-8 bg-white/90 rounded px-1" alt={card.type} />
                                    </div>
                                    <div className="mb-4">
                                        <p className="text-xs opacity-70 mb-1">Card Number</p>
                                        <p className="font-mono text-xl tracking-wider">{card.number}</p>
                                    </div>
                                    <div className="flex justify-between items-end">
                                        <div className="flex gap-8">
                                            <div>
                                                <p className="text-xs opacity-70 mb-1">Card Holder</p>
                                                <p className="font-medium">{card.holder}</p>
                                            </div>
                                            <div>
                                                <p className="text-xs opacity-70 mb-1">Expires</p>
                                                <p className="font-medium">{card.expiry}</p>
                                            </div>
                                        </div>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            className="text-white hover:text-red-400 hover:bg-white/10"
                                            onClick={() => handleDeleteCard(card.id)}
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))
                    )}
                </div>
            </section>

            {/* Saved UPI */}
            <section>
                <div className="flex items-center justify-between mb-4 mt-8">
                    <h3 className="text-lg font-semibold">Saved UPI IDs</h3>
                    {/* Add UPI Button could go here */}
                </div>
                <Card>
                    <CardContent className="p-0">
                        {upi.length === 0 ? (
                            <div className="p-4 text-gray-500 text-sm">No saved UPI IDs.</div>
                        ) : (
                            upi.map(u => (
                                <div key={u.id} className="flex justify-between items-center p-4 border-b last:border-0 hover:bg-gray-50 transition-colors">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                                            <img src="https://cdn-icons-png.flaticon.com/512/825/825454.png" className="w-6 h-6" alt="GPay" />
                                        </div>
                                        <div>
                                            <p className="font-medium">{u.vpa}</p>
                                            <p className="text-sm text-gray-500">{u.app}</p>
                                        </div>
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-gray-400 hover:text-red-600"
                                        onClick={() => handleDeleteUpi(u.id)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))
                        )}
                    </CardContent>
                </Card>
            </section>
        </div>
    );
}
