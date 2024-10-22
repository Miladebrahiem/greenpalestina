import React from 'react';
import { Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-secondary text-primary py-8">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between items-center">
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h3 className="text-2xl font-merriweather font-bold mb-4">Vrienden van Palestina</h3>
            <p className="font-raleway">Supporting Palestinian rights and promoting peace.</p>
          </div>
          <div className="w-full md:w-1/3 mb-6 md:mb-0">
            <h4 className="text-xl font-merriweather font-semibold mb-4">Contact Us</h4>
            <p className="font-raleway">Email: info@vriendenvanpalestina.nl</p>
            <p className="font-raleway">Phone: +31 123 456 789</p>
          </div>
          <div className="w-full md:w-1/3">
            <h4 className="text-xl font-merriweather font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-primary hover:text-gray-700 transition-colors">
                <Facebook className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary hover:text-gray-700 transition-colors">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-primary hover:text-gray-700 transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-8 text-center">
          <p className="font-raleway">&copy; 2023 Vrienden van Palestina. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;