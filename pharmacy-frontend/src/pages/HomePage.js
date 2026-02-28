import React, { useEffect, useState, useRef } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Search, 
  Pill, 
  Clock, 
  Truck, 
  Shield, 
  Star,
  Heart,
  Phone,
  Mail,
  MapPin,
  ShoppingCart,
  User,
  ChevronRight,
  Package,
  Award,
  Sparkles,
  LogOut,
  Settings,
  LayoutDashboard,
  ChevronDown
} from 'lucide-react';

const HomePage = ({ navigate, user: propUser }) => {
  const [medicines, setMedicines] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  
  // Get auth state from context as fallback
  const auth = useAuth();
  const { user: contextUser, logout } = auth;
  
  // Use prop user if provided, otherwise use context user
  const currentUser = propUser || contextUser;

  const API_URL = "http://127.0.0.1:8000/api/medicines/";

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Fetch medicines from backend
  useEffect(() => {
    fetchMedicines();
  }, []);

  const fetchMedicines = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setMedicines(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching medicines:", error);
      setLoading(false);
    }
  };

  // Filter medicines based on search
  const filteredMedicines = medicines.filter(med => 
    med.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    med.manufacturer?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Get featured products (latest 4 or random 4)
  const featuredMedicines = filteredMedicines.slice(0, 4);

  // Calculate stats
  const totalMedicines = medicines.length;
  const lowStock = medicines.filter(m => (m.quantity || 0) < 10).length;
  const expiringSoon = medicines.filter(m => {
    if (!m.expiryDate) return false;
    const expiry = new Date(m.expiryDate);
    const today = new Date();
    const daysLeft = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));
    return daysLeft > 0 && daysLeft <= 30;
  }).length;

  const categories = [
    { name: 'Prescription', icon: '💊', items: medicines.length.toString(), color: 'from-blue-500 to-blue-600', bg: 'bg-blue-50' },
    { name: 'Vitamins', icon: '💪', items: '23', color: 'from-green-500 to-emerald-600', bg: 'bg-green-50' },
    { name: 'Personal Care', icon: '🧴', items: '15', color: 'from-purple-500 to-purple-600', bg: 'bg-purple-50' },
    { name: 'First Aid', icon: '🩹', items: '8', color: 'from-red-500 to-red-600', bg: 'bg-red-50' },
    { name: 'Baby Care', icon: '👶', items: '7', color: 'from-pink-500 to-pink-600', bg: 'bg-pink-50' },
    { name: 'Diabetes', icon: '🩺', items: '5', color: 'from-orange-500 to-orange-600', bg: 'bg-orange-50' }
  ];

  const stats = [
    { value: totalMedicines.toString() + '+', label: 'Medicines', icon: <Package className="w-4 h-4" /> },
    { value: lowStock.toString(), label: 'Low Stock', icon: <Shield className="w-4 h-4" /> },
    { value: expiringSoon.toString(), label: 'Expiring Soon', icon: <Clock className="w-4 h-4" /> },
    { value: '100%', label: 'Authentic', icon: <Award className="w-4 h-4" /> }
  ];

  const handleLogout = () => {
    logout();
    setIsDropdownOpen(false);
    // Navigate to home after logout
    navigate('home');
  };

  const handleDashboard = () => {
    setIsDropdownOpen(false);
    navigate('dashboard');
  };

  const handleSettings = () => {
    setIsDropdownOpen(false);
    // You can implement settings page later
    alert('Settings page coming soon!');
  };

  // Get user initials for avatar
  const getUserInitials = () => {
    if (currentUser?.name) {
      return currentUser.name.split(' ').map(n => n[0]).join('').toUpperCase().substring(0, 2);
    }
    if (currentUser?.email) {
      return currentUser.email[0].toUpperCase();
    }
    return 'U';
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Announcement Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white text-xs py-2">
        <div className="container mx-auto px-4">
          <div className="flex justify-center items-center gap-6">
            <span className="flex items-center gap-1"><Truck className="w-3 h-3" /> Free shipping $50+</span>
            <span className="flex items-center gap-1"><Shield className="w-3 h-3" /> {medicines.length} Medicines</span>
            <span className="flex items-center gap-1"><Clock className="w-3 h-3" /> 24/7 Support</span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button 
              onClick={() => navigate('home')}
              className="flex items-center gap-2 group"
            >
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-xl blur-sm opacity-60 group-hover:opacity-100 transition"></div>
                <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                  <Pill className="w-5 h-5 text-white" />
                </div>
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent">
                Medi<span className="text-blue-600">Care</span>
              </span>
            </button>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-md mx-6">
              <div className="relative w-full group">
                <input
                  type="text"
                  placeholder="Search medicines..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full px-4 py-2 pl-10 pr-20 text-sm rounded-full border border-slate-200 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-50 transition bg-slate-50"
                />
                <Search className="absolute left-3 top-2.5 w-4 h-4 text-slate-400" />
                <button className="absolute right-1 top-1 bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-1.5 rounded-full text-xs font-medium hover:shadow-md transition">
                  Search
                </button>
              </div>
            </div>

            {/* Right Section - Auth Buttons & User Menu */}
            <div className="flex items-center gap-3">
              {/* Cart Icon */}
              <button className="relative p-2 hover:bg-slate-100 rounded-full transition">
                <ShoppingCart className="w-4 h-4 text-slate-700" />
                <span className="absolute -top-0.5 -right-0.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium">
                  0
                </span>
              </button>

              {/* Auth Buttons or User Menu */}
              {!currentUser ? (
                <>
                  <button 
                    onClick={() => navigate('login')}
                    className="hidden sm:inline-flex px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 transition"
                  >
                    Login
                  </button>
                  <button 
                    onClick={() => navigate('register')}
                    className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-4 py-2 rounded-full text-sm font-medium hover:shadow-md transition transform hover:scale-105"
                  >
                    Sign Up
                  </button>
                </>
              ) : (
                <div className="relative" ref={dropdownRef}>
                  {/* User Avatar Button */}
                  <button
                    onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                    className="flex items-center gap-2 hover:bg-slate-100 rounded-full pl-1 pr-3 py-1 transition group"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full flex items-center justify-center text-white text-sm font-medium">
                      {getUserInitials()}
                    </div>
                    <span className="hidden sm:inline text-sm font-medium text-slate-700">
                      {currentUser?.name?.split(' ')[0] || currentUser?.email?.split('@')[0]}
                    </span>
                    <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {/* Dropdown Menu */}
                  {isDropdownOpen && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl border border-slate-200 py-2 z-50 animate-fade-in">
                      {/* User Info Header */}
                      <div className="px-4 py-3 border-b border-slate-100">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {currentUser?.name || 'User'}
                        </p>
                        <p className="text-xs text-slate-500 truncate">
                          {currentUser?.email}
                        </p>
                      </div>

                      {/* Menu Items */}
                      <div className="py-1">
                        <button
                          onClick={handleDashboard}
                          className="w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition"
                        >
                          <LayoutDashboard className="w-4 h-4" />
                          Dashboard
                        </button>
                        
                        <button
                          onClick={handleSettings}
                          className="w-full px-4 py-2 text-sm text-left text-slate-700 hover:bg-blue-50 hover:text-blue-600 flex items-center gap-3 transition"
                        >
                          <Settings className="w-4 h-4" />
                          Settings
                        </button>
                        
                        <div className="border-t border-slate-100 my-1"></div>
                        
                        <button
                          onClick={handleLogout}
                          className="w-full px-4 py-2 text-sm text-left text-red-600 hover:bg-red-50 flex items-center gap-3 transition"
                        >
                          <LogOut className="w-4 h-4" />
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Mobile Menu Button */}
              <button className="md:hidden p-2 hover:bg-slate-100 rounded-full transition">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-slate-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Rest of your component remains the same */}
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="absolute inset-0 opacity-10" style={{
          backgroundImage: 'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px'
        }}></div>
        
        <div className="container mx-auto px-4 py-12 relative">
          <div className="flex flex-col md:flex-row items-center gap-8">
            <div className="flex-1 text-white">
              <div className="flex items-center gap-2 mb-3">
                <Sparkles className="w-4 h-4 text-yellow-300" />
                <span className="text-xs font-medium uppercase tracking-wider text-blue-100">Premium Healthcare</span>
              </div>
              <h1 className="text-3xl md:text-4xl font-bold mb-3 leading-tight">
                Your Health, <br />
                <span className="text-yellow-300">Our Priority</span>
              </h1>
              <p className="text-sm text-blue-100 mb-5 max-w-md">
                Get medicines delivered at your doorstep. {medicines.length}+ products available.
              </p>
              <div className="flex gap-3">
                <button className="bg-white text-blue-600 px-6 py-2.5 rounded-full text-sm font-semibold hover:shadow-xl hover:scale-105 transition flex items-center gap-1">
                  Shop Now <ChevronRight className="w-3 h-3" />
                </button>
                <button className="border border-white/30 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-white/10 transition backdrop-blur-sm">
                  Upload Rx
                </button>
              </div>
            </div>
            
            {/* Stats Grid */}
            <div className="flex-1 grid grid-cols-2 gap-3">
              {stats.map((stat, index) => (
                <div key={index} className="bg-white/10 backdrop-blur-md rounded-xl p-4 border border-white/20">
                  <div className="flex items-center gap-2 text-white mb-1">
                    {stat.icon}
                    <span className="text-lg font-bold">{stat.value}</span>
                  </div>
                  <p className="text-xs text-blue-100">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Shop by Category</h2>
              <p className="text-xs text-slate-500 mt-0.5">Browse our wide selection</p>
            </div>
            <button className="text-blue-600 text-xs font-medium flex items-center hover:gap-1 transition-all">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((cat, index) => (
              <div key={index} className="group cursor-pointer">
                <div className={`${cat.bg} rounded-xl p-4 text-center border border-slate-100 hover:shadow-lg transition group-hover:-translate-y-1 duration-300`}>
                  <div className={`w-10 h-10 mx-auto mb-2 bg-gradient-to-br ${cat.color} rounded-lg flex items-center justify-center text-white text-xl`}>
                    {cat.icon}
                  </div>
                  <h3 className="font-medium text-slate-800 text-xs mb-0.5">{cat.name}</h3>
                  <p className="text-[10px] text-slate-500">{cat.items} items</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-bold text-slate-800">Featured Products</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {loading ? 'Loading...' : `${filteredMedicines.length} products available`}
              </p>
            </div>
            <button className="text-blue-600 text-xs font-medium flex items-center hover:gap-1 transition-all">
              View All <ChevronRight className="w-3 h-3" />
            </button>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
              <p className="text-sm text-slate-500 mt-2">Loading medicines...</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {featuredMedicines.length > 0 ? (
                featuredMedicines.map((product) => (
                  <div key={product.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition group border border-slate-100">
                    <div className="relative">
                      {(product.quantity || 0) < 10 && (
                        <span className="absolute top-2 left-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-[10px] px-2 py-0.5 rounded-full font-medium z-10">
                          Low Stock
                        </span>
                      )}
                      <button className="absolute top-2 right-2 bg-white p-1.5 rounded-full shadow-sm opacity-0 group-hover:opacity-100 transition">
                        <Heart className="w-3 h-3 text-slate-400 hover:text-red-500" />
                      </button>
                      <div className="bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center rounded-t-xl">
                        <div className="text-3xl transform group-hover:scale-110 transition duration-300">
                          💊
                        </div>
                      </div>
                    </div>
                    <div className="p-3">
                      <h3 className="font-medium text-slate-800 text-xs mb-1 truncate">{product.name}</h3>
                      <p className="text-[10px] text-slate-500 mb-2 truncate">{product.manufacturer || 'Generic'}</p>
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className={`w-2.5 h-2.5 ${i < 4 ? 'fill-yellow-400 text-yellow-400' : 'text-slate-200'}`} />
                        ))}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1">
                          <span className="font-bold text-blue-600 text-sm">${product.price}</span>
                          {product.quantity > 0 ? (
                            <span className="text-[8px] text-green-600">In Stock</span>
                          ) : (
                            <span className="text-[8px] text-red-600">Out of Stock</span>
                          )}
                        </div>
                        <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-1.5 rounded-lg hover:shadow-md transition text-xs">
                          <ShoppingCart className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="col-span-4 text-center py-8 text-slate-500">
                  No medicines found. Add some from the dashboard!
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Features */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { icon: <Truck className="w-4 h-4" />, title: 'Free Delivery', desc: 'Orders $50+' },
              { icon: <Clock className="w-4 h-4" />, title: '24/7 Support', desc: 'Always here' },
              { icon: <Shield className="w-4 h-4" />, title: '100% Authentic', desc: 'Certified' },
              { icon: <Package className="w-4 h-4" />, title: 'Fast Shipping', desc: '2-3 days' }
            ].map((feature, index) => (
              <div key={index} className="bg-white rounded-xl p-4 text-center border border-slate-100 hover:shadow-md transition group">
                <div className="w-8 h-8 mx-auto mb-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg flex items-center justify-center group-hover:scale-110 transition">
                  {feature.icon}
                </div>
                <h3 className="font-medium text-slate-800 text-xs mb-0.5">{feature.title}</h3>
                <p className="text-[10px] text-slate-500">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-12 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto text-center">
            <h2 className="text-lg font-bold text-white mb-1">Stay Updated</h2>
            <p className="text-xs text-blue-100 mb-4">Get health tips & exclusive offers</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-4 py-2 text-xs rounded-full border-0 focus:ring-2 focus:ring-white bg-white/90 backdrop-blur-sm"
              />
              <button className="bg-white text-blue-600 px-5 py-2 rounded-full text-xs font-semibold hover:shadow-lg transition">
                Subscribe
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-1.5 rounded-lg">
                  <Pill className="w-4 h-4 text-white" />
                </div>
                <span className="text-base font-bold">Medi<span className="text-blue-400">Care</span></span>
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">Your trusted partner in healthcare</p>
            </div>
            
            {[
              { title: 'Quick Links', links: ['About', 'Services', 'Contact', 'FAQs'] },
              { title: 'Categories', links: ['Prescription', 'Vitamins', 'First Aid', 'Personal Care'] }
            ].map((section, idx) => (
              <div key={idx}>
                <h3 className="font-medium text-xs uppercase tracking-wider text-slate-400 mb-3">{section.title}</h3>
                <ul className="space-y-1.5">
                  {section.links.map((link, i) => (
                    <li key={i}><a href="#" className="text-xs text-slate-400 hover:text-white transition">{link}</a></li>
                  ))}
                </ul>
              </div>
            ))}
            
            <div>
              <h3 className="font-medium text-xs uppercase tracking-wider text-slate-400 mb-3">Contact</h3>
              <ul className="space-y-1.5 text-xs text-slate-400">
                <li className="flex items-center gap-2"><MapPin className="w-3 h-3" /> 123 Healthcare Ave, NY</li>
                <li className="flex items-center gap-2"><Phone className="w-3 h-3" /> +1 234 567 8900</li>
                <li className="flex items-center gap-2"><Mail className="w-3 h-3" /> support@medicare.com</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-slate-800 mt-8 pt-6 text-center">
            <p className="text-[10px] text-slate-500">&copy; 2024 MediCare+. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;