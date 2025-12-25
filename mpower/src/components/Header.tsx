import { useState } from 'react';
import { Menu, X, Zap } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { LoginForm } from './auth/LoginForm';
import { SignUpForm } from './auth/SignUpForm';
import { ResetPasswordForm } from './auth/ResetPasswordForm';

type HeaderProps = {
  onNavigate: (page: string) => void;
  currentPage: string;
};

export function Header({ onNavigate, currentPage }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignUp, setShowSignUp] = useState(false);
  const [showReset, setShowReset] = useState(false);
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    onNavigate('home');
  };

  return (
    <>
      <header className="bg-gray-900 text-white sticky top-0 z-40 shadow-lg">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <div
              className="flex items-center space-x-3 cursor-pointer"
              onClick={() => onNavigate('home')}
            >
              <Zap className="text-blue-400" size={32} />
              <div>
                <h1 className="text-xl font-bold">Mugen Power</h1>
                <p className="text-xs text-gray-400">Touched by Mugen</p>
              </div>
            </div>

            <nav className="hidden md:flex items-center space-x-6">
              <button
                onClick={() => onNavigate('home')}
                className={`hover:text-blue-400 transition ${currentPage === 'home' ? 'text-blue-400' : ''}`}
              >
                Home
              </button>
              {user && (
                <button
                  onClick={() => onNavigate('dashboard')}
                  className={`hover:text-blue-400 transition ${currentPage === 'dashboard' ? 'text-blue-400' : ''}`}
                >
                  Dashboard
                </button>
              )}
              <button
                onClick={() => onNavigate('contact')}
                className={`hover:text-blue-400 transition ${currentPage === 'contact' ? 'text-blue-400' : ''}`}
              >
                Contact
              </button>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                  Sign Out
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setShowLogin(true)}
                    className="hover:text-blue-400 transition"
                  >
                    Login
                  </button>
                  <button
                    onClick={() => setShowSignUp(true)}
                    className="bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Up
                  </button>
                </>
              )}
            </nav>

            <button
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-gray-800">
              <nav className="flex flex-col space-y-3">
                <button
                  onClick={() => {
                    onNavigate('home');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-blue-400 transition ${currentPage === 'home' ? 'text-blue-400' : ''}`}
                >
                  Home
                </button>
                {user && (
                  <button
                    onClick={() => {
                      onNavigate('dashboard');
                      setMobileMenuOpen(false);
                    }}
                    className={`text-left hover:text-blue-400 transition ${currentPage === 'dashboard' ? 'text-blue-400' : ''}`}
                  >
                    Dashboard
                  </button>
                )}
                <button
                  onClick={() => {
                    onNavigate('contact');
                    setMobileMenuOpen(false);
                  }}
                  className={`text-left hover:text-blue-400 transition ${currentPage === 'contact' ? 'text-blue-400' : ''}`}
                >
                  Contact
                </button>
                {user ? (
                  <button
                    onClick={() => {
                      handleSignOut();
                      setMobileMenuOpen(false);
                    }}
                    className="text-left bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    Sign Out
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => {
                        setShowLogin(true);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left hover:text-blue-400 transition"
                    >
                      Login
                    </button>
                    <button
                      onClick={() => {
                        setShowSignUp(true);
                        setMobileMenuOpen(false);
                      }}
                      className="text-left bg-blue-600 px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                      Sign Up
                    </button>
                  </>
                )}
              </nav>
            </div>
          )}
        </div>
      </header>

      {showLogin && (
        <LoginForm
          onClose={() => setShowLogin(false)}
          onSwitchToSignUp={() => {
            setShowLogin(false);
            setShowSignUp(true);
          }}
          onSwitchToReset={() => {
            setShowLogin(false);
            setShowReset(true);
          }}
        />
      )}

      {showSignUp && (
        <SignUpForm
          onClose={() => setShowSignUp(false)}
          onSwitchToLogin={() => {
            setShowSignUp(false);
            setShowLogin(true);
          }}
        />
      )}

      {showReset && (
        <ResetPasswordForm
          onClose={() => setShowReset(false)}
          onSwitchToLogin={() => {
            setShowReset(false);
            setShowLogin(true);
          }}
        />
      )}
    </>
  );
}
