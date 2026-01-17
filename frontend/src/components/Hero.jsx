import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Hero = () => {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-gradient-to-r from-red-50 to-white py-12">
      <div className="max-w-4xl mx-auto px-4 text-center">
        
        {/* Main Heading */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
          Create Polls. Get Instant Results.
        </h1>
        
        {/* Subtitle */}
        <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
          Create custom polls, share with anyone, and watch results update in real-time. Free and easy to use.
        </p>
        
        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {isAuthenticated ? (
            <Link
              to="/create"
              className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
            >
              Create Your Poll
            </Link>
          ) : (
            <>
              <Link
                to="/register"
                className="bg-red-600 text-white px-8 py-3 rounded-lg font-medium hover:bg-red-700 transition"
              >
                Get Started Free
              </Link>
              <Link
                to="/browse"
                className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition"
              >
                Browse Polls
              </Link>
            </>
          )}
        </div>
        
        {/* Simple Stats */}
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-xl mx-auto">
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">10,000+</div>
            <div className="text-gray-600">Polls Created</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">500K+</div>
            <div className="text-gray-600">Votes Cast</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-red-600">100%</div>
            <div className="text-gray-600">Free Forever</div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Hero;