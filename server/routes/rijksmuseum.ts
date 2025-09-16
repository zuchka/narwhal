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

    // Fetch different pages to get diverse collection
    const pages = [0, 1, 2, 3, 4, 5];
    const allArtworks: any[] = [];

    // Fetch multiple pages in parallel
    const promises = pages.map(async (page) => {
      try {
        const params = new URLSearchParams({
          key: apiKey,
          format: 'json',
          ps: '20', // 20 items per page
          p: page.toString(), // page number
          imgonly: 'true',
        });

        // Add dedicated filter parameters
        if (type && typeof type === 'string' && type !== 'all') {
          params.append('type', type);
        }

        if (century && typeof century === 'string' && century !== 'all') {
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
          // Rijksmuseum API uses f.normalized32Colors.hex for color filtering
          colorList.forEach(color => {
            params.append('f.normalized32Colors.hex', color.replace('#', '%23'));
          });
        }

        const url = `https://www.rijksmuseum.nl/api/en/collection?${params}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          return data.artObjects || [];
        }
      } catch (err) {
        console.warn(`Failed to fetch page ${page}:`, err);
      }
      return [];
    });

    // Wait for all requests to complete
    const results = await Promise.all(promises);
    results.forEach(artworks => {
      allArtworks.push(...artworks);
    });

    // Check if any filters are active
    const hasFilters = (type && type !== 'all') ||
                      (century && century !== 'all') ||
                      (material && material !== 'all') ||
                      (technique && technique !== 'all') ||
                      topPieces === 'true' ||
                      colorList.length > 0;

    // If filters returned few results, try a broader search
    if (allArtworks.length < 20 && hasFilters) {
      console.log(`Only found ${allArtworks.length} items with filters, trying broader search...`);

      // Try with just type or material (remove other filters)
      try {
        const broadParams = new URLSearchParams({
          key: apiKey,
          format: 'json',
          ps: '30',
          imgonly: 'true',
        });

        // Only add type OR material, not both
        if (type && typeof type === 'string' && type !== 'all') {
          broadParams.append('type', type);
        } else if (material && typeof material === 'string' && material !== 'all') {
          broadParams.append('material', material);
        }

        const url = `https://www.rijksmuseum.nl/api/en/collection?${broadParams}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          if (data.artObjects) {
            allArtworks.push(...data.artObjects);
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch broader search:`, err);
      }
    }

    // If still not enough results, fetch some general items
    if (allArtworks.length < 20) {
      console.log(`Still only ${allArtworks.length} items, fetching general collection...`);

      try {
        const params = new URLSearchParams({
          key: apiKey,
          format: 'json',
          ps: '50',
          imgonly: 'true',
          toppieces: 'true',
        });

        const url = `https://www.rijksmuseum.nl/api/en/collection?${params}`;
        const response = await fetch(url);

        if (response.ok) {
          const data = await response.json();
          if (data.artObjects) {
            allArtworks.push(...data.artObjects);
          }
        }
      } catch (err) {
        console.warn(`Failed to fetch general collection:`, err);
      }
    }

    // Only add special searches if no specific filters are set
    if (!hasFilters) {
      const specialSearches = [
        { type: 'print' },
        { type: 'sculpture' },
        { type: 'ceramic' },
        { material: 'silver' },
        { material: 'glass' },
      ];

      // Fetch special categories (limited to avoid rate limiting)
      for (let i = 0; i < 2 && i < specialSearches.length; i++) {
        try {
          const params = new URLSearchParams({
            key: apiKey,
            format: 'json',
            ps: '10',
            imgonly: 'true',
          });

          // Add the special search parameter
          const searchItem = specialSearches[i];
          if (searchItem.type) {
            params.append('type', searchItem.type);
          } else if (searchItem.material) {
            params.append('material', searchItem.material);
          }

          const url = `https://www.rijksmuseum.nl/api/en/collection?${params}`;
          const response = await fetch(url);

          if (response.ok) {
            const data = await response.json();
            if (data.artObjects) {
              allArtworks.push(...data.artObjects);
            }
          }
        } catch (err) {
          console.warn(`Failed to fetch special search:`, err);
        }
      }
    }

    // Remove duplicates and process artworks
    const uniqueArtworks = new Map();
    allArtworks.forEach(obj => {
      if (obj.webImage && obj.webImage.url && !uniqueArtworks.has(obj.objectNumber)) {
        uniqueArtworks.set(obj.objectNumber, obj);
      }
    });

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
    console.log(`Fetched ${processedArtworks.length} unique artworks${filterInfo}`);

    // Log warning if very few results
    if (processedArtworks.length < 10 && hasFilters) {
      console.warn(`Limited results with filters. Consider broadening search criteria.`);
    }

    res.json({
      success: true,
      artworks: processedArtworks,
    });
  } catch (error) {
    console.error('Error fetching from Rijksmuseum:', error);
    
    // Return fallback data if API fails
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
          id: 'SK-A-2344',
          objectNumber: 'SK-A-2344',
          title: 'The Threatened Swan',
          artist: 'Jan Asselijn',
          dating: '1650',
          webImage: {
            url: 'https://lh3.googleusercontent.com/PkLCLkqHhCT17OUcpyPpO0l9xk_FEwQLOTMgg7go7VtLO7nF51L8mA4Qvwm5f7cSH-15mlG4PlBqKY-qLD7Mzg=s0',
            width: 1919,
            height: 1558,
          },
          aspectRatio: 1.23,
          principalMaker: 'Jan Asselijn',
        },
        {
          id: 'SK-C-251',
          objectNumber: 'SK-C-251',
          title: 'Winter Landscape with Ice Skaters',
          artist: 'Hendrick Avercamp',
          dating: '1608',
          webImage: {
            url: 'https://lh3.googleusercontent.com/vn0FqDRPmQhZQDFhrqLs7XqGOh6lG5jHorKXyLhMG7V_JxKFDx-SV1KYryFkN8uP9S6Te0aLkdqX_kttRYYPmgvrVQ=s0',
            width: 1919,
            height: 768,
          },
          aspectRatio: 2.5,
          principalMaker: 'Hendrick Avercamp',
        },
        {
          id: 'SK-A-4',
          objectNumber: 'SK-A-4',
          title: 'The Jewish Bride',
          artist: 'Rembrandt van Rijn',
          dating: '1665',
          webImage: {
            url: 'https://lh3.googleusercontent.com/mAyAjvYjIeAIlByhJx1Huctgeb58y7519XYP38oL1FXarhVlcXW7kxuwayOCFdnwtOp6B6F0HJmmws-Ceo5b_pNSSQs=s0',
            width: 2031,
            height: 1676,
          },
          aspectRatio: 1.21,
          principalMaker: 'Rembrandt van Rijn',
        },
        {
          id: 'SK-A-2983',
          objectNumber: 'SK-A-2983',
          title: 'Still Life with Flowers in a Glass Vase',
          artist: 'Jan Davidsz. de Heem',
          dating: '1670',
          webImage: {
            url: 'https://lh3.googleusercontent.com/UWchAqKZxpYFw2cDdCRQdPNq5hTQ-jOJJDUgVCZKx8Tk1_xUHtzc_uH3kq4HU8B6IGzsoZ9_D97DBZc88PbN_w=s0',
            width: 1558,
            height: 1919,
          },
          aspectRatio: 0.81,
          principalMaker: 'Jan Davidsz. de Heem',
        },
        {
          id: 'SK-A-3981',
          objectNumber: 'SK-A-3981',
          title: 'Girl with a Pearl Earring',
          artist: 'Johannes Vermeer',
          dating: '1665',
          webImage: {
            url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/0/0f/1665_Girl_with_a_Pearl_Earring.jpg/800px-1665_Girl_with_a_Pearl_Earring.jpg',
            width: 800,
            height: 921,
          },
          aspectRatio: 0.87,
          principalMaker: 'Johannes Vermeer',
        },
        {
          id: 'SK-A-180',
          objectNumber: 'SK-A-180',
          title: 'The Merry Drinker',
          artist: 'Frans Hals',
          dating: '1628',
          webImage: {
            url: 'https://lh3.googleusercontent.com/d4d6Rk8BvnLKA8QYxy7foaWSDccj8OpGUedDEvZ7xpgw7TK7iGVh5JsFH8NhHjLH5-VtnhCOWx8PZg6paBJg0g=s0',
            width: 1676,
            height: 2031,
          },
          aspectRatio: 0.83,
          principalMaker: 'Frans Hals',
        },
        {
          id: 'SK-A-1935',
          objectNumber: 'SK-A-1935',
          title: 'The Little Street',
          artist: 'Johannes Vermeer',
          dating: '1658',
          webImage: {
            url: 'https://lh3.googleusercontent.com/5J7UcqW5ceQlziR2f_0_Ly-xJpBttqJ6m1lrDiY3FIdYjqoG56XJFGCfKAQwBDBtVhWJGCSQuktJBxNPyJfwOQ=s0',
            width: 1558,
            height: 1404,
          },
          aspectRatio: 1.11,
          principalMaker: 'Johannes Vermeer',
        },
        {
          id: 'SK-C-216',
          objectNumber: 'SK-C-216',
          title: 'The Sampling Officials',
          artist: 'Rembrandt van Rijn',
          dating: '1662',
          webImage: {
            url: 'https://lh3.googleusercontent.com/gShVRyvLLbwVB8jeIPghCXgr96wxTHaM4zqfmxIWRsUpMhMn38PwuUU13o1mXQzLMt5HFqX761u8Tgo4L_JG1XLATvw=s0',
            width: 2096,
            height: 1638,
          },
          aspectRatio: 1.28,
          principalMaker: 'Rembrandt van Rijn',
        },
      ],
    });
  }
};
