import { useState } from 'react';
import { User, Mail, Phone, Edit2, Save, X, Trash2, ChevronDown, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';
import { Separator } from '../ui/separator';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "../ui/accordion"

export function ProfileInformation() {
    const { user, setUser } = useApp();
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: user?.name?.split(' ')[0] || '',
        lastName: user?.name?.split(' ')[1] || '',
        gender: 'male',
        email: user?.email || '',
        mobile: '+91 98765 43210'
    });

    const handleSave = () => {
        setIsEditing(false);
        if (user) {
            setUser({
                ...user,
                name: `${formData.firstName} ${formData.lastName}`,
                email: formData.email,
            });
        }
        toast.success('Profile updated successfully');
    };

    const handleCancel = () => {
        setIsEditing(false);
        setFormData({
            firstName: user?.name?.split(' ')[0] || '',
            lastName: user?.name?.split(' ')[1] || '',
            gender: 'male',
            email: user?.email || '',
            mobile: '+91 98765 43210'
        });
    };

    return (
        <div className="space-y-6">
            <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                    <div>
                        <CardTitle>Personal Information</CardTitle>
                        <CardDescription>Manage your personal details</CardDescription>
                    </div>
                    {!isEditing && (
                        <Button variant="ghost" size="sm" onClick={() => setIsEditing(true)} className="text-blue-600">
                            Edit
                        </Button>
                    )}
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* Name Fields */}
                    <div className="grid md:grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label htmlFor="firstName">First Name</Label>
                            <Input
                                id="firstName"
                                value={formData.firstName}
                                disabled={!isEditing}
                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="lastName">Last Name</Label>
                            <Input
                                id="lastName"
                                value={formData.lastName}
                                disabled={!isEditing}
                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Gender */}
                    <div className="space-y-3">
                        <Label>Your Gender</Label>
                        <RadioGroup
                            defaultValue={formData.gender}
                            disabled={!isEditing}
                            onValueChange={(val) => setFormData({ ...formData, gender: val })}
                            className="flex gap-6"
                        >
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="male" id="male" />
                                <Label htmlFor="male">Male</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="female" id="female" />
                                <Label htmlFor="female">Female</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="other" id="other" />
                                <Label htmlFor="other">Other</Label>
                            </div>
                        </RadioGroup>
                    </div>

                    {/* Email & Mobile */}
                    <div className="space-y-4 pt-4">
                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="email">Email Address</Label>
                                {isEditing && <span className="text-xs text-blue-600 cursor-pointer">Edit</span>}
                            </div>
                            <div className="relative">
                                <Input
                                    id="email"
                                    value={formData.email}
                                    disabled={!isEditing}
                                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                    className="pr-10"
                                />
                                {!isEditing && <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-3" />}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <div className="flex items-center justify-between">
                                <Label htmlFor="mobile">Mobile Number</Label>
                                {isEditing && <span className="text-xs text-blue-600 cursor-pointer">Edit</span>}
                            </div>
                            <div className="relative">
                                <Input
                                    id="mobile"
                                    value={formData.mobile}
                                    disabled={!isEditing}
                                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                                    className="pr-10"
                                />
                                {!isEditing && <CheckCircle className="w-4 h-4 text-green-500 absolute right-3 top-3" />}
                            </div>
                        </div>
                    </div>

                    {/* Action Buttons */}
                    {isEditing && (
                        <div className="flex justify-end gap-3 pt-4">
                            <Button variant="outline" onClick={handleCancel}>Cancel</Button>
                            <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">Save Changes</Button>
                        </div>
                    )}
                </CardContent>
            </Card>

            {/* FAQs */}
            <div className="space-y-4">
                <h3 className="font-semibold text-lg">FAQs</h3>
                <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1">
                        <AccordionTrigger>What happens when I update my email/mobile?</AccordionTrigger>
                        <AccordionContent>
                            Your login email id (or mobile number) changes, likewise. You'll receive all your account related communication on your updated email address (or mobile number).
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-2">
                        <AccordionTrigger>When will my account be updated?</AccordionTrigger>
                        <AccordionContent>
                            It happens as soon as you confirm the verification code sent to your email (or mobile) and save the changes.
                        </AccordionContent>
                    </AccordionItem>
                    <AccordionItem value="item-3">
                        <AccordionTrigger>Will my account be affected?</AccordionTrigger>
                        <AccordionContent>
                            Updating your details will not affect your order history or saved items.
                        </AccordionContent>
                    </AccordionItem>
                </Accordion>
            </div>

            {/* Account Actions */}
            <div className="pt-6 space-y-4">
                <Button variant="link" className="text-blue-600 p-0 h-auto">Deactivate Account</Button>
                <br />
                <Button variant="link" className="text-red-600 p-0 h-auto">Delete Account</Button>
            </div>
        </div>
    );
}
