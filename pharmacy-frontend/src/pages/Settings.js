import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  Pill, 
  User, 
  Mail, 
  Phone, 
  Lock, 
  Bell, 
  Shield, 
  Globe, 
  Moon, 
  Sun,
  Save,
  ArrowLeft,
  Camera,
  Check,
  X,
  Eye,
  EyeOff,
  LogOut
} from 'lucide-react';

const Settings = ({ navigate }) => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('profile');
  const [showPassword, setShowPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  
  // Profile form state
  const [profile, setProfile] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '+1 234 567 8900',
    address: '123 Healthcare Ave, Medical District, NY 10001',
    bio: 'Pharmacist at MediCare+ with 5+ years of experience.'
  });

  // Password form state
  const [password, setPassword] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  // Notification settings
  const [notifications, setNotifications] = useState({
    emailAlerts: true,
    lowStockAlerts: true,
    expiringSoonAlerts: true,
    newOrders: true,
    weeklyReport: false,
    promotionalEmails: false
  });

  // Appearance settings
  const [appearance, setAppearance] = useState({
    theme: 'light',
    compactView: false,
    fontSize: 'medium'
  });

  // Security settings
  const [security, setSecurity] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    deviceHistory: false
  });

  const handleProfileChange = (e) => {
    setProfile({
      ...profile,
      [e.target.name]: e.target.value
    });
  };

  const handleNotificationChange = (key) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key]
    });
  };

  const handlePasswordChange = (e) => {
    setPassword({
      ...password,
      [e.target.name]: e.target.value
    });
  };

  const handleSaveProfile = () => {
    // Simulate save
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleSavePassword = () => {
    if (password.new !== password.confirm) {
      setSaveError('New passwords do not match');
      setTimeout(() => setSaveError(''), 3000);
      return;
    }
    if (password.new.length < 6) {
      setSaveError('Password must be at least 6 characters');
      setTimeout(() => setSaveError(''), 3000);
      return;
    }
    // Simulate save
    setSaveSuccess(true);
    setPassword({ current: '', new: '', confirm: '' });
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  const handleLogout = () => {
    logout();
    navigate('home');
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> },
    { id: 'appearance', label: 'Appearance', icon: <Sun className="w-4 h-4" /> }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <button
                onClick={() => navigate('dashboard')}
                className="p-2 hover:bg-slate-100 rounded-full transition"
              >
                <ArrowLeft className="w-5 h-5 text-slate-600" />
              </button>
              <div className="flex items-center gap-3">
                <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-lg">
                  <Pill className="w-6 h-6 text-white" />
                </div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  Settings
                </h1>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={handleLogout}
                className="flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition"
              >
                <LogOut className="w-4 h-4" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Success Message */}
        {saveSuccess && (
          <div className="mb-6 bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
            <Check className="w-5 h-5 text-green-500" />
            <span className="text-sm font-medium">Settings saved successfully!</span>
          </div>
        )}

        {saveError && (
          <div className="mb-6 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl flex items-center gap-3 animate-fade-in">
            <X className="w-5 h-5 text-red-500" />
            <span className="text-sm font-medium">{saveError}</span>
          </div>
        )}

        <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-slate-200 overflow-hidden">
          <div className="flex flex-col md:flex-row">
            {/* Sidebar */}
            <div className="md:w-64 border-r border-slate-200 bg-slate-50/50">
              {/* Profile Summary */}
              <div className="p-6 border-b border-slate-200">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white text-2xl font-bold">
                      {user?.name?.charAt(0) || user?.email?.charAt(0) || 'U'}
                    </div>
                    <button className="absolute -bottom-1 -right-1 bg-white p-1.5 rounded-full shadow-md border border-slate-200 hover:bg-blue-50 transition">
                      <Camera className="w-3 h-3 text-blue-600" />
                    </button>
                  </div>
                  <div>
                    <h3 className="font-semibold text-slate-800">{user?.name || 'User'}</h3>
                    <p className="text-xs text-slate-500">{user?.email}</p>
                  </div>
                </div>
              </div>

              {/* Navigation Tabs */}
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition ${
                      activeTab === tab.id
                        ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-md'
                        : 'text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {tab.icon}
                    {tab.label}
                  </button>
                ))}
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 p-6 md:p-8">
              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Profile Information</h2>
                    <p className="text-sm text-slate-500">Update your personal information</p>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Full Name
                      </label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="text"
                          name="name"
                          value={profile.name}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Email Address
                      </label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="email"
                          name="email"
                          value={profile.email}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type="tel"
                          name="phone"
                          value={profile.phone}
                          onChange={handleProfileChange}
                          className="w-full pl-10 pr-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Address
                      </label>
                      <textarea
                        name="address"
                        value={profile.address}
                        onChange={handleProfileChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Bio
                      </label>
                      <textarea
                        name="bio"
                        value={profile.bio}
                        onChange={handleProfileChange}
                        rows="3"
                        className="w-full px-4 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      />
                    </div>

                    <div className="pt-4">
                      <button
                        onClick={handleSaveProfile}
                        className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition transform hover:scale-[1.02] flex items-center gap-2"
                      >
                        <Save className="w-4 h-4" />
                        Save Changes
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Notification Preferences</h2>
                    <p className="text-sm text-slate-500">Choose what notifications you receive</p>
                  </div>

                  <div className="space-y-4">
                    {[
                      { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email' },
                      { key: 'lowStockAlerts', label: 'Low Stock Alerts', desc: 'Get notified when medicines are running low' },
                      { key: 'expiringSoonAlerts', label: 'Expiring Soon Alerts', desc: 'Get notified about medicines expiring within 30 days' },
                      { key: 'newOrders', label: 'New Orders', desc: 'Get notified when new orders are placed' },
                      { key: 'weeklyReport', label: 'Weekly Report', desc: 'Receive weekly sales and inventory report' },
                      { key: 'promotionalEmails', label: 'Promotional Emails', desc: 'Receive offers and updates' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100 last:border-0">
                        <div>
                          <h3 className="font-medium text-slate-800">{item.label}</h3>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={notifications[item.key]}
                            onChange={() => handleNotificationChange(item.key)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition transform hover:scale-[1.02] flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Preferences
                    </button>
                  </div>
                </div>
              )}

              {/* Security Tab */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Security Settings</h2>
                    <p className="text-sm text-slate-500">Manage your account security</p>
                  </div>

                  {/* Change Password */}
                  <div className="bg-slate-50 rounded-xl p-6 space-y-4">
                    <h3 className="font-semibold text-slate-800">Change Password</h3>
                    
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Current Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showPassword ? 'text' : 'password'}
                          name="current"
                          value={password.current}
                          onChange={handlePasswordChange}
                          className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword(!showPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showNewPassword ? 'text' : 'password'}
                          name="new"
                          value={password.new}
                          onChange={handlePasswordChange}
                          className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowNewPassword(!showNewPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showNewPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Confirm New Password
                      </label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                          type={showConfirmPassword ? 'text' : 'password'}
                          name="confirm"
                          value={password.confirm}
                          onChange={handlePasswordChange}
                          className="w-full pl-10 pr-12 py-2.5 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <button
                          type="button"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2"
                        >
                          {showConfirmPassword ? <EyeOff className="w-4 h-4 text-slate-400" /> : <Eye className="w-4 h-4 text-slate-400" />}
                        </button>
                      </div>
                    </div>

                    <button
                      onClick={handleSavePassword}
                      className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-blue-700 transition"
                    >
                      Update Password
                    </button>
                  </div>

                  {/* Security Options */}
                  <div className="space-y-4">
                    <h3 className="font-semibold text-slate-800">Security Options</h3>
                    
                    {[
                      { key: 'twoFactorAuth', label: 'Two-Factor Authentication', desc: 'Add an extra layer of security to your account' },
                      { key: 'loginAlerts', label: 'Login Alerts', desc: 'Get notified when someone logs into your account' },
                      { key: 'deviceHistory', label: 'Device History', desc: 'Track devices that have accessed your account' }
                    ].map((item) => (
                      <div key={item.key} className="flex items-center justify-between py-3 border-b border-slate-100">
                        <div>
                          <h3 className="font-medium text-slate-800">{item.label}</h3>
                          <p className="text-xs text-slate-500">{item.desc}</p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={security[item.key]}
                            onChange={() => setSecurity({...security, [item.key]: !security[item.key]})}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Appearance Tab */}
              {activeTab === 'appearance' && (
                <div className="space-y-6">
                  <div>
                    <h2 className="text-xl font-bold text-slate-800 mb-1">Appearance</h2>
                    <p className="text-sm text-slate-500">Customize how the dashboard looks</p>
                  </div>

                  {/* Theme */}
                  <div>
                    <h3 className="font-medium text-slate-800 mb-3">Theme</h3>
                    <div className="grid grid-cols-2 gap-3">
                      <button
                        onClick={() => setAppearance({...appearance, theme: 'light'})}
                        className={`p-4 rounded-xl border-2 transition ${
                          appearance.theme === 'light'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <Sun className="w-6 h-6 text-yellow-500 mx-auto mb-2" />
                        <span className="text-sm font-medium">Light</span>
                      </button>
                      <button
                        onClick={() => setAppearance({...appearance, theme: 'dark'})}
                        className={`p-4 rounded-xl border-2 transition ${
                          appearance.theme === 'dark'
                            ? 'border-blue-600 bg-blue-50'
                            : 'border-slate-200 hover:border-blue-300'
                        }`}
                      >
                        <Moon className="w-6 h-6 text-slate-700 mx-auto mb-2" />
                        <span className="text-sm font-medium">Dark</span>
                      </button>
                    </div>
                  </div>

                  {/* Font Size */}
                  <div>
                    <h3 className="font-medium text-slate-800 mb-3">Font Size</h3>
                    <div className="grid grid-cols-3 gap-3">
                      {['small', 'medium', 'large'].map((size) => (
                        <button
                          key={size}
                          onClick={() => setAppearance({...appearance, fontSize: size})}
                          className={`p-3 rounded-xl border-2 transition capitalize ${
                            appearance.fontSize === size
                              ? 'border-blue-600 bg-blue-50'
                              : 'border-slate-200 hover:border-blue-300'
                          }`}
                        >
                          <span className="text-sm font-medium">{size}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Compact View */}
                  <div className="flex items-center justify-between py-3">
                    <div>
                      <h3 className="font-medium text-slate-800">Compact View</h3>
                      <p className="text-xs text-slate-500">Show more content in less space</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={appearance.compactView}
                        onChange={() => setAppearance({...appearance, compactView: !appearance.compactView})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-gradient-to-r peer-checked:from-blue-600 peer-checked:to-indigo-600"></div>
                    </label>
                  </div>

                  <div className="pt-4">
                    <button
                      onClick={handleSaveProfile}
                      className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-2.5 rounded-xl font-medium hover:shadow-lg transition transform hover:scale-[1.02] flex items-center gap-2"
                    >
                      <Save className="w-4 h-4" />
                      Save Appearance
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Settings;