import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';

interface LoginPageProps {
  onNavigate: (page: string) => void;
}

export function LoginPage({ onNavigate }: LoginPageProps) {
  const { setUser } = useApp();
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const handleLogin = (e: React.FormEvent, role: 'customer' | 'vendor' | 'admin') => {
    e.preventDefault();

    // Mock login - in a real app, this would authenticate with a backend
    const mockUser = {
      id: '1',
      name: role === 'admin' ? 'Dr. Satyamangal Rege' : role === 'vendor' ? 'Artist Vendor' : 'John Doe',
      email: loginData.email,
      role: role,
    };

    setUser(mockUser);
    toast.success('Login successful!');

    // Navigate based on role
    if (role === 'admin') {
      onNavigate('admin-dashboard');
    } else if (role === 'vendor') {
      onNavigate('vendor-dashboard');
    } else {
      onNavigate('home');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Welcome Back</h1>
          <p className="text-gray-600">Sign in to your account</p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-3 mb-6">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="vendor">Vendor</TabsTrigger>
            <TabsTrigger value="admin">Admin</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Login</CardTitle>
                <CardDescription>Sign in to browse and purchase art</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'customer')} className="space-y-4">
                  <div>
                    <Label htmlFor="customer-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between">
                    <a href="#" className="text-sm text-[#D4AF37] hover:underline">
                      Forgot password?
                    </a>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#C19B2A] text-white"
                    size="lg"
                  >
                    Sign In
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Don't have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('register')}
                      className="text-[#D4AF37] hover:underline"
                    >
                      Sign up
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor">
            <Card>
              <CardHeader>
                <CardTitle>Vendor Login</CardTitle>
                <CardDescription>Access your artist dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'vendor')} className="space-y-4">
                  <div>
                    <Label htmlFor="vendor-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="vendor-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="vendor@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="vendor-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="Enter your password"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#8B4049] hover:bg-[#7A3740] text-white"
                    size="lg"
                  >
                    Sign In as Vendor
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Want to sell your art?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('register')}
                      className="text-[#8B4049] hover:underline"
                    >
                      Register as vendor
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="admin">
            <Card>
              <CardHeader>
                <CardTitle>Admin Login</CardTitle>
                <CardDescription>Access the admin dashboard</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={(e) => handleLogin(e, 'admin')} className="space-y-4">
                  <div>
                    <Label htmlFor="admin-email">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-email"
                        type="email"
                        value={loginData.email}
                        onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="admin@artvpp.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="admin-password">Password</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="admin-password"
                        type="password"
                        value={loginData.password}
                        onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="Enter admin password"
                      />
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gray-900 hover:bg-gray-800 text-white"
                    size="lg"
                  >
                    Sign In as Admin
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        <div className="mt-8 text-center text-sm text-gray-600">
          <p className="mb-2">Demo Credentials (any password works):</p>
          <p className="text-xs">Customer: customer@test.com | Vendor: vendor@test.com | Admin: admin@test.com</p>
        </div>

        {/* Quick Access Buttons for Demo */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm font-medium text-blue-900 mb-3 text-center">Quick Demo Access</p>
          <div className="grid grid-cols-3 gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                setLoginData({ email: 'customer@test.com', password: 'test' });
                handleLogin(e, 'customer');
              }}
              className="text-xs"
            >
              Customer Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                setLoginData({ email: 'vendor@test.com', password: 'test' });
                handleLogin(e, 'vendor');
              }}
              className="text-xs bg-[#8B4049] text-white hover:bg-[#7A3740] hover:text-white"
            >
              Vendor Demo
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                setLoginData({ email: 'admin@test.com', password: 'test' });
                handleLogin(e, 'admin');
              }}
              className="text-xs bg-gray-900 text-white hover:bg-gray-800 hover:text-white"
            >
              Admin Demo
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}