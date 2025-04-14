import { Facebook, Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { motion } from "framer-motion";
import { fadeIn } from "@/lib/animations";

export default function Footer() {
  const companyLinks = [
    { name: "About Us", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Press", href: "#" },
    { name: "Blog", href: "#" },
  ];

  const resourceLinks = [
    { name: "Documentation", href: "#" },
    { name: "Help Center", href: "#" },
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ];

  const contactInfo = [
    { icon: <Mail className="mt-1 mr-2 text-primary h-5 w-5" />, text: "info@memotag.com" },
    { icon: <Phone className="mt-1 mr-2 text-primary h-5 w-5" />, text: "+1 (800) 123-4567" },
    { 
      icon: <MapPin className="mt-1 mr-2 text-primary h-5 w-5" />, 
      text: <>123 Innovation Drive<br />San Francisco, CA 94103</> 
    },
  ];

  const currentYear = new Date().getFullYear();

  return (
    <motion.footer 
      className="bg-slate-900 text-white py-12"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      variants={fadeIn}
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center space-x-2 mb-4">
              <svg className="w-8 h-8 text-primary" viewBox="0 0 24 24" fill="currentColor">
                <path d="M19 2H5C3.346 2 2 3.346 2 5v2.831c0 1.053.382 2.01 1 2.746V19c0 1.654 1.346 3 3 3h12c1.654 0 3-1.346 3-3v-8.424c.618-.735 1-1.692 1-2.746V5c0-1.654-1.346-3-3-3zm1 5.831c0 1.014-.709 1.833-1.673 2.022A1.993 1.993 0 0 1 17 10H7a1.993 1.993 0 0 1-1.327-.148C4.709 9.664 4 8.846 4 7.831V5c0-.551.449-1 1-1h14c.551 0 1 .449 1 1v2.831zM18 19c0 .551-.449 1-1 1H7c-.551 0-1-.449-1-1v-7h12v7z"/>
                <circle cx="8.5" cy="14.5" r="1.5"/>
                <circle cx="15.5" cy="14.5" r="1.5"/>
              </svg>
              <span className="text-xl font-bold text-primary">MemoTag</span>
            </div>
            <p className="text-slate-400 mb-4">
              Transforming dementia care through AI-powered tracking and cognitive monitoring.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Company</h3>
            <ul className="space-y-2">
              {companyLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Resources</h3>
            <ul className="space-y-2">
              {resourceLinks.map((link, index) => (
                <li key={index}>
                  <a href={link.href} className="text-slate-400 hover:text-white transition-colors">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-lg mb-4">Contact</h3>
            <ul className="space-y-2">
              {contactInfo.map((item, index) => (
                <li key={index} className="flex items-start">
                  {item.icon}
                  <span className="text-slate-400">{item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="pt-8 border-t border-slate-800 text-center md:flex md:justify-between md:items-center">
          <p className="text-slate-500 mb-4 md:mb-0">
            &copy; {currentYear} MemoTag. All rights reserved.
          </p>
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">Privacy Policy</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">Terms of Service</a>
            <a href="#" className="text-slate-500 hover:text-slate-300 transition-colors text-sm">Cookies Policy</a>
          </div>
        </div>
      </div>
    </motion.footer>
  );
}
