import { Link, useLocation } from 'react-router-dom';
import { Calculator, Languages, Info, Camera, Shield, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Layout({ children }: { children: React.ReactNode }) {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: 'Bosh sahifa', nameRu: 'Главная', nameEn: 'Home', href: '/', icon: Calculator },
    { name: 'Terminlar', nameRu: 'Термины', nameEn: 'Terms', href: '/translator', icon: Languages },
    { name: 'Biz haqimizda', nameRu: 'О нас', nameEn: 'About', href: '/about', icon: Info },
    { name: 'Rasmdan aniqlash', nameRu: 'Распознавание', nameEn: 'Recognition', href: '/image-recognition', icon: Camera },
    { name: 'Xavfsizlik', nameRu: 'Безопасность', nameEn: 'Safety', href: '/safety', icon: Shield },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <nav className="bg-white shadow-md sticky top-0 z-50 border-b border-slate-200">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-900">BuildMate AI</span>
            </Link>

            <div className="hidden md:flex items-center gap-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                const isActive = location.pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    to={item.href}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-blue-100 text-blue-600 font-semibold'
                        : 'text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span className="text-sm">{item.name}</span>
                  </Link>
                );
              })}
            </div>

            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-900" />
              ) : (
                <Menu className="w-6 h-6 text-slate-900" />
              )}
            </button>
          </div>

          {mobileMenuOpen && (
            <div className="md:hidden py-4 border-t border-slate-200">
              <div className="flex flex-col gap-2">
                {navigation.map((item) => {
                  const Icon = item.icon;
                  const isActive = location.pathname === item.href;
                  return (
                    <Link
                      key={item.href}
                      to={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                        isActive
                          ? 'bg-blue-100 text-blue-600 font-semibold'
                          : 'text-slate-700 hover:bg-slate-100'
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      </nav>

      <main className="flex-1">
        {children}
      </main>

      <footer className="bg-slate-900 text-white py-8 mt-12">
        <div className="container mx-auto px-4">
          <div className="text-center space-y-4">
            <div className="flex items-center justify-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <Calculator className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold">BuildMate AI</span>
            </div>
            
            <p className="text-slate-300">
              Qurilish muhandisligini AI bilan soddalashtirish
            </p>

            <div className="border-t border-slate-700 pt-4 mt-4">
              <p className="text-sm text-slate-400">
                Developer: <span className="text-white font-semibold">Azamat Kulenov</span>
              </p>
              <div className="flex justify-center gap-4 mt-2">
                <a 
                  href="https://t.me/azamat_khulenov" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Telegram: @azamat_khulenov
                </a>
                <span className="text-slate-600">•</span>
                <a 
                  href="http://t.me/azamatkhulenov_bot" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 transition-colors"
                >
                  Support Bot
                </a>
              </div>
              <p className="text-xs text-slate-500 mt-3">© 2025 BuildMate AI</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
