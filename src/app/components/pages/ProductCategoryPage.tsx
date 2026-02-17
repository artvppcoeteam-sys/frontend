import { useState } from 'react';
import { Filter, SlidersHorizontal, Grid, List, Heart, Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Checkbox } from '../ui/checkbox';
import { Label } from '../ui/label';
import { Slider } from '../ui/slider';
import { Badge } from '../ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '../ui/sheet';
import { Input } from '../ui/input';
import { allProducts } from '../../data/mockData';
import { motion } from 'motion/react';
import { useNavigate } from 'react-router-dom';

export function ProductCategoryPage() {
  const navigate = useNavigate();
  const [priceRange, setPriceRange] = useState([0, 50000]);
  const [selectedMediums, setSelectedMediums] = useState<string[]>([]);
  const [selectedThemes, setSelectedThemes] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [searchQuery, setSearchQuery] = useState('');

  // Refined Filter Options to match Mock Data better
  const mediums = ['Acrylic', 'Oil', 'Watercolor', 'Mixed Media', 'Digital', 'Sculpture', 'Prints', 'Lithographs', 'Photographs', 'Textile Art'];
  const themes = ['Abstract', 'Landscape', 'Portrait', 'Traditional', 'Nature', 'Modern', 'Religious'];

  const toggleMedium = (medium: string) => {
    setSelectedMediums(prev =>
      prev.includes(medium) ? prev.filter(m => m !== medium) : [...prev, medium]
    );
  };

  const toggleTheme = (theme: string) => {
    setSelectedThemes(prev =>
      prev.includes(theme) ? prev.filter(t => t !== theme) : [...prev, theme]
    );
  };

  const filteredProducts = allProducts.filter(product => {
    const priceMatch = product.price >= priceRange[0] && product.price <= priceRange[1];

    // Fuzzy Search for Search Bar
    const searchMatch = searchQuery === '' ||
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.artist.toLowerCase().includes(searchQuery.toLowerCase());

    // Smart Filter Logic: Check if Product Medium/Category/Title contains the selected filter tags
    const mediumMatch = selectedMediums.length === 0 || selectedMediums.some(m =>
      product.medium.includes(m) ||
      product.category.includes(m) ||
      (m === 'Prints' && product.category.includes('Prints'))
    );

    const themeMatch = selectedThemes.length === 0 || selectedThemes.some(t =>
      product.title.includes(t) ||
      product.subcategory?.includes(t) ||
      product.category.includes(t) ||
      // Fallback for mock data that might happen to match implicitly
      (t === 'Modern' && product.id === '4') ||
      (t === 'Traditional' && product.subcategory?.includes('Traditional'))
    );

    return priceMatch && searchMatch && mediumMatch && themeMatch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'name': return a.title.localeCompare(b.title);
      default: return 0;
    }
  });

  const FilterContent = () => (
    <div className="space-y-8">
      {/* Price Range */}
      <div>
        <h3 className="text-lg font-medium mb-6 text-gray-900">Price Range</h3>
        <Slider
          value={priceRange}
          onValueChange={setPriceRange}
          max={50000}
          step={1000}
          className="mb-4"
        />
        <div className="flex justify-between text-sm text-gray-600 font-light">
          <span>₹{priceRange[0].toLocaleString()}</span>
          <span>₹{priceRange[1].toLocaleString()}</span>
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium mb-6 text-gray-900">Medium</h3>
        <div className="space-y-4">
          {mediums.map((medium) => (
            <div key={medium} className="flex items-center space-x-3">
              <Checkbox
                id={`medium-${medium}`}
                checked={selectedMediums.includes(medium)}
                onCheckedChange={() => toggleMedium(medium)}
                className="rounded-md"
              />
              <Label
                htmlFor={`medium-${medium}`}
                className="text-sm cursor-pointer font-light text-gray-700 hover:text-gray-900"
              >
                {medium}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <h3 className="text-lg font-medium mb-6 text-gray-900">Theme / Style</h3>
        <div className="space-y-4">
          {themes.map((theme) => (
            <div key={theme} className="flex items-center space-x-3">
              <Checkbox
                id={`theme-${theme}`}
                checked={selectedThemes.includes(theme)}
                onCheckedChange={() => toggleTheme(theme)}
                className="rounded-md"
              />
              <Label
                htmlFor={`theme-${theme}`}
                className="text-sm cursor-pointer font-light text-gray-700 hover:text-gray-900"
              >
                {theme}
              </Label>
            </div>
          ))}
        </div>
      </div>

      <div className="border-t pt-8">
        <Button
          variant="outline"
          className="w-full rounded-xl"
          onClick={() => {
            setSelectedMediums([]);
            setSelectedThemes([]);
            setPriceRange([0, 50000]);
            setSearchQuery('');
          }}
        >
          Clear All Filters
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-gray-50 border-b py-16">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center"
          >
            <h1 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
              Art That Belongs To You
            </h1>
            <p className="text-lg text-gray-600 font-light max-w-2xl mx-auto">
              Original Artworks, Prints, and Masterpieces for your collection
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex gap-8">
          {/* Sidebar Filters - Desktop */}
          <aside className="hidden lg:block w-80 shrink-0">
            <div className="sticky top-24 bg-white border rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-2 mb-8">
                <SlidersHorizontal className="w-5 h-5 text-gray-600" />
                <h2 className="text-xl font-medium text-gray-900">Filters</h2>
              </div>
              <FilterContent />
            </div>
          </aside>

          {/* Products Grid */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between mb-8 pb-6 border-b gap-4">
              <div className="flex items-center gap-4 flex-1">
                <div className="relative max-w-md w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Search artworks, artists..."
                    className="pl-10 rounded-xl bg-gray-50 border-transparent focus:bg-white transition-all"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-gray-600 font-light whitespace-nowrap">
                  {sortedProducts.length} artworks
                </span>

                {/* View Mode Toggle */}
                <div className="hidden md:flex gap-2 bg-gray-100 p-1 rounded-xl">
                  <Button
                    variant={viewMode === 'grid' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('grid')}
                    className={`px-3 rounded-lg ${viewMode === 'grid' ? 'shadow-sm' : ''}`}
                  >
                    <Grid className="w-4 h-4" />
                  </Button>
                  <Button
                    variant={viewMode === 'list' ? 'default' : 'ghost'}
                    size="sm"
                    onClick={() => setViewMode('list')}
                    className={`px-3 rounded-lg ${viewMode === 'list' ? 'shadow-sm' : ''}`}
                  >
                    <List className="w-4 h-4" />
                  </Button>
                </div>

                {/* Sort Dropdown */}
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48 rounded-xl bg-gray-50 border-transparent">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent className="rounded-xl">
                    <SelectItem value="featured">Featured</SelectItem>
                    <SelectItem value="price-low">Price: Low to High</SelectItem>
                    <SelectItem value="price-high">Price: High to Low</SelectItem>
                    <SelectItem value="name">Name: A to Z</SelectItem>
                  </SelectContent>
                </Select>

                {/* Mobile Filter */}
                <Sheet>
                  <SheetTrigger asChild className="lg:hidden">
                    <Button variant="outline" size="sm" className="rounded-xl">
                      <Filter className="w-4 h-4 mr-2" />
                      Filters
                    </Button>
                  </SheetTrigger>
                  <SheetContent side="left" className="w-80 sm:rounded-r-2xl">
                    <SheetHeader>
                      <SheetTitle>Filters</SheetTitle>
                      <SheetDescription>
                        Refine your search results
                      </SheetDescription>
                    </SheetHeader>
                    <div className="mt-8">
                      <FilterContent />
                    </div>
                  </SheetContent>
                </Sheet>
              </div>
            </div>

            {/* Active Filters */}
            {(selectedMediums.length > 0 || selectedThemes.length > 0) && (
              <div className="flex flex-wrap gap-2 mb-8">
                {selectedMediums.map(m => (
                  <Badge
                    key={m}
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg px-3 py-1"
                    onClick={() => toggleMedium(m)}
                  >
                    {m} ×
                  </Badge>
                ))}
                {selectedThemes.map(t => (
                  <Badge
                    key={t}
                    variant="secondary"
                    className="bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg px-3 py-1"
                    onClick={() => toggleTheme(t)}
                  >
                    {t} ×
                  </Badge>
                ))}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => {
                    setSelectedMediums([]);
                    setSelectedThemes([]);
                  }}
                  className="text-sm font-light hover:bg-transparent hover:underline px-2"
                >
                  Clear all
                </Button>
              </div>
            )}

            {/* Products */}
            {sortedProducts.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl mx-auto max-w-2xl">
                <div className="mb-4 text-4xl">🎨</div>
                <p className="text-gray-900 text-lg font-medium">No artworks found</p>
                <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
                <Button
                  variant="default"
                  className="rounded-xl bg-gray-900 text-white"
                  onClick={() => {
                    setSelectedMediums([]);
                    setSelectedThemes([]);
                    setPriceRange([0, 50000]);
                    setSearchQuery('');
                  }}
                >
                  View All Artworks
                </Button>
              </div>
            ) : (
              <motion.div
                className={viewMode === 'grid' ? 'grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8' : 'space-y-6'}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
              >
                {sortedProducts.map((product, index) => (
                  <motion.div
                    key={product.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -8 }}
                    className="group cursor-pointer"
                    onClick={() => navigate(`/product/${product.id}`)}
                  >
                    {viewMode === 'grid' ? (
                      <div>
                        <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-2xl shadow-sm">
                          <img
                            src={product.image}
                            alt={product.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />

                          <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                            <button className="bg-white/90 backdrop-blur-sm rounded-full p-2.5 shadow-lg hover:bg-white transition-all transform hover:scale-110">
                              <Heart className="w-5 h-5 text-gray-900" />
                            </button>
                          </div>
                        </div>

                        <div className="space-y-2 px-1">
                          <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                            {product.title}
                          </h3>
                          <p className="text-sm text-gray-600 font-light">{product.artist}</p>
                          <div className="flex items-center justify-between pt-2">
                            <span className="text-2xl font-light text-gray-900">
                              ₹{product.price.toLocaleString()}
                            </span>
                            <span className="text-xs text-gray-500 tracking-wide font-medium bg-gray-100 px-2 py-1 rounded-md">{product.medium.split(' ')[0]}</span>
                          </div>
                        </div>
                      </div>
                    ) : (
                      <Card className="overflow-hidden border-0 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl">
                        <div className="flex gap-6">
                          <div className="w-64 h-64 shrink-0 overflow-hidden bg-gray-100">
                            <img
                              src={product.image}
                              alt={product.title}
                              className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                            />
                          </div>

                          <div className="flex-1 p-8 flex flex-col justify-between">
                            <div>
                              <div className="flex justify-between items-start">
                                <h3 className="text-2xl font-medium text-gray-900 mb-2 group-hover:text-[#D4AF37] transition-colors">
                                  {product.title}
                                </h3>
                                <button className="text-gray-400 hover:text-red-500 transition-colors">
                                  <Heart className="w-5 h-5" />
                                </button>
                              </div>
                              <p className="text-gray-600 font-light mb-4">by {product.artist}</p>
                              <div className="flex gap-2 mb-4">
                                <Badge variant="secondary" className="rounded-md">{product.category}</Badge>
                                <Badge variant="secondary" className="rounded-md">{product.medium}</Badge>
                              </div>
                            </div>

                            <div className="flex items-center justify-between mt-auto">
                              <span className="text-3xl font-light text-gray-900">
                                ₹{product.price.toLocaleString()}
                              </span>
                              <Button className="bg-[#D4AF37] hover:bg-[#C19B2A] rounded-xl px-8 h-12 text-base">
                                View Details
                              </Button>
                            </div>
                          </div>
                        </div>
                      </Card>
                    )}
                  </motion.div>
                ))}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
