import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navigation } from './components/Navigation';
import Index from './pages/Index';
import NotFound from './pages/NotFound';
import './global.css';

// Placeholder component for pages not yet built
const PlaceholderPage: React.FC<{ title: string }> = ({ title }) => (
  <div className="min-h-screen bg-cream pt-[100px]">
    <div className="flex items-center justify-center min-h-[calc(100vh-100px)]">
      <div className="text-center px-4">
        <h1 className="font-title text-f-80 text-dark mb-8">{title}</h1>
        <p className="font-copy text-lg text-dark/60 max-w-2xl mx-auto">
          This page is coming soon. Continue prompting to fill in this page's content if you'd like it built out.
        </p>
      </div>
    </div>
  </div>
);

function App() {
  return (
    <BrowserRouter>
      <Navigation />
      <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/work" element={<PlaceholderPage title="Our Work" />} />
        <Route path="/news" element={<PlaceholderPage title="Latest News" />} />
        <Route path="/about" element={<PlaceholderPage title="About Us" />} />
        <Route path="/capabilities" element={<PlaceholderPage title="Our Capabilities" />} />
        <Route path="/contact" element={<PlaceholderPage title="Contact Us" />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

// Mount the app
const rootElement = document.getElementById('root');
if (rootElement) {
  ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}
