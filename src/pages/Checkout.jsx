import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import SetPageTitle from '../componets/SetPageTitle';
import { Home, ChevronRight, ShoppingBag, CheckCircle, Loader, Lock } from 'lucide-react';

const Checkout = () => {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();
  const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingCost = 10;
  const totalWithShipping = totalAmount + shippingCost;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'India',
    paymentMethod: 'cash-on-delivery', // default
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    const requiredFields = ['firstName', 'lastName', 'email', 'phone', 'address', 'city', 'state', 'zipCode', 'country'];

    requiredFields.forEach(field => {
      if (!formData[field].trim()) {
        newErrors[field] = 'This field is required';
      }
    });

    if (formData.email && !/^\S+@\S+\.\S+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (formData.phone && !/^[0-9\-\+\s()]{10,15}$/.test(formData.phone)) {
      newErrors.phone = 'Please enter a valid phone number';
    }

    // Card validation only if paymentMethod = credit-card
    if (formData.paymentMethod === 'credit-card') {
      if (!formData.cardNumber.trim()) {
        newErrors.cardNumber = 'Card number is required';
      } else if (!/^[0-9]{16}$/.test(formData.cardNumber.replace(/\s/g, ''))) {
        newErrors.cardNumber = 'Please enter a valid 16-digit card number';
      }
      if (!formData.cardName.trim()) {
        newErrors.cardName = 'Name on card is required';
      }
      if (!formData.expiryDate.trim()) {
        newErrors.expiryDate = 'Expiry date is required';
      } else if (!/^(0[1-9]|1[0-2])\/[0-9]{2}$/.test(formData.expiryDate)) {
        newErrors.expiryDate = 'Please use MM/YY format';
      }
      if (!formData.cvv.trim()) {
        newErrors.cvv = 'CVV is required';
      } else if (!/^[0-9]{3,4}$/.test(formData.cvv)) {
        newErrors.cvv = 'CVV must be 3 or 4 digits';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const sendOrderToWhatsApp = () => {
    let msg =
      `Order from BuyNGo\n` +
      `Name: ${formData.firstName} ${formData.lastName}\n` +
      `Phone: ${formData.phone}\n` +
      `Email: ${formData.email}\n` +
      `Payment: ${formData.paymentMethod}\n` +
      `Address: ${formData.address},\nCity: ${formData.city}, State: ${formData.state}, Pincode: ${formData.zipCode}, Country: ${formData.country}\n` +
      `Items:\n`;

    cart.forEach(item => {
      msg += `- ${item.title} (₹${item.price.toFixed(2)}) (Qty: ${item.quantity})\n`;
    });

    msg += `Total: ₹${totalWithShipping.toFixed(2)}`;

    const whatsappNumber = '917575837112'; // Replace with your number
    const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(whatsappLink, '_blank');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      sendOrderToWhatsApp();
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        setOrderComplete(true);
        clearCart();
        setTimeout(() => navigate('/'), 5000);
      }, 1200);
    }
  };

  if (cart.length === 0 && !orderComplete) {
    return (
      <div className="pt-28 min-h-screen bg-gray-50">
        {/* Empty Cart Message Same As Before */}
      </div>
    );
  }

  if (orderComplete) {
    return (
      <div className="pt-28 min-h-screen bg-gray-50">
        {/* Order Complete Message Same As Before */}
      </div>
    );
  }

  return (
    <>
      <SetPageTitle title="Checkout - BuyNGo"/>
      <div className="pt-28 bg-gray-50 min-h-screen">
        {/* Breadcrumb */}
        <div className="bg-white shadow-sm border-b border-gray-200">
          <div className="container mx-auto max-w-7xl px-4 py-3">
            <nav className="flex items-center space-x-2 text-sm text-gray-600">
              <Link to="/" className="flex items-center hover:text-gray-900 transition-colors">
                <Home className="w-4 h-4 mr-1" /> Home
              </Link>
              <ChevronRight className="w-4 h-4" />
              <Link to="/cart" className="hover:text-gray-900 transition-colors">Cart</Link>
              <ChevronRight className="w-4 h-4" />
              <span className="text-gray-900 font-medium">Checkout</span>
            </nav>
          </div>
        </div>

        <div className="container mx-auto max-w-7xl px-4 py-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-light text-gray-900 mb-4">Checkout</h1>
            <div className="w-24 h-px bg-gray-900 mx-auto mb-4"></div>
            <p className="text-gray-600 leading-relaxed">Complete your order details below</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Form */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-8">
                <form onSubmit={handleSubmit} id="checkout-form">
                  {/* Personal Information */}
                  <div className="mb-10">
                    <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">Personal Information</h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {/* First Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="firstName">
                          First Name *
                        </label>
                        <input
                          type="text"
                          id="firstName"
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.firstName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                        />
                        {errors.firstName && <p className="text-red-600 text-sm mt-1">{errors.firstName}</p>}
                      </div>
                      {/* Last Name */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="lastName">
                          Last Name *
                        </label>
                        <input
                          type="text"
                          id="lastName"
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.lastName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                        />
                        {errors.lastName && <p className="text-red-600 text-sm mt-1">{errors.lastName}</p>}
                      </div>
                      {/* Email */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="email">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                        />
                        {errors.email && <p className="text-red-600 text-sm mt-1">{errors.email}</p>}
                      </div>
                      {/* Phone */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="phone">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          value={formData.phone}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                        />
                        {errors.phone && <p className="text-red-600 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>
                  </div>

                  {/* Shipping Address */}
                  <div className="mb-10">
                    <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">Shipping Address</h2>
                    <div className="grid grid-cols-1 gap-6">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="address">
                          Street Address *
                        </label>
                        <input
                          type="text"
                          id="address"
                          name="address"
                          value={formData.address}
                          onChange={handleChange}
                          className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.address ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                        />
                        {errors.address && <p className="text-red-600 text-sm mt-1">{errors.address}</p>}
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="city">
                            City *
                          </label>
                          <input
                            type="text"
                            id="city"
                            name="city"
                            value={formData.city}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.city ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                          />
                          {errors.city && <p className="text-red-600 text-sm mt-1">{errors.city}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="state">
                            State/Province *
                          </label>
                          <input
                            type="text"
                            id="state"
                            name="state"
                            value={formData.state}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.state ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                          />
                          {errors.state && <p className="text-red-600 text-sm mt-1">{errors.state}</p>}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="zipCode">
                            ZIP/Postal Code *
                          </label>
                          <input
                            type="text"
                            id="zipCode"
                            name="zipCode"
                            value={formData.zipCode}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.zipCode ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                          />
                          {errors.zipCode && <p className="text-red-600 text-sm mt-1">{errors.zipCode}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="country">
                            Country *
                          </label>
                          <select
                            id="country"
                            name="country"
                            value={formData.country}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.country ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                          >
                            <option value="India">India</option>
                            <option value="United States">United States</option>
                            <option value="Canada">Canada</option>
                            <option value="United Kingdom">United Kingdom</option>
                            <option value="Australia">Australia</option>
                            <option value="Germany">Germany</option>
                            <option value="France">France</option>
                            <option value="Japan">Japan</option>
                            <option value="China">China</option>
                          </select>
                          {errors.country && <p className="text-red-600 text-sm mt-1">{errors.country}</p>}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Payment Method */}
                  <div className="mb-10">
                    <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">Payment Method</h2>
                    <div className="space-y-4">
                      {/* Credit Card */}
                      <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                        <input
                          type="radio"
                          id="credit-card"
                          name="paymentMethod"
                          value="credit-card"
                          checked={formData.paymentMethod === 'credit-card'}
                          onChange={handleChange}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <label htmlFor="credit-card" className="ml-3 block text-sm font-medium text-gray-700">
                          Credit/Debit Card
                        </label>
                      </div>

                      {/* Show card details only when credit-card selected */}
                      {formData.paymentMethod === 'credit-card' && (
                        <div className="ml-8 mt-4 space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardNumber">
                              Card Number *
                            </label>
                            <input
                              type="text"
                              id="cardNumber"
                              name="cardNumber"
                              value={formData.cardNumber}
                              onChange={handleChange}
                              placeholder="1234 5678 9012 3456"
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.cardNumber ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                            />
                            {errors.cardNumber && <p className="text-red-600 text-sm mt-1">{errors.cardNumber}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cardName">
                              Name on Card *
                            </label>
                            <input
                              type="text"
                              id="cardName"
                              name="cardName"
                              value={formData.cardName}
                              onChange={handleChange}
                              className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.cardName ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                            />
                            {errors.cardName && <p className="text-red-600 text-sm mt-1">{errors.cardName}</p>}
                          </div>
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="expiryDate">
                                Expiry Date (MM/YY) *
                              </label>
                              <input
                                type="text"
                                id="expiryDate"
                                name="expiryDate"
                                value={formData.expiryDate}
                                onChange={handleChange}
                                placeholder="MM/YY"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.expiryDate ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                              />
                              {errors.expiryDate && <p className="text-red-600 text-sm mt-1">{errors.expiryDate}</p>}
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2" htmlFor="cvv">
                                CVV *
                              </label>
                              <input
                                type="text"
                                id="cvv"
                                name="cvv"
                                value={formData.cvv}
                                onChange={handleChange}
                                placeholder="123"
                                className={`w-full px-4 py-3 border-2 rounded-lg focus:outline-none transition-colors ${errors.cvv ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-gray-900'}`}
                              />
                              {errors.cvv && <p className="text-red-600 text-sm mt-1">{errors.cvv}</p>}
                            </div>
                          </div>
                        </div>
                      )}

                      {/* PayPal */}
                      <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                        <input
                          type="radio"
                          id="paypal"
                          name="paymentMethod"
                          value="paypal"
                          checked={formData.paymentMethod === 'paypal'}
                          onChange={handleChange}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <label htmlFor="paypal" className="ml-3 block text-sm font-medium text-gray-700">
                          PayPal
                        </label>
                      </div>

                      {/* Cash on Delivery */}
                      <div className="flex items-center p-4 border-2 border-gray-200 rounded-lg">
                        <input
                          type="radio"
                          id="cash-on-delivery"
                          name="paymentMethod"
                          value="cash-on-delivery"
                          checked={formData.paymentMethod === 'cash-on-delivery'}
                          onChange={handleChange}
                          className="h-4 w-4 text-gray-900 focus:ring-gray-900"
                        />
                        <label htmlFor="cash-on-delivery" className="ml-3 block text-sm font-medium text-gray-700">
                          Cash on Delivery
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 lg:hidden">
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="w-full bg-gray-900 px-6 py-4 rounded-lg font-medium text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                    >
                      {isProcessing ? (
                        <>
                          <Loader className="w-4 h-4 animate-spin" /> Processing...
                        </>
                      ) : (
                        <>Send Order to WhatsApp - ₹{totalWithShipping.toFixed(2)}</>
                      )}
                    </button>
                  </div>
                </form>
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-white rounded-2xl border-2 border-gray-100 shadow-sm p-8 sticky top-28">
                <h2 className="text-xl font-medium text-gray-900 mb-6 pb-4 border-b border-gray-200">Order Summary</h2>
                <div className="space-y-4 mb-6 max-h-80 overflow-y-auto">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 py-3 border-b border-gray-100">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden flex-shrink-0">
                        <img src={item.image} alt={item.title} className="max-w-full max-h-full object-contain p-2" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 line-clamp-1">{item.title}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-gray-900">₹{(item.price * item.quantity).toFixed(2)}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="space-y-3 py-4 border-b border-gray-200">
                  <div className="flex justify-between text-gray-600">
                    <span>Subtotal</span>
                    <span>₹{totalAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-gray-600">
                    <span>Shipping</span>
                    <span>₹{shippingCost.toFixed(2)}</span>
                  </div>
                </div>
                <div className="flex justify-between items-center py-4">
                  <span className="text-lg font-medium text-gray-900">Total</span>
                  <span className="text-xl font-medium text-gray-900">₹{totalWithShipping.toFixed(2)}</span>
                </div>
                <div className="mt-6 hidden lg:block">
                  <button
                    type="submit"
                    form="checkout-form"
                    disabled={isProcessing}
                    className="w-full bg-gray-900 px-6 py-4 rounded-lg font-medium text-white hover:bg-gray-800 transition-all duration-300 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isProcessing ? (
                      <>
                        <Loader className="w-4 h-4 animate-spin" /> Processing...
                      </>
                    ) : (
                      <>Send Order to WhatsApp</>
                    )}
                  </button>
                </div>
                <div className="mt-6 text-xs text-gray-500 flex items-center justify-center">
                  <Lock className="w-4 h-4 mr-1" /> Secure Checkout
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Checkout;
