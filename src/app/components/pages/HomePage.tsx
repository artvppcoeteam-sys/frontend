import { useState, useEffect } from 'react';
import { ArrowRight, Star, Palette, Users, Award, TrendingUp, Sparkles, Heart, ShoppingBag, Brush, CheckCircle, Play, ChevronRight, Info, Eye, ArrowUp, Search } from 'lucide-react';
import emp from '../../../assets/emp.png';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../ui/dialog';
import { featuredArtworks, categories, featuredArtists } from '../../data/mockData';
import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { useNavigate } from 'react-router-dom';

const fadeIn = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }
  }
};

const stagger = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15, delayChildren: 0.2 }
  }
};

export function HomePage() {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedArtist, setSelectedArtist] = useState<any>(null);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const heroSlides = [
    { id: 'slide-1', image: '/images/slider1.jpg', title: 'Discover Indian Art', artist: 'Curated Collection' },
    { id: 'slide-2', image: '/images/slider2.jpg', title: 'Celebrate Creativity', artist: 'Master Works' },
    { id: 'slide-3', image: '/images/slider3.jpg', title: 'Timeless Beauty', artist: 'Heritage Series' },
    { id: 'slide-4', image: '/images/slider4.jpg', title: 'Modern Expressions', artist: 'Contemporary Art' },
    { id: 'slide-5', image: '/images/slider5.jpg', title: 'Artistic Excellence', artist: 'Featured Artists' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleViewPortfolio = (artistId: string) => {
    const artist = featuredArtists.find(a => a.id === artistId);
    setSelectedArtist(artist);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section - Full Screen Slider */}
      <section className="relative min-h-[100dvh] bg-black">
        {/* Artwork Slider */}
        <div className="absolute inset-0">
          {heroSlides.map((artwork, index) => (
            <motion.div
              key={artwork.id}
              className="absolute inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: currentSlide === index ? 1 : 0 }}
              transition={{ duration: 1 }}
            >
              <img
                src={artwork.image}
                alt={artwork.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60" />
            </motion.div>
          ))}
        </div>

        {/* Hero Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 w-full">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="text-center text-white flex flex-col items-center"
            >
              <motion.div variants={fadeIn} className="mb-4">
                {/* Empty spacer or decorative if needed */}
              </motion.div>

              <motion.div variants={fadeIn} className="mb-6 relative z-10">
                <h1 className="flex flex-col items-center justify-center text-center">
                  <span className="block text-3xl sm:text-5xl lg:text-7xl font-serif tracking-[0.15em] text-white mb-3" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    YOUR ART DESERVES
                  </span>
                  <span className="block text-4xl sm:text-6xl lg:text-8xl font-serif font-bold text-[#D4AF37] tracking-[0.15em] drop-shadow-lg" style={{ fontFamily: 'Playfair Display, Georgia, serif' }}>
                    FREEDOM
                  </span>
                </h1>
              </motion.div>

              <motion.div variants={fadeIn} className="mb-10 text-center relative z-10">
                <p className="text-sm sm:text-base lg:text-lg font-medium tracking-[0.3em] text-white/90 uppercase">
                  UPLOAD FREE ON ARTVPP
                </p>
              </motion.div>

              <motion.div variants={fadeIn} className="flex flex-col gap-8 justify-center items-center w-full max-w-lg relative z-10">
                <Button
                  size="lg"
                  onClick={() => navigate('/marketplace')}
                  className="bg-white text-black hover:bg-gray-100 px-10 py-6 text-base rounded-full font-bold tracking-wide transition-transform hover:scale-105"
                >
                  SHOP THE COLLECTION
                </Button>

                {/* Hero Search Bar */}
                <div className="relative w-full">
                  <div className="relative flex items-center w-full bg-white/20 backdrop-blur-md rounded-full border border-white/30 overflow-hidden transition-all focus-within:bg-white/30 focus-within:border-white/50">
                    <Search className="absolute left-6 text-white/70 w-5 h-5" />
                    <input
                      type="text"
                      placeholder="Search artworks, artists, styles..."
                      className="w-full bg-transparent border-none text-white placeholder:text-white/70 py-4 pl-14 pr-16 focus:ring-0 focus:outline-none text-base font-light"
                    />
                    <button className="absolute right-2 p-2 bg-[#D4AF37] rounded-full hover:bg-[#b8952ddc] transition-colors">
                      <ArrowRight className="w-5 h-5 text-white" />
                    </button>
                  </div>
                </div>
              </motion.div>

              {/* Slide Indicators */}
              <motion.div variants={fadeIn} className="flex gap-2 justify-center mt-12">
                {heroSlides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentSlide(index)}
                    className={`h-1.5 rounded-full transition-all ${currentSlide === index ? 'w-12 bg-white' : 'w-2 bg-white/40'
                      }`}
                  />
                ))}
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-xs tracking-widest">SCROLL</span>
            <div className="w-px h-12 bg-white/30" />
          </motion.div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="bg-gradient-to-r from-[#8B4049] to-[#A85560] py-12">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center text-white">
            {[
              { value: '5,000+', label: 'Artworks Available' },
              { value: '1,200+', label: 'Talented Artists' },
              { value: '15,000+', label: 'Happy Collectors' },
              { value: '98%', label: 'Satisfaction Rate' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="text-3xl lg:text-4xl font-light mb-2">{stat.value}</div>
                <div className="text-sm opacity-90 tracking-wide">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Collection */}
      <section className="py-24 bg-white">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900">
                Featured Collection
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Discover masterpieces handpicked by our curators
              </p>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredArtworks.map((artwork, index) => (
                <motion.div
                  key={artwork.id}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  onClick={() => navigate(`/product/${artwork.id}`)}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[3/4] overflow-hidden bg-gray-100 mb-4 rounded-xl shadow-sm hover:shadow-xl transition-shadow duration-300">
                    <img
                      src={artwork.image}
                      alt={artwork.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

                    {/* Quick Actions */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <button className="bg-white rounded-full p-3 shadow-lg hover:bg-gray-100 transition-colors">
                        <Heart className="w-5 h-5 text-gray-900" />
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2 px-1">
                    <h3 className="text-xl font-medium text-gray-900 group-hover:text-[#D4AF37] transition-colors">
                      {artwork.title}
                    </h3>
                    <p className="text-sm text-gray-600 font-light">{artwork.artist}</p>
                    <div className="flex items-center justify-between pt-2">
                      <span className="text-2xl font-light text-gray-900">
                        ₹{artwork.price.toLocaleString()}
                      </span>
                      <span className="text-xs text-gray-500 tracking-wide">{artwork.medium}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeIn} className="text-center mt-16">
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/marketplace')}
                className="border-2 border-gray-900 text-gray-900 hover:bg-gray-900 hover:text-white px-12 py-6 text-base rounded-full font-medium tracking-wide"
              >
                VIEW ALL ARTWORKS
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900">
                Browse Categories
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Discover art products and creative services all in one place
              </p>
            </motion.div>

            {/* Enhanced Categories Grid */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {[
                {
                  name: 'Original Art',
                  image: 'https://images.unsplash.com/photo-1610401163940-c7a80f2e1fdb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/marketplace')
                },
                {
                  name: 'Prints & Reproductions',
                  image: 'https://images.unsplash.com/photo-1768464706302-4876d5be12f2?w=600',
                  onClick: () => navigate('/marketplace')
                },
                {
                  name: 'Handcrafted Items',
                  image: 'https://images.unsplash.com/photo-1760764541302-e3955fbc6b2b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/marketplace')
                },
                {
                  name: 'Art Merchandise',
                  image: 'https://images.unsplash.com/photo-1708808607238-e761218b9213?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/marketplace')
                },
                {
                  name: 'Digital Art',
                  image: 'https://images.unsplash.com/photo-1652512455891-11933272bc1f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/marketplace')
                },
                {
                  name: 'Custom Commissions',
                  image: 'https://images.unsplash.com/photo-1615746462903-4416adc45fa5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/services')
                },
                {
                  name: 'Art Services',
                  image: 'https://images.unsplash.com/photo-1560165143-fa7e2d9e594c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/services')
                },
                {
                  name: 'Workshops & Classes',
                  image: 'https://images.unsplash.com/photo-1758522274945-7f000385a3dd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=600',
                  onClick: () => navigate('/services')
                },
              ].map((category, index) => (
                <motion.div
                  key={category.name}
                  variants={fadeIn}
                  whileHover={{ y: -8 }}
                  onClick={category.onClick}
                  className="group cursor-pointer"
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-gray-200 rounded-2xl shadow-lg">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center p-4">
                      <h3 className="text-lg lg:text-xl font-medium tracking-wide text-white text-center">
                        {category.name}
                      </h3>
                    </div>

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-[#D4AF37]/0 group-hover:bg-[#D4AF37]/20 transition-colors duration-500" />
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Artist Spotlight - Full Width */}
      <section className="py-0 bg-white">
        <div className="grid lg:grid-cols-2">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative h-[500px] lg:h-[700px] overflow-hidden"
          >
            <img
              src={emp}
              alt="Artist at work"
              className="w-full h-full object-cover"
            />
            {/* Added overlay to ensure it's not too bright if image is light */}
            <div className="absolute inset-0 bg-black/10" />
          </motion.div>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="flex items-center bg-[#FAFAFA] p-6 md:p-12 lg:p-20"
          >
            <div>

              <h2 className="text-4xl lg:text-5xl mb-6 font-light tracking-tight text-gray-900">
                Empowering Artists
                <br />
                Worldwide
              </h2>

              <p className="text-lg text-gray-600 mb-8 font-light leading-relaxed">
                Join our community of over 1,200 talented artists showcasing their work to art enthusiasts across India. From traditional masters to contemporary innovators.
              </p>

              <div className="space-y-6 mb-10">
                {[
                  { title: 'Global Recognition', desc: 'Showcase your work to thousands of collectors' },
                  { title: 'Fair Commission', desc: 'Industry-leading rates for artists' },
                  { title: 'Full Support', desc: 'Marketing, logistics, and customer service handled' }
                ].map((feature, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className="w-2 h-2 bg-[#D4AF37] rounded-full mt-2" />
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{feature.title}</h4>
                      <p className="text-sm text-gray-600 font-light">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Button
                size="lg"
                onClick={() => navigate('/services')}
                className="bg-[#8B4049] hover:bg-[#7A3840] text-white px-12 py-6 text-base rounded-full font-medium tracking-wide shadow-lg hover:shadow-xl transition-all"
              >
                BECOME AN ARTIST
                <ArrowRight className="ml-3 h-5 w-5" />
              </Button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Artists */}
      <section className="py-24 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900">
                Featured Artists
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto font-light">
                Meet the creative minds behind our collection
              </p>
            </motion.div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {featuredArtists.map((artist, index) => (
                <motion.div
                  key={artist.id}
                  variants={fadeIn}
                  whileHover={{ y: -10 }}
                  className="text-center group cursor-pointer"
                >
                  <div className="relative inline-block mb-6">
                    <div className="w-40 h-40 rounded-full overflow-hidden bg-gray-200 border-4 border-white shadow-xl">
                      <img
                        src={artist.avatar}
                        alt={artist.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    </div>
                  </div>

                  <h3 className="text-xl font-medium text-gray-900 mb-2">{artist.name}</h3>
                  <p className="text-sm text-gray-600 font-light mb-4">{artist.specialty}</p>

                  <div className="flex items-center justify-center gap-6 text-sm text-gray-500 mb-6">
                    <div>
                      <div className="font-medium text-gray-900">{artist.artworks}</div>
                      <div className="text-xs font-light">Works</div>
                    </div>
                    <div className="w-px h-8 bg-gray-300" />
                    <div>
                      <div className="font-medium text-gray-900">{artist.followers}</div>
                      <div className="text-xs font-light">Followers</div>
                    </div>
                  </div>

                  <Button
                    variant="ghost"
                    onClick={() => handleViewPortfolio(artist.id)}
                    className="text-gray-900 hover:text-[#D4AF37] font-medium rounded-full"
                  >
                    View Portfolio
                    <ChevronRight className="ml-2 h-4 w-4" />
                  </Button>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="text-center mb-16">
              <h2 className="text-5xl lg:text-6xl mb-4 font-light tracking-tight text-gray-900">
                Trusted by Collectors
              </h2>
            </motion.div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Priya Sharma",
                  role: "Art Collector",
                  location: "Mumbai",
                  image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
                  testimonial: "Artvpp has completely transformed my approach to collecting art. The quality and authenticity are unmatched.",
                  rating: 5
                },
                {
                  name: "Rahul Verma",
                  role: "Interior Designer",
                  location: "Delhi",
                  image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop",
                  testimonial: "I source all my client projects through Artvpp. The curation is exceptional and the service is seamless.",
                  rating: 5
                },
                {
                  name: "Ananya Patel",
                  role: "First-Time Buyer",
                  location: "Bangalore",
                  image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop",
                  testimonial: "As someone new to art collecting, Artvpp made the entire experience enjoyable and educational.",
                  rating: 5
                }
              ].map((testimonial, index) => (
                <motion.div key={index} variants={fadeIn}>
                  <Card className="h-full border-0 shadow-lg bg-white rounded-2xl">
                    <CardContent className="p-10">
                      <div className="flex gap-1 mb-6">
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-[#D4AF37] text-[#D4AF37]" />
                        ))}
                      </div>

                      <p className="text-gray-700 mb-8 text-lg font-light leading-relaxed italic">
                        "{testimonial.testimonial}"
                      </p>

                      <div className="flex items-center gap-4">
                        <img
                          src={testimonial.image}
                          alt={testimonial.name}
                          className="w-16 h-16 rounded-full object-cover"
                        />
                        <div>
                          <div className="font-medium text-gray-900">{testimonial.name}</div>
                          <div className="text-sm text-gray-600 font-light">
                            {testimonial.role}, {testimonial.location}
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-32 bg-black text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="/images/55.png" alt="Collection Banner" className="w-full h-full object-cover opacity-40" />
        </div>
        <div className="absolute inset-0 opacity-10 bg-gradient-to-br from-gray-900 to-black z-10" />

        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={stagger}
          >
            <motion.div variants={fadeIn} className="mb-12">
              {/* Decorative element removed */}
            </motion.div>

            <motion.h2
              variants={fadeIn}
              className="text-5xl lg:text-6xl mb-6 font-light tracking-tight"
            >
              Start Your Collection Today
            </motion.h2>

            <motion.p
              variants={fadeIn}
              className="text-xl text-white/80 mb-12 max-w-2xl mx-auto font-light"
            >
              Join thousands of art enthusiasts who have discovered their perfect piece
            </motion.p>

            <motion.div variants={fadeIn} className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/marketplace')}
                className="bg-white text-black hover:bg-gray-100 px-12 py-7 text-lg rounded-full font-medium tracking-wide shadow-lg"
              >
                BROWSE COLLECTION
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => navigate('/services')}
                className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-black px-12 py-7 text-lg rounded-full font-medium tracking-wide"
              >
                EXPLORE SERVICES
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="fixed bottom-8 right-8 z-50 bg-[#D4AF37] hover:bg-[#C19B2A] text-white p-4 rounded-full shadow-lg transition-colors"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Artist Portfolio Dialog */}
      <Dialog open={!!selectedArtist} onOpenChange={(open) => !open && setSelectedArtist(null)}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedArtist && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={selectedArtist.avatar}
                    alt={selectedArtist.name}
                    className="w-20 h-20 rounded-full object-cover border-2 border-[#D4AF37]"
                  />
                  <div>
                    <DialogTitle className="text-3xl font-light" style={{ fontFamily: 'Playfair Display, serif' }}>
                      {selectedArtist.name}
                    </DialogTitle>
                    <DialogDescription className="text-base text-gray-600">
                      {selectedArtist.specialty}
                    </DialogDescription>
                    {selectedArtist.verified && (
                      <Badge className="mt-2 bg-[#D4AF37] text-white border-0">
                        Verified Artist
                      </Badge>
                    )}
                  </div>
                </div>
              </DialogHeader>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-medium mb-3 text-gray-900">About the Artist</h3>
                  <p className="text-gray-600 font-light leading-relaxed">{selectedArtist.bio}</p>
                </div>

                <div className="flex items-center gap-8 py-6 border-y">
                  <div>
                    <p className="text-3xl font-light text-[#D4AF37]">{selectedArtist.artworks}</p>
                    <p className="text-sm text-gray-600">Artworks Created</p>
                  </div>
                  <div>
                    <p className="text-3xl font-light text-[#8B4049]">{selectedArtist.followers}</p>
                    <p className="text-sm text-gray-600">Followers</p>
                  </div>
                  <div>
                    <div className="flex items-center gap-1">
                      <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                      <span className="text-3xl font-light">4.9</span>
                    </div>
                    <p className="text-sm text-gray-600">Average Rating</p>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-medium mb-4 text-gray-900">Portfolio Gallery</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {[
                      '/images/a.jpeg', '/images/d.jpeg', '/images/g.jpeg',
                      '/images/l.jpeg', '/images/p.jpeg', '/images/y.jpeg'
                    ].map((img, i) => (
                      <div key={i} className="aspect-square bg-gray-100 rounded-lg overflow-hidden group cursor-pointer">
                        <img
                          src={img}
                          alt={`Artwork ${i}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4 pt-4">
                  <Button
                    onClick={() => {
                      setSelectedArtist(null);
                      navigate('/services');
                    }}
                    className="flex-1 bg-gradient-to-r from-[#D4AF37] to-[#C19B2A] hover:from-[#C19B2A] hover:to-[#D4AF37] text-white py-6 text-base rounded-none font-medium"
                  >
                    <Eye className="mr-2 h-5 w-5" />
                    Request Commission
                  </Button>
                  <Button
                    onClick={() => setSelectedArtist(null)}
                    variant="outline"
                    className="px-8 py-6 text-base rounded-none border-2"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}