import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { supabase, Service, ServiceRequest, Profile } from '../lib/supabase';
import { FileText, Clock, CheckCircle, XCircle, Loader } from 'lucide-react';

export function Dashboard() {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Profile | null>(null);
  const [services, setServices] = useState<Service[]>([]);
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedService, setSelectedService] = useState('');
  const [notes, setNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      if (!user) return;

      const [profileData, servicesData, requestsData] = await Promise.all([
        supabase.from('profiles').select('*').eq('id', user.id).maybeSingle(),
        supabase.from('services').select('*').eq('active', true).order('order'),
        supabase.from('service_requests').select('*').eq('user_id', user.id).order('created_at', { ascending: false }),
      ]);

      if (profileData.data) setProfile(profileData.data);
      if (servicesData.data) setServices(servicesData.data);
      if (requestsData.data) setRequests(requestsData.data);

      setLoading(false);
    };

    loadData();
  }, [user]);

  const handleSubmitRequest = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || !selectedService) return;

    setSubmitting(true);

    const { data, error } = await supabase
      .from('service_requests')
      .insert([
        {
          user_id: user.id,
          service_id: selectedService,
          notes,
          status: 'pending',
        },
      ])
      .select()
      .single();

    if (!error && data) {
      setRequests([data, ...requests]);
      setSelectedService('');
      setNotes('');
    }

    setSubmitting(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'pending':
        return <Clock className="text-yellow-500" size={20} />;
      case 'processing':
        return <Loader className="text-blue-500 animate-spin" size={20} />;
      case 'completed':
        return <CheckCircle className="text-green-500" size={20} />;
      case 'cancelled':
        return <XCircle className="text-red-500" size={20} />;
      default:
        return <Clock className="text-gray-500" size={20} />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'processing':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <Loader className="animate-spin text-blue-600" size={48} />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Dashboard</h1>
          <p className="text-gray-600">
            Welcome back, {profile?.full_name || user?.email}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Request Service</h2>
              <form onSubmit={handleSubmitRequest}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service
                  </label>
                  <select
                    value={selectedService}
                    onChange={(e) => setSelectedService(e.target.value)}
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="">Choose a service...</option>
                    {services.map((service) => (
                      <option key={service.id} value={service.id}>
                        {service.name} - {service.description}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Additional Notes
                  </label>
                  <textarea
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    rows={4}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Vehicle details, specific requirements, etc."
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting || !selectedService}
                  className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                >
                  {submitting ? 'Submitting...' : 'Submit Request'}
                </button>
              </form>
            </div>

            <div className="bg-white rounded-xl shadow-md p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Service Requests</h2>

              {requests.length === 0 ? (
                <div className="text-center py-12">
                  <FileText className="mx-auto text-gray-400 mb-4" size={48} />
                  <p className="text-gray-600">No service requests yet</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {requests.map((request) => {
                    const service = services.find((s) => s.id === request.service_id);
                    return (
                      <div
                        key={request.id}
                        className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            {getStatusIcon(request.status)}
                            <div>
                              <h3 className="font-semibold text-gray-800">
                                {service?.name || 'Service'}
                              </h3>
                              <p className="text-sm text-gray-600">
                                {new Date(request.created_at).toLocaleDateString('en-US', {
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </p>
                            </div>
                          </div>
                          <span
                            className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(request.status)}`}
                          >
                            {request.status}
                          </span>
                        </div>
                        {request.notes && (
                          <p className="text-sm text-gray-600 mt-2 pl-8">{request.notes}</p>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Profile Information</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Name</p>
                  <p className="font-semibold text-gray-800">{profile?.full_name || 'Not set'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Email</p>
                  <p className="font-semibold text-gray-800">{profile?.email}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Member Since</p>
                  <p className="font-semibold text-gray-800">
                    {profile?.created_at
                      ? new Date(profile.created_at).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'long',
                        })
                      : 'Unknown'}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-blue-600 to-blue-700 rounded-xl shadow-md p-6 text-white">
              <h3 className="text-xl font-bold mb-2">Need Help?</h3>
              <p className="text-sm text-blue-100 mb-4 leading-relaxed">
                Our team is here to assist you with any questions about our tuning services.
              </p>
              <a
                href="mailto:info@mugenpower.com"
                className="inline-block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition"
              >
                Contact Support
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
