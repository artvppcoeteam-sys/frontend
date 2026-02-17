import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../ui/table';
import { Badge } from '../../ui/badge';
import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Search, Filter, MoreHorizontal, Mail, Ban, CheckCircle, RefreshCcw } from 'lucide-react';
import { platformUsers } from '../../../data/mockData';
import { Avatar, AvatarFallback, AvatarImage } from '../../ui/avatar';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '../../ui/dropdown-menu';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "../../ui/alert-dialog";
import { toast } from 'sonner';

export function AdminUsers() {
    const [searchTerm, setSearchTerm] = useState('');
    const [users, setUsers] = useState(platformUsers); // Use state for local updates
    const [userToSuspend, setUserToSuspend] = useState<any>(null);

    const filteredUsers = users.filter(user =>
        user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleEmailUser = (user: any) => {
        toast.info(`Email composer opened for ${user.email}`);
    };

    const handleViewDetails = (user: any) => {
        toast.info(`Viewing details for ${user.name}`);
    };

    const confirmSuspendUser = () => {
        if (!userToSuspend) return;

        setUsers(users.map(u =>
            u.id === userToSuspend.id ? { ...u, status: 'suspended' } : u
        ));
        toast.error(`User ${userToSuspend.name} has been suspended.`);
        setUserToSuspend(null);
    };

    const handleReactivateUser = (userId: number) => {
        setUsers(users.map(u =>
            u.id === userId ? { ...u, status: 'active' } : u
        ));
        toast.success(`User has been reactivated.`);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold tracking-tight">User Management</h2>
                <div className="flex gap-2">
                    <div className="relative w-64">
                        <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                        <Input
                            placeholder="Search users..."
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
                    <CardTitle>All Users</CardTitle>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>User</TableHead>
                                <TableHead>Role</TableHead>
                                <TableHead>Status</TableHead>
                                <TableHead>Joined</TableHead>
                                <TableHead>Activity</TableHead>
                                <TableHead className="text-right">Actions</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredUsers.map((user) => (
                                <TableRow key={user.id}>
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <Avatar className="h-9 w-9">
                                                <AvatarImage src={user.avatar} alt={user.name} />
                                                <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <div className="font-bold">{user.name}</div>
                                                <div className="text-xs text-muted-foreground">{user.email}</div>
                                            </div>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant={user.role === 'vendor' ? 'default' : 'secondary'} className="capitalize">
                                            {user.role}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={
                                            user.status === 'suspended'
                                                ? "bg-red-50 text-red-700 border-red-200 capitalize"
                                                : "bg-green-50 text-green-700 border-green-200 capitalize"
                                        }>
                                            {user.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>{user.joinDate}</TableCell>
                                    <TableCell>
                                        <div className="text-sm">
                                            {user.role === 'vendor'
                                                ? `₹${(user as any).totalRevenue?.toLocaleString() ?? 0} Revenue`
                                                : `₹${(user as any).totalSpent?.toLocaleString() ?? 0} Spent`
                                            }
                                        </div>
                                        <div className="text-xs text-muted-foreground">
                                            {user.totalOrders} Orders
                                        </div>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button variant="ghost" className="h-8 w-8 p-0">
                                                    <span className="sr-only">Open menu</span>
                                                    <MoreHorizontal className="h-4 w-4" />
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                <DropdownMenuItem onClick={() => handleEmailUser(user)}>
                                                    <Mail className="mr-2 h-4 w-4" /> Email User
                                                </DropdownMenuItem>
                                                <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                                                    <CheckCircle className="mr-2 h-4 w-4" /> View Details
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator />
                                                {user.status === 'suspended' ? (
                                                    <DropdownMenuItem className="text-green-600 focus:text-green-600" onClick={() => handleReactivateUser(user.id)}>
                                                        <RefreshCcw className="mr-2 h-4 w-4" /> Reactivate User
                                                    </DropdownMenuItem>
                                                ) : (
                                                    <DropdownMenuItem className="text-red-600 focus:text-red-600" onClick={() => setUserToSuspend(user)}>
                                                        <Ban className="mr-2 h-4 w-4" /> Suspend User
                                                    </DropdownMenuItem>
                                                )}
                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </CardContent>
            </Card>

            <AlertDialog open={!!userToSuspend} onOpenChange={(open) => !open && setUserToSuspend(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will suspend <strong>{userToSuspend?.name}</strong>'s account.
                            They will lose access to the platform immediately.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-red-600 hover:bg-red-700" onClick={confirmSuspendUser}>
                            Suspend Account
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    );
}
