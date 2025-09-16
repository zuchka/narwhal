import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Muuri from 'muuri';
import { cn } from '@/lib/utils';

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

interface ArtworksMuuriSectionProps {
  artworks: Artwork[];
  onArtworkClick: (artwork: Artwork) => void;
  imagesLoaded: Set<string>;
}

const ArtworksMuuriSection: React.FC<ArtworksMuuriSectionProps> = ({
  artworks,
  onArtworkClick,
  imagesLoaded
}) => {
  const [isDragging, setIsDragging] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const muuriRef = useRef<Muuri | null>(null);
  const draggedItemRef = useRef<string | null>(null);

  // Initialize Muuri
  useLayoutEffect(() => {
    if (!gridRef.current || muuriRef.current || artworks.length === 0) return;

    const initializeMuuri = () => {
      if (!gridRef.current) return;

      try {
        // Create Muuri instance for artworks
        muuriRef.current = new Muuri(gridRef.current, {
          items: '.muuri-artwork-item',
          dragEnabled: true,
          dragHandle: '.muuri-artwork-content',
          dragStartPredicate: {
            distance: 5,
            delay: 100,
          },
          dragSort: true,
          dragSortHeuristics: {
            sortInterval: 100,
            minDragDistance: 10,
          },
          layout: {
            fillGaps: true,
            horizontal: false,
            alignRight: false,
            alignBottom: false,
            rounding: true,
          },
          layoutOnResize: true,
          layoutDuration: 400,
          layoutEasing: 'ease',
          showDuration: 200,
          showEasing: 'ease',
          hideDuration: 200,
          hideEasing: 'ease',
        });

        // Add drag event listeners
        muuriRef.current.on('dragStart', (item: any) => {
          setIsDragging(true);
          // Store the ID of the dragged item
          const element = item.getElement();
          draggedItemRef.current = element.getAttribute('data-id');
          document.body.style.cursor = 'grabbing';
          document.body.style.userSelect = 'none';
        });

        muuriRef.current.on('dragEnd', () => {
          setIsDragging(false);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';

          // Clear the dragged item after a short delay to prevent click
          setTimeout(() => {
            draggedItemRef.current = null;
          }, 100);
        });

        // Initial layout
        muuriRef.current.refreshItems().layout();
        setGridReady(true);

        // Force a second layout after images render
        setTimeout(() => {
          if (muuriRef.current) {
            muuriRef.current.refreshItems().layout();
          }
        }, 500);
      } catch (error) {
        console.error('Failed to initialize Muuri for artworks:', error);
      }
    };

    // Delay initialization to ensure DOM is ready
    const timer = setTimeout(initializeMuuri, 200);

    return () => {
      clearTimeout(timer);
      if (muuriRef.current) {
        try {
          muuriRef.current.destroy();
        } catch (error) {
          console.error('Error destroying Muuri:', error);
        }
        muuriRef.current = null;
      }
    };
  }, [artworks]);

  // Refresh layout when images load
  useEffect(() => {
    if (muuriRef.current && imagesLoaded.size > 0) {
      muuriRef.current.refreshItems().layout();
    }
  }, [imagesLoaded]);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (muuriRef.current) {
        muuriRef.current.refreshItems().layout();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Shuffle function
  const handleShuffle = () => {
    if (muuriRef.current) {
      const items = muuriRef.current.getItems();
      const shuffledItems = [...items].sort(() => Math.random() - 0.5);
      muuriRef.current.sort(shuffledItems);
    }
  };

  // Calculate responsive dimensions
  const getItemDimensions = (aspectRatio: number) => {
    const viewportWidth = window.innerWidth;
    let baseWidth = 280;
    let columns = 4;

    // Responsive column layout
    if (viewportWidth < 640) {
      columns = 2;
      baseWidth = Math.floor((viewportWidth - 30) / columns);
    } else if (viewportWidth < 768) {
      columns = 3;
      baseWidth = Math.floor((viewportWidth - 40) / columns);
    } else if (viewportWidth < 1024) {
      columns = 4;
      baseWidth = Math.floor((viewportWidth - 50) / columns);
    } else if (viewportWidth < 1536) {
      columns = 5;
      baseWidth = Math.floor((viewportWidth - 60) / columns);
    } else {
      columns = 6;
      baseWidth = Math.max(250, Math.floor((viewportWidth - 70) / columns));
    }

    // Calculate height based on aspect ratio
    const height = Math.round(baseWidth / (aspectRatio || 0.8));

    return { width: baseWidth, height };
  };

  return (
    <div className="mb-20">
      <div className="px-[0.7vw] mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="font-title text-f-80 text-dark text-center mb-6"
        >
          MUURI COLLECTION
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="font-montreal text-f-18 uppercase tracking-wider text-dark/60 text-center mb-6"
        >
          Draggable grid layout • 25 artworks + shuffle control
        </motion.p>
      </div>

      {/* Muuri Grid Container */}
      <div className="px-[0.7vw] max-w-[1920px] mx-auto">
        <div 
          ref={gridRef} 
          className="muuri-artworks-grid"
          style={{ 
            position: 'relative',
            minHeight: '400px',
          }}
        >
          {(() => {
            // Create array with artworks and shuffle button
            const items: Array<{ type: 'artwork' | 'shuffle', data?: Artwork }> = artworks.map(artwork => ({
              type: 'artwork' as const,
              data: artwork
            }));

            // Add shuffle button at random position
            const shuffleButton = { type: 'shuffle' as const };
            const randomPosition = Math.floor(Math.random() * (items.length + 1));
            items.splice(randomPosition, 0, shuffleButton);

            return items.map((item, index) => {
              if (item.type === 'shuffle') {
                // Render shuffle button tile
                const { width, height } = getItemDimensions(1);
                return (
                  <div
                    key="muuri-shuffle-button"
                    className="muuri-artwork-item"
                    data-id="shuffle-button"
                    style={{
                      display: 'block',
                      position: 'absolute',
                      width: `${width}px`,
                      height: `${height}px`,
                      padding: '0.35vw',
                      opacity: gridReady ? 1 : 0,
                      transition: 'opacity 0.3s ease',
                    }}
                  >
                    <div className="muuri-artwork-content h-full">
                      <div
                        className="group bg-red border-2 border-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:bg-dark h-full flex items-center justify-center cursor-pointer"
                        onClick={handleShuffle}
                      >
                        <div className="text-center p-4">
                          <svg className="w-12 h-12 mx-auto mb-3 text-cream group-hover:animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                          </svg>
                          <h3 className="font-title text-lg uppercase tracking-wider text-cream">
                            Shuffle
                          </h3>
                          <p className="font-montreal text-xs text-cream/90 mt-1">
                            Rearrange Collection
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              }

              // Render artwork tile
              const artwork = item.data!;
              const { width, height } = getItemDimensions(artwork.aspectRatio);

              return (
                <div
                  key={`muuri-${artwork.id}`}
                  className="muuri-artwork-item"
                  data-id={artwork.id}
                style={{
                  display: 'block',
                  position: 'absolute',
                  width: `${width}px`,
                  height: `${height}px`,
                  padding: '0.35vw',
                  opacity: gridReady ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="muuri-artwork-content h-full">
                  <div
                    className={cn(
                      "group cursor-pointer bg-dark border-2 border-dark rounded-lg overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-red h-full",
                      isDragging && "cursor-grabbing"
                    )}
                    style={{
                      cursor: isDragging ? 'grabbing' : 'grab',
                    }}
                    onClick={(e) => {
                      // Prevent click if this item was just dragged
                      if (isDragging || draggedItemRef.current === artwork.id) {
                        e.preventDefault();
                        e.stopPropagation();
                        return;
                      }
                      onArtworkClick(artwork);
                    }}
                  >
                    {/* Image Container */}
                    <div className="relative h-full overflow-hidden">
                      {!imagesLoaded.has(artwork.id) && (
                        <div className="absolute inset-0 bg-cream/20 animate-pulse" />
                      )}
                      <img
                        src={artwork.webImage.url}
                        alt={artwork.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
                        style={{
                          opacity: imagesLoaded.has(artwork.id) ? 1 : 0,
                          transition: 'opacity 0.3s ease-out',
                        }}
                        loading="lazy"
                        draggable={false}
                      />
                      
                      {/* Overlay with info on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="absolute bottom-0 left-0 right-0 p-3">
                          <h3 className="font-title text-sm uppercase tracking-wider text-cream mb-1 line-clamp-2">
                            {artwork.title}
                          </h3>
                          <p className="font-montreal text-xs font-medium text-cream/90 mb-0.5 line-clamp-1">
                            {artwork.artist}
                          </p>
                          <p className="font-montreal text-xs font-semibold text-red">
                            {artwork.dating}
                          </p>
                        </div>
                      </div>

                      {/* Drag Indicator */}
                      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                        <svg className="w-5 h-5 text-cream drop-shadow-lg" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M9 3H11V5H9V3M13 3H15V5H13V3M9 7H11V9H9V7M13 7H15V9H13V7M9 11H11V13H9V11M13 11H15V13H13V11M9 15H11V17H9V15M13 15H15V17H13V15M9 19H11V21H9V19M13 19H15V21H13V19Z"/>
                        </svg>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              );
            });
          })()}
        </div>
      </div>
    </div>
  );
};

export default ArtworksMuuriSection;
