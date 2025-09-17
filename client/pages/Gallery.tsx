import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry from 'masonry-layout';
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
  const [allArtworks, setAllArtworks] = useState<Artwork[]>([]); // All fetched artworks
  const [displayedArtworks, setDisplayedArtworks] = useState<Artwork[]>([]); // Currently displayed artworks
  const [selectedArtwork, setSelectedArtwork] = useState<Artwork | null>(null);
  const [imagesLoaded, setImagesLoaded] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allImagesLoaded, setAllImagesLoaded] = useState(false);
  const [currentChunk, setCurrentChunk] = useState(0);
  const [filters, setFilters] = useState<FilterOptions>({});
  const [activeFilters, setActiveFilters] = useState<FilterOptions>({});
  const [masonrySettings] = useState({
    columns: '4',
    gutter: 10,
    transitionDuration: 300,
    itemStyle: 'bordered',
    hoverEffect: 'scale',
    borderRadius: 8,
    showCaptions: true,
    showBorders: true,
    animateLayout: true,
    colorScheme: 'dark',
  });
  const [isShuffling, setIsShuffling] = useState(false);
  const masonryGridRef = useRef<HTMLDivElement>(null);
  const masonryRef = useRef<Masonry | null>(null);
  const loadMoreTriggerRef = useRef<HTMLDivElement>(null);

  // Performance settings
  const CHUNK_SIZE = 15; // Load 15 items per chunk
  const INITIAL_CHUNKS = 1; // Load 1 chunk initially

  // Fetch artworks from local API endpoint with filters
  const fetchArtworks = async (appliedFilters: FilterOptions = {}) => {
    try {
      setLoading(true);
      setError(null);

      // Build query params from filters
      const params = new URLSearchParams();
      if (appliedFilters.type) params.append('type', appliedFilters.type);
      if (appliedFilters.century) params.append('century', appliedFilters.century);
      if (appliedFilters.material) params.append('material', appliedFilters.material);
      if (appliedFilters.technique) params.append('technique', appliedFilters.technique);
      if (appliedFilters.topPieces) params.append('topPieces', 'true');
      if (appliedFilters.colors && appliedFilters.colors.length > 0) {
        params.append('colors', appliedFilters.colors.join(','));
      }

      const response = await fetch(`/api/rijksmuseum?${params.toString()}`);
      if (!response.ok) {
        throw new Error('Failed to fetch artworks');
      }

      const data = await response.json();

      if (data.success && data.artworks && data.artworks.length > 0) {
        setAllArtworks(data.artworks);
        // Load initial chunk immediately
        const initialChunk = data.artworks.slice(0, CHUNK_SIZE * INITIAL_CHUNKS);
        setDisplayedArtworks(initialChunk);
        setCurrentChunk(INITIAL_CHUNKS - 1);
        setError(null);
        console.log(`🎯 Initial load: ${initialChunk.length} artworks, ${data.artworks.length - initialChunk.length} remaining`);
      } else if (!data.success && data.artworks && data.artworks.length > 0) {
        // Use fallback data if API failed but we have backup
        console.warn('Using fallback artworks data');
        setAllArtworks(data.artworks);
        const initialChunk = data.artworks.slice(0, CHUNK_SIZE * INITIAL_CHUNKS);
        setDisplayedArtworks(initialChunk);
        setCurrentChunk(INITIAL_CHUNKS - 1);
        setError(null);
      } else {
        throw new Error('Failed to load artworks');
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching artworks:', err);
      setError('Failed to load artworks. Please try again later.');
      setLoading(false);
    }
  };

  // Apply filters and fetch new artworks
  const applyFilters = () => {
    setActiveFilters(filters);
    fetchArtworks(filters);
  };

  // Clear all filters
  const clearFilters = () => {
    setFilters({});
    setActiveFilters({});
    fetchArtworks({});
  };

  // Load more artworks (next chunk)
  const loadMoreArtworks = () => {
    if (loadingMore || currentChunk * CHUNK_SIZE >= allArtworks.length - CHUNK_SIZE) {
      return; // Already loading or no more items
    }

    setLoadingMore(true);

    setTimeout(() => {
      const nextChunk = currentChunk + 1;
      const startIndex = nextChunk * CHUNK_SIZE;
      const endIndex = Math.min(startIndex + CHUNK_SIZE, allArtworks.length);
      const newItems = allArtworks.slice(startIndex, endIndex);

      if (newItems.length > 0) {
        setDisplayedArtworks(prev => [...prev, ...newItems]);
        setCurrentChunk(nextChunk);
        console.log(`📦 Loaded chunk ${nextChunk}: ${newItems.length} more artworks (${endIndex}/${allArtworks.length} total)`);
      }

      setLoadingMore(false);
    }, 100); // Small delay to prevent rapid firing
  };

  useEffect(() => {
    fetchArtworks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);


  // Get column width based on settings
  const getColumnWidth = () => {
    // Always use sizer for auto, item selector for fixed columns
    return masonrySettings.columns === 'auto' ? '.masonry-sizer' : '.masonry-item';
  };

  // Setup intersection observer for infinite scroll
  useEffect(() => {
    if (!loadMoreTriggerRef.current || allArtworks.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingMore) {
          loadMoreArtworks();
        }
      },
      {
        threshold: 0.1,
        rootMargin: '200px', // Start loading 200px before trigger is visible
      }
    );

    observer.observe(loadMoreTriggerRef.current);

    return () => {
      observer.disconnect();
    };
  }, [allArtworks.length, loadingMore, currentChunk]);

  // Initialize Masonry.js with visual settings
  useLayoutEffect(() => {
    if (!masonryGridRef.current || displayedArtworks.length === 0) return;

    const initializeMasonry = () => {
      if (!masonryGridRef.current) return;

      try {
        // Initialize Masonry with dynamic settings
        masonryRef.current = new Masonry(masonryGridRef.current, {
          itemSelector: '.masonry-item',
          columnWidth: getColumnWidth(),
          percentPosition: false,
          gutter: masonrySettings.gutter,
          transitionDuration: masonrySettings.animateLayout ? `${masonrySettings.transitionDuration}ms` : 0,
          initLayout: true,
          horizontalOrder: true,
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
  }, [displayedArtworks, masonrySettings]);

  // Update masonry layout when new items are added
  useLayoutEffect(() => {
    if (masonryRef.current && displayedArtworks.length > 0) {
      setTimeout(() => {
        if (masonryRef.current) {
          masonryRef.current.reloadItems();
          masonryRef.current.layout();
          console.log('🔄 Masonry layout updated for', displayedArtworks.length, 'items');
        }
      }, 50);
    }
  }, [displayedArtworks.length]);

  // Preload images and track when all are loaded
  useEffect(() => {
    if (displayedArtworks.length === 0) return;

    setAllImagesLoaded(false);
    const loadedImages = new Set<string>();

    const loadPromises = displayedArtworks.map((artwork) => {
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
  }, [displayedArtworks]);

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

  if (loading) {
    return (
      <div className="min-h-screen bg-cream pt-[100px] pb-20">
        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-dark mb-4"></div>
            <p className="font-copy text-f-24 text-dark/60">Loading artworks from Rijksmuseum...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || (displayedArtworks.length === 0 && !loading)) {
    return (
      <div className="min-h-screen bg-cream pt-[100px] pb-20">
        <div className="px-[0.7vw] mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="font-montreal text-f-20 uppercase tracking-wider text-dark/70 text-center max-w-3xl mx-auto"
          >
            Explore 100+ Random Masterpieces from the Rijksmuseum
          </motion.p>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <p className="font-copy text-f-24 text-dark/60 mb-6">
              {error || 'No artworks found'}
            </p>
            <button
              onClick={() => window.location.reload()}
              className="btn-outline-dark"
            >
              Reload Page
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
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-montreal text-f-20 uppercase tracking-wider text-dark/70 text-center max-w-3xl mx-auto"
        >
          Explore 100+ Random Masterpieces from the Rijksmuseum
        </motion.p>
      </div>

      {/* Rijksmuseum Filter Controls */}
      <div className="px-[0.7vw] mb-8">
        <FilterControls
          filters={filters}
          activeFilters={activeFilters}
          onFiltersChange={setFilters}
          onApply={applyFilters}
          onClear={clearFilters}
          loading={loading}
        />
      </div>

      {/* MASONRY.JS SECTION */}
      <div className="mb-20">
        <div className="px-[0.7vw] mb-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="font-montreal text-f-18 uppercase tracking-wider text-dark/60 text-center"
          >
            Classic masonry layout • Click to view details
          </motion.p>
        </div>

        {/* Masonry Grid Container - Full width matching navigation */}
        <div className="masonry-container" style={{
          paddingLeft: '0.7vw',
          paddingRight: '0.7vw',
          width: '100%',
        }}>
          <div
            ref={masonryGridRef}
            className="masonry-grid"
          >
            {/* Sizer element for Masonry */}
            {masonrySettings.columns === 'auto' && <div className="masonry-sizer"></div>}

            {displayedArtworks.map((artwork) => {
              return (
                <div
                  key={`masonry-${artwork.id}`}
                  className="masonry-item"
                  style={{
                    width: masonrySettings.columns !== 'auto'
                      ? `calc((100% - ${masonrySettings.gutter * (parseInt(masonrySettings.columns) - 1)}px) / ${parseInt(masonrySettings.columns)})`
                      : undefined,
                    marginBottom: `${masonrySettings.gutter}px`,
                  }}
                >
                  <div
                    className={`
                      masonry-content group cursor-pointer overflow-hidden transition-all
                      ${masonrySettings.itemStyle === 'minimal' ? '' : ''}
                      ${masonrySettings.itemStyle === 'bordered' && masonrySettings.showBorders ? 'border-2' : ''}
                      ${masonrySettings.itemStyle === 'shadow' ? 'shadow-lg' : ''}
                      ${masonrySettings.itemStyle === 'glass' ? 'backdrop-blur-sm bg-white/10' : ''}
                      ${masonrySettings.colorScheme === 'cream' ? 'bg-cream border-cream' : ''}
                      ${masonrySettings.colorScheme === 'dark' ? 'bg-dark border-dark' : ''}
                      ${masonrySettings.colorScheme === 'red' ? 'bg-red border-red' : ''}
                      ${masonrySettings.colorScheme === 'gradient' ? 'bg-gradient-to-br from-dark to-red border-dark' : ''}
                      ${masonrySettings.hoverEffect === 'scale' ? 'hover:scale-[1.02]' : ''}
                      ${masonrySettings.hoverEffect === 'glow' ? 'hover:shadow-2xl hover:shadow-red/30' : ''}
                      ${masonrySettings.hoverEffect === 'lift' ? 'hover:-translate-y-1 hover:shadow-xl' : ''}
                      ${masonrySettings.itemStyle === 'bordered' && masonrySettings.showBorders ? 'hover:border-red' : ''}
                    `}
                    style={{
                      borderRadius: `${masonrySettings.borderRadius}px`,
                      transitionDuration: `${masonrySettings.transitionDuration}ms`,
                    }}
                    onClick={() => handleImageClick(artwork)}
                  >
                    {!imagesLoaded.has(artwork.id) && (
                      <div className="aspect-[4/5] bg-cream/20 animate-pulse" />
                    )}
                    <div className="relative overflow-hidden">
                      <img
                        src={artwork.webImage.url}
                        alt={artwork.title}
                        className={`
                          w-full h-auto
                          ${masonrySettings.hoverEffect === 'scale' ? 'transition-transform group-hover:scale-[1.05]' : ''}
                        `}
                        style={{
                          opacity: imagesLoaded.has(artwork.id) ? 1 : 0,
                          transition: `opacity 0.3s ease-out${masonrySettings.hoverEffect === 'scale' ? ', transform ' + masonrySettings.transitionDuration + 'ms' : ''}`,
                          borderRadius: masonrySettings.showCaptions ? `${masonrySettings.borderRadius}px ${masonrySettings.borderRadius}px 0 0` : `${masonrySettings.borderRadius}px`,
                        }}
                        loading="lazy"
                      />
                      {/* Overlay gradient on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-dark/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                    </div>

                    {/* Artwork info card */}
                    {masonrySettings.showCaptions && (
                      <div
                        className={`
                          p-4 transition-all
                          ${masonrySettings.showBorders ? 'border-t-2' : ''}
                          ${masonrySettings.colorScheme === 'cream' ? 'bg-dark text-cream border-dark group-hover:bg-cream group-hover:text-dark group-hover:border-cream' : ''}
                          ${masonrySettings.colorScheme === 'dark' ? 'bg-dark text-cream border-dark group-hover:bg-cream group-hover:text-dark group-hover:border-cream' : ''}
                          ${masonrySettings.colorScheme === 'red' ? 'bg-cream text-dark border-red group-hover:bg-red group-hover:text-cream' : ''}
                          ${masonrySettings.colorScheme === 'gradient' ? 'bg-gradient-to-r from-cream to-cream/80 text-dark border-dark group-hover:from-dark group-hover:to-red group-hover:text-cream' : ''}
                        `}
                        style={{
                          transitionDuration: `${masonrySettings.transitionDuration}ms`,
                          borderBottomLeftRadius: `${masonrySettings.borderRadius}px`,
                          borderBottomRightRadius: `${masonrySettings.borderRadius}px`,
                        }}
                      >
                        <h3 className="font-title text-sm uppercase tracking-wider mb-1 line-clamp-1 transition-colors">
                          {artwork.title}
                        </h3>
                        <p className="font-montreal text-xs font-medium opacity-80 mb-0.5 transition-colors">
                          {artwork.artist}
                        </p>
                        <p className="font-montreal text-xs font-semibold text-red transition-colors">
                          {artwork.dating}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Load more trigger */}
            {currentChunk * CHUNK_SIZE < allArtworks.length - CHUNK_SIZE && (
              <div
                ref={loadMoreTriggerRef}
                className="col-span-full flex justify-center py-8"
              >
                {loadingMore ? (
                  <div className="flex items-center gap-3 text-dark/70">
                    <div className="w-6 h-6 border-2 border-dark/30 border-t-dark rounded-full animate-spin"></div>
                    <span className="font-montreal text-sm uppercase tracking-wider">Loading more artworks...</span>
                  </div>
                ) : (
                  <div className="text-dark/50 font-montreal text-sm uppercase tracking-wider">
                    Scroll for more artworks ({displayedArtworks.length} of {allArtworks.length})
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>


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
