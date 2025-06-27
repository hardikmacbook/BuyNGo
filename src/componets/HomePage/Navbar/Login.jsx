import React from 'react'
import  { User } from 'lucide-react';


const Login = () => {
  return (
    <>
         {/* Login Button */}
                      <button className="relative px-6 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-xl text-white font-semibold hover:shadow-lg hover:shadow-cyan-500/40 transition-all duration-300 group overflow-hidden hover:scale-105">
                        <div className="flex items-center space-x-2">
                          <User className="w-4 h-4 group-hover:scale-110 transition-transform duration-300" />
                          <span>Login</span>
                        </div>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
                        <div className="absolute inset-0 bg-white/20 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-700 skew-x-12"></div>
                      </button>
    </>
  )
}

export default Login