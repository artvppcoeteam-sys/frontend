import { useState } from 'react';
import { AppProvider } from './context/AppContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { ProductCategoryPage } from './components/pages/ProductCategoryPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { ServicesPage } from './components/pages/ServicesPage';
import { ServiceDetailPage } from './components/pages/ServiceDetailPage';
import { WorkshopDetailPage } from './components/pages/WorkshopDetailPage';
import { AboutPage } from './components/pages/AboutPage';
import { ContactPage } from './components/pages/ContactPage';
import { CartPage } from './components/pages/CartPage';
import { CheckoutPage } from './components/pages/CheckoutPage';
import { LoginPage } from './components/pages/LoginPage';
import { RegisterPage } from './components/pages/RegisterPage';
import { VendorDashboard } from './components/dashboard/vendor/VendorDashboard';
import { AdminDashboard } from './components/dashboard/admin/AdminDashboard';
import { SettingsPage } from './components/pages/SettingsPage';
import { OrderHistoryPage } from './components/pages/OrderHistoryPage';
import { WishlistPage } from './components/pages/WishlistPage';
import { HelpPage } from './components/pages/HelpPage';
import { TermsPage } from './components/pages/TermsPage';
import { PrivacyPage } from './components/pages/PrivacyPage';
import { ReturnsRefundsPage } from './components/pages/ReturnsRefundsPage';
import { NotFoundPage } from './components/pages/NotFoundPage';
import { OrderConfirmationPage } from './components/pages/OrderConfirmationPage';
import { SellArtPage } from './components/pages/SellArtPage';
import { PageTransition } from './components/PageTransition';
import { BackToTop } from './components/BackToTop';
import { Toaster } from './components/ui/sonner';
import { AnimatePresence } from 'motion/react';

import { CheckoutLayout } from './components/checkout/CheckoutLayout';
import { AddressStep } from './components/checkout/AddressStep';
import { OrderSummaryStep } from './components/checkout/OrderSummaryStep';
import { PaymentStep } from './components/checkout/PaymentStep';
import { OrderSuccessPage } from './components/pages/OrderSuccessPage';
import { UserDashboard } from './components/dashboard/UserDashboard';

export type Page =
  | 'home'
  | 'shop'
  | 'product-detail'
  | 'services'
  | 'service-detail'
  | 'workshop-detail'
  | 'about'
  | 'contact'
  | 'cart'
  | 'cart'
  | 'checkout' // Kept for backward compatibility, redirects to checkout-address
  | 'checkout-address'
  | 'checkout-summary'
  | 'checkout-payment'
  | 'order-success'
  | 'login'
  | 'register'
  | 'vendor-dashboard'
  | 'admin-dashboard'
  | 'profile'
  | 'settings'
  | 'orders'
  | 'wishlist'
  | 'addresses'
  | 'payments'
  | 'reviews'
  | 'coupons'
  | 'notifications'
  | 'help'
  | 'terms'
  | 'privacy'
  | 'returns-refunds'
  | 'sell'
  | '404';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedServiceId, setSelectedServiceId] = useState<string | null>(null);
  const [selectedWorkshopId, setSelectedWorkshopId] = useState<string | null>(null);

  const handleNavigate = (page: string, id?: string) => {
    setCurrentPage(page as Page);
    if (id) {
      if (page === 'product-detail') {
        setSelectedProductId(id);
      } else if (page === 'service-detail') {
        setSelectedServiceId(id);
      } else if (page === 'workshop-detail') {
        setSelectedWorkshopId(id);
      }
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={handleNavigate} />;
      case 'shop':
        return <ProductCategoryPage onNavigate={handleNavigate} />;
      case 'product-detail':
        return <ProductDetailPage productId={selectedProductId} onNavigate={handleNavigate} />;
      case 'services':
        return <ServicesPage onNavigate={handleNavigate} />;
      case 'service-detail':
        return <ServiceDetailPage serviceId={selectedServiceId} onNavigate={handleNavigate} />;
      case 'workshop-detail':
        return <WorkshopDetailPage workshopId={selectedWorkshopId} onNavigate={handleNavigate} />;
      case 'about':
        return <AboutPage onNavigate={handleNavigate} />;
      case 'contact':
        return <ContactPage onNavigate={handleNavigate} />;
      case 'cart':
        return <CartPage onNavigate={handleNavigate} />;
      case 'checkout':
        // Redirect to address step
        setTimeout(() => handleNavigate('checkout-address'), 0);
        return null;
      case 'checkout-address':
        return (
          <CheckoutLayout currentStep="address">
            <AddressStep onNext={() => handleNavigate('checkout-summary')} />
          </CheckoutLayout>
        );
      case 'checkout-summary':
        return (
          <CheckoutLayout currentStep="summary">
            <OrderSummaryStep
              onNext={() => handleNavigate('checkout-payment')}
              onBack={() => handleNavigate('checkout-address')}
              onChangeAddress={() => handleNavigate('checkout-address')}
            />
          </CheckoutLayout>
        );
      case 'checkout-payment':
        return (
          <CheckoutLayout currentStep="payment">
            <PaymentStep
              onSuccess={() => handleNavigate('order-success')}
              onBack={() => handleNavigate('checkout-summary')}
            />
          </CheckoutLayout>
        );
      case 'order-success':
        return <OrderSuccessPage onNavigate={handleNavigate} />;
      case 'login':
        return <LoginPage onNavigate={handleNavigate} />;
      case 'register':
        return <RegisterPage onNavigate={handleNavigate} />;
      case 'vendor-dashboard':
        return <VendorDashboard onNavigate={handleNavigate} />;
      case 'admin-dashboard':
        return <AdminDashboard onNavigate={handleNavigate} />;

      // User Dashboard Routes
      case 'profile':
      case 'settings':
        return <UserDashboard activeSection="profile" onNavigate={handleNavigate} />;
      case 'orders':
        return <UserDashboard activeSection="orders" onNavigate={handleNavigate} />;
      case 'wishlist':
        return <UserDashboard activeSection="wishlist" onNavigate={handleNavigate} />;
      case 'addresses':
        return <UserDashboard activeSection="addresses" onNavigate={handleNavigate} />;
      case 'payments':
        return <UserDashboard activeSection="payments" onNavigate={handleNavigate} />;
      case 'reviews':
        return <UserDashboard activeSection="reviews" onNavigate={handleNavigate} />;
      case 'coupons':
        return <UserDashboard activeSection="coupons" onNavigate={handleNavigate} />;
      case 'notifications':
        return <UserDashboard activeSection="notifications" onNavigate={handleNavigate} />;

      case 'help':
        return <HelpPage onNavigate={handleNavigate} />;
      case 'terms':
        return <TermsPage onNavigate={handleNavigate} />;
      case 'privacy':
        return <PrivacyPage onNavigate={handleNavigate} />;
      case 'returns-refunds':
        return <ReturnsRefundsPage onNavigate={handleNavigate} />;
      case 'sell':
        return <SellArtPage />;
      case '404':
        return <NotFoundPage onNavigate={handleNavigate} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  };

  return (
    <AppProvider>
      <div className="min-h-screen flex flex-col bg-[#FAFAFA]">
        <Header onNavigate={handleNavigate} currentPage={currentPage} />
        <main className="flex-1">
          <AnimatePresence mode="wait">
            <PageTransition key={currentPage}>
              {renderPage()}
            </PageTransition>
          </AnimatePresence>
        </main>
        <Footer onNavigate={handleNavigate} />
        <BackToTop />
        <Toaster />
      </div>
    </AppProvider>
  );
}