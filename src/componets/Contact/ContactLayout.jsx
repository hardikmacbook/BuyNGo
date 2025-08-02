import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, Send, CheckCircle } from 'lucide-react';

export default function ContactLayout() {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    message: ''
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);
  const [errorDetails, setErrorDetails] = useState('');
  const [activeOffice, setActiveOffice] = useState(0);
  const [fieldErrors, setFieldErrors] = useState({});

  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'fullName':
        if (!value.trim()) {
          error = 'Full Name is required';
        }
        break;
      case 'email':
        if (!value.trim()) {
          error = 'Email is required';
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Please enter a valid email address';
        }
        break;
      default:
        break;
    }
    
    return error;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }

    // Clear submit status when user starts typing
    if (submitStatus) {
      setSubmitStatus(null);
      setErrorDetails('');
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    
    setFieldErrors(prev => ({
      ...prev,
      [name]: error
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    setErrorDetails('');

    // Validate all required fields
    const errors = {};
    errors.fullName = validateField('fullName', formData.fullName);
    errors.email = validateField('email', formData.email);
    errors.message = validateField('message', formData.message);

    // Remove empty errors
    Object.keys(errors).forEach(key => {
      if (!errors[key]) {
        delete errors[key];
      }
    });

    setFieldErrors(errors);

    if (Object.keys(errors).length > 0) {
      setIsSubmitting(false);
      return;
    }

    try {
      console.log('Submitting form data:', formData);
      
      // Using FormData approach for better compatibility
      const formDataToSend = new FormData();
      formDataToSend.append('name', formData.fullName);
      formDataToSend.append('email', formData.email);
      formDataToSend.append('message', formData.message);
      formDataToSend.append('_replyto', formData.email);
      formDataToSend.append('_subject', `New Contact Form Submission from ${formData.fullName}`);

      const response = await fetch('https://formspree.io/f/xrblkqln', {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      });

      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          fullName: '',
          email: '',
          message: ''
        });
        setFieldErrors({});
      } else {
        const errorData = await response.json().catch(() => ({}));
        console.error('Response error:', errorData);
        setSubmitStatus('error');
        setErrorDetails(`Server responded with status ${response.status}. ${errorData.error || 'Please try again.'}`);
      }
    } catch (error) {
      console.error('Network error:', error);
      setSubmitStatus('error');
      setErrorDetails(`Network error: ${error.message}. Please check your internet connection and try again.`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-slate-600/5 to-slate-900/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 sm:pt-20 lg:pt-24 pb-16 sm:pb-20 lg:pb-24">
          <div className="text-center">
            <span className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black text-slate-900 mb-4 sm:mb-6 tracking-tight">
              Contact us
            </span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-20 lg:pb-24 pt-10">
          
          {/* Contact Form */}
          
          <div className="lg:col-span-7">
            <div className="bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200/50">
              <div className="bg-gradient-to-r from-slate-50 to-white px-6 sm:px-8 py-6 sm:py-8 border-b border-slate-200/50">
                <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mb-2">Send Message</h2>
                <p className="text-slate-600 text-base sm:text-lg">Tell us about your  requirements</p>
              </div>
              
              <div className="p-6 sm:p-8">
                <div className="space-y-6 sm:space-y-8">
                  <div className="grid sm:grid-cols-2 gap-4 sm:gap-6">
                    <div className="group">
                      <label htmlFor="fullName" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="fullName"
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 ${fieldErrors.fullName ? 'border-[#d2af6f]' : 'border-slate-200'} focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none`}
                        placeholder="Your full name"
                      />
                      {fieldErrors.fullName && (
                        <p className="mt-2 text-sm text-[#8b2727]">{fieldErrors.fullName}</p>
                      )}
                    </div>
                    
                    <div className="group">
                      <label htmlFor="email" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        onBlur={handleBlur}
                        required
                        className={`w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 ${fieldErrors.email ? 'border-[#d2af6f]' : 'border-slate-200'} focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 group-hover:border-slate-300 outline-none`}
                        placeholder="your@email.com"
                      />
                      {fieldErrors.email && (
                        <p className="mt-2 text-sm text-[#8b2727]">{fieldErrors.email}</p>
                      )}
                    </div>
                  </div>



                  <div className="group">
                    <label htmlFor="message" className="block text-sm font-bold text-slate-900 mb-3 uppercase tracking-wider">
                      Details *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleInputChange}
                      onBlur={handleBlur}
                      required
                      rows={5}
                      className={`w-full px-0 py-3 sm:py-4 bg-transparent border-0 border-b-2 ${fieldErrors.message ? 'border-[#d2af6f]' : 'border-slate-200'} focus:ring-0 focus:border-[#8b2727] transition-all duration-300 text-base sm:text-lg placeholder-slate-400 resize-none group-hover:border-slate-300 outline-none`}
                      placeholder="Describe your requirements and any specific needs..."
                    />
                    {fieldErrors.message && (
                      <p className="mt-2 text-sm text-[#8b2727]">{fieldErrors.message}</p>
                    )}
                  </div>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onClick={handleSubmit}
                    className="w-full bg-[#8b2727] text-white py-4 sm:py-5 px-6 sm:px-8 rounded-2xl hover:from-slate-800 hover:to-slate-600 focus:ring-4 focus:ring-slate-300 transition-all duration-300 flex items-center justify-center space-x-3 font-bold text-base sm:text-lg shadow-2xl disabled:opacity-50 group transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer hover:bg-[#d2af6f] hover:text-black"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        <span>Sending Message...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                        <span>Send Message</span>
                      </>
                    )}
                  </button>

                  {/* Success/Error Messages - Now below the button */}
                  {submitStatus && (
                    <div className="mt-4">
                      {submitStatus === 'success' ? (
                        <div className="bg-green-50 border border-green-200 rounded-2xl p-6 flex items-center space-x-4">
                          <CheckCircle className="w-8 h-8 text-green-600 flex-shrink-0" />
                          <div>
                            <h3 className="text-lg font-bold text-green-900 mb-1">Message Sent Successfully!</h3>
                            <p className="text-green-700">Thank you for your message. We'll get back to you within 1-2 hours.</p>
                          </div>
                        </div>
                      ) : (
                        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 flex items-center space-x-4">
                          <div className="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0">
                            <span className="text-red-600 font-bold">!</span>
                          </div>
                          <div>
                            <h3 className="text-lg font-bold text-red-900 mb-1">Message Failed to Send</h3>
                            <p className="text-red-700">
                              {errorDetails || 'There was an error sending your message. Please try again or contact us directly.'}
                            </p>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}