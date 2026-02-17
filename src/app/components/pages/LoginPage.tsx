import { useState } from 'react';
import { Mail, Lock, User } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { useApp } from '../../context/AppContext';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

export function LoginPage() {
  const navigate = useNavigate();
  const { setUser, loginWithGoogle } = useApp();
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
      navigate('/admin');
    } else if (role === 'vendor') {
      navigate('/vendor');
    } else {
      navigate('/');
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
                <div className="mb-6">
                  <Button
                    type="button"
                    variant="outline"
                    className="w-full flex items-center justify-center gap-2 py-6 border-gray-300 text-gray-700 hover:bg-gray-50"
                    onClick={() => {
                      loginWithGoogle();
                      toast.success('Generated Google session!');
                      setTimeout(() => navigate('/'), 500);
                    }}
                  >
                    {/* Google Icon SVG */}
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Sign in with Google
                  </Button>

                  <div className="relative my-6">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                      <span className="bg-white px-2 text-gray-400">Or continue with email</span>
                    </div>
                  </div>
                </div>

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
                      onClick={() => navigate('/register')}
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
                      onClick={() => navigate('/register')}
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