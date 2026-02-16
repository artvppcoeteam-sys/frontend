import { useState } from 'react';
import { Mail, Lock, User, Phone, Link as LinkIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { Textarea } from '../ui/textarea';
import { Checkbox } from '../ui/checkbox';
import { toast } from 'sonner';

interface RegisterPageProps {
  onNavigate: (page: string) => void;
}

export function RegisterPage({ onNavigate }: RegisterPageProps) {
  const [customerData, setCustomerData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const [vendorData, setVendorData] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    portfolioUrl: '',
    bio: '',
  });

  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleCustomerRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (customerData.password !== customerData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    toast.success('Account created successfully!');
    onNavigate('login');
  };

  const handleVendorRegister = (e: React.FormEvent) => {
    e.preventDefault();
    if (vendorData.password !== vendorData.confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      toast.error('Please agree to the terms and conditions');
      return;
    }
    toast.success('Vendor application submitted! We\'ll review and get back to you within 48 hours.');
    onNavigate('login');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 py-12">
      <div className="max-w-2xl w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl md:text-4xl mb-2">Create Account</h1>
          <p className="text-gray-600">Join our creative community</p>
        </div>

        <Tabs defaultValue="customer" className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="customer">Customer</TabsTrigger>
            <TabsTrigger value="vendor">Vendor/Artist</TabsTrigger>
          </TabsList>

          <TabsContent value="customer">
            <Card>
              <CardHeader>
                <CardTitle>Customer Registration</CardTitle>
                <CardDescription>Create an account to start shopping</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleCustomerRegister} className="space-y-4">
                  <div>
                    <Label htmlFor="customer-name">Full Name *</Label>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-name"
                        value={customerData.name}
                        onChange={(e) => setCustomerData({ ...customerData, name: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="John Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-email">Email *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-email"
                        type="email"
                        value={customerData.email}
                        onChange={(e) => setCustomerData({ ...customerData, email: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="your@email.com"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-phone"
                        type="tel"
                        value={customerData.phone}
                        onChange={(e) => setCustomerData({ ...customerData, phone: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-password">Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-password"
                        type="password"
                        value={customerData.password}
                        onChange={(e) => setCustomerData({ ...customerData, password: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="Create a strong password"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="customer-confirm-password">Confirm Password *</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="customer-confirm-password"
                        type="password"
                        value={customerData.confirmPassword}
                        onChange={(e) => setCustomerData({ ...customerData, confirmPassword: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="Re-enter your password"
                      />
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="customer-terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="customer-terms" className="text-sm cursor-pointer">
                      I agree to the <a href="#" className="text-[#D4AF37] hover:underline">Terms of Service</a> and{' '}
                      <a href="#" className="text-[#D4AF37] hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#D4AF37] hover:bg-[#C19B2A] text-white"
                    size="lg"
                  >
                    Create Account
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Already have an account?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('login')}
                      className="text-[#D4AF37] hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="vendor">
            <Card>
              <CardHeader>
                <CardTitle>Vendor/Artist Registration</CardTitle>
                <CardDescription>Apply to sell your artwork on our platform</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleVendorRegister} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-name">Full Name *</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="vendor-name"
                          value={vendorData.name}
                          onChange={(e) => setVendorData({ ...vendorData, name: e.target.value })}
                          required
                          className="pl-10"
                          placeholder="Artist Name"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="vendor-email">Email *</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="vendor-email"
                          type="email"
                          value={vendorData.email}
                          onChange={(e) => setVendorData({ ...vendorData, email: e.target.value })}
                          required
                          className="pl-10"
                          placeholder="artist@email.com"
                        />
                      </div>
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor-phone">Phone Number *</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="vendor-phone"
                        type="tel"
                        value={vendorData.phone}
                        onChange={(e) => setVendorData({ ...vendorData, phone: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="+91 98765 43210"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="vendor-portfolio">Portfolio URL *</Label>
                    <div className="relative">
                      <LinkIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                      <Input
                        id="vendor-portfolio"
                        type="url"
                        value={vendorData.portfolioUrl}
                        onChange={(e) => setVendorData({ ...vendorData, portfolioUrl: e.target.value })}
                        required
                        className="pl-10"
                        placeholder="https://yourportfolio.com"
                      />
                    </div>
                    <p className="text-xs text-gray-500 mt-1">
                      Link to your online portfolio, Instagram, Behance, or personal website
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="vendor-bio">Artist Bio *</Label>
                    <Textarea
                      id="vendor-bio"
                      value={vendorData.bio}
                      onChange={(e) => setVendorData({ ...vendorData, bio: e.target.value })}
                      required
                      placeholder="Tell us about your artistic journey, style, and what inspires your work..."
                      rows={4}
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      This will be displayed on your artist profile
                    </p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="vendor-password">Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="vendor-password"
                          type="password"
                          value={vendorData.password}
                          onChange={(e) => setVendorData({ ...vendorData, password: e.target.value })}
                          required
                          className="pl-10"
                          placeholder="Create a password"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="vendor-confirm-password">Confirm Password *</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <Input
                          id="vendor-confirm-password"
                          type="password"
                          value={vendorData.confirmPassword}
                          onChange={(e) => setVendorData({ ...vendorData, confirmPassword: e.target.value })}
                          required
                          className="pl-10"
                          placeholder="Re-enter password"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="vendor-terms"
                      checked={agreedToTerms}
                      onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
                    />
                    <Label htmlFor="vendor-terms" className="text-sm cursor-pointer">
                      I agree to the <a href="#" className="text-[#8B4049] hover:underline">Vendor Terms</a>,{' '}
                      <a href="#" className="text-[#8B4049] hover:underline">Terms of Service</a>, and{' '}
                      <a href="#" className="text-[#8B4049] hover:underline">Privacy Policy</a>
                    </Label>
                  </div>

                  <div className="bg-blue-50 p-4 rounded-lg text-sm text-blue-800">
                    <strong>Note:</strong> Your application will be reviewed by our team. We'll contact you within 48 hours.
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-[#8B4049] hover:bg-[#7A3740] text-white"
                    size="lg"
                  >
                    Submit Application
                  </Button>

                  <p className="text-center text-sm text-gray-600">
                    Already registered?{' '}
                    <button
                      type="button"
                      onClick={() => onNavigate('login')}
                      className="text-[#8B4049] hover:underline"
                    >
                      Sign in
                    </button>
                  </p>
                </form>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}