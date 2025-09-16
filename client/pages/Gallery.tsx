import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'masonry-layout';
import 'web-animations-js';
import ChartsSection from '@/components/ChartsSection';
import ArtworksMuuriSection from '@/components/ArtworksMuuriSection';
import { FilterControls, FilterOptions } from '@/components/FilterControls';

// Rijksmuseum artwork interface
interface Artwork {
  id: string;
  objectNumber: string;
  title: string;
  artist: string;
  dating: string;
  webImage: {
    url: string;
    width: number;
    height: number;
  };
  aspectRatio: number;
  materials?: string[];
  techniques?: string[];
  dimensions?: string;
  principalMaker?: string;
}

const Gallery: React.FC = () => {
  const [artworks, setArtworks] = useState<Artwork[]>([]);
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [pendingFilters, setPendingFilters] = useState<FilterOptions>({});
  const [isRefreshing, setIsRefreshing] = useState(false);
  const masonryGridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);

  // Fetch artworks from local API endpoint
  const fetchArtworks = async (isRefresh = false) => {
    try {
      if (!isRefresh) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      // Build query params from activeFilters
      const params = new URLSearchParams();
      if (activeFilters.type) params.append('type', activeFilters.type);
      if (activeFilters.century) params.append('century', activeFilters.century);
      if (activeFilters.material) params.append('material', activeFilters.material);
      if (activeFilters.technique) params.append('technique', activeFilters.technique);
      if (activeFilters.topPieces) params.append('topPieces', 'true');
      if (activeFilters.colors && activeFilters.colors.length > 0) {
        params.append('colors', activeFilters.colors.join(','));
      }

      const queryString = params.toString();
      const url = `/api/rijksmuseum${queryString ? `?${queryString}` : ''}`;

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }

      const data = await response.json();

      if (data.success && data.artworks && data.artworks.length > 0) {
        setArtworks(data.artworks);
        setError(null);

        // Show a warning if results are limited
        if (data.artworks.length < 10 && Object.keys(activeFilters).length > 0) {
          console.warn(`Limited results (${data.artworks.length}) with current filters. Showing available artworks.`);
        }
      } else if (!data.success && data.artworks && data.artworks.length > 0) {
        // Use fallback data if API failed but we have backup
        console.warn('Using fallback artworks data');
        setArtworks(data.artworks);
        setError(null);
      } else if (data.artworks && data.artworks.length === 0) {
        // No results found, but not an error - just no matches
        console.warn('No artworks match the current filters');
        setArtworks([]);
        setError('No artworks found with these filters. Try adjusting your search criteria.');
      } else {
        throw new Error('Failed to load artworks');
      }

      setLoading(false);
      setIsRefreshing(false);
    } catch (err) {
      console.error('Error fetching artworks:', err);
      setError('Failed to load artworks. Please try again later.');
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  // Apply pending filters and trigger search
  const applyFilters = () => {
    setActiveFilters(pendingFilters);
  };

  // Clear all filters
  const clearFilters = () => {
    setPendingFilters({});
    setActiveFilters({});
  };

  useEffect(() => {
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeFilters]);


  // Initialize Masonry.js
  useLayoutEffect(() => {
    if (!masonryGridRef.current || artworks.length === 0 || !allImagesLoaded) return;

    const initializeMasonry = () => {
      if (!masonryGridRef.current) return;

      try {
        // Initialize Masonry
        masonryRef.current = new Masonry(masonryGridRef.current, {
          itemSelector: '.masonry-item',
          columnWidth: '.masonry-sizer',
          percentPosition: true,
          gutter: 0,
          transitionDuration: '0.3s',
          initLayout: true,
        });

        // Force a layout refresh after a short delay
        setTimeout(() => {
          if (masonryRef.current) {
            masonryRef.current.layout();
          }
        }, 100);

      } catch (error) {
        console.error('Failed to initialize Masonry:', error);
      }
    };

    // Initialize immediately since we're waiting for allImagesLoaded
    initializeMasonry();

    return () => {
      if (masonryRef.current) {
        try {
          masonryRef.current.destroy();
        } catch (error) {
          console.error('Error destroying Masonry:', error);
        }
        masonryRef.current = null;
      }
    };
  }, [artworks, allImagesLoaded]);

  // Preload images and track when all are loaded
  useEffect(() => {
    if (artworks.length === 0) return;

    setAllImagesLoaded(false);
    const loadedImages = new Set<string>();

    const loadPromises = artworks.map((artwork) => {
      return new Promise<void>((resolve) => {
        const img = new Image();
        img.src = artwork.webImage.url;
        img.onload = () => {
          loadedImages.add(artwork.id);
          setImagesLoaded((prev) => {
            const newSet = new Set(prev);
            newSet.add(artwork.id);
            return newSet;
          });
          resolve();
        };
        img.onerror = () => {
          // Still mark as "loaded" even on error to prevent hanging
          loadedImages.add(artwork.id);
          setImagesLoaded((prev) => {
            const newSet = new Set(prev);
            newSet.add(artwork.id);
            return newSet;
          });
          resolve();
        };
      });
    });

    Promise.all(loadPromises).then(() => {
      // Mark all images as loaded
      setAllImagesLoaded(true);

      // Refresh Masonry layout after all images are loaded
      setTimeout(() => {
        if (masonryRef.current) {
          masonryRef.current.layout();
        }
      }, 100);
    });
  }, [artworks]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (masonryRef.current) {
        masonryRef.current.layout();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleImageClick = (artwork: Artwork) => {
    setSelectedArtwork(artwork);
  };

  if (loading && !isRefreshing) {
    return (
      <div className="min-h-screen bg-cream pt-[100px] pb-20">
        <div className="px-4 mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-title text-f-120 text-dark text-center mb-4"
          >
            GALLERY
          </motion.h1>
        </div>
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark mb-4"></div>
            <p className="font-copy text-f-24 text-dark/60">Loading artworks from Rijksmuseum...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || (artworks.length === 0 && !loading)) {
    return (
      <div className="min-h-screen bg-cream pt-[100px] pb-20">
        <div className="px-[0.7vw] mb-8">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-title text-f-120 text-dark text-center mb-4"
          >
            GALLERY
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montreal text-f-20 uppercase tracking-wider text-dark/70 text-center max-w-3xl mx-auto"
          >
            Explore 100+ Random Masterpieces from the Rijksmuseum
          </motion.p>
        </div>

        {/* Filter Controls */}
        <div className="px-[0.7vw] mb-8">
          <FilterControls
            filters={pendingFilters}
            activeFilters={activeFilters}
            onFiltersChange={setPendingFilters}
            onApply={applyFilters}
            onClear={clearFilters}
            loading={isRefreshing}
          />
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="font-copy text-f-24 text-dark/60 mb-6">
              {error || 'No artworks found with these filters'}
            </p>
            <p className="font-montreal text-sm text-dark/50 mb-6 max-w-md mx-auto">
              Try adjusting your filters or click "Clear All" to see the full collection
            </p>
            <button
              onClick={clearFilters}
              className="btn-outline-dark"
            >
              Clear Filters
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-cream pt-[100px] pb-20">
      {/* Header */}
      <div className="px-[0.7vw] mb-8">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-title text-f-120 text-dark text-center mb-4"
        >
          GALLERY
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montreal text-f-20 uppercase tracking-wider text-dark/70 text-center max-w-3xl mx-auto"
        >
          Explore 100+ Random Masterpieces from the Rijksmuseum
        </motion.p>
      </div>

      {/* Filter Controls */}
      <div className="px-[0.7vw] mb-8">
        <FilterControls
          filters={pendingFilters}
          activeFilters={activeFilters}
          onFiltersChange={setPendingFilters}
          onApply={applyFilters}
          onClear={clearFilters}
          loading={isRefreshing}
        />
      </div>

      {/* MASONRY.JS SECTION */}
      <div className="mb-20">
        <div className="px-[0.7vw] mb-8">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="font-title text-f-80 text-dark text-center mb-6"
          >
            RIJKSMUSEUM COLLECTION
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-montreal text-f-18 uppercase tracking-wider text-dark/60 text-center"
          >
            Classic masonry layout • Click to view details
          </motion.p>
        </div>

        {/* Masonry Grid Container */}
        <div className="masonry-container px-[0.7vw]">
          <div
            ref={masonryGridRef}
            className="masonry-grid"
          >
            {/* Sizer element for Masonry */}
            <div className="masonry-sizer"></div>

            {artworks.map((artwork) => {
              return (
                <div
                  key={`masonry-${artwork.id}`}
                  className="masonry-item"
                >
                  <div
                    className="masonry-content group cursor-pointer bg-dark border-2 border-dark overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-red"
                    onClick={() => handleImageClick(artwork)}
                  >
                    {!imagesLoaded.has(artwork.id) && (
                      <div className="aspect-[4/5] bg-cream/20 animate-pulse" />
                    )}
                    <div className="relative overflow-hidden">
                      <img
                        src={artwork.webImage.url}
                        alt={artwork.title}
                        className="w-full h-auto transition-transform duration-500 group-hover:scale-[1.05]"
                        style={{
                          opacity: imagesLoaded.has(artwork.id) ? 1 : 0,
                          transition: 'opacity 0.3s ease-out',
                        }}
                        loading="lazy"
                      />
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Artwork info card */}
                    <div className="p-4 bg-cream border-t-2 border-dark group-hover:bg-dark group-hover:border-red transition-all duration-300">
                      <h3 className="font-title text-sm uppercase tracking-wider text-dark mb-1 line-clamp-1 group-hover:text-cream transition-colors duration-300">
                        {artwork.title}
                      </h3>
                      <p className="font-montreal text-xs font-medium text-dark/80 mb-0.5 group-hover:text-cream/90 transition-colors duration-300">
                        {artwork.artist}
                      </p>
                      <p className="font-montreal text-xs font-semibold text-red group-hover:text-red transition-colors duration-300">
                        {artwork.dating}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* CHARTS & GRAPHS SECTION */}
      <ChartsSection />

      {/* MUURI ARTWORKS SECTION */}
      <ArtworksMuuriSection
        artworks={artworks.slice(0, 25)}
        onArtworkClick={handleImageClick}
        imagesLoaded={imagesLoaded}
      />

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedArtwork && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-dark/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setSelectedArtwork(null)}
          >
            <motion.div
              initial={{ scale: 0.9 }}
              animate={{ scale: 1 }}
              exit={{ scale: 0.9 }}
              className="relative max-w-7xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex flex-col md:flex-row gap-6 max-h-[90vh] overflow-auto bg-cream/10 backdrop-blur-sm rounded-lg p-6">
                <div className="flex-1 flex items-center justify-center">
                  <img
                    src={selectedArtwork.webImage.url}
                    alt={selectedArtwork.title}
                    className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
                  />
                </div>
                
                {/* Artwork details panel */}
                <div className="md:w-96 flex flex-col justify-center">
                  <div className="bg-cream/20 backdrop-blur-sm rounded-lg p-6">
                    <div className="mb-4">
                      <span className="inline-block bg-red text-cream text-xs font-copy font-semibold px-3 py-1 rounded-full uppercase tracking-wider mb-3">
                        Rijksmuseum Collection
                      </span>
                    </div>
                    
                    <h2 className="font-title text-f-54 text-cream mb-3">
                      {selectedArtwork.title}
                    </h2>
                    
                    <div className="space-y-3 mb-6">
                      <div>
                        <p className="font-copy text-xs text-cream/60 uppercase tracking-wider mb-1">Artist</p>
                        <p className="font-copy text-lg text-cream font-semibold">
                          {selectedArtwork.artist}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-copy text-xs text-cream/60 uppercase tracking-wider mb-1">Year</p>
                        <p className="font-copy text-lg font-semibold text-red">
                          {selectedArtwork.dating}
                        </p>
                      </div>
                      
                      <div>
                        <p className="font-copy text-xs text-cream/60 uppercase tracking-wider mb-1">Object Number</p>
                        <p className="font-copy text-sm text-cream/80 font-mono">
                          {selectedArtwork.objectNumber}
                        </p>
                      </div>
                    </div>
                    
                    <a
                      href={`https://www.rijksmuseum.nl/en/collection/${selectedArtwork.objectNumber}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-block btn-outline text-sm"
                      onClick={(e) => e.stopPropagation()}
                    >
                      View on Rijksmuseum →
                    </a>
                  </div>
                </div>
              </div>
              
              <button
                onClick={() => setSelectedArtwork(null)}
                className="absolute top-4 right-4 text-cream hover:text-red transition-colors duration-300"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Gallery;
