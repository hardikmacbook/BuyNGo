import React from 'react'

const Privacy = () => {
  return (
        <div className="bg-gray-50 min-h-screen py-25 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl text-black mb-6">Privacy Policy</h1>
        <p className="text-gray-600 mb-4">
          At <span className="font-semibold">BuyNGO</span>, we value your privacy and are committed 
          to protecting your personal information. This Privacy Policy outlines how we collect, 
          use, and safeguard your data when you visit our website or make a purchase.
        </p>

        <h2 className="text-2xl text-black mt-8 mb-4">1. Information We Collect</h2>
        <p className="text-gray-600 mb-4">
          We collect data including your name, email, shipping address, payment information, 
          and browser details when you use our store. This helps us manage your orders and improve your experience.
        </p>

        <h2 className="text-2xl text-black mt-8 mb-4">2. How We Use Your Data</h2>
        <ul className="list-disc ml-6 text-gray-600 mb-4 space-y-2">
          <li>To process and fulfill your orders</li>
          <li>To communicate updates and promotions</li>
          <li>To improve website functionality and performance</li>
          <li>To comply with legal obligations</li>
        </ul>

        <h2 className="text-2xl text-black mt-8 mb-4">3. Data Protection</h2>
        <p className="text-gray-600 mb-4">
          We use industry-standard encryption and secure payment gateways to protect your personal data. 
          Your information will not be sold or shared except as required by law.
        </p>

        <h2 className="text-2xl text-black mt-8 mb-4">4. Cookies</h2>
        <p className="text-gray-600 mb-4">
          Our website uses cookies to improve user experience and analyze traffic. You can modify your 
          browser settings to decline cookies at any time.
        </p>

        <h2 className="text-2xl text-black mt-8 mb-4">5. Your Rights</h2>
        <p className="text-gray-600 mb-4">
          You can request access, correction, or deletion of your personal data by contacting us at 
          <a href="mailto:buyngo25@gmail.com" className="pl-1 text-blue-600 hover:underline">buyngo25@gmail.com</a>.
        </p>

        <h2 className="text-2xl text-black mt-8 mb-4">6. Updates</h2>
        <p className="text-gray-600 mb-4">
          We may occasionally update this policy to reflect changes in our practices or for legal reasons. 
          Please review this page regularly.
        </p>

        <p className="text-gray-500 text-sm mt-8">
          Last updated on October 26, 2025
        </p>
      </div>
    </div>

  )
}

export default Privacy;