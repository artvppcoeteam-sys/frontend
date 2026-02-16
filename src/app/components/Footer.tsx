import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from 'lucide-react';
import { motion } from 'motion/react';
import logo from '../../assets/artvpplogo.png';

interface FooterProps {
  onNavigate: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {/* Brand Section */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <img src={logo} alt="ARTVPP" className="h-14 w-auto" />
              <span className="text-2xl font-bold tracking-tight font-serif text-white">ARTVPP</span>
            </div>
            <p className="text-sm text-gray-400 mb-6">
              Your premier destination for original art, prints, and creative services.
              Connecting artists with art lovers worldwide.
            </p>
            <div className="flex gap-4">
              <motion.a href="#" className="hover:text-[#D4AF37] transition-colors" whileHover={{ scale: 1.1 }}>
                <Facebook className="w-5 h-5" />
              </motion.a>
              <motion.a href="#" className="hover:text-[#D4AF37] transition-colors" whileHover={{ scale: 1.1 }}>
                <Twitter className="w-5 h-5" />
              </motion.a>
              <motion.a href="#" className="hover:text-[#D4AF37] transition-colors" whileHover={{ scale: 1.1 }}>
                <Instagram className="w-5 h-5" />
              </motion.a>
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Shop Original Art', id: 'shop' },
                { name: 'Creative Services', id: 'services' },
                { name: 'About Us', id: 'about' },
                { name: 'Sell Art', id: 'sell' }
              ].map((item, index) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 3 }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <button onClick={() => onNavigate(item.id)} className="hover:text-[#D4AF37] transition-colors inline-block hover:translate-x-1 transition-transform text-left">
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Support */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Support</h3>
            <ul className="space-y-2 text-sm">
              {[
                { name: 'Contact Us', id: 'contact' },
                { name: 'Privacy Policy', id: 'privacy' },
                { name: 'Terms & Conditions', id: 'terms' },
                { name: 'Help Center', id: 'help' }
              ].map((item) => (
                <motion.li
                  key={item.name}
                  whileHover={{ x: 3 }}
                  className="hover:text-[#D4AF37] transition-colors cursor-pointer"
                >
                  <button onClick={() => onNavigate(item.id)} className="hover:text-[#D4AF37] transition-colors inline-block hover:translate-x-1 transition-transform text-left">
                    {item.name}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 }
            }}
          >
            <h3 className="font-semibold text-white mb-4">Contact Us</h3>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-2">
                <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5 text-[#D4AF37]" />
                <span>123 Art Street, Creative District, Mumbai, India</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" />
                <span>+91 98765 43210</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="w-5 h-5 flex-shrink-0 text-[#D4AF37]" />
                <span>hello@artvpp.com</span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom Bar */}
        <motion.div
          className="border-t border-gray-800 mt-12 pt-8 text-sm text-center text-gray-500"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <p>&copy; {currentYear} ARTVPP. All rights reserved.</p>
        </motion.div>
      </div>
    </footer>
  );
}