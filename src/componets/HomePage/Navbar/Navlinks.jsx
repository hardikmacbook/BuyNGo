import React from 'react'

const Navlinks = () => {
  const navItems = ['Home', 'Products', 'About', 'Contact'];
  return (
    <>
         {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center">
              {navItems.map((item, index) => (
                <a
                  key={item}
                  href="#"
                  className="relative text-slate-700 hover:text-slate-900 transition-all duration-300 px-4 py-2 rounded-lg hover:bg-white/40 group text-base font-medium"
                  style={{
                    animationDelay: `${index * 100}ms`
                  }}
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 group-hover:w-full transition-all duration-300"></div>
                </a>
              ))}
            </div>
    </>
  )
}

export default Navlinks