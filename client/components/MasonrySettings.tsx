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
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Label } from '@/components/ui/label';
import { Settings, RotateCcw, Sparkles } from 'lucide-react';

export interface MasonryVisualSettings {
  columns: string;
  gutter: number;
  transitionDuration: number;
  itemStyle: 'minimal' | 'bordered' | 'shadow' | 'glass';
  hoverEffect: 'none' | 'scale' | 'glow' | 'lift';
  borderRadius: number;
  showCaptions: boolean;
  showBorders: boolean;
  animateLayout: boolean;
  colorScheme: 'cream' | 'dark' | 'red' | 'gradient';
}

interface MasonrySettingsProps {
  settings: MasonryVisualSettings;
  onSettingsChange: (settings: MasonryVisualSettings) => void;
  onReset: () => void;
  onShuffle: () => void;
}

const columnOptions = [
  { value: 'auto', label: 'Auto (Responsive)' },
  { value: '2', label: '2 Columns' },
  { value: '3', label: '3 Columns' },
  { value: '4', label: '4 Columns' },
  { value: '5', label: '5 Columns' },
  { value: '6', label: '6 Columns' },
  { value: '7', label: '7 Columns' },
  { value: '8', label: '8 Columns' },
];

const itemStyles = [
  { value: 'minimal', label: 'Minimal' },
  { value: 'bordered', label: 'Bordered' },
  { value: 'shadow', label: 'Shadow' },
  { value: 'glass', label: 'Glass' },
];

const hoverEffects = [
  { value: 'none', label: 'None' },
  { value: 'scale', label: 'Scale' },
  { value: 'glow', label: 'Glow' },
  { value: 'lift', label: 'Lift' },
];

const colorSchemes = [
  { value: 'cream', label: 'Cream' },
  { value: 'dark', label: 'Dark' },
  { value: 'red', label: 'Red Accent' },
  { value: 'gradient', label: 'Gradient' },
];

export const MasonrySettings: React.FC<MasonrySettingsProps> = ({
  settings,
  onSettingsChange,
  onReset,
  onShuffle,
}) => {
  const handleSettingChange = (key: keyof MasonryVisualSettings, value: any) => {
    onSettingsChange({ ...settings, [key]: value });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="bg-dark border-2 border-cream rounded-lg p-6 mb-8 transition-all duration-300 hover:shadow-lg hover:shadow-cream/10"
    >
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Settings className="w-5 h-5 text-cream" />
          <h3 className="font-title text-f-32 text-cream uppercase">
            Masonry Visual Settings
          </h3>
        </div>
        <div className="flex gap-3">
          <Button
            onClick={onReset}
            variant="outline"
            size="sm"
            className="border-dark text-dark hover:bg-dark hover:text-cream"
          >
            <RotateCcw className="w-4 h-4 mr-2" />
            Reset
          </Button>
          <Button
            onClick={onShuffle}
            className="bg-red text-cream hover:bg-red/80 border-2 border-red"
          >
            <Sparkles className="w-4 h-4 mr-2" />
            Shuffle Items
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Column Layout */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Column Layout
          </Label>
          <Select
            value={settings.columns}
            onValueChange={(value) => handleSettingChange('columns', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {columnOptions.map(option => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Item Style */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Item Style
          </Label>
          <Select
            value={settings.itemStyle}
            onValueChange={(value) => handleSettingChange('itemStyle', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {itemStyles.map(style => (
                <SelectItem 
                  key={style.value} 
                  value={style.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {style.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Hover Effect */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Hover Effect
          </Label>
          <Select
            value={settings.hoverEffect}
            onValueChange={(value) => handleSettingChange('hoverEffect', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {hoverEffects.map(effect => (
                <SelectItem 
                  key={effect.value} 
                  value={effect.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {effect.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Color Scheme */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider">
            Color Scheme
          </Label>
          <Select
            value={settings.colorScheme}
            onValueChange={(value) => handleSettingChange('colorScheme', value)}
          >
            <SelectTrigger className="bg-cream/10 border-cream/30 text-cream">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-dark border-cream">
              {colorSchemes.map(scheme => (
                <SelectItem 
                  key={scheme.value} 
                  value={scheme.value}
                  className="text-cream hover:bg-cream/20"
                >
                  {scheme.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
        {/* Gutter Size */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider flex justify-between">
            <span>Gutter Size</span>
            <span className="font-mono">{settings.gutter}px</span>
          </Label>
          <Slider
            value={[settings.gutter]}
            onValueChange={(value) => handleSettingChange('gutter', value[0])}
            min={0}
            max={80}
            step={2}
            className="[&_[role=slider]]:bg-cream [&_[role=slider]]:border-cream [&_[role=slider]]:hover:bg-cream/80"
          />
        </div>

        {/* Border Radius */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider flex justify-between">
            <span>Border Radius</span>
            <span className="font-mono">{settings.borderRadius}px</span>
          </Label>
          <Slider
            value={[settings.borderRadius]}
            onValueChange={(value) => handleSettingChange('borderRadius', value[0])}
            min={0}
            max={32}
            step={1}
            className="[&_[role=slider]]:bg-cream [&_[role=slider]]:border-cream [&_[role=slider]]:hover:bg-cream/80"
          />
        </div>

        {/* Animation Speed */}
        <div className="space-y-2">
          <Label className="text-cream/80 text-xs uppercase tracking-wider flex justify-between">
            <span>Animation Speed</span>
            <span className="font-mono">{settings.transitionDuration}ms</span>
          </Label>
          <Slider
            value={[settings.transitionDuration]}
            onValueChange={(value) => handleSettingChange('transitionDuration', value[0])}
            min={0}
            max={2000}
            step={10}
            className="[&_[role=slider]]:bg-cream [&_[role=slider]]:border-cream [&_[role=slider]]:hover:bg-cream/80"
          />
        </div>
      </div>

      <div className="flex flex-wrap gap-6 mt-6 pt-6 border-t border-cream/20">
        {/* Toggle Options */}
        <div className="flex items-center space-x-3">
          <Switch
            id="show-captions"
            checked={settings.showCaptions}
            onCheckedChange={(checked) => handleSettingChange('showCaptions', checked)}
            className="data-[state=checked]:bg-red"
          />
          <Label
            htmlFor="show-captions"
            className="text-cream cursor-pointer font-montreal text-sm uppercase tracking-wider"
          >
            Show Captions
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            id="show-borders"
            checked={settings.showBorders}
            onCheckedChange={(checked) => handleSettingChange('showBorders', checked)}
            className="data-[state=checked]:bg-red"
          />
          <Label
            htmlFor="show-borders"
            className="text-cream cursor-pointer font-montreal text-sm uppercase tracking-wider"
          >
            Show Borders
          </Label>
        </div>

        <div className="flex items-center space-x-3">
          <Switch
            id="animate-layout"
            checked={settings.animateLayout}
            onCheckedChange={(checked) => handleSettingChange('animateLayout', checked)}
            className="data-[state=checked]:bg-red"
          />
          <Label
            htmlFor="animate-layout"
            className="text-cream cursor-pointer font-montreal text-sm uppercase tracking-wider"
          >
            Animate Layout Changes
          </Label>
        </div>
      </div>
    </motion.div>
  );
};
