import React from 'react';
import { User, Shield, Bell, Lock, Info, ArrowLeft, Building, Package } from 'lucide-react';

export default function AccountSettingsScreen() {
  const menuItems = [
    { icon: User, text: 'Edit Profile' },
    { icon: Shield, text: 'Security' },
    { icon: Bell, text: 'Notifications' },
    { icon: Lock, text: 'Security' },
    { icon: Info, text: 'Terms & Policies' },
  ];

  return (
    <div className="min-h-screen bg-gray-300 flex items-center justify-center p-8">
      <div className="relative">
        {/* iPhone Frame */}
        <div className="relative bg-gray-800 rounded-[3rem] shadow-2xl p-3 border-8 border-gray-700" style={{ width: '390px', height: '844px' }}>
          
          {/* Screen Content */}
          <div className="bg-gray-600 rounded-[2.5rem] h-full overflow-hidden relative">
            
            {/* Status Bar */}
            <div className="bg-gradient-to-r from-pink-500 to-pink-400 px-8 py-3 flex justify-between items-center">
              <span className="text-white font-semibold text-lg">9:41</span>
              <div className="flex gap-2 items-center">
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H3a1 1 0 01-1-1V4zM8 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1H9a1 1 0 01-1-1V4zM15 3a1 1 0 00-1 1v12a1 1 0 001 1h2a1 1 0 001-1V4a1 1 0 00-1-1h-2z" />
                </svg>
                <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 11a1 1 0 011-1h2a1 1 0 011 1v5a1 1 0 01-1 1H3a1 1 0 01-1-1v-5zM8 7a1 1 0 011-1h2a1 1 0 011 1v9a1 1 0 01-1 1H9a1 1 0 01-1-1V7zM14 4a1 1 0 011-1h2a1 1 0 011 1v12a1 1 0 01-1 1h-2a1 1 0 01-1-1V4z" />
                </svg>
                <div className="w-6 h-3 bg-white rounded-sm border border-white relative">
                  <div className="absolute right-[-2px] top-1/2 transform -translate-y-1/2 w-1 h-1.5 bg-white"></div>
                </div>
              </div>
            </div>

            {/* Header Section */}
            <div className="bg-gradient-to-br from-pink-500 to-pink-400 px-6 pt-6 pb-10 relative">
              <button className="absolute left-6 top-6">
                <ArrowLeft size={32} className="text-white" strokeWidth={3} />
              </button>
              
              <div className="flex items-center justify-center gap-6 mt-8">
                <div className="bg-white/30 backdrop-blur-sm p-5 rounded-3xl shadow-xl">
                  <Building size={48} className="text-gray-700" strokeWidth={1.5} />
                </div>
                
                <h1 className="text-yellow-300 text-2xl font-black tracking-wider drop-shadow-lg">
                  ACCOUNT & SETTINGS
                </h1>
                
                <div className="bg-pink-300 p-4 rounded-full shadow-xl">
                  <div className="relative w-10 h-10">
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg transform rotate-45"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-pink-400 to-pink-500" style={{ clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)' }}></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-yellow-300 to-yellow-400" style={{ clipPath: 'polygon(50% 0%, 100% 0%, 100% 50%)' }}></div>
                  </div>
                </div>
              </div>
              
              <div className="absolute bottom-0 left-0 right-0 h-6 bg-gray-600 rounded-t-3xl"></div>
            </div>

            {/* Menu Items */}
            <div className="bg-gradient-to-b from-gray-600 to-gray-700 px-6 pt-6 pb-8 flex-1">
              <div className="space-y-4">
                {menuItems.map((item, index) => (
                  <button
                    key={index}
                    className="w-full bg-gradient-to-r from-gray-500/40 to-gray-500/60 backdrop-blur-sm rounded-full px-6 py-4 flex items-center gap-5 transition-all duration-200 hover:from-gray-500/60 hover:to-gray-500/80 border border-gray-400/30 shadow-lg"
                  >
                    <div className="bg-white rounded-full p-3 shadow-md ring-2 ring-amber-400/50">
                      <item.icon size={24} className="text-gray-600" strokeWidth={2} />
                    </div>
                    <span className="text-gray-200 text-lg font-medium tracking-wide">
                      {item.text}
                    </span>
                  </button>
                ))}
              </div>

              {/* Help & Support */}
              <div className="mt-16">
                <button className="w-full bg-gradient-to-r from-gray-500/40 to-gray-500/60 backdrop-blur-sm rounded-full px-6 py-4 transition-all duration-200 hover:from-gray-500/60 hover:to-gray-500/80 border border-gray-400/30 shadow-lg">
                  <span className="text-gray-200 text-lg font-medium tracking-wide">
                    Help & Support
                  </span>
                </button>
              </div>
            </div>

            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
              <div className="w-32 h-1 bg-gray-400 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}