import { useState, useEffect } from 'react';
import { Clock, MapPin, Phone, Mail, Gauge, Rocket, Wind, Filter, AlertCircle, Droplet, Settings, TrendingUp, Activity, Circle } from 'lucide-react';
import { supabase, Service } from '../lib/supabase';

const iconMap: Record<string, typeof Gauge> = {
  gauge: Gauge,
  rocket: Rocket,
  wind: Wind,
  filter: Filter,
  'alert-circle': AlertCircle,
  droplet: Droplet,
  settings: Settings,
  'trending-up': TrendingUp,
  activity: Activity,
  zap: Circle,
};

export function HomePage() {
  const [services, setServices] = useState<Service[]>([]);
  const [fileServiceStatus, setFileServiceStatus] = useState<'online' | 'offline'>('online');
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const loadServices = async () => {
      const { data } = await supabase
        .from('services')
        .select('*')
        .eq('active', true)
        .order('order');

      if (data) {
        setServices(data);
      }
    };

    loadServices();

    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="relative bg-gradient-to-br from-gray-900 via-gray-800 to-blue-900 text-white py-24">
        <div className="absolute inset-0 bg-[url('https://images.pexels.com/photos/3802510/pexels-photo-3802510.jpeg?auto=compress&cs=tinysrgb&w=1920')] bg-cover bg-center opacity-20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
              Unleash Your Engine's True Potential
            </h1>
            <p className="text-xl text-gray-300 mb-8 leading-relaxed">
              Professional ECU remapping and performance optimization services.
              Transform your vehicle with precision tuning by experts.
            </p>
            <div className="flex flex-wrap gap-4">
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-300">File Service Status</p>
                <div className="flex items-center gap-2 mt-1">
                  <span className={`w-3 h-3 rounded-full ${fileServiceStatus === 'online' ? 'bg-green-500 animate-pulse' : 'bg-red-500'}`}></span>
                  <span className="font-semibold text-lg capitalize">{fileServiceStatus}</span>
                </div>
              </div>
              <div className="bg-white bg-opacity-10 backdrop-blur-sm px-6 py-3 rounded-lg">
                <p className="text-sm text-gray-300">Local Time</p>
                <p className="font-mono text-lg font-semibold mt-1">{formatTime(currentTime)}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-4 text-gray-800">Our Services</h2>
          <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
            Comprehensive tuning solutions tailored to your vehicle's specific needs
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => {
              const Icon = iconMap[service.icon] || Circle;
              return (
                <div
                  key={service.id}
                  className="bg-gradient-to-br from-gray-50 to-white border border-gray-200 rounded-xl p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="text-blue-600" size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{service.name}</h3>
                  <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Working Hours</h2>
              <div className="bg-white rounded-xl p-6 shadow-md">
                <div className="flex items-start gap-4 mb-6">
                  <Clock className="text-blue-600 mt-1" size={24} />
                  <div className="flex-1">
                    <div className="flex justify-between items-center mb-3 pb-3 border-b">
                      <span className="font-semibold text-gray-700">Monday - Friday</span>
                      <span className="text-gray-600">08:00 - 18:00</span>
                    </div>
                    <div className="flex justify-between items-center mb-3 pb-3 border-b">
                      <span className="font-semibold text-gray-700">Saturday</span>
                      <span className="text-gray-600">08:00 - 16:00</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-semibold text-gray-700">Sunday</span>
                      <span className="text-red-600 font-medium">Closed</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-800">Contact Information</h2>
              <div className="bg-white rounded-xl p-6 shadow-md space-y-4">
                <div className="flex items-start gap-4">
                  <MapPin className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Address</h4>
                    <p className="text-gray-600">Your Location Here</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Phone className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Phone</h4>
                    <a href="tel:+1234567890" className="text-blue-600 hover:underline">
                      +123 456 7890
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <Mail className="text-blue-600 mt-1" size={24} />
                  <div>
                    <h4 className="font-semibold text-gray-700 mb-1">Email</h4>
                    <a href="mailto:info@mugenpower.com" className="text-blue-600 hover:underline">
                      info@mugenpower.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
