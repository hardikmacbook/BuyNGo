import React from 'react';

const CookiePolicy = () => {
  return (
    <div className="bg-gray-50 min-h-screen py-16 px-6 sm:px-12 lg:px-24">
      <div className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Cookie Policy</h1>
        <p className="text-gray-600 mb-4">
          This Cookie Policy explains how <span className="font-semibold">[Your Store Name]</span> uses cookies and similar technologies to recognize you when you visit our website.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">1. What Are Cookies?</h2>
        <p className="text-gray-600 mb-4">
          Cookies are small text files stored on your device that help improve your browsing experience by remembering your preferences and session data.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">2. How We Use Cookies</h2>
        <ul className="list-disc ml-6 text-gray-600 mb-4 space-y-2">
          <li>To remember your login status and cart details</li>
          <li>To analyze traffic and improve website performance</li>
          <li>To provide relevant advertisements and offers</li>
        </ul>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">3. Managing Cookies</h2>
        <p className="text-gray-600 mb-4">
          You can manage or block cookies in your browser settings. However, disabling cookies may impact your website experience.
        </p>

        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-4">4. Updates to This Policy</h2>
        <p className="text-gray-600 mb-4">
          We may update this Cookie Policy periodically to reflect changes in technology or legal requirements.
        </p>

        <p className="text-gray-500 text-sm mt-8">Last updated on October 26, 2025</p>
      </div>
    </div>
  );
};

export default CookiePolicy;
