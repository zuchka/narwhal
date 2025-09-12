import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-4">
      <div className="text-center">
        <h1 className="font-title text-f-180 text-red mb-4">404</h1>
        <h2 className="font-title text-f-60 text-dark mb-8">Page Not Found</h2>
        <p className="font-copy text-lg text-dark/60 max-w-md mx-auto mb-12">
          Looks like this page took a laugh break. Let's get you back to the good stuff.
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center gap-3 btn-outline-dark"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>
      </div>
    </div>
  );
}
