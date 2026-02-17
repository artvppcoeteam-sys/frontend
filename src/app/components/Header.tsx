import { useState, useEffect } from 'react';
import { Search, ShoppingCart, User, Menu, X, ChevronDown, LogOut, Settings, LayoutDashboard, ShoppingBag } from 'lucide-react';
import logo from '../../assets/artvpplogo.png';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from './ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { useApp } from '../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { navigationMenu } from '../data/mockData';
import { toast } from 'sonner';

interface HeaderProps {
  onNavigate: (page: string, id?: string) => void;
  currentPage: string;
}

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const { user, cartCount, logout, loginAsAdmin, loginAsVendor, loginAsCustomer } = useApp();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { label: 'ABOUT ARTVPP', value: 'about', hasDropdown: false },
    { label: 'BUY ART', value: 'shop', subLabel: 'SHOP', hasDropdown: true },
    { label: 'SELL ART', value: 'sell', subLabel: 'SELL', hasDropdown: false },
    { label: 'DISCOVER', value: 'discover', subLabel: 'DISCOVER', hasDropdown: true },
  ];

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      onNavigate('shop');
      console.log('Searching for:', searchQuery);
    }
  };

  const handleMouseEnter = (value: string, hasDropdown: boolean) => {
    if (hasDropdown) {
      setActiveDropdown(value);
    }
  };

  const handleMouseLeave = () => {
    setActiveDropdown(null);
  };

  return (
    <motion.header
      className={`sticky top-0 z-50 bg-white/95 backdrop-blur-sm transition-all ${scrolled ? 'shadow-md py-1' : 'py-2'
        }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-[1800px] mx-auto px-4 md:px-6 lg:px-12">
        <div className="grid grid-cols-2 md:grid-cols-3 items-center">

          {/* Logo Section - Left */}
          <div className="flex items-center justify-start">
            <motion.button
              onClick={() => onNavigate('home')}
              className="group relative flex items-center gap-1.5"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <img
                src={logo}
                alt="ARTVPP"
                className="h-16 md:h-20 w-auto object-contain transition-all duration-300 group-hover:drop-shadow-[0_0_15px_rgba(212,175,55,0.6)]"
              />
              <span className="text-lg font-sans text-black font-normal tracking-wide hidden md:block">
                ArtVPP
              </span>
            </motion.button>
          </div>

          {/* Center Navigation - Center */}
          <nav className="hidden md:flex items-center justify-center gap-10 lg:gap-12">
            {navItems.map((item) => (
              <div
                key={item.value}
                className="relative text-center group"
              >
                <motion.button
                  onClick={() => {
                    if (item.hasDropdown) {
                      setActiveDropdown(activeDropdown === item.value ? null : item.value);
                    } else {
                      onNavigate(item.value);
                      setActiveDropdown(null);
                    }
                  }}
                  className="flex flex-col items-center py-2"
                >
                  <span className={`text-sm lg:text-base font-medium tracking-widest uppercase transition-colors whitespace-nowrap ${currentPage === item.value || (activeDropdown === item.value)
                    ? 'text-[#D4AF37]'
                    : 'text-gray-900 hover:text-[#D4AF37]'
                    }`}>
                    {item.label}
                  </span>
                </motion.button>

                {/* Mega Menu Overlay */}
                <AnimatePresence>
                  {activeDropdown === item.value && item.hasDropdown && (
                    <>
                      <div className="fixed inset-0 z-40 bg-transparent" onClick={() => setActiveDropdown(null)} />
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute top-full left-1/2 transform -translate-x-1/2 pt-4 w-auto min-w-[600px] z-50"
                      >
                        <div className="bg-white/98 backdrop-blur-md border border-gray-100 shadow-xl p-8 rounded-sm">
                          <div className="flex gap-16 text-left">
                            {item.value === 'shop' && navigationMenu.shop.sections.map((section, idx) => (
                              <div key={idx}>
                                <h3 className="text-xs font-bold text-gray-900 mb-3 tracking-widest uppercase border-b pb-2">
                                  {section.name}
                                </h3>
                                <ul className="space-y-2">
                                  {section.items.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <button
                                        onClick={() => {
                                          onNavigate('shop');
                                          setActiveDropdown(null);
                                        }}
                                        className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-light block py-1"
                                      >
                                        {subItem.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}

                            {item.value === 'discover' && navigationMenu.discover.sections.map((section, idx) => (
                              <div key={idx}>
                                <h3 className="text-xs font-bold text-gray-900 mb-3 tracking-widest uppercase border-b pb-2">
                                  {section.name}
                                </h3>
                                <ul className="space-y-2">
                                  {section.items.map((subItem, subIdx) => (
                                    <li key={subIdx}>
                                      <button
                                        onClick={() => {
                                          if (subItem.link === 'services') {
                                            onNavigate('services');
                                          } else {
                                            // Extract ID if present (e.g. from "service-detail?id=service-1")
                                            const id = (subItem as any).id || (subItem.link.includes('?id=') ? subItem.link.split('?id=')[1] : undefined);
                                            onNavigate('service-detail', id);
                                          }
                                          setActiveDropdown(null);
                                        }}
                                        className="text-sm text-gray-600 hover:text-[#D4AF37] transition-colors font-light block py-1"
                                      >
                                        {subItem.name}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </nav>

          {/* Right Actions - Right */}
          <div className="flex items-center justify-end gap-4 lg:gap-6 text-sm lg:text-base font-medium tracking-widest">
            <div className="hidden md:flex items-center gap-4 lg:gap-6">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="hover:text-[#D4AF37] transition-colors uppercase flex items-center gap-2 whitespace-nowrap">
                      {user.name} <ChevronDown className="w-3 h-3" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => onNavigate('profile')}>My Profile</DropdownMenuItem>
                    {user.role === 'admin' && (
                      <DropdownMenuItem onClick={() => onNavigate('admin-dashboard')}>
                        Admin Dashboard
                      </DropdownMenuItem>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => logout()}>Logout</DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <button onClick={() => onNavigate('join')} className="hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap">
                    JOIN
                  </button>
                  <button onClick={() => onNavigate('login')} className="hover:text-[#D4AF37] transition-colors uppercase whitespace-nowrap">
                    LOGIN
                  </button>
                </>
              )}

              <button onClick={() => onNavigate('cart')} className="flex items-center gap-2 hover:text-[#D4AF37] transition-colors uppercase group whitespace-nowrap">
                <div className="relative">
                  <ShoppingCart className="w-5 h-5 text-gray-800 group-hover:text-[#D4AF37] transition-colors" />
                  {cartCount > 0 && (
                    <span className="absolute -top-2 -right-2 bg-[#8B4049] text-white text-[9px] w-4 h-4 flex items-center justify-center rounded-full font-bold">
                      {cartCount}
                    </span>
                  )}
                </div>
                {user && <span className="hidden xl:inline">VIEW CART</span>}
              </button>
            </div>

            {/* Mobile Menu Button - Shown only on small screens */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <AnimatePresence mode="wait">
                {mobileMenuOpen ? (
                  <motion.div
                    key="close"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </Button>
          </div>
        </div>

        {/* Mobile Search - Only visible when menu is open or can be toggled */}
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            className="md:hidden border-t border-gray-100 bg-white overflow-y-auto max-h-[calc(100vh-80px)]"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <nav className="px-6 py-6 space-y-4">
              {/* Mobile Search */}
              <form onSubmit={handleSearch} className="pb-4 border-b border-gray-100">
                <div className="relative w-full">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="search"
                    placeholder="Search artworks..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 w-full rounded-full bg-gray-50 border-gray-200 focus:border-[#D4AF37] focus:ring-1 focus:ring-[#D4AF37]"
                  />
                </div>
              </form>

              {navItems.map((item, index) => (
                <div key={item.value}>
                  <motion.button
                    onClick={() => {
                      if (item.hasDropdown) {
                        setActiveDropdown(activeDropdown === item.value ? null : item.value);
                      } else {
                        onNavigate(item.value);
                        setMobileMenuOpen(false);
                      }
                    }}
                    className="flex items-center justify-between w-full text-left py-2 text-base font-medium text-gray-900 border-b border-gray-50 last:border-0"
                    initial={{ x: -20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ delay: index * 0.05 }}
                  >
                    {item.label}
                    {item.hasDropdown && (
                      <ChevronDown className={`w-4 h-4 transition-transform ${activeDropdown === item.value ? 'rotate-180' : ''}`} />
                    )}
                  </motion.button>

                  {/* Mobile Accordion */}
                  <AnimatePresence>
                    {activeDropdown === item.value && item.hasDropdown && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden bg-gray-50 rounded-lg mt-2"
                      >
                        <div className="p-4 space-y-4">
                          {(item.value === 'shop' ? navigationMenu.shop.sections : navigationMenu.discover.sections).map((section, idx) => (
                            <div key={idx}>
                              <h4 className="text-xs font-bold text-gray-500 uppercase mb-2">{section.name}</h4>
                              <ul className="space-y-2 pl-2 border-l-2 border-gray-200">
                                {section.items.map((subItem, subIdx) => (
                                  <li key={subIdx}>
                                    <button
                                      onClick={() => {
                                        if (item.value === 'shop') {
                                          onNavigate('shop');
                                        } else {
                                          if (subItem.link === 'services') {
                                            onNavigate('services');
                                          } else {
                                            const id = (subItem as any).id || (subItem.link.includes('?id=') ? subItem.link.split('?id=')[1] : undefined);
                                            onNavigate('service-detail', id);
                                          }
                                        }
                                        setMobileMenuOpen(false);
                                      }}
                                      className="text-sm text-gray-700 block py-1"
                                    >
                                      {subItem.name}
                                    </button>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ))}

              <motion.div
                className="pt-6 mt-6 border-t border-gray-100 space-y-4"
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: navItems.length * 0.05 }}
              >
                {user ? (
                  <>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-[#D4AF37]">
                        <User className="w-5 h-5" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold">{user.name}</p>
                        <p className="text-xs text-gray-500">{user.email}</p>
                      </div>
                    </div>
                    {/* Mobile Dashboard Link */}
                    {user.role === 'admin' && (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          onNavigate('admin-dashboard');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Admin Dashboard
                      </Button>
                    )}

                    {user.role === 'vendor' && (
                      <Button
                        variant="outline"
                        className="w-full justify-start gap-3"
                        onClick={() => {
                          onNavigate('vendor-dashboard');
                          setMobileMenuOpen(false);
                        }}
                      >
                        <LayoutDashboard className="w-4 h-4" />
                        Vendor Dashboard
                      </Button>
                    )}

                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        onNavigate('profile');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4" />
                      My Profile
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full justify-start gap-3"
                      onClick={() => {
                        onNavigate('orders');
                        setMobileMenuOpen(false);
                      }}
                    >
                      <ShoppingBag className="w-4 h-4" />
                      My Orders
                    </Button>
                    <Button
                      variant="ghost"
                      className="w-full justify-start gap-3 text-red-500 hover:text-red-600 hover:bg-red-50"
                      onClick={() => {
                        toast.success('Logged out successfully!');
                        logout();
                        setMobileMenuOpen(false);
                      }}
                    >
                      <LogOut className="w-4 h-4" />
                      Logout
                    </Button>
                  </>
                ) : (
                  <div className="grid grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      onClick={() => {
                        onNavigate('login');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Login
                    </Button>
                    <Button
                      className="bg-[#D4AF37] hover:bg-[#C19B2A] text-white"
                      onClick={() => {
                        onNavigate('join');
                        setMobileMenuOpen(false);
                      }}
                    >
                      Join
                    </Button>
                  </div>
                )}
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header >

  );
}