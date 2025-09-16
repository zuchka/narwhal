import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Shuffle, Filter } from 'lucide-react';

export interface FilterOptions {
  type?: string;
  century?: string;
  material?: string;
  technique?: string;
  topPieces?: boolean;
  colors?: string[];
}

interface FilterControlsProps {
  filters: FilterOptions;
  activeFilters?: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onApply: () => void;
  onClear: () => void;
  loading?: boolean;
}

const objectTypes = [
  { value: 'all', label: 'All Types' },
  { value: 'painting', label: 'Paintings' },
  { value: 'print', label: 'Prints' },
  { value: 'drawing', label: 'Drawings' },
  { value: 'sculpture', label: 'Sculptures' },
  { value: 'photograph', label: 'Photographs' },
  { value: 'furniture', label: 'Furniture' },
  { value: 'jewellery', label: 'Jewelry' },
  { value: 'miniature', label: 'Miniatures' },
];

const centuries = [
  { value: 'all', label: 'All Periods' },
  { value: '15', label: '15th Century' },
  { value: '16', label: '16th Century' },
  { value: '17', label: '17th Century (Golden Age)' },
  { value: '18', label: '18th Century' },
  { value: '19', label: '19th Century' },
  { value: '20', label: '20th Century' },
  { value: '21', label: '21st Century' },
];

const materials = [
  { value: 'all', label: 'All Materials' },
  { value: 'paper', label: 'Paper' },
  { value: 'canvas', label: 'Canvas' },
  { value: 'copper', label: 'Copper' },
  { value: 'silver', label: 'Silver' },
  { value: 'gold', label: 'Gold' },
  { value: 'bronze', label: 'Bronze' },
  { value: 'marble', label: 'Marble' },
  { value: 'wood', label: 'Wood' },
  { value: 'ivory', label: 'Ivory' },
  { value: 'glass', label: 'Glass' },
  { value: 'porcelain', label: 'Porcelain' },
];

const techniques = [
  { value: 'all', label: 'All Techniques' },
  { value: 'etching', label: 'Etching' },
  { value: 'engraving', label: 'Engraving' },
  { value: 'woodcut', label: 'Woodcut' },
  { value: 'lithograph', label: 'Lithography' },
  { value: 'mezzotint', label: 'Mezzotint' },
  { value: 'drypoint', label: 'Drypoint' },
  { value: 'aquatint', label: 'Aquatint' },
];

const colorPalette = [
  { value: '#000000', label: 'Black', hex: '#000000' },
  { value: '#FFFFFF', label: 'White', hex: '#FFFFFF' },
  { value: '#FF0000', label: 'Red', hex: '#d93535' },
  { value: '#0000FF', label: 'Blue', hex: '#2563eb' },
  { value: '#FFFF00', label: 'Yellow', hex: '#facc15' },
  { value: '#008000', label: 'Green', hex: '#16a34a' },
  { value: '#FFA500', label: 'Orange', hex: '#ea580c' },
  { value: '#800080', label: 'Purple', hex: '#9333ea' },
  { value: '#964B00', label: 'Brown', hex: '#92400e' },
  { value: '#808080', label: 'Gray', hex: '#6b7280' },
];

export const FilterControls: React.FC<FilterControlsProps> = ({
  filters,
  activeFilters = {},
  onFiltersChange,
  onApply,
  onClear,
  loading = false,
}) => {
  const handleFilterChange = (key: keyof FilterOptions, value: any) => {
    // Convert 'all' to undefined for clearing the filter
    const actualValue = value === 'all' ? undefined : value;
    onFiltersChange({ ...filters, [key]: actualValue });
  };

  const handleColorToggle = (color: string) => {
    const currentColors = filters.colors || [];
    const newColors = currentColors.includes(color)
      ? currentColors.filter(c => c !== color)
      : [...currentColors, color];
    handleFilterChange('colors', newColors.length > 0 ? newColors : undefined);
  };

  const clearAllFilters = () => {
    onClear();
  };

  // Check if there are pending changes
  const hasPendingChanges = JSON.stringify(filters) !== JSON.stringify(activeFilters);

  // Check if there are active filters (already applied)
  const hasActiveFilters = Object.keys(activeFilters).some(key => {
    const value = activeFilters[key as keyof FilterOptions];
    if (key === 'topPieces') return value === true;
    if (key === 'colors') return Array.isArray(value) && value.length > 0;
    return value && value !== '' && value !== 'all';
  });

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className={`bg-dark border-2 ${hasPendingChanges ? 'border-cream shadow-lg shadow-cream/20' : 'border-cream'} rounded-lg p-6 mb-8 transition-all duration-300`}
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Filter className="w-5 h-5 text-cream" />
          <h3 className="font-title text-f-32 text-cream uppercase">
            Customize Collection
          </h3>
          {hasActiveFilters && (
            <Badge
              variant="secondary"
              className="bg-red text-cream border-red"
            >
              Filters Active
            </Badge>
          )}
          {hasPendingChanges && (
            <Badge
              variant="secondary"
              className="bg-cream/20 text-cream border-cream"
            >
              Unsaved Changes
            </Badge>
          )}
        </div>
        <div className="flex gap-3">
          {(hasActiveFilters || hasPendingChanges) && (
            <Button
              onClick={clearAllFilters}
              variant="outline"
              size="sm"
              className="border-cream text-cream hover:bg-cream hover:text-dark"
            >
              Clear All
            </Button>
          )}
          <Button
            onClick={onApply}
            disabled={loading}
            className={`${hasPendingChanges ? 'bg-cream text-dark hover:bg-cream/80 border-2 border-cream' : 'bg-red text-cream hover:bg-red/80 border-2 border-red'}`}
          >
            <Shuffle className="w-4 h-4 mr-2" />
            {loading ? 'Loading...' : hasPendingChanges ? 'Apply & Shuffle' : 'Shuffle Collection'}
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {/* Object Type */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Object Type
          </Label>
          <Select
            value={filters.type || 'all'}
            onValueChange={(value) => handleFilterChange('type', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue placeholder="All Types" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {objectTypes.map(type => (
                <SelectItem 
                  key={type.value} 
                  value={type.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Century */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Period
          </Label>
          <Select
            value={filters.century || 'all'}
            onValueChange={(value) => handleFilterChange('century', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue placeholder="All Periods" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {centuries.map(century => (
                <SelectItem 
                  key={century.value} 
                  value={century.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {century.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Material */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Material
          </Label>
          <Select
            value={filters.material || 'all'}
            onValueChange={(value) => handleFilterChange('material', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue placeholder="All Materials" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {materials.map(material => (
                <SelectItem 
                  key={material.value} 
                  value={material.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {material.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Technique */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Technique
          </Label>
          <Select
            value={filters.technique || 'all'}
            onValueChange={(value) => handleFilterChange('technique', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue placeholder="All Techniques" />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {techniques.map(technique => (
                <SelectItem 
                  key={technique.value} 
                  value={technique.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {technique.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Color Palette & Top Pieces */}
      <div className="flex flex-col lg:flex-row gap-6">
        <div className="flex-1">
          <Label className="text-cream/80 text-xs uppercase tracking-wider mb-3 block">
            Color Palette
          </Label>
          <div className="flex flex-wrap gap-2">
            {colorPalette.map(color => (
              <button
                key={color.value}
                onClick={() => handleColorToggle(color.value)}
                className={`
                  w-10 h-10 rounded-full border-2 transition-all duration-200
                  ${filters.colors?.includes(color.value) 
                    ? 'border-cream scale-110 shadow-lg' 
                    : 'border-cream/30 hover:border-cream/60'}
                `}
                style={{ backgroundColor: color.hex }}
                title={color.label}
              />
            ))}
          </div>
        </div>

        <div className="flex items-center space-x-3 lg:ml-8">
          <Switch
            id="top-pieces"
            checked={filters.topPieces || false}
            onCheckedChange={(checked) => handleFilterChange('topPieces', checked || undefined)}
            className="data-[state=checked]:bg-red"
          />
          <Label 
            htmlFor="top-pieces" 
            className="text-cream cursor-pointer font-montreal text-sm uppercase tracking-wider"
          >
            Masterpieces Only
          </Label>
        </div>
      </div>
    </motion.div>
  );
};
