import React from 'react';
import Hero from '../components/Hero';

const Home = () => {
  return (
    <div>
      <Hero />
      
      {/* Simple Content Section */}
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            How It Works
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold">1</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Create Poll</h3>
            <p className="text-gray-600">Write your question and add options</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold">2</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Share Link</h3>
            <p className="text-gray-600">Share poll link with anyone</p>
          </div>
          
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-600 font-bold">3</span>
            </div>
            <h3 className="font-bold text-lg mb-2">Get Results</h3>
            <p className="text-gray-600">Watch votes come in real-time</p>
          </div>
        </div>
      </div>
      
      {/* Simple Poll Example */}
      <div className="bg-gray-50 py-12">
        <div className="max-w-2xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-center mb-8">
            Live Poll Example
          </h2>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <h3 className="font-bold text-lg mb-4">
              Which is your favorite frontend framework?
            </h3>
            
            <div className="space-y-3">
              {['React', 'Vue.js', 'Angular', 'Svelte'].map((option, index) => (
                <div key={index} className="border rounded-lg p-3 hover:bg-gray-50 cursor-pointer">
                  <div className="flex justify-between">
                    <span>{option}</span>
                    <span className="text-red-600 font-bold">
                      {[45, 25, 20, 10][index]}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
                    <div 
                      className="bg-red-600 h-2 rounded-full"
                      style={{ width: `${[45, 25, 20, 10][index]}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="text-center text-gray-500 text-sm mt-4">
              1,234 votes • Poll ends in 2 days
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;