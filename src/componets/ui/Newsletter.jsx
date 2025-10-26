import { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import toast, { Toaster } from 'react-hot-toast';

const Newsletter = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    // Always show newsletter on every visit and refresh
    setShowNewsletter(true);
  }, []);

  const handleClose = () => {
    setShowNewsletter(false);
    // We don't save to localStorage anymore so it will show on next refresh
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Thank you for subscribing! 🎉 You’ll receive updates soon.');
    handleClose();
  };

  if (!showNewsletter) return null;

  return (
    <div className="fixed inset-0 bg-opacity-60 flex items-center justify-center z-50 p-6">
      <div className="bg-white rounded-lg shadow-2xl max-w-md w-full relative overflow-hidden">
        {/* Close button */}
        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-gray-700 hover:text-black z-10"
          aria-label="Close newsletter"
        >
          <X size={24} />
        </button>
        
        <div className="flex flex-col">
          {/* Image section */}
          <div className="w-full h-48 bg-black">
            <img 
              src="https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80" 
              alt="Newsletter" 
              className="w-full h-full object-cover opacity-90"
            />
            <div className="absolute top-16 left-0 w-full text-center">
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">Stay updated with our newsletter</h2>
            </div>
          </div>
          
          {/* Content section */}
          <div className="w-full p-8">
            <p className="text-gray-700 mb-6 text-center">Receive the latest updates on new products, offers, and news.</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email address</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="Your@Email.com"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
              >
                Subscribe
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                By subscribing, you agree to our Privacy Policy and Terms of Service.
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;