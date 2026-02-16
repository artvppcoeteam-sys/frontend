import { ArrowRight, Clock } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Badge } from '../ui/badge';
import { services } from '../../data/mockData';
import { motion } from 'motion/react';
import { useApp } from '../../context/AppContext';

interface ServicesPageProps {
  onNavigate?: (page: string, id?: string) => void;
}

export function ServicesPage({ onNavigate }: ServicesPageProps) {
  const { } = useApp();

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="relative py-20 bg-gray-50 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#8B4049]/5" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl lg:text-6xl mb-6 font-light tracking-tight text-gray-900 leading-tight" style={{ fontFamily: 'Playfair Display, serif' }}>
              Our Services
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto font-light leading-relaxed">
              Explore our range of professional artistic services tailored to your needs
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <motion.div
                key={service.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="overflow-hidden border-0 shadow-lg hover:shadow-2xl transition-all h-full group bg-white">
                  <div className="aspect-[4/3] overflow-hidden bg-gray-100 relative">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <div className="absolute top-4 left-4">
                      <div className="text-4xl filter drop-shadow-md">{service.icon}</div>
                    </div>

                    <Badge className="absolute top-4 right-4 bg-white/95 text-gray-900 border-0">
                      {service.category}
                    </Badge>
                  </div>

                  <CardContent className="p-8">
                    <h3 className="text-2xl font-medium mb-3 text-gray-900">{service.title}</h3>
                    <p className="text-gray-600 font-light mb-6 line-clamp-2">{service.description}</p>

                    <div className="space-y-4 mb-8 pb-8 border-b">
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-light text-sm">Starting from</span>
                        <span className="text-2xl font-light text-[#D4AF37]">
                          ₹{service.startingPrice.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-gray-600 font-light text-sm">Delivery</span>
                        <span className="text-gray-900 font-medium flex items-center gap-2 text-sm">
                          <Clock className="w-4 h-4" />
                          {service.deliveryTime}
                        </span>
                      </div>
                    </div>

                    <Button
                      onClick={() => onNavigate?.('service-detail', service.id)}
                      className="w-full bg-gradient-to-r from-[#D4AF37] to-[#8B4049] hover:from-[#8B4049] hover:to-[#D4AF37] text-white py-6 text-base rounded-full font-medium tracking-wide shadow-md group-hover:shadow-lg transition-all"
                    >
                      VIEW DETAILS
                      <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}