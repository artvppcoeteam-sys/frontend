import { useEffect } from 'react';
import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import { PublicLayout } from './layouts/PublicLayout';
import { AdminLayout } from './layouts/AdminLayout';
import { ProtectedRoute } from './components/ProtectedRoute';

// Pages
import { HomePage } from './components/pages/HomePage';
import { ProductCategoryPage } from './components/pages/ProductCategoryPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { WorkshopDetailPage } from './components/pages/WorkshopDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CartPage } from './components/pages/CartPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { VendorDashboard } from './components/dashboard/vendor/VendorDashboard';
import { VendorOverview } from './components/dashboard/vendor/VendorOverview';
import { VendorArtworks, VendorOrders, VendorEarnings, VendorCustomers } from './components/dashboard/vendor/VendorComponents';
import { VendorSettings } from './components/dashboard/vendor/VendorPlaceholders';
import { HelpPage } from './components/pages/HelpPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ReturnsRefundsPage } from './components/pages/ReturnsRefundsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { SellArtPage } from './components/pages/SellArtPage';
import { OrderSuccessPage } from './components/pages/OrderSuccessPage';

// Checkout Components
import { CheckoutLayout } from './components/checkout/CheckoutLayout';
import { AddressStep } from './components/checkout/AddressStep';
import { OrderSummaryStep } from './components/checkout/OrderSummaryStep';
import { PaymentStep } from './components/checkout/PaymentStep';

// User Dashboard Components
import { UserDashboard } from './components/dashboard/UserDashboard';
import { ProfileInformation } from './components/dashboard/ProfileInformation';
import { ManageAddresses } from './components/dashboard/ManageAddresses';
import { MyOrders } from './components/dashboard/MyOrders';
import { MyWishlist } from './components/dashboard/MyWishlist';
import { Payments } from './components/dashboard/Payments';
import { MyReviews } from './components/dashboard/MyReviews';
import { MyCoupons } from './components/dashboard/MyCoupons';
import { Notifications } from './components/dashboard/Notifications';

// Admin Dashboard Components
import { AdminOverview } from './components/dashboard/admin/AdminOverview';
import { AdminVendors } from './components/dashboard/admin/AdminVendors';
import { AdminUsers } from './components/dashboard/admin/AdminUsers';
import { AdminProducts } from './components/dashboard/admin/AdminProducts';
import { AdminOrders } from './components/dashboard/admin/AdminOrders';
import { AdminCategories } from './components/dashboard/admin/AdminCategories';
import { AdminServices } from './components/dashboard/admin/AdminServices';
import { AdminContent } from './components/dashboard/admin/AdminContent';
import { AdminSettings } from './components/dashboard/admin/AdminSettings';
import { AdminSupport } from './components/dashboard/admin/AdminSupport';
import { AdminRevenue } from './components/dashboard/admin/AdminRevenue';
import { AdminReports } from './components/dashboard/admin/AdminReports';

import { Toaster } from './components/ui/sonner';

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <AppProvider>
      <ScrollToTop />
      <Routes>
        {/* Public Routes wrapped in PublicLayout */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/marketplace" element={<ProductCategoryPage />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/service/:id" element={<ServiceDetailPage />} />
          <Route path="/workshop/:id" element={<WorkshopDetailPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/sell" element={<SellArtPage />} />
          <Route path="/help" element={<HelpPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/returns-refunds" element={<ReturnsRefundsPage />} />
          <Route path="/order-confirmation" element={<OrderConfirmationPage />} />
          <Route path="/order-success" element={<OrderSuccessPage />} />

          {/* Checkout Routes */}
          <Route path="/checkout" element={<Navigate to="/checkout/address" replace />} />
          <Route path="/checkout/address" element={<CheckoutLayout currentStep="address"><AddressStep /></CheckoutLayout>} />
          <Route path="/checkout/summary" element={<CheckoutLayout currentStep="summary"><OrderSummaryStep /></CheckoutLayout>} />
          <Route path="/checkout/payment" element={<CheckoutLayout currentStep="payment"><PaymentStep /></CheckoutLayout>} />

          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Protected User Dashboard Routes */}
        <Route path="/dashboard/user" element={<ProtectedRoute allowedRoles={['customer', 'admin', 'vendor']}><UserDashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="profile" replace />} />
          <Route path="profile" element={<ProfileInformation />} />
          <Route path="addresses" element={<ManageAddresses />} />
          <Route path="orders" element={<MyOrders />} />
          <Route path="wishlist" element={<MyWishlist />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reviews" element={<MyReviews />} />
          <Route path="coupons" element={<MyCoupons />} />
          <Route path="notifications" element={<Notifications />} />
        </Route>

        {/* Protected Admin Dashboard Routes */}
        <Route path="/dashboard/admin" element={<ProtectedRoute allowedRoles={['admin']}><AdminLayout /></ProtectedRoute>}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<AdminOverview />} />
          <Route path="vendors" element={<AdminVendors />} />
          <Route path="users" element={<AdminUsers />} />
          <Route path="artworks" element={<AdminProducts />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="categories" element={<AdminCategories />} />
          <Route path="services" element={<AdminServices />} />
          <Route path="content" element={<AdminContent />} />
          <Route path="settings" element={<AdminSettings />} />
          <Route path="support" element={<AdminSupport />} />
          <Route path="revenue" element={<AdminRevenue />} />
          <Route path="reports" element={<AdminReports />} />
        </Route>

        {/* Vendor Dashboard - to be implemented fully */}
        {/* Protected Vendor Dashboard Routes */}
        <Route path="/dashboard/vendor" element={<ProtectedRoute allowedRoles={['vendor', 'admin']}><VendorDashboard /></ProtectedRoute>}>
          <Route index element={<Navigate to="overview" replace />} />
          <Route path="overview" element={<VendorOverview />} />
          <Route path="artworks" element={<VendorArtworks />} />
          <Route path="add-artwork" element={<VendorArtworks />} /> {/* Placeholder */}
          <Route path="orders" element={<VendorOrders />} />
          <Route path="earnings" element={<VendorEarnings />} />
          <Route path="payouts" element={<VendorEarnings />} /> {/* Placeholder */}
          <Route path="customers" element={<VendorCustomers />} />
          <Route path="messages" element={<div className="p-8">Messages Placeholder</div>} />
          <Route path="settings" element={<VendorSettings />} />
          <Route path="support" element={<div className="p-8">Support Placeholder</div>} />
        </Route>

        {/* Redirects */}
        <Route path="/admin" element={<Navigate to="/dashboard/admin" replace />} />
        <Route path="/vendor" element={<Navigate to="/dashboard/vendor" replace />} />

      </Routes>
    </AppProvider>
  );
}