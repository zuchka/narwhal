import React, { useRef, useLayoutEffect, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Muuri from 'muuri';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  PieChart,
  Pie,
  RadarChart,
  Radar,
  RadialBarChart,
  RadialBar,
  ScatterChart,
  Scatter,
  ComposedChart,
  XAxis,
  YAxis,
  CartesianGrid,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Cell,
  ResponsiveContainer,
} from 'recharts';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from '@/components/ui/chart';
import { cn } from '@/lib/utils';

// Brand colors
const brandColors = {
  dark: '#282d35',
  cream: '#f0ecd9',
  red: '#d93535',
  darkMuted: '#4a525f',
  creamMuted: '#e6e2d0',
  redMuted: '#e66b6b',
};

// Sample data for different charts
const lineData = [
  { month: 'Jan', revenue: 4000, profit: 2400, expenses: 2400 },
  { month: 'Feb', revenue: 3000, profit: 1398, expenses: 2210 },
  { month: 'Mar', revenue: 2000, profit: 9800, expenses: 2290 },
  { month: 'Apr', revenue: 2780, profit: 3908, expenses: 2000 },
  { month: 'May', revenue: 1890, profit: 4800, expenses: 2181 },
  { month: 'Jun', revenue: 2390, profit: 3800, expenses: 2500 },
];

const barData = [
  { category: 'Design', value: 85, target: 100 },
  { category: 'Development', value: 92, target: 100 },
  { category: 'Marketing', value: 78, target: 100 },
  { category: 'Sales', value: 65, target: 100 },
  { category: 'Support', value: 88, target: 100 },
];

const pieData = [
  { name: 'Desktop', value: 45, fill: brandColors.dark },
  { name: 'Mobile', value: 30, fill: brandColors.red },
  { name: 'Tablet', value: 15, fill: brandColors.darkMuted },
  { name: 'Other', value: 10, fill: brandColors.redMuted },
];

const radarData = [
  { skill: 'UI/UX', A: 120, B: 110, fullMark: 150 },
  { skill: 'Frontend', A: 98, B: 130, fullMark: 150 },
  { skill: 'Backend', A: 86, B: 130, fullMark: 150 },
  { skill: 'Database', A: 99, B: 100, fullMark: 150 },
  { skill: 'DevOps', A: 85, B: 90, fullMark: 150 },
  { skill: 'Testing', A: 65, B: 85, fullMark: 150 },
];

const scatterData = [
  { x: 100, y: 200, z: 200 },
  { x: 120, y: 100, z: 260 },
  { x: 170, y: 300, z: 400 },
  { x: 140, y: 250, z: 280 },
  { x: 150, y: 400, z: 500 },
  { x: 110, y: 280, z: 200 },
  { x: 180, y: 350, z: 350 },
  { x: 160, y: 180, z: 300 },
];

const radialData = [
  { name: 'Q1', value: 85, fill: brandColors.red },
  { name: 'Q2', value: 70, fill: brandColors.redMuted },
  { name: 'Q3', value: 78, fill: brandColors.cream },
  { name: 'Q4', value: 45, fill: brandColors.creamMuted },
];

const areaData = [
  { time: '00:00', users: 30, sessions: 50 },
  { time: '04:00', users: 20, sessions: 30 },
  { time: '08:00', users: 80, sessions: 120 },
  { time: '12:00', users: 100, sessions: 180 },
  { time: '16:00', users: 85, sessions: 150 },
  { time: '20:00', users: 70, sessions: 110 },
  { time: '23:59', users: 40, sessions: 60 },
];

// Chart configurations with height variants
const chartConfigs = [
  {
    id: 'line-chart',
    title: 'REVENUE TRENDS',
    height: 'tall',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <ChartContainer
        config={{
          revenue: { label: 'Revenue', color: brandColors.dark },
          profit: { label: 'Profit', color: brandColors.red },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <LineChart data={lineData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.darkMuted} opacity={0.2} />
          <XAxis dataKey="month" stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <YAxis stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Line type="monotone" dataKey="revenue" stroke={brandColors.dark} strokeWidth={3} dot={{ fill: brandColors.dark, r: 6 }} />
          <Line type="monotone" dataKey="profit" stroke={brandColors.red} strokeWidth={3} dot={{ fill: brandColors.red, r: 6 }} />
        </LineChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'pie-chart',
    title: 'TRAFFIC SOURCES',
    height: 'medium',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <ChartContainer
        config={{
          desktop: { label: 'Desktop', color: brandColors.cream },
          mobile: { label: 'Mobile', color: brandColors.red },
          tablet: { label: 'Tablet', color: brandColors.creamMuted },
          other: { label: 'Other', color: brandColors.redMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie data={pieData} cx="50%" cy="50%" innerRadius={25} outerRadius={50} paddingAngle={5} dataKey="value">
            {pieData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </Pie>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'bar-chart',
    title: 'PERFORMANCE',
    height: 'medium',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <ChartContainer
        config={{
          value: { label: 'Actual', color: brandColors.red },
          target: { label: 'Target', color: brandColors.darkMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} layout="horizontal" margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.darkMuted} opacity={0.2} />
          <XAxis type="number" stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <YAxis type="category" dataKey="category" stroke={brandColors.dark} tick={{ fontSize: 10 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="value" fill={brandColors.red} radius={[0, 4, 4, 0]} />
          <Bar dataKey="target" fill={brandColors.creamMuted} radius={[0, 4, 4, 0]} />
        </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'area-chart',
    title: 'DAILY ACTIVITY',
    height: 'tall',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <ChartContainer
        config={{
          users: { label: 'Users', color: brandColors.cream },
          sessions: { label: 'Sessions', color: brandColors.red },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={areaData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
          <defs>
            <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColors.cream} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={brandColors.cream} stopOpacity={0.1}/>
            </linearGradient>
            <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={brandColors.red} stopOpacity={0.8}/>
              <stop offset="95%" stopColor={brandColors.red} stopOpacity={0.1}/>
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.creamMuted} opacity={0.2} />
          <XAxis dataKey="time" stroke={brandColors.cream} tick={{ fontSize: 11 }} />
          <YAxis stroke={brandColors.cream} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Area type="monotone" dataKey="users" stroke={brandColors.cream} fillOpacity={1} fill="url(#colorUsers)" />
          <Area type="monotone" dataKey="sessions" stroke={brandColors.red} fillOpacity={1} fill="url(#colorSessions)" />
        </AreaChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'radar-chart',
    title: 'SKILLS MATRIX',
    height: 'short',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <ChartContainer
        config={{
          A: { label: 'Team A', color: brandColors.dark },
          B: { label: 'Team B', color: brandColors.red },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <RadarChart data={radarData} margin={{ top: 10, right: 10, bottom: 10, left: 10 }}>
          <PolarGrid stroke={brandColors.darkMuted} />
          <PolarAngleAxis dataKey="skill" stroke={brandColors.dark} tick={{ fontSize: 10 }} />
          <PolarRadiusAxis stroke={brandColors.dark} tick={{ fontSize: 10 }} />
          <Radar name="Team A" dataKey="A" stroke={brandColors.dark} fill={brandColors.dark} fillOpacity={0.3} />
          <Radar name="Team B" dataKey="B" stroke={brandColors.red} fill={brandColors.red} fillOpacity={0.3} />
          <ChartLegend content={<ChartLegendContent />} />
        </RadarChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'radial-bar-chart',
    title: 'QUARTERLY GOALS',
    height: 'tall',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <ChartContainer
        config={{
          Q1: { label: 'Q1', color: brandColors.red },
          Q2: { label: 'Q2', color: brandColors.redMuted },
          Q3: { label: 'Q3', color: brandColors.cream },
          Q4: { label: 'Q4', color: brandColors.creamMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <RadialBarChart
          cx="50%"
          cy="50%"
          innerRadius="25%"
          outerRadius="70%"
          data={radialData}
          margin={{ top: 5, right: 5, bottom: 35, left: 5 }}
          startAngle={90}
          endAngle={-270}
        >
          <PolarGrid stroke={brandColors.creamMuted} opacity={0.2} />
          <PolarAngleAxis
            type="number"
            domain={[0, 100]}
            tick={{ fontSize: 11, fill: brandColors.cream }}
            tickCount={5}
          />
          <PolarRadiusAxis
            tick={false}
            axisLine={false}
          />
          <RadialBar
            dataKey="value"
            cornerRadius={2}
            label={{
              position: 'insideStart',
              fill: brandColors.cream,
              fontSize: 10,
              fontWeight: 'bold'
            }}
          >
            {radialData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.fill} />
            ))}
          </RadialBar>
          <ChartTooltip
            content={<ChartTooltipContent />}
            labelFormatter={(label) => `Quarter ${label}`}
          />
          <ChartLegend content={<ChartLegendContent />} />
        </RadialBarChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'scatter-chart',
    title: 'CORRELATIONS',
    height: 'short',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <ChartContainer
        config={{
          data: { label: 'Data Points', color: brandColors.red },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <ScatterChart margin={{ top: 10, right: 15, bottom: 10, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.darkMuted} opacity={0.2} />
          <XAxis type="number" dataKey="x" name="X" stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <YAxis type="number" dataKey="y" name="Y" stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Scatter name="Data" data={scatterData} fill={brandColors.red} />
        </ScatterChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'composed-chart',
    title: 'COMPREHENSIVE METRICS',
    height: 'extra-tall',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <ChartContainer
        config={{
          revenue: { label: 'Revenue', color: brandColors.cream },
          profit: { label: 'Profit', color: brandColors.red },
          expenses: { label: 'Expenses', color: brandColors.creamMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={lineData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.creamMuted} opacity={0.2} />
          <XAxis dataKey="month" stroke={brandColors.cream} tick={{ fontSize: 11 }} />
          <YAxis stroke={brandColors.cream} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="expenses" fill={brandColors.creamMuted} />
          <Line type="monotone" dataKey="revenue" stroke={brandColors.cream} strokeWidth={3} />
          <Area type="monotone" dataKey="profit" fill={brandColors.red} fillOpacity={0.3} stroke={brandColors.red} />
        </ComposedChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'stacked-bar',
    title: 'STACK ANALYSIS',
    height: 'medium',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <ChartContainer
        config={{
          revenue: { label: 'Revenue', color: brandColors.dark },
          profit: { label: 'Profit', color: brandColors.red },
          expenses: { label: 'Expenses', color: brandColors.darkMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <BarChart data={lineData} margin={{ top: 5, right: 15, bottom: 5, left: 15 }}>
          <CartesianGrid strokeDasharray="3 3" stroke={brandColors.darkMuted} opacity={0.2} />
          <XAxis dataKey="month" stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <YAxis stroke={brandColors.dark} tick={{ fontSize: 11 }} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="revenue" stackId="a" fill={brandColors.dark} />
          <Bar dataKey="profit" stackId="a" fill={brandColors.red} />
          <Bar dataKey="expenses" stackId="a" fill={brandColors.creamMuted} />
        </BarChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'donut-chart',
    title: 'COMPLETION RATE',
    height: 'medium',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <ChartContainer
        config={{
          completed: { label: 'Completed', color: brandColors.red },
          remaining: { label: 'Remaining', color: brandColors.darkMuted },
        }}
        className="h-full"
      >
        <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, bottom: 0, left: 0 }}>
          <Pie
            data={[
              { name: 'Completed', value: 75, fill: brandColors.red },
              { name: 'Remaining', value: 25, fill: brandColors.creamMuted },
            ]}
            cx="50%"
            cy="50%"
            innerRadius={35}
            outerRadius={50}
            startAngle={90}
            endAngle={450}
            dataKey="value"
          >
            <Cell fill={brandColors.red} />
            <Cell fill={brandColors.creamMuted} />
          </Pie>
          <text x="50%" y="50%" textAnchor="middle" dominantBaseline="middle" className="text-xl font-bold fill-cream">
            75%
          </text>
          <ChartTooltip content={<ChartTooltipContent />} />
        </PieChart>
        </ResponsiveContainer>
      </ChartContainer>
    ),
  },
  {
    id: 'sparklines',
    title: 'QUICK STATS',
    height: 'short',
    bgColor: 'cream',
    borderColor: 'dark',
    component: (
      <div className="space-y-2 h-full flex flex-col justify-between">
        <div>
          <p className="text-xs text-dark/60 mb-1">Revenue Trend</p>
          <ChartContainer
            config={{
              value: { label: 'Value', color: brandColors.red },
            }}
            className="h-8"
          >
            <ResponsiveContainer width="100%" height="100%">
            <LineChart data={lineData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <Line type="monotone" dataKey="revenue" stroke={brandColors.red} strokeWidth={2} dot={false} />
            </LineChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div>
          <p className="text-xs text-dark/60 mb-1">Profit Margin</p>
          <ChartContainer
            config={{
              value: { label: 'Value', color: brandColors.dark },
            }}
            className="h-8"
          >
            <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={lineData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <Area type="monotone" dataKey="profit" stroke={brandColors.dark} fill={brandColors.dark} fillOpacity={0.2} />
            </AreaChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
        <div>
          <p className="text-xs text-dark/60 mb-1">Expense Control</p>
          <ChartContainer
            config={{
              value: { label: 'Value', color: brandColors.redMuted },
            }}
            className="h-8"
          >
            <ResponsiveContainer width="100%" height="100%">
            <BarChart data={lineData} margin={{ top: 2, right: 2, bottom: 2, left: 2 }}>
              <Bar dataKey="expenses" fill={brandColors.redMuted} />
            </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
        </div>
      </div>
    ),
  },
  {
    id: 'progress-bars',
    title: 'PROJECT PROGRESS',
    height: 'tall',
    bgColor: 'dark',
    borderColor: 'cream',
    component: (
      <div className="space-y-3 h-full flex flex-col justify-between">
        {['Design Phase', 'Development', 'Testing', 'Deployment'].map((phase, index) => {
          const progress = [85, 65, 45, 25][index];
          return (
            <div key={phase}>
              <div className="flex justify-between mb-1">
                <span className="text-cream font-copy text-sm">{phase}</span>
                <span className="text-cream font-copy text-sm">{progress}%</span>
              </div>
              <div className="w-full bg-dark border border-cream rounded-full h-2">
                <div 
                  className="h-full rounded-full transition-all duration-500"
                  style={{ 
                    width: `${progress}%`,
                    background: index % 2 === 0 ? brandColors.red : brandColors.cream,
                  }}
                />
              </div>
            </div>
          );
        })}
      </div>
    ),
  },
];

const ChartsSection: React.FC = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [gridReady, setGridReady] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const muuriRef = useRef<Muuri | null>(null);

  // Calculate item dimensions - uniform width, varying heights
  const getItemDimensions = (heightType: string) => {
    const viewportWidth = window.innerWidth;
    let baseWidth = 340;
    let columns = 3;

    // Responsive column layout with maximum 3 columns
    if (viewportWidth < 640) {
      columns = 1;
      baseWidth = viewportWidth - 40;
    } else if (viewportWidth < 768) {
      columns = 2;
      baseWidth = Math.floor((viewportWidth - 50) / columns);
    } else {
      columns = 3;
      baseWidth = Math.max(350, Math.floor((viewportWidth - 60) / columns));
    }

    // Proportional heights based on content type and width
    let heightRatio = 1;
    switch (heightType) {
      case 'short':
        heightRatio = 0.65;
        break;
      case 'medium':
        heightRatio = 0.8;
        break;
      case 'tall':
        heightRatio = 0.95;
        break;
      case 'extra-tall':
        heightRatio = 1.1;
        break;
      default:
        heightRatio = 0.85;
    }

    const height = Math.round(baseWidth * heightRatio);

    return { width: baseWidth, height };
  };

  // Initialize Muuri
  useLayoutEffect(() => {
    if (!gridRef.current || muuriRef.current) return;

    const initializeMuuri = () => {
      if (!gridRef.current) return;

      try {
        // Create Muuri instance
        muuriRef.current = new Muuri(gridRef.current, {
          items: '.chart-item',
          dragEnabled: true,
          dragHandle: '.chart-card',
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
        muuriRef.current.on('dragStart', () => {
          setIsDragging(true);
          document.body.style.cursor = 'grabbing';
          document.body.style.userSelect = 'none';
        });

        muuriRef.current.on('dragEnd', () => {
          setIsDragging(false);
          document.body.style.cursor = '';
          document.body.style.userSelect = '';
        });

        // Initial layout
        muuriRef.current.refreshItems().layout();
        setGridReady(true);

        // Force a second layout after charts render
        setTimeout(() => {
          if (muuriRef.current) {
            muuriRef.current.refreshItems().layout();
          }
        }, 500);
      } catch (error) {
        console.error('Failed to initialize Muuri for charts:', error);
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
  }, []);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      if (muuriRef.current) {
        // Recalculate dimensions and refresh
        const items = muuriRef.current.getItems();
        items.forEach((item: any) => {
          const element = item.getElement();
          const chartId = element.getAttribute('data-id');
          const config = chartConfigs.find(c => c.id === chartId);
          if (config) {
            const { width, height } = getItemDimensions(config.height);
            element.style.width = `${width}px`;
            element.style.height = `${height}px`;
          }
        });
        muuriRef.current.refreshItems().layout();
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Force refresh when charts are rendered
  useEffect(() => {
    if (gridReady && muuriRef.current) {
      const refreshInterval = setInterval(() => {
        if (muuriRef.current) {
          muuriRef.current.refreshItems().layout();
        }
      }, 100);

      // Stop refreshing after 2 seconds
      setTimeout(() => {
        clearInterval(refreshInterval);
      }, 2000);

      return () => clearInterval(refreshInterval);
    }
  }, [gridReady]);

  return (
    <div className="mb-20">
      <motion.h2 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.6 }}
        className="font-title text-f-80 text-dark text-center mb-6"
      >
        DATA VISUALIZATION
      </motion.h2>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="font-copy text-sm text-dark/40 text-center mb-4"
      >
        Interactive charts and graphs showcasing various data patterns
      </motion.p>
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.8 }}
        className="font-copy text-sm text-dark/40 text-center mb-12"
      >
        Drag and drop to rearrange your dashboard
      </motion.p>

      <div className="px-4 max-w-[1600px] mx-auto">
        <div 
          ref={gridRef} 
          className="charts-muuri-grid"
          style={{ 
            position: 'relative',
            minHeight: '600px',
          }}
        >
          {chartConfigs.map((chart, index) => {
            const { width, height } = getItemDimensions(chart.height);
            const bgClass = chart.bgColor === 'dark' ? 'bg-dark' : 'bg-cream';
            const borderClass = chart.borderColor === 'dark' ? 'border-dark' : 'border-cream';
            const textClass = chart.bgColor === 'dark' ? 'text-cream' : 'text-dark';
            
            return (
              <div
                key={chart.id}
                className="chart-item"
                data-id={chart.id}
                style={{
                  display: 'block',
                  position: 'absolute',
                  width: `${width}px`,
                  height: `${height}px`,
                  padding: '5px',
                  opacity: gridReady ? 1 : 0,
                  transition: 'opacity 0.3s ease',
                }}
              >
                <div className="chart-item-content h-full">
                  <div
                    className={cn(
                      "chart-card h-full rounded-lg border-2 p-3 transition-transform duration-300 hover:scale-[1.02] flex flex-col",
                      bgClass,
                      borderClass,
                      isDragging && "cursor-grabbing"
                    )}
                    style={{
                      cursor: isDragging ? 'grabbing' : 'grab',
                      position: 'relative',
                    }}
                  >
                    <h3 className={cn("font-title text-lg mb-2", textClass)}>
                      {chart.title}
                    </h3>
                    <div className="chart-content overflow-hidden" style={{ height: 'calc(100% - 40px)' }}>
                      {chart.component}
                    </div>
                    
                    {/* Drag Indicator */}
                    <div className="absolute top-4 right-4 opacity-0 hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                      <svg className={cn("w-5 h-5", textClass)} fill="currentColor" viewBox="0 0 24 24">
                        <path d="M9 3H11V5H9V3M13 3H15V5H13V3M9 7H11V9H9V7M13 7H15V9H13V7M9 11H11V13H9V11M13 11H15V13H13V11M9 15H11V17H9V15M13 15H15V17H13V15M9 19H11V21H9V19M13 19H15V21H13V19Z"/>
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ChartsSection;
