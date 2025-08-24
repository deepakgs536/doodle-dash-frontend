import { Palette, Heart, Mail, Twitter, Instagram, Github } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="">
      {/* Main Footer Content */}
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section */}
          <div className="col-span-1 sm:col-span-2 lg:col-span-2">
            <div className="flex items-center justify-center sm:justify-start space-x-3 mb-6">
              <div className="relative">
                <Palette className="h-8 w-8 text-pink-400" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-yellow-400 rounded-full animate-pulse"></div>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-pink-400 to-purple-400 bg-clip-text text-transparent">
                DoodleDashh
              </h2>
            </div>
            <p className="mb-6 text-center sm:text-left max-w-md mx-auto sm:mx-0 leading-relaxed">
              Unleash your creativity with the most intuitive drawing app. From quick sketches to masterpieces, 
              DoodleDashh makes every stroke count.
            </p>
            <div className="flex justify-center sm:justify-start space-x-6">
              <a href="#" className="text-gray-500 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110" aria-label="Twitter">
                <Twitter className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110" aria-label="Instagram">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110" aria-label="Github">
                <Github className="h-6 w-6" />
              </a>
              <a href="#" className="text-gray-500 hover:text-pink-400 transition-colors duration-300 transform hover:scale-110" aria-label="Email">
                <Mail className="h-6 w-6" />
              </a>
            </div>
          </div>

          {/* Features Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-6 text-pink-400">Features</h3>
            <ul className="space-y-3">
              {['Digital Brushes', 'Export Tools', 'Collaboration'].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-all duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Links */}
          <div className="text-center sm:text-left">
            <h3 className="text-lg font-semibold mb-6 text-purple-400">Support</h3>
            <ul className="space-y-3">
              {['Help Center', 'Tutorials', 'Contact Us', 'Feedback'].map((item) => (
                <li key={item}>
                  <a href="#" className="transition-all duration-300 hover:translate-x-1 inline-block">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-400 bg-opacity-30">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-1 mb-2 md:mb-0">
              <span className="text-gray-400">© 2025 DoodleDashh. Made with</span>
              <Heart className="h-4 w-4 text-red-400 animate-pulse" />
              <span className="text-gray-400">for creators everywhere.</span>
            </div>
            <div className="flex space-x-6 text-sm">
              <a href="#" className="text-gray-400 transition-colors duration-300">
                Privacy Policy
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-300">
                Terms of Service
              </a>
              <a href="#" className="text-gray-400 transition-colors duration-300">
                Cookie Policy
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}