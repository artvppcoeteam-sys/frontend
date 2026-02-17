import { useState } from 'react';
import { ArrowLeft, Check, Clock, Star, Calendar, Shield, ArrowRight } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { services } from '../../data/mockData';
import { toast } from 'sonner';
import { motion } from 'motion/react';
import { useParams, useNavigate } from 'react-router-dom';

export function ServiceDetailPage() {
  const { id: serviceId } = useParams();
  const navigate = useNavigate();
  const service = services.find(s => s.id === serviceId);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    projectType: '',
    description: '',
    budget: '',
    timeline: '',
  });

  if (!service) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">Service not found</h2>
          <Button onClick={() => navigate('/services')}>Back to Services</Button>
        </div>
      </div>
    );
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Request submitted for ${service.title}! We'll contact you within 24 hours.`);
    setFormData({
      name: '',
      email: '',
      phone: '',
      projectType: '',
      description: '',
      budget: '',
      timeline: '',
    });
  };

  const relatedServices = services.filter(s =>
    s.category === service.category && s.id !== service.id
  ).slice(0, 3);

  return (
    <div className="min-h-screen bg-white">
      {/* Breadcrumb */}
      <div className="bg-gray-50 border-b">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center text-sm text-gray-500">
            <button
              onClick={() => navigate('/')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Home
            </button>
            <span className="mx-2">/</span>
            <button
              onClick={() => navigate('/services')}
              className="hover:text-[#D4AF37] transition-colors"
            >
              Services
            </button>
            <span className="mx-2">/</span>
            <span className="text-gray-900 font-medium">{service.title}</span>
          </nav>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-[#D4AF37]/5 to-[#8B4049]/5" />
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Badge className="mb-4 bg-[#D4AF37] text-white border-0">
                {service.category}
              </Badge>
              <div className="text-6xl mb-6">{service.icon}</div>
              <h1 className="text-5xl font-light mb-6 text-gray-900" style={{ fontFamily: 'Playfair Display, serif' }}>
                {service.title}
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed mb-8 font-light">
                {service.description}
              </p>

              <div className="flex items-center gap-8 mb-8">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Starting from</p>
                  <p className="text-4xl font-light text-[#D4AF37]">
                    ₹{service.startingPrice.toLocaleString()}
                  </p>
                </div>
                <div className="h-12 w-px bg-gray-300" />
                <div>
                  <p className="text-sm text-gray-600 mb-1">Delivery time</p>
                  <p className="text-2xl font-light text-gray-900 flex items-center gap-2">
                    <Clock className="w-5 h-5" />
                    {service.deliveryTime}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 text-sm text-gray-600">
                <Star className="w-5 h-5 fill-[#D4AF37] text-[#D4AF37]" />
                <span className="font-semibold text-gray-900">4.9</span>
                <span>(156 reviews)</span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="relative"
            >
              <div className="aspect-[4/3] overflow-hidden rounded-lg shadow-2xl">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-50">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-8 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            What's Included
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {service.features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#D4AF37] to-[#8B4049] rounded-full flex items-center justify-center mb-4">
                      <Check className="w-5 h-5 text-white" />
                    </div>
                    <p className="text-gray-900 font-medium">{feature}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Packages */}
      {service.pricing && (
        <section className="py-16 bg-white border-t">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Pricing Packages
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {service.pricing.map((pkg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full relative overflow-hidden transition-all hover:shadow-xl ${index === 1 ? 'border-[#D4AF37] shadow-lg scale-105 z-10' : 'border-gray-200'}`}>
                    {index === 1 && (
                      <div className="absolute top-0 inset-x-0 h-2 bg-gradient-to-r from-[#D4AF37] to-[#8B4049]" />
                    )}
                    <CardContent className="p-8 flex flex-col h-full">
                      <h3 className="text-xl font-medium mb-2 text-gray-900">{pkg.name}</h3>
                      <div className="mb-6">
                        <span className="text-3xl font-light text-[#D4AF37]">₹{pkg.price.toLocaleString()}</span>
                        <span className="text-gray-500 text-sm ml-2">/ project</span>
                      </div>

                      <ul className="space-y-4 mb-8 flex-grow">
                        {pkg.features.map((feature, idx) => (
                          <li key={idx} className="flex items-start gap-3 text-sm text-gray-600">
                            <Check className="w-4 h-4 text-[#D4AF37] mt-0.5 flex-shrink-0" />
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <Button
                        onClick={() => {
                          const formElement = document.getElementById('request-form');
                          if (formElement) {
                            formElement.scrollIntoView({ behavior: 'smooth' });
                            setFormData(prev => ({
                              ...prev,
                              description: `I am interested in the ${pkg.name} package for ${service.title}. ` + prev.description
                            }));
                          }
                        }}
                        className={`w-full py-6 text-base rounded-none font-medium transition-all ${index === 1
                          ? 'bg-gradient-to-r from-[#D4AF37] to-[#8B4049] hover:from-[#8B4049] hover:to-[#D4AF37] text-white'
                          : 'bg-gray-100 hover:bg-gray-200 text-gray-900'
                          }`}
                      >
                        Choose {pkg.name}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* How It Works */}
      <section className="py-16 bg-white">
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-light mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: '1', title: 'Submit Request', desc: 'Fill out the form with your project details' },
              { step: '2', title: 'Get Quote', desc: 'Receive a custom quote within 24 hours' },
              { step: '3', title: 'Create Together', desc: 'Collaborate with our expert artists' },
              { step: '4', title: 'Receive Artwork', desc: 'Get your completed project delivered' }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center relative"
              >
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-[60%] w-[80%] h-px bg-gray-300" />
                )}
                <div className="w-24 h-24 mx-auto mb-4 bg-gradient-to-br from-[#D4AF37] to-[#8B4049] rounded-full flex items-center justify-center relative z-10">
                  <span className="text-4xl font-light text-white">{item.step}</span>
                </div>
                <h3 className="text-xl font-medium mb-2 text-gray-900">{item.title}</h3>
                <p className="text-gray-600 font-light">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Request Form */}
      <section id="request-form" className="py-16 bg-gray-50">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <Card className="shadow-xl">
              <CardContent className="p-8 md:p-12">
                <div className="text-center mb-8">
                  <h2 className="text-3xl font-light mb-4" style={{ fontFamily: 'Playfair Display, serif' }}>
                    Request This Service
                  </h2>
                  <p className="text-gray-600 font-light">
                    Fill out the form below and we'll get back to you within 24 hours
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="name" className="text-sm font-medium">Full Name *</Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        required
                        placeholder="Your name"
                        className="mt-2 rounded-none"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email" className="text-sm font-medium">Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        required
                        placeholder="your@email.com"
                        className="mt-2 rounded-none"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-sm font-medium">Phone Number *</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      required
                      placeholder="+91 98765 43210"
                      className="mt-2 rounded-none"
                    />
                  </div>

                  <div>
                    <Label htmlFor="projectType" className="text-sm font-medium">Project Type *</Label>
                    <Select value={formData.projectType} onValueChange={(value) => setFormData({ ...formData, projectType: value })}>
                      <SelectTrigger className="mt-2 rounded-none">
                        <SelectValue placeholder="Select project type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="personal">Personal Project</SelectItem>
                        <SelectItem value="commercial">Commercial Project</SelectItem>
                        <SelectItem value="gift">Gift</SelectItem>
                        <SelectItem value="business">Business Use</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="description" className="text-sm font-medium">Project Description *</Label>
                    <Textarea
                      id="description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      required
                      placeholder="Describe your project in detail... Include information about size, style, colors, and any specific requirements."
                      rows={5}
                      className="mt-2 rounded-none"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="budget" className="text-sm font-medium">Budget Range</Label>
                      <Select value={formData.budget} onValueChange={(value) => setFormData({ ...formData, budget: value })}>
                        <SelectTrigger className="mt-2 rounded-none">
                          <SelectValue placeholder="Select budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="5000-10000">₹5,000 - ₹10,000</SelectItem>
                          <SelectItem value="10000-25000">₹10,000 - ₹25,000</SelectItem>
                          <SelectItem value="25000-50000">₹25,000 - ₹50,000</SelectItem>
                          <SelectItem value="50000+">₹50,000+</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label htmlFor="timeline" className="text-sm font-medium">Preferred Timeline</Label>
                      <Select value={formData.timeline} onValueChange={(value) => setFormData({ ...formData, timeline: value })}>
                        <SelectTrigger className="mt-2 rounded-none">
                          <SelectValue placeholder="Select timeline" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="urgent">Urgent (1-2 weeks)</SelectItem>
                          <SelectItem value="normal">Normal (2-4 weeks)</SelectItem>
                          <SelectItem value="extended">Extended (1-2 months)</SelectItem>
                          <SelectItem value="flexible">Flexible</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex items-start gap-3 p-4 bg-blue-50 rounded-lg">
                    <Shield className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-900">
                      Your information is secure and will only be used to provide you with a quote. We never share your data with third parties.
                    </p>
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-[#D4AF37] to-[#8B4049] hover:from-[#8B4049] hover:to-[#D4AF37] text-white py-6 text-base rounded-none font-medium"
                  >
                    SUBMIT REQUEST
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                </form>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Related Services */}
      {relatedServices.length > 0 && (
        <section className="py-16 bg-white">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-light mb-12 text-center" style={{ fontFamily: 'Playfair Display, serif' }}>
              Related Services
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              {relatedServices.map((relatedService, index) => (
                <motion.div
                  key={relatedService.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="overflow-hidden hover:shadow-xl transition-all group cursor-pointer">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img
                        src={relatedService.image}
                        alt={relatedService.title}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl font-medium mb-2 text-gray-900">{relatedService.title}</h3>
                      <p className="text-gray-600 font-light mb-4 line-clamp-2">{relatedService.description}</p>
                      <div className="flex items-center justify-between">
                        <span className="text-2xl font-light text-[#D4AF37]">
                          ₹{relatedService.startingPrice.toLocaleString()}
                        </span>
                        <Button variant="ghost" className="text-[#8B4049]">
                          View Details
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
