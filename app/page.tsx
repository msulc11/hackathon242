"use client"; // Mark this file as a Client Component

import React from 'react';
import Link from 'next/link';

export default function Page() {
  return (
    <div className="homepage-container bg-gray-100 dark:bg-black min-h-screen">
      {/* Hero Section */}
      <header
        className="hero-section bg-cover bg-center h-80 flex items-center justify-center text-white"
        style={{ backgroundImage: 'url("/images/financial.webp")' }}
      >
        <div className="text-center p-5 bg-black bg-opacity-60 dark:bg-black dark:bg-opacity-80 rounded-lg">
          <h1 className="text-5xl font-bold mb-4">Welcome to Financial Companies Hub</h1>
          <p className="text-xl mb-6">Your source for financial insights, company data, and investment tracking</p>
          <Link
            href="/explore"
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full"
          >
            Explore Companies
          </Link>
        </div>
      </header>

      {/* Information Section */}
      <section className="info-section py-16 bg-white dark:bg-black">
        <div className="max-w-5xl mx-auto px-5">
          <h2 className="text-3xl font-semibold text-center mb-8 dark:text-white">About Our Platform</h2>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Welcome to Financial Companies Hub, where you can access comprehensive information about companies and their financial health. Whether you're an investor, analyst, or just curious about financial markets, we provide tools and data to help you make informed decisions.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed mb-8">
            Our platform tracks key financial metrics, company performance, and industry trends to keep you updated. Explore our database of companies, review financial data, and track investments, all in one place.
          </p>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed">
            Join us today and unlock a wealth of financial insights that will help you stay ahead in the competitive world of finance.
          </p>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="cta-section py-16 bg-gray-100 dark:bg-black text-center">
        <h2 className="text-3xl font-semibold mb-6 dark:text-white">Start Exploring Now!</h2>
        <Link
          href="/explore"
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-8 rounded-full"
        >
          Discover Companies
        </Link>
      </section>

      {/* Footer */}
      <footer className="footer bg-gray-800 dark:bg-black text-white py-6 text-center">
        <p>&copy; 2024 Financial Companies Hub. All Rights Reserved.</p>
      </footer>
    </div>
  );
}