import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

const Newsletter = () => {
  const [showNewsletter, setShowNewsletter] = useState(false);

  useEffect(() => {
    // Check if the newsletter has been closed before
    const hasClosedNewsletter = localStorage.getItem('hasClosedNewsletter');
    
    // Always show newsletter on every visit if it hasn't been closed
    if (!hasClosedNewsletter) {
      // Show immediately on page load
      setShowNewsletter(true);
    }
    
    // Reset localStorage after 24 hours to show newsletter again
    const lastClosedTime = localStorage.getItem('newsletterClosedTime');
    if (lastClosedTime) {
      const twentyFourHoursInMs = 24 * 60 * 60 * 1000;
      const timeDifference = Date.now() - parseInt(lastClosedTime);
      
      if (timeDifference > twentyFourHoursInMs) {
        localStorage.removeItem('hasClosedNewsletter');
        localStorage.removeItem('newsletterClosedTime');
        setShowNewsletter(true);
      }
    }
  }, []);

  const handleClose = () => {
    setShowNewsletter(false);
    // Save to localStorage that user has closed the newsletter
    localStorage.setItem('hasClosedNewsletter', 'true');
    localStorage.setItem('newsletterClosedTime', Date.now().toString());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle the newsletter subscription
    alert('न्यूज़लेटर के लिए धन्यवाद! आपको जल्द ही अपडेट मिलेंगे।');
    handleClose();
  };

  if (!showNewsletter) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-6">
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
              <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-lg">हमारे न्यूज़लेटर से जुड़ें</h2>
            </div>
          </div>
          
          {/* Content section */}
          <div className="w-full p-8">
            <p className="text-gray-700 mb-6 text-center">नवीनतम उत्पादों, ऑफर और समाचारों के बारे में अपडेट रहें।</p>
            
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">ईमेल पता</label>
                <input
                  type="email"
                  id="email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  placeholder="आपका@ईमेल.कॉम"
                />
              </div>
              
              <button
                type="submit"
                className="w-full bg-black text-white py-3 px-6 rounded-md hover:bg-gray-800 transition duration-300 font-medium"
              >
                सब्सक्राइब करें
              </button>
              
              <p className="text-xs text-gray-500 text-center mt-4">
                सब्सक्राइब करके, आप हमारी प्राइवेसी पॉलिसी और सेवा की शर्तों से सहमत होते हैं।
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;