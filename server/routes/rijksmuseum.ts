import { RequestHandler } from 'express';

export const handleRijksmuseum: RequestHandler = async (req, res) => {
  try {
    // Rijksmuseum API key (demo key for basic access)
    const apiKey = '0fiuZFh4';

    // Extract filter parameters from query
    const {
      type,
      century,
      material,
      technique,
      topPieces,
      colors
    } = req.query;

    // Parse colors if provided
    const colorList = colors ? (typeof colors === 'string' ? colors.split(',') : []) : [];

    // Build base parameters
    const baseParams = {
      key: apiKey,
      format: 'json',
      ps: '100', // Use maximum page size of 100 items per page
      imgonly: 'true',
    };

    // Build filter parameters function
    const buildFilterParams = (page: number = 0) => {
      const params = new URLSearchParams({
        ...baseParams,
        p: page.toString(),
      });

      // Add specific filter parameters using correct API parameter names
      if (type && typeof type === 'string' && type !== 'all') {
        params.append('type', type);
      }

      if (century && typeof century === 'string' && century !== 'all') {
        // Use the correct parameter name for century filtering
        params.append('f.dating.period', century);
      }

      if (material && typeof material === 'string' && material !== 'all') {
        params.append('material', material);
      }

      if (technique && typeof technique === 'string' && technique !== 'all') {
        params.append('technique', technique);
      }

      // Add top pieces filter
      if (topPieces === 'true') {
        params.append('toppieces', 'true');
      }

      // Add color filters if provided
      if (colorList.length > 0) {
        colorList.forEach(color => {
          params.append('f.normalized32Colors.hex', color.replace('#', '%23'));
        });
      }

      return params;
    };

    // Determine how many pages to fetch based on filters
    const hasSpecificFilters = (type && type !== 'all') ||
                              (material && material !== 'all') ||
                              (technique && technique !== 'all') ||
                              (century && century !== 'all') ||
                              topPieces === 'true' ||
                              colorList.length > 0;

    const allArtworks: any[] = [];
    let totalAvailable = 0;

    // Try smart random offset approach first, but with fallback
    let randomOffsetWorked = false;
    
    if (!hasSpecificFilters) {
      // For no filters, try a conservative random offset (early pages are more likely to have content)
      try {
        const maxSafePage = 100; // Only try pages 0-100 where content is more likely
        const randomPage = Math.floor(Math.random() * maxSafePage);
        const pagesToTry = [randomPage, randomPage + 1];
        
        console.log(`Trying conservative random offset: pages ${pagesToTry.join(', ')}`);

        const promises = pagesToTry.map(async (page) => {
          try {
            const params = buildFilterParams(page);
            const url = `https://www.rijksmuseum.nl/api/en/collection?${params}`;
            const response = await fetch(url);

            if (response.ok) {
              const data = await response.json();
              console.log(`Page ${page}: Found ${data.count} total, returned ${data.artObjects?.length || 0} objects`);
              
              if (data.count > totalAvailable) {
                totalAvailable = data.count;
              }
              
              return {
                page,
                artObjects: data.artObjects || [],
                totalCount: data.count || 0
              };
            }
          } catch (err) {
            console.warn(`Failed to fetch page ${page}:`, err);
          }
          return { page, artObjects: [], totalCount: 0 };
        });

        const results = await Promise.all(promises);
        results.forEach(result => {
          if (result.artObjects.length > 0) {
            allArtworks.push(...result.artObjects);
            randomOffsetWorked = true;
          }
        });

        if (randomOffsetWorked && allArtworks.length > 0) {
          console.log(`✅ Random offset worked: fetched ${allArtworks.length} items`);
        }
      } catch (err) {
        console.warn('Random offset approach failed:', err);
      }
    }

    // Fallback to sequential pages if random offset didn't work or we have filters
    if (!randomOffsetWorked || allArtworks.length < 20) {
      console.log(`${randomOffsetWorked ? 'Random offset returned few results' : 'Using sequential pages'}, fetching from start...`);
      
      // Use sequential pages starting from 0 for reliable results
      const pagesToFetch = hasSpecificFilters ? [0, 1, 2] : [0, 1, 2, 3, 4];

      const fetchPromises = pagesToFetch.map(async (page) => {
        try {
          const params = buildFilterParams(page);
          const url = `https://www.rijksmuseum.nl/api/en/collection?${params}`;
          
          console.log(`Fetching sequential page ${page} with URL: ${url}`);
          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            
            console.log(`Sequential page ${page}: Found ${data.count} total items, returned ${data.artObjects?.length || 0} objects`);
            
            if (data.count > totalAvailable) {
              totalAvailable = data.count;
            }
            
            return {
              page,
              artObjects: data.artObjects || [],
              totalCount: data.count || 0
            };
          } else {
            console.warn(`Failed to fetch page ${page}: ${response.status} ${response.statusText}`);
            return { page, artObjects: [], totalCount: 0 };
          }
        } catch (err) {
          console.warn(`Failed to fetch page ${page}:`, err);
          return { page, artObjects: [], totalCount: 0 };
        }
      });

      // Wait for all sequential requests to complete
      const results = await Promise.all(fetchPromises);
      
      // Clear previous results if we're doing fallback
      if (!randomOffsetWorked) {
        allArtworks.length = 0;
      }
      
      results.forEach(result => {
        allArtworks.push(...result.artObjects);
      });

      console.log(`Sequential fetch results: fetched ${allArtworks.length} items total`);
    }

    // If still no results, return fallback data
    if (allArtworks.length === 0) {
      console.warn('No artworks found, returning fallback data');
      
      return res.json({
        success: false,
        artworks: [
          {
            id: 'SK-C-5',
            objectNumber: 'SK-C-5',
            title: 'The Night Watch',
            artist: 'Rembrandt van Rijn',
            dating: '1642',
            webImage: {
              url: 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB8UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0',
              width: 2500,
              height: 2034,
            },
            aspectRatio: 1.23,
            principalMaker: 'Rembrandt van Rijn',
            materials: [],
            techniques: [],
            objectTypes: [],
          },
          {
            id: 'SK-A-1718',
            objectNumber: 'SK-A-1718',
            title: 'The Milkmaid',
            artist: 'Johannes Vermeer',
            dating: '1658',
            webImage: {
              url: 'https://lh3.googleusercontent.com/cRtF3WdYfRQEraAcQz8dWDJOq3XsRX-h244rOw3r7bHFmKen6C5Pn7u8LDXJPootdqK4ZMruYYYbZDSNmROLmVxvTQ=s0',
              width: 2031,
              height: 2308,
            },
            aspectRatio: 0.88,
            principalMaker: 'Johannes Vermeer',
            materials: [],
            techniques: [],
            objectTypes: [],
          },
          {
            id: 'BK-1975-81',
            objectNumber: 'BK-1975-81',
            title: 'Cupboard',
            artist: 'Herman Doomer',
            dating: '1635',
            webImage: {
              url: 'https://lh3.googleusercontent.com/ZYQ7IcfJ45yQOPnmhzBkZK2mc2F_e7bUMDgKaY-miSl0f8y3o-Q--H3R81q-2q1cfqFqoDlDgyLDW3OHJqin_ugnB_KRIfZaV-9xX2Y=s0',
              width: 5958,
              height: 6805,
            },
            aspectRatio: 0.88,
            principalMaker: 'Herman Doomer',
            materials: ['wood'],
            techniques: ['woodworking'],
            objectTypes: ['furniture'],
          },
        ],
        error: 'API returned no results'
      });
    }

    // Remove duplicates using object number
    const uniqueArtworks = new Map();
    let duplicatesRemoved = 0;

    console.log(`Processing ${allArtworks.length} total artworks for deduplication...`);

    allArtworks.forEach(obj => {
      // Skip if no image or already seen this object number
      if (!obj.webImage || !obj.webImage.url || uniqueArtworks.has(obj.objectNumber)) {
        duplicatesRemoved++;
        return;
      }

      uniqueArtworks.set(obj.objectNumber, obj);
    });

    console.log(`Removed ${duplicatesRemoved} duplicates, keeping ${uniqueArtworks.size} unique artworks`);

    // Process and shuffle the artworks for variety
    const processedArtworks = Array.from(uniqueArtworks.values())
      .map((obj: any) => ({
        id: obj.objectNumber,
        objectNumber: obj.objectNumber,
        title: obj.title || 'Untitled',
        artist: obj.principalOrFirstMaker || 'Unknown Artist',
        dating: obj.longTitle?.match(/\d{4}/)?.[0] ||
                obj.dating?.presentingDate ||
                'Date unknown',
        webImage: {
          url: obj.webImage.url.replace('http://', 'https://'),
          width: obj.webImage.width,
          height: obj.webImage.height,
        },
        aspectRatio: obj.webImage.width / obj.webImage.height,
        principalMaker: obj.principalOrFirstMaker,
        materials: obj.materials || [],
        techniques: obj.techniques || [],
        objectTypes: obj.objectTypes || [],
      }))
      .sort(() => Math.random() - 0.5); // Shuffle for variety

    // Build filter info for logging
    const activeFilters: string[] = [];
    if (type && type !== 'all') activeFilters.push(`type:${type}`);
    if (century && century !== 'all') activeFilters.push(`century:${century}`);
    if (material && material !== 'all') activeFilters.push(`material:${material}`);
    if (technique && technique !== 'all') activeFilters.push(`technique:${technique}`);
    if (topPieces === 'true') activeFilters.push('topPieces');
    if (colorList.length > 0) activeFilters.push(`colors:${colorList.join(',')}`);

    const filterInfo = activeFilters.length > 0
      ? ` with filters: ${activeFilters.join(', ')}`
      : ' (no filters)';
    
    console.log(`✅ Success: ${processedArtworks.length} unique artworks${filterInfo}`);
    console.log(`📊 Collection stats: ${totalAvailable} total available`);

    // Return success response
    res.json({
      success: true,
      artworks: processedArtworks,
      metadata: {
        totalFetched: processedArtworks.length,
        totalAvailable: totalAvailable,
        duplicatesRemoved: duplicatesRemoved,
        filters: activeFilters,
        strategy: randomOffsetWorked ? 'random_offset' : 'sequential'
      }
    });

  } catch (error) {
    console.error('Error fetching from Rijksmuseum:', error);
    
    // Return fallback data if API fails completely
    res.json({
      success: false,
      error: 'Failed to fetch from Rijksmuseum API',
      artworks: [
        {
          id: 'SK-C-5',
          objectNumber: 'SK-C-5',
          title: 'The Night Watch',
          artist: 'Rembrandt van Rijn',
          dating: '1642',
          webImage: {
            url: 'https://lh3.googleusercontent.com/SsEIJWka3_cYRXXSE8VD3XNOgtOxoZhqW1uB8UFj78eg8gq3G4jAqL4Z_5KwA12aD7Leqp27F653aBkYkRBkEQyeKxfaZPyDx0O8CzWg=s0',
            width: 2500,
            height: 2034,
          },
          aspectRatio: 1.23,
          principalMaker: 'Rembrandt van Rijn',
        },
        {
          id: 'SK-A-1718',
          objectNumber: 'SK-A-1718',
          title: 'The Milkmaid',
          artist: 'Johannes Vermeer',
          dating: '1658',
          webImage: {
            url: 'https://lh3.googleusercontent.com/cRtF3WdYfRQEraAcQz8dWDJOq3XsRX-h244rOw3r7bHFmKen6C5Pn7u8LDXJPootdqK4ZMruYYYbZDSNmROLmVxvTQ=s0',
            width: 2031,
            height: 2308,
          },
          aspectRatio: 0.88,
          principalMaker: 'Johannes Vermeer',
        },
        {
          id: 'BK-1975-81',
          objectNumber: 'BK-1975-81',
          title: 'Cupboard',
          artist: 'Herman Doomer',
          dating: '1635',
          webImage: {
            url: 'https://lh3.googleusercontent.com/ZYQ7IcfJ45yQOPnmhzBkZK2mc2F_e7bUMDgKaY-miSl0f8y3o-Q--H3R81q-2q1cfqFqoDlDgyLDW3OHJqin_ugnB_KRIfZaV-9xX2Y=s0',
            width: 5958,
            height: 6805,
          },
          aspectRatio: 0.88,
          principalMaker: 'Herman Doomer',
        },
      ],
    });
  }
};
