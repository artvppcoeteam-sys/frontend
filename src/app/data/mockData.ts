// Comprehensive Mock Data for Artvpp Platform

// ===== FEATURED ARTWORKS =====
export const featuredArtworks = [
  {
    id: '1',
    title: 'Abstract Dreams',
    artist: 'Meera Kapoor',
    image: '/images/a.jpeg',
    price: 12500,
    category: 'Original Art',
    medium: 'Acrylic on Canvas',
    dimensions: '36" × 48"',
    featured: true,
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '2',
    title: 'Serene Landscape',
    artist: 'Rajesh Kumar',
    image: '/images/d.jpeg',
    price: 8900,
    category: 'Original Art',
    medium: 'Watercolor',
    dimensions: '24" × 36"',
    featured: true,
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '3',
    title: 'Portrait in Blue',
    artist: 'Ananya Sharma',
    image: '/images/g.jpeg',
    price: 15000,
    category: 'Original Art',
    medium: 'Oil on Canvas',
    dimensions: '30" × 40"',
    featured: true,
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '4',
    title: 'Modern Sculpture',
    artist: 'Vikram Patel',
    image: '/images/l.jpeg',
    price: 25000,
    category: 'Original Art',
    medium: 'Bronze',
    dimensions: '18" × 12" × 8"',
    featured: true,
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
];

// ===== MAIN CATEGORIES =====
export const categories = [
  //E-COMMERCE CATEGORIES
  {
    id: 'original-art',
    name: 'Original Art',
    description: 'Unique paintings, drawings & mixed media',
    icon: '🎨',
    image: '/images/n.jpeg',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: 'prints',
    name: 'Prints & Reproductions',
    description: 'Limited edition prints & posters',
    icon: '🖼️',
    image: '/images/p.jpeg',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: 'handcrafted',
    name: 'Handcrafted Items',
    description: 'Pottery, wood, metal & textile art',
    icon: '🏺',
    image: '/images/y.jpeg',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: 'merchandise',
    name: 'Art Merchandise',
    description: 'T-shirts, mugs, totes & more',
    icon: '🛍️',
    image: '/images/bnm.jpeg',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: 'digital-art',
    name: 'Digital Art',
    description: 'Instant downloads & NFTs',
    icon: '💻',
    image: '/images/dfg.jpeg',
    type: 'e-commerce',
    subcategory: 'Digital Art Products'
  },

  // CREATIVE SERVICES CATEGORIES
  {
    id: 'commissions',
    name: 'Custom Commissions',
    description: 'Personalized artwork made for you',
    icon: '✨',
    image: '/images/fg.jpeg',
    type: 'service',
    subcategory: 'Customized & Commission-Based Art'
  },
  {
    id: 'art-services',
    name: 'Art Services',
    description: 'Logo, branding & illustration',
    icon: '🎯',
    image: '/images/fgh.jpeg',
    type: 'service',
    subcategory: 'Art Services'
  },
  {
    id: 'workshops',
    name: 'Workshops & Classes',
    description: 'Learn from master artists',
    icon: '🎓',
    image: '/images/fghjk.jpeg',
    type: 'service',
    subcategory: 'Educational Art Products'
  },
];

// ===== ALL PRODUCTS =====
export const allProducts = [
  ...featuredArtworks,

  // PHYSICAL ART PRODUCTS
  {
    id: '5',
    title: 'Traditional Warli Art',
    artist: 'Lakshmi Devi',
    image: '/images/ghjkl.jpeg',
    price: 4500,
    category: 'Original Art',
    medium: 'Acrylic on Canvas',
    dimensions: '20" × 24"',
    type: 'e-commerce',
    subcategory: 'Traditional & Tribal Art'
  },
  {
    id: '6',
    title: 'Madhubani Fish',
    artist: 'Sita Kumari',
    image: '/images/jj.jpeg',
    price: 3200,
    category: 'Original Art',
    medium: 'Natural Dyes on Paper',
    dimensions: '16" × 20"',
    type: 'e-commerce',
    subcategory: 'Traditional & Tribal Art'
  },
  {
    id: '7',
    title: 'Terracotta Horse',
    artist: 'Ramesh Chand',
    image: '/images/okjm.jpeg',
    price: 1800,
    category: 'Handcrafted Items',
    medium: 'Terracotta',
    dimensions: '12" × 8" × 6"',
    type: 'e-commerce',
    subcategory: 'Handcrafted Items'
  },
  {
    id: '8',
    title: 'Wooden Wall Plate',
    artist: 'Kamal Artisans',
    image: '/images/tyu.jpeg',
    price: 2200,
    category: 'Handcrafted Items',
    medium: 'Carved Wood',
    dimensions: '14" diameter',
    type: 'e-commerce',
    subcategory: 'Handcrafted Items'
  },

  // PRINTS & REPRODUCTIONS
  {
    id: '9',
    title: 'Sunset Symphony Print',
    artist: 'Priya Nair',
    image: '/images/vbh.jpeg',
    price: 1200,
    category: 'Prints & Reproductions',
    medium: 'Giclée Print',
    dimensions: '18" × 24"',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '10',
    title: 'Limited Edition: Urban Life',
    artist: 'Arjun Mehta',
    image: '/images/xcfg.jpeg',
    price: 3500,
    category: 'Prints & Reproductions',
    medium: 'Limited Edition Print (50/100)',
    dimensions: '24" × 36"',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '10a',
    title: 'Botanical Series Print',
    artist: 'Kavya Reddy',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.17 PM.jpeg',
    price: 1500,
    category: 'Prints & Reproductions',
    medium: 'Fine Art Print',
    dimensions: '20" × 30"',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },
  {
    id: '10b',
    title: 'Vintage Poster Collection',
    artist: 'Retro Studios',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.18 PM.jpeg',
    price: 899,
    category: 'Prints & Reproductions',
    medium: 'Poster Print',
    dimensions: '16" × 24"',
    type: 'e-commerce',
    subcategory: 'Physical Art Products'
  },

  // ART-BASED MERCHANDISE
  {
    id: '11',
    title: 'Abstract Art T-Shirt',
    artist: 'Artvpp Collection',
    image: '/images/1.jpg',
    price: 899,
    category: 'Art Merchandise',
    medium: 'Premium Cotton',
    dimensions: 'S, M, L, XL',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '12',
    title: 'Artist Tote Bag',
    artist: 'Artvpp Collection',
    image: '/images/41.png',
    price: 599,
    category: 'Art Merchandise',
    medium: 'Canvas',
    dimensions: '15" × 16"',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '13',
    title: 'Art Lover Mug',
    artist: 'Artvpp Collection',
    image: '/images/45.png',
    price: 399,
    category: 'Art Merchandise',
    medium: 'Ceramic',
    dimensions: '11 oz',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '14',
    title: 'Decorative Cushion Cover',
    artist: 'Artvpp Collection',
    image: '/images/55.png',
    price: 749,
    category: 'Art Merchandise',
    medium: 'Premium Fabric',
    dimensions: '16" × 16"',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '14a',
    title: 'Phone Case - Abstract',
    artist: 'Artvpp Collection',
    image: '/images/56.jpg',
    price: 499,
    category: 'Art Merchandise',
    medium: 'TPU Material',
    dimensions: 'Universal Fit',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '14b',
    title: 'Art Sticker Pack',
    artist: 'Artvpp Collection',
    image: '/images/66.jpg',
    price: 249,
    category: 'Art Merchandise',
    medium: 'Vinyl Stickers (20 Pack)',
    dimensions: 'Various Sizes',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '14c',
    title: 'Wall Lampshade - Artistic',
    artist: 'Artvpp Collection',
    image: '/images/75.jpg',
    price: 1499,
    category: 'Art Merchandise',
    medium: 'Fabric & Metal',
    dimensions: '10" × 12"',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },
  {
    id: '14d',
    title: 'Art Postcard Set',
    artist: 'Artvpp Collection',
    image: '/images/95.jpg',
    price: 349,
    category: 'Art Merchandise',
    medium: 'Premium Cardstock (12 Pack)',
    dimensions: '4" × 6"',
    type: 'e-commerce',
    subcategory: 'Art-Based Merchandise'
  },

  // MORE HANDCRAFTED ITEMS
  {
    id: '14e',
    title: 'Blue Pottery Vase',
    artist: 'Jaipur Artisans',
    image: '/images/cvb.jpg',
    price: 2800,
    category: 'Handcrafted Items',
    medium: 'Ceramic Pottery',
    dimensions: '10" height',
    type: 'e-commerce',
    subcategory: 'Handcrafted Items'
  },
  {
    id: '14f',
    title: 'Metal Wall Art - Ganesha',
    artist: 'Moradabad Crafts',
    image: '/images/im.jpg',
    price: 3200,
    category: 'Handcrafted Items',
    medium: 'Brass Metal',
    dimensions: '18" × 14"',
    type: 'e-commerce',
    subcategory: 'Handcrafted Items'
  },
  {
    id: '14g',
    title: 'Handwoven Textile Art',
    artist: 'Bengal Weavers',
    image: '/images/im2.jpg',
    price: 4500,
    category: 'Handcrafted Items',
    medium: 'Handwoven Fabric',
    dimensions: '36" × 48"',
    type: 'e-commerce',
    subcategory: 'Handcrafted Items'
  },
  {
    id: '14h',
    title: 'Miniature Taj Mahal Model',
    artist: 'Agra Artisans',
    image: '/images/jfj.jpg',
    price: 1899,
    category: 'Handcrafted Items',
    medium: 'Marble & Stone',
    dimensions: '8" × 8" × 10"',
    type: 'e-commerce',
    subcategory: 'Miniature Modeling'
  },
  {
    id: '14i',
    title: 'Art Sketchbook - Premium',
    artist: 'Artvpp Stationery',
    image: '/images/jj.jpg',
    price: 599,
    category: 'Handcrafted Items',
    medium: 'Handmade Paper',
    dimensions: 'A4 Size (120 pages)',
    type: 'e-commerce',
    subcategory: 'Art Books & Stationery'
  },
  {
    id: '14j',
    title: 'Art Techniques Book',
    artist: 'Master Artists Collective',
    image: '/images/rgb.jpg',
    price: 899,
    category: 'Handcrafted Items',
    medium: 'Hardcover Book',
    dimensions: '250 pages',
    type: 'e-commerce',
    subcategory: 'Art Books & Stationery'
  },

  // PHOTOGRAPHY
  {
    id: 'photo-1',
    title: 'Urban Solitude',
    artist: 'Vikram Singh',
    image: '/images/d.jpeg',
    price: 4500,
    category: 'Original Art',
    medium: 'Fine Art Photographs',
    dimensions: '24" × 36"',
    type: 'e-commerce',
    subcategory: 'Photography'
  },
  {
    id: 'photo-2',
    title: 'Monochrome Valley',
    artist: 'Anjali Desai',
    image: '/images/g.jpeg',
    price: 3200,
    category: 'Original Art',
    medium: 'Black & White Photographs',
    dimensions: '18" × 24"',
    type: 'e-commerce',
    subcategory: 'Photography'
  },

  // TEXTILE ART
  {
    id: 'textile-1',
    title: 'Macrame Wall Hanging',
    artist: 'Boho Crafts',
    image: '/images/im2.jpg',
    price: 2800,
    category: 'Handcrafted Items',
    medium: 'Textile Art - Macrame',
    dimensions: '30" × 50"',
    type: 'e-commerce',
    subcategory: 'Wall Decor'
  },
  {
    id: 'textile-2',
    title: 'Kantha Stitch Saree',
    artist: 'Bengal Weavers',
    image: '/images/jj.jpg',
    price: 6500,
    category: 'Handcrafted Items',
    medium: 'Textile Art - Embroidery',
    dimensions: 'Standard Saree',
    type: 'e-commerce',
    subcategory: 'Apparel'
  },


  // DIGITAL ART PRODUCTS
  {
    id: '15',
    title: 'Digital Illustration Pack',
    artist: 'Neha Gupta',
    image: '/images/vh4.jpg',
    price: 1499,
    category: 'Digital Art',
    medium: 'Digital Download (AI, PSD, PNG)',
    dimensions: '4000 × 4000 px',
    type: 'e-commerce',
    subcategory: 'Digital Art Products'
  },
  {
    id: '16',
    title: 'Watercolor Texture Pack',
    artist: 'Ravi Desai',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.17 PM.jpeg',
    price: 899,
    category: 'Digital Art',
    medium: 'Digital Download (50 Textures)',
    dimensions: '3000 × 3000 px',
    type: 'e-commerce',
    subcategory: 'Digital Art Products'
  },
  {
    id: '17',
    title: 'Social Media Template Set',
    artist: 'Design Studio',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.18 PM.jpeg',
    price: 1999,
    category: 'Digital Art',
    medium: 'Digital Download (Canva, PSD)',
    dimensions: 'Various Sizes',
    type: 'e-commerce',
    subcategory: 'Digital Art Products'
  },
  {
    id: '17a',
    title: 'Stock Photo Bundle - Nature',
    artist: 'PhotoArt Studio',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.18 PMaa.jpeg',
    price: 2499,
    category: 'Digital Art',
    medium: 'Digital Download (100 Photos)',
    dimensions: '6000 × 4000 px',
    type: 'e-commerce',
    subcategory: 'Stock Photos & Textures'
  },
  {
    id: '17b',
    title: 'Custom Brush Pack - Procreate',
    artist: 'Digital Artists Guild',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.19 PM.jpeg',
    price: 799,
    category: 'Digital Art',
    medium: 'Digital Download (75 Brushes)',
    dimensions: 'Procreate Compatible',
    type: 'e-commerce',
    subcategory: 'Fonts, Icons, Brush Packs'
  },
  {
    id: '17c',
    title: 'Icon Set - 500+ Icons',
    artist: 'Icon Masters',
    image: '/images/a.jpeg',
    price: 1299,
    category: 'Digital Art',
    medium: 'Digital Download (SVG, PNG)',
    dimensions: 'Scalable Vector',
    type: 'e-commerce',
    subcategory: 'Fonts, Icons, Brush Packs'
  },
  {
    id: '17d',
    title: 'Desktop Wallpaper Collection',
    artist: 'Pixel Perfect Studio',
    image: '/images/d.jpeg',
    price: 499,
    category: 'Digital Art',
    medium: 'Digital Download (30 Wallpapers)',
    dimensions: '4K & 5K Resolution',
    type: 'e-commerce',
    subcategory: 'Wallpapers & Screensavers'
  },
  {
    id: '17e',
    title: 'Artistic Font Family',
    artist: 'Typography Studio',
    image: '/images/g.jpeg',
    price: 1899,
    category: 'Digital Art',
    medium: 'Digital Download (5 Font Weights)',
    dimensions: 'OTF, TTF Format',
    type: 'e-commerce',
    subcategory: 'Fonts, Icons, Brush Packs'
  },
];

// ===== SERVICES =====
export const services = [
  {
    id: 'service-1',
    title: 'Miniature Display',
    description: 'Miniature model and display creation for exhibitions, presentations, architectural models, and artistic showcases.',
    icon: '🔍',
    image: '/images/okjm.jpeg',
    startingPrice: 1999,
    deliveryTime: '2-4 weeks',
    category: 'Display Art',
    features: ['Detailed craftsmanship', 'Custom lighting', 'Glass enclosure', 'Thematic setup'],
    pricing: [
      { name: 'Basic', price: 1999, features: ['Small scale model', 'Basic materials', 'No enclosure'] },
      { name: 'Standard', price: 4999, features: ['Medium scale', 'Standard details', 'Basic enclosure'] },
      { name: 'Premium', price: 9999, features: ['Large intricate model', 'Premium materials', 'With lighting & glass'] }
    ]
  },
  {
    id: 'service-2',
    title: 'Photography',
    description: 'Professional photography services for events, portraits, products, and creative shoots.',
    icon: '📸',
    image: '/images/fgh.jpeg',
    startingPrice: 2499,
    deliveryTime: '3-5 days',
    category: 'Media Services',
    features: ['High-res editing', 'Creative direction', 'Retouching', 'Digital delivery'],
    pricing: [
      { name: 'Basic', price: 2499, features: ['2-hour shoot', '20 edited photos', 'Digital delivery'] },
      { name: 'Standard', price: 5999, features: ['Half-day shoot', '50 edited photos', 'Advanced retouching'] },
      { name: 'Premium', price: 9999, features: ['Full-day shoot', 'Unlimited photos', 'Print-ready files'] }
    ]
  },
  {
    id: 'service-3',
    title: 'Sculptures',
    description: 'Custom sculpture creation in wood, metal, clay, and mixed media for decor, installations, and artistic projects.',
    icon: '🗿',
    image: '/images/p.jpeg',
    startingPrice: 3999,
    deliveryTime: '4-8 weeks',
    category: '3D Art',
    features: ['Material selection', '3D modeling', 'Installation', 'Large scale options'],
    pricing: [
      { name: 'Basic', price: 3999, features: ['Small clay/wood sculpture', 'Simple design'] },
      { name: 'Standard', price: 8999, features: ['Medium mixed media', 'Detailed finish'] },
      { name: 'Premium', price: 19999, features: ['Large metal/stone installation', 'Complex design'] }
    ]
  },
  {
    id: 'service-4',
    title: 'Short Films',
    description: 'End-to-end short film creation including concept, shooting, and basic editing for creative projects and brand storytelling.',
    icon: '🎬',
    image: '/images/l.jpeg',
    startingPrice: 7999,
    deliveryTime: '2-3 weeks',
    category: 'Media Services',
    features: ['Scriptwriting', 'Direction', 'Post-production', 'Sound design'],
    pricing: [
      { name: 'Basic', price: 7999, features: ['1-minute video', 'Basic editing', 'Stock music'] },
      { name: 'Standard', price: 14999, features: ['3-minute video', 'Advanced editing', 'Custom script'] },
      { name: 'Premium', price: 29999, features: ['5+ minute film', 'Cinematic production', 'Full crew'] }
    ]
  },
  {
    id: 'service-5',
    title: 'Studio on Hire',
    description: 'Rent creative studios for photoshoots, video production, workshops, and content creation with professional setups.',
    icon: '🏢',
    image: '/images/fd.jpeg',
    startingPrice: 799,
    deliveryTime: 'Immediate',
    category: 'Rental',
    features: ['Lighting setup', 'Easels & tables', 'Storage space', 'WiFi & Amenities'],
    pricing: [
      { name: 'Hourly', price: 799, features: ['1 Hour access', 'Basic lights', 'WiFi'] },
      { name: 'Half-day', price: 3999, features: ['4 Hours access', 'Full equipment', 'Assistant'] },
      { name: 'Full-day', price: 6999, features: ['8 Hours access', 'All amenities', 'Priority support'] }
    ]
  },
  {
    id: 'service-6',
    title: 'Videography',
    description: 'High-quality videography services for events, promotional videos, social media content, and creative storytelling.',
    icon: '🎥',
    image: '/images/fgh.jpeg',
    startingPrice: 4999,
    deliveryTime: '1-2 weeks',
    category: 'Media Services',
    features: ['4K recording', 'Professional audio', 'Color grading', 'Multi-cam setup'],
    pricing: [
      { name: 'Basic', price: 4999, features: ['Event highlights', '1 cam', 'Basic edit'] },
      { name: 'Standard', price: 9999, features: ['Full coverage', '2 cams', 'Advanced edit'] },
      { name: 'Premium', price: 18999, features: ['Cinematic production', 'Drone shots', 'Teaser + Full film'] }
    ]
  },
  {
    id: 'service-7',
    title: 'Wall Painting',
    description: 'Custom wall painting services for homes, offices, cafes, and public spaces. Choose from murals, themed artwork, and personalized designs.',
    icon: '🎨',
    image: '/images/ghj.jpg',
    startingPrice: 2999,
    deliveryTime: '3-7 days',
    category: 'Wall Art',
    features: ['Custom Design', 'Site Visit', 'Premium Paints', 'Weatherproof options'],
    pricing: [
      { name: 'Basic', price: 2999, features: ['Small wall artwork', 'Simple pattern', '1-2 days'] },
      { name: 'Standard', price: 6999, features: ['Medium wall mural', 'Detailed art', '3-4 days'] },
      { name: 'Premium', price: 12999, features: ['Large custom mural', 'Complex theme', '5+ days'] }
    ]
  },
];

// ===== WORKSHOPS =====
export const workshops = [
  {
    id: 'workshop-1',
    title: 'Watercolor Landscape Painting',
    instructor: 'Rajesh Kumar',
    description: 'Learn the fundamentals of watercolor landscape painting in this hands-on workshop.',
    image: '/images/fgh.jpeg',
    price: 2500,
    duration: '2 days (6 hours)',
    level: 'Beginner',
    date: 'March 15-16, 2026',
    spots: 12,
    includes: ['All materials', 'Certificate', 'Lunch & refreshments', 'Take-home artwork']
  },
  {
    id: 'workshop-2',
    title: 'Digital Illustration Masterclass',
    instructor: 'Neha Gupta',
    description: 'Master digital illustration techniques using industry-standard software.',
    image: '/images/fghjk.jpeg',
    price: 4500,
    duration: '4 days (12 hours)',
    level: 'Intermediate',
    date: 'March 20-23, 2026',
    spots: 15,
    includes: ['Software access', 'Certificate', 'Project files', 'Lifetime support group']
  },
  {
    id: 'workshop-3',
    title: 'Pottery & Ceramics Basics',
    instructor: 'Ramesh Chand',
    description: 'Get your hands dirty and create beautiful pottery pieces from scratch.',
    image: '/images/ghjkl.jpeg',
    price: 3500,
    duration: '3 days (9 hours)',
    level: 'Beginner',
    date: 'March 18-20, 2026',
    spots: 10,
    includes: ['All materials', 'Kiln firing', 'Certificate', 'Take-home pieces']
  },
  {
    id: 'workshop-4',
    title: 'Portrait Drawing Certificate Course',
    instructor: 'Ananya Sharma',
    description: 'Comprehensive course on portrait drawing techniques and human anatomy.',
    image: '/images/im.jpg',
    price: 8500,
    duration: '8 weeks (24 hours)',
    level: 'All Levels',
    date: 'Starts April 1, 2026',
    spots: 20,
    includes: ['Professional certificate', 'Art supplies', 'Portfolio review', 'Exhibition opportunity']
  },
  {
    id: 'workshop-5',
    title: 'Abstract Acrylic Techniques',
    instructor: 'Meera Kapoor',
    description: 'Explore modern abstract painting techniques and develop your unique style.',
    image: '/images/jj.jpeg',
    price: 3000,
    duration: '1 day (5 hours)',
    level: 'All Levels',
    date: 'March 25, 2026',
    spots: 15,
    includes: ['Canvas & paints', 'Certificate', 'Lunch', 'Take-home artwork']
  },
  {
    id: 'workshop-6',
    title: 'Miniature Art Workshop',
    instructor: 'Lakshmi Devi',
    description: 'Learn the intricate art of miniature painting in traditional Indian style.',
    image: '/images/okjm.jpeg',
    price: 2000,
    duration: '1 day (4 hours)',
    level: 'Beginner',
    date: 'March 22, 2026',
    spots: 8,
    includes: ['All materials', 'Certificate', 'Refreshments', 'Completed miniature']
  },
];

// ===== FEATURED ARTISTS =====
export const featuredArtists = [
  {
    id: 'artist-1',
    name: 'Meera Kapoor',
    specialty: 'Abstract & Contemporary Art',
    avatar: '/images/1.jpg',
    artworks: 45,
    followers: '2.3K',
    bio: 'Award-winning contemporary artist specializing in vibrant abstract compositions.',
    verified: true
  },
  {
    id: 'artist-2',
    name: 'Rajesh Kumar',
    specialty: 'Landscape & Watercolor',
    avatar: '/images/66.jpg',
    artworks: 68,
    followers: '3.1K',
    bio: 'Master watercolorist known for stunning landscape paintings and nature scenes.',
    verified: true
  },
  {
    id: 'artist-3',
    name: 'Ananya Sharma',
    specialty: 'Portrait & Figurative Art',
    avatar: '/images/75.jpg',
    artworks: 52,
    followers: '1.8K',
    bio: 'Renowned portrait artist with expertise in realistic oil paintings.',
    verified: true
  },
  {
    id: 'artist-4',
    name: 'Vikram Patel',
    specialty: 'Sculpture & 3D Art',
    avatar: '/images/95.jpg',
    artworks: 34,
    followers: '1.5K',
    bio: 'Contemporary sculptor creating thought-provoking bronze and mixed media works.',
    verified: true
  },
];

// ===== NAVIGATION MENU STRUCTURE =====
export const navigationMenu = {
  shop: {
    title: 'Shop Art',
    sections: [
      {
        name: 'By Medium',
        items: [
          { name: 'All Art', link: 'shop' },
          { name: 'Acrylic', link: 'shop?medium=acrylic' },
          { name: 'Oil', link: 'shop?medium=oil' },
          { name: 'Watercolor', link: 'shop?medium=watercolor' },
          { name: 'Lithographs', link: 'shop?medium=lithographs' },
          { name: 'Photographs', link: 'shop?medium=photographs' },
          { name: 'Prints', link: 'shop?medium=prints' },
          { name: 'Textile Art', link: 'shop?medium=textile-art' },
        ]
      },
      {
        name: 'By Style',
        items: [
          { name: 'Landscape', link: 'shop?style=landscape' },
          { name: 'Floral', link: 'shop?style=floral' },
          { name: 'Architecture', link: 'shop?style=architecture' },
          { name: 'Abstract', link: 'shop?style=abstract' },
          { name: 'Religious', link: 'shop?style=religious' },
          { name: 'Vintage', link: 'shop?style=vintage' },
        ]
      }
    ]
  },
  discover: {
    title: 'Discover',
    sections: [
      {
        name: 'Services',
        items: [
          { name: 'All Services', link: 'services' },
          { name: 'Photography', link: 'service-detail', id: 'service-2' },
          { name: 'Videography', link: 'service-detail', id: 'service-6' },
          { name: 'Short Films', link: 'service-detail', id: 'service-4' },
          { name: 'Sculptures', link: 'service-detail', id: 'service-3' },
          { name: 'Studio on Hire', link: 'service-detail', id: 'service-5' },
        ]
      },
      {
        name: 'Specialized Art',
        items: [
          { name: 'Miniature Display', link: 'service-detail', id: 'service-1' },
          { name: 'Miniature modeling for all films and movies', link: 'service-detail', id: 'service-1' },
          { name: 'Miniature modeling for all industries', link: 'service-detail', id: 'service-1' },
          { name: 'Wall Painting', link: 'service-detail', id: 'service-7' },
          { name: 'Outdoor Wallpaintings', link: 'service-detail', id: 'service-7' },
        ]
      }
    ]
  }
};

// ===== ADMIN DASHBOARD DATA =====
export const platformUsers = [
  {
    id: 'user-1',
    name: 'Priya Sharma',
    email: 'priya@example.com',
    role: 'customer',
    joinDate: '2024-01-15',
    totalSpent: 45000,
    status: 'active',
    avatar: 'https://github.com/shadcn.png',
    totalOrders: 12
  },
  {
    id: 'user-2',
    name: 'Meera Kapoor',
    email: 'meera@artvpp.com',
    role: 'vendor',
    joinDate: '2023-08-10',
    totalRevenue: 125000,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    totalOrders: 25,
    vendorRevenue: 125000
  },
  {
    id: 'user-3',
    name: 'Rahul Verma',
    email: 'rahul@example.com',
    role: 'customer',
    joinDate: '2024-02-20',
    totalSpent: 12000,
    status: 'active',
    avatar: 'https://github.com/shadcn.png',
    totalOrders: 5
  },
  {
    id: 'user-4',
    name: 'Rajesh Kumar',
    email: 'rajesh@artvpp.com',
    role: 'vendor',
    joinDate: '2023-06-05',
    totalRevenue: 98000,
    status: 'active',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100',
    totalOrders: 18,
    vendorRevenue: 98000
  },
];

export const vendorApplications = [
  {
    id: 'app-1',
    name: 'Arun Desai',
    email: 'arun@example.com',
    specialty: 'Watercolor Paintings',
    portfolioUrl: 'https://example.com/portfolio',
    status: 'pending',
    appliedDate: '2026-02-01',
    avatar: 'https://github.com/shadcn.png',
    applicationDate: '2026-02-01',
    experience: '5 years'
  },
  {
    id: 'app-2',
    name: 'Kavita Singh',
    email: 'kavita@example.com',
    specialty: 'Digital Illustrations',
    portfolioUrl: 'https://example.com/portfolio',
    status: 'pending',
    appliedDate: '2026-02-03',
    avatar: 'https://github.com/shadcn.png',
    applicationDate: '2026-02-03',
    experience: '3 years'
  },
  {
    id: 'app-3',
    name: 'Rohit Mehta',
    email: 'rohit@example.com',
    specialty: 'Sculpture',
    portfolioUrl: 'https://example.com/portfolio',
    status: 'approved',
    appliedDate: '2026-01-28'
  },
];

export const platformOrders = [
  {
    id: 'ORD-001',
    customer: 'Priya Sharma',
    vendor: 'Meera Kapoor',
    product: 'Abstract Dreams',
    amount: 12500,
    commission: 1875,
    status: 'delivered',
    date: '2026-02-05'
  },
  {
    id: 'ORD-002',
    customer: 'Rahul Verma',
    vendor: 'Rajesh Kumar',
    product: 'Serene Landscape',
    amount: 8900,
    commission: 1335,
    status: 'processing',
    date: '2026-02-06'
  },
  {
    id: 'ORD-003',
    customer: 'Ananya Patel',
    vendor: 'Meera Kapoor',
    product: 'Modern Sculpture',
    amount: 25000,
    commission: 3750,
    status: 'shipped',
    date: '2026-02-04'
  },
  {
    id: 'ORD-004',
    customer: 'Priya Sharma',
    vendor: 'Rajesh Kumar',
    product: 'Portrait in Blue',
    amount: 15000,
    commission: 2250,
    status: 'delivered',
    date: '2026-02-01'
  },
];

export const adminAnalyticsData = {
  revenueByMonth: [
    { month: 'Jan', revenue: 85000, orders: 42, customers: 38 },
    { month: 'Feb', revenue: 95000, orders: 48, customers: 45 },
    { month: 'Mar', revenue: 78000, orders: 38, customers: 35 },
    { month: 'Apr', revenue: 112000, orders: 55, customers: 52 },
    { month: 'May', revenue: 125000, orders: 62, customers: 58 },
    { month: 'Jun', revenue: 108000, orders: 51, customers: 48 },
  ],
  categoryRevenue: [
    { name: 'Original Art', value: 245000, color: '#D4AF37' },
    { name: 'Prints', value: 98000, color: '#8B4049' },
    { name: 'Digital Art', value: 65000, color: '#4A5568' },
    { name: 'Merchandise', value: 42000, color: '#E89C31' },
    { name: 'Commissions', value: 125000, color: '#2D3748' },
  ],
  topVendors: [
    {
      name: 'Meera Kapoor',
      revenue: 125000,
      orders: 45,
      rating: 4.9,
      avatar: '/images/tyu.jpeg'
    },
    {
      name: 'Rajesh Kumar',
      revenue: 98000,
      orders: 38,
      rating: 4.8,
      avatar: '/images/vbh.jpeg'
    },
    {
      name: 'Ananya Sharma',
      revenue: 87000,
      orders: 32,
      rating: 4.9,
      avatar: '/images/xcfg.jpeg'
    },
    {
      name: 'Vikram Patel',
      revenue: 76000,
      orders: 28,
      rating: 4.7,
      avatar: '/images/nfnf.png'
    },
  ]
};

// ===== VENDOR DASHBOARD DATA =====
export const vendorProducts = [
  {
    id: 'prod-1',
    name: 'Abstract Dreams',
    category: 'Original Art',
    price: 12500,
    stock: 1,
    sold: 3,
    status: 'active',
    image: '/images/a.jpeg',
    rating: 4.9,
    reviews: 12
  },
  {
    id: 'prod-2',
    name: 'Serene Landscape',
    category: 'Original Art',
    price: 8900,
    stock: 2,
    sold: 5,
    status: 'active',
    image: '/images/d.jpeg',
    rating: 4.8,
    reviews: 18
  },
  {
    id: 'prod-3',
    name: 'Portrait in Blue',
    category: 'Original Art',
    price: 15000,
    stock: 1,
    sold: 2,
    status: 'active',
    image: '/images/g.jpeg',
    rating: 5.0,
    reviews: 8
  },
  {
    id: 'prod-4',
    name: 'Limited Edition Print',
    category: 'Prints',
    price: 3500,
    stock: 15,
    sold: 24,
    status: 'active',
    image: '/images/xcfg.jpeg',
    rating: 4.7,
    reviews: 32
  },
  {
    id: 'prod-5',
    name: 'Digital Art Collection',
    category: 'Digital Art',
    price: 1999,
    stock: 999,
    sold: 67,
    status: 'active',
    image: '/images/vh4.jpg',
    rating: 4.9,
    reviews: 45
  },
  {
    id: 'prod-6',
    name: 'Vintage Poster',
    category: 'Prints',
    price: 899,
    stock: 0,
    sold: 15,
    status: 'out-of-stock',
    image: '/images/WhatsApp Image 2026-02-08 at 1.16.18 PM.jpeg',
    rating: 4.6,
    reviews: 21
  },
];

export const vendorOrders = [
  {
    id: 'ORD-V001',
    customer: 'Priya Sharma',
    product: 'Abstract Dreams',
    amount: 12500,
    commission: 1875,
    status: 'delivered',
    date: '2026-02-05',
    paymentStatus: 'completed'
  },
  {
    id: 'ORD-V002',
    customer: 'Rahul Verma',
    product: 'Serene Landscape',
    amount: 8900,
    commission: 1335,
    status: 'processing',
    date: '2026-02-06',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-V003',
    customer: 'Ananya Patel',
    product: 'Portrait in Blue',
    amount: 15000,
    commission: 2250,
    status: 'shipped',
    date: '2026-02-04',
    paymentStatus: 'pending'
  },
  {
    id: 'ORD-V004',
    customer: 'Karan Singh',
    product: 'Limited Edition Print',
    amount: 3500,
    commission: 525,
    status: 'delivered',
    date: '2026-02-01',
    paymentStatus: 'completed'
  },
  {
    id: 'ORD-V005',
    customer: 'Meera Joshi',
    product: 'Digital Art Collection',
    amount: 1999,
    commission: 300,
    status: 'pending',
    date: '2026-02-07',
    paymentStatus: 'pending'
  },
];

export const vendorPayouts = [
  {
    id: 'PAY-001',
    amount: 28450,
    period: 'Jan 1 - Jan 15, 2026',
    status: 'completed',
    date: '2026-01-20',
    transactionId: 'TXN123456789'
  },
  {
    id: 'PAY-002',
    amount: 32800,
    period: 'Jan 16 - Jan 31, 2026',
    status: 'completed',
    date: '2026-02-05',
    transactionId: 'TXN987654321'
  },
  {
    id: 'PAY-003',
    amount: 18975,
    period: 'Feb 1 - Feb 15, 2026',
    status: 'pending',
    date: 'Expected: Feb 20, 2026',
    transactionId: '-'
  },
];

export const vendorAnalyticsData = {
  salesByMonth: [
    { month: 'Jan', sales: 42000, orders: 18, profit: 35700 },
    { month: 'Feb', sales: 38500, orders: 15, profit: 32725 },
    { month: 'Mar', sales: 51000, orders: 22, profit: 43350 },
    { month: 'Apr', sales: 48000, orders: 20, profit: 40800 },
    { month: 'May', sales: 62000, orders: 28, profit: 52700 },
    { month: 'Jun', sales: 55000, orders: 24, profit: 46750 },
  ],
  productPerformance: [
    { name: 'Abstract Dreams', sales: 37500, orders: 3 },
    { name: 'Serene Landscape', sales: 44500, orders: 5 },
    { name: 'Portrait in Blue', sales: 30000, orders: 2 },
    { name: 'Limited Edition', sales: 84000, orders: 24 },
    { name: 'Digital Collection', sales: 133933, orders: 67 },
  ],
  revenueByCategory: [
    { name: 'Original Art', value: 112000, color: '#D4AF37' },
    { name: 'Prints', value: 84000, color: '#8B4049' },
    { name: 'Digital Art', value: 133933, color: '#4A5568' },
    { name: 'Commissions', value: 45000, color: '#E89C31' },
  ]
};