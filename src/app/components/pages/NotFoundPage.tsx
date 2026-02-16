import { Home, Search, ShoppingBag, Palette, ArrowLeft } from 'lucide-react';

interface NotFoundPageProps {
  onNavigate?: (page: string) => void;
}

export function NotFoundPage({ onNavigate }: NotFoundPageProps) {
  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-2xl mx-auto text-center">
        {/* Artistic 404 */}
        <div className="mb-8">
          <h1 className="text-[120px] md:text-[180px] font-['Playfair_Display'] font-bold text-transparent bg-clip-text bg-gradient-to-br from-[#D4AF37] to-[#8B4049] leading-none">
            404
          </h1>
          <div className="flex items-center justify-center gap-4 mt-4">
            <div className="h-px w-20 bg-gradient-to-r from-transparent to-[#D4AF37]"></div>
            <Palette className="w-8 h-8 text-[#D4AF37]" />
            <div className="h-px w-20 bg-gradient-to-l from-transparent to-[#D4AF37]"></div>
          </div>
        </div>

        {/* Message */}
        <div className="space-y-4 mb-12">
          <h2 className="text-3xl md:text-4xl font-['Playfair_Display'] font-bold text-gray-900">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 max-w-md mx-auto">
            Oops! The page you're looking for seems to have wandered off into the gallery. 
            Let's get you back on track.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={() => onNavigate?.('home')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-[#D4AF37] to-[#C9A858] text-white rounded-full font-semibold shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <Home className="w-5 h-5" />
            Back to Home
          </button>
          
          <button
            onClick={() => onNavigate?.('shop')}
            className="group inline-flex items-center gap-2 px-8 py-4 bg-white border-2 border-[#D4AF37] text-[#D4AF37] rounded-full font-semibold hover:bg-[#D4AF37] hover:text-white transition-all duration-300"
          >
            <ShoppingBag className="w-5 h-5" />
            Browse Art
          </button>
        </div>

        {/* Quick Links */}
        <div className="mt-16 pt-8 border-t border-gray-200">
          <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-6">
            Popular Sections
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <button
              onClick={() => onNavigate?.('shop')}
              className="p-4 rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
            >
              <ShoppingBag className="w-6 h-6 mx-auto mb-2 text-[#8B4049] group-hover:text-[#D4AF37] transition-colors" />
              <span className="text-sm font-medium text-gray-700">Shop</span>
            </button>
            
            <button
              onClick={() => onNavigate?.('services')}
              className="p-4 rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
            >
              <Palette className="w-6 h-6 mx-auto mb-2 text-[#8B4049] group-hover:text-[#D4AF37] transition-colors" />
              <span className="text-sm font-medium text-gray-700">Services</span>
            </button>
            
            <button
              onClick={() => onNavigate?.('about')}
              className="p-4 rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
            >
              <Search className="w-6 h-6 mx-auto mb-2 text-[#8B4049] group-hover:text-[#D4AF37] transition-colors" />
              <span className="text-sm font-medium text-gray-700">About</span>
            </button>
            
            <button
              onClick={() => onNavigate?.('contact')}
              className="p-4 rounded-lg border border-gray-200 hover:border-[#D4AF37] hover:shadow-md transition-all duration-300 group"
            >
              <ArrowLeft className="w-6 h-6 mx-auto mb-2 text-[#8B4049] group-hover:text-[#D4AF37] transition-colors" />
              <span className="text-sm font-medium text-gray-700">Contact</span>
            </button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-12 flex items-center justify-center gap-2">
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse"></div>
          <div className="w-2 h-2 rounded-full bg-[#8B4049] animate-pulse delay-75"></div>
          <div className="w-2 h-2 rounded-full bg-[#D4AF37] animate-pulse delay-150"></div>
        </div>
      </div>
    </div>
  );
}
