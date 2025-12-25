import { useState } from 'react';
import { useAuth } from './contexts/AuthContext';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { Dashboard } from './components/Dashboard';
import { ContactPage } from './components/ContactPage';

function App() {
  const [currentPage, setCurrentPage] = useState('home');
  const { user, loading } = useAuth();

  const handleNavigate = (page: string) => {
    if (page === 'dashboard' && !user) {
      return;
    }
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header onNavigate={handleNavigate} currentPage={currentPage} />
      <main className="flex-1">
        {currentPage === 'home' && <HomePage />}
        {currentPage === 'dashboard' && user && <Dashboard />}
        {currentPage === 'contact' && <ContactPage />}
      </main>
      <Footer />
    </div>
  );
}

export default App;
