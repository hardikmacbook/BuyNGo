import React from 'react';

const TermsOfService = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl text-black mb-6">Terms of Service</h1>
        <p className="text-gray-600 mb-4">
          Welcome to <span className="font-semibold">BuyNGo</span>. By using our website, you agree to abide by the following terms and conditions. Please review them carefully before using our services.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">1. Acceptance of Terms</h2>
        <p className="text-gray-600 mb-4">
          By accessing or using our site, you agree to comply with these terms and any applicable laws and regulations.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">2. User Responsibilities</h2>
        <ul className="list-disc ml-6 text-gray-600 mb-4 space-y-2">
          <li>You agree not to misuse or exploit the content or services offered.</li>
          <li>All information provided by you must be accurate and complete.</li>
          <li>You are responsible for maintaining the confidentiality of your account credentials.</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">3. Orders and Payments</h2>
        <p className="text-gray-600 mb-4">
          All orders are subject to availability and acceptance. We reserve the right to refuse or cancel any order for legitimate reasons, including suspected fraud.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">4. Limitation of Liability</h2>
        <p className="text-gray-600 mb-4">
          [Your Store Name] shall not be responsible for any indirect, incidental, or consequential damages arising from your use of our website or products.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">5. Changes to Terms</h2>
        <p className="text-gray-600 mb-4">
          We reserve the right to modify or update these terms at any time. Updated versions will be posted on this page with the revised date.
        </p>

        <p className="text-gray-500 text-sm mt-8">Last updated on October 26, 2025</p>
      </div>
    </div>
  );
};

export default TermsOfService;
