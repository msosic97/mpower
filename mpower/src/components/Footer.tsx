import { Facebook, Instagram } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Mugen Power</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional automotive tuning services with cutting-edge technology.
              We deliver maximum performance while maintaining reliability.
            </p>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#terms" className="text-gray-400 hover:text-blue-400 transition">
                  Terms of Use
                </a>
              </li>
              <li>
                <a href="#privacy" className="text-gray-400 hover:text-blue-400 transition">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#cookies" className="text-gray-400 hover:text-blue-400 transition">
                  Cookies Disclaimer
                </a>
              </li>
              <li>
                <a href="#specs" className="text-gray-400 hover:text-blue-400 transition">
                  Tuning Specifications
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-blue-600 p-3 rounded-full hover:bg-blue-700 transition"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-br from-purple-600 to-pink-600 p-3 rounded-full hover:from-purple-700 hover:to-pink-700 transition"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>&copy; {currentYear} Mugen Power. All rights reserved. Touched by Mugen.</p>
        </div>
      </div>
    </footer>
  );
}
