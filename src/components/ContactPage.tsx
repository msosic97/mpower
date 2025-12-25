import { Mail, Phone, MapPin, Clock, Facebook, Instagram } from 'lucide-react';

export function ContactPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-4 text-gray-800">Get In Touch</h1>
          <p className="text-center text-gray-600 mb-12 leading-relaxed">
            Have questions about our services? We're here to help you unlock your vehicle's potential.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Phone className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Phone</h3>
              <p className="text-gray-600 mb-4">Call us during business hours</p>
              <a
                href="tel:+1234567890"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                +123 456 7890
              </a>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8">
              <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                <Mail className="text-blue-600" size={32} />
              </div>
              <h3 className="text-xl font-bold text-gray-800 mb-2">Email</h3>
              <p className="text-gray-600 mb-4">Send us your inquiries</p>
              <a
                href="mailto:info@mugenpower.com"
                className="text-blue-600 hover:text-blue-700 font-semibold text-lg"
              >
                info@mugenpower.com
              </a>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <MapPin className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Location</h3>
                <p className="text-gray-600 leading-relaxed">
                  123 Performance Street<br />
                  Tuning District<br />
                  City, State 12345<br />
                  Country
                </p>
              </div>

              <div>
                <div className="bg-blue-100 w-16 h-16 rounded-lg flex items-center justify-center mb-4">
                  <Clock className="text-blue-600" size={32} />
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">Working Hours</h3>
                <div className="text-gray-600 space-y-2">
                  <div className="flex justify-between">
                    <span className="font-medium">Monday - Friday:</span>
                    <span>08:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Saturday:</span>
                    <span>08:00 - 16:00</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Sunday:</span>
                    <span className="text-red-600 font-medium">Closed</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Follow Us</h3>
            <p className="text-blue-100 mb-6 leading-relaxed">
              Stay updated with our latest projects, tips, and special offers on social media.
            </p>
            <div className="flex gap-4">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-30 transition"
              >
                <Facebook size={24} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white bg-opacity-20 backdrop-blur-sm p-4 rounded-lg hover:bg-opacity-30 transition"
              >
                <Instagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
