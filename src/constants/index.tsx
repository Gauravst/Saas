import {
  Bell,
  CreditCard,
  FileDuoToneBlack,
  Dashboard,
  Settings,
} from '@/components/icons';

export const menuItems: {
  title: string;
  href: string;
  icon: React.ReactNode;
}[] = [
  { title: 'Dashboard', href: '/dashboard', icon: <Dashboard /> },
  { title: 'Library', href: '/dashboard/library', icon: <FileDuoToneBlack /> },
  { title: 'Notifications', href: '/dashboard/notifications', icon: <Bell /> },
  { title: 'Billing', href: '/dashboard/billing', icon: <CreditCard /> },
  { title: 'Settings', href: '/dashboard/settings', icon: <Settings /> },
];

export const PLANS = [
  {
    id: 'FREE',
    name: 'Free',
    price: '0',
    features: [
      'Up to 05 image per month',
      'Access to basic templates',
      'Standard resolution exports',
      'Watermark on images',
      'Basic design customization',
    ],
  },
  {
    id: 'PRO',
    name: 'Pro',
    price: '49',
    features: [
      'Up to 100 image per month',
      'Custom themes and templates',
      'Basic branding customization',
      'Email and chat support',
      'High-resolution exports (1080p)',
      'Access to premium templates',
    ],
  },
  {
    id: 'ENTERPRISE',
    name: 'Enterprise',
    price: '199',
    features: [
      'Up to 500 image per month',
      'Custom themes and templates',
      'Custom branding',
      'Priority 24/7 support',
      'Advanced design customization',
      'High-resolution exports (4K+)',
      'Bulk tweet conversion',
    ],
  },
];

export const COLOR = [
  {
    key: 'no-background',
    color: '#000000',
    name: 'No background',
  },
  {
    key: 'soft-yellow',
    color: '#fef3c7',
    name: 'Soft Yellow',
  },
  {
    key: 'purple-gradient',
    color: 'linear-gradient(to right, #4f46e5, #7c3aed)',
    name: 'Purple Gradient',
  },
  {
    key: 'bright-blue',
    color: '#3357ff',
    name: 'Bright Blue',
  },
  {
    key: 'pink-gradient',
    color: 'linear-gradient(to right, #ff7eb3, #ff758c)',
    name: 'Pink Gradient',
  },
  {
    key: 'peach-gradient',
    color: 'linear-gradient(to right, #ff9a9e, #fad0c4)',
    name: 'Peach Gradient',
  },
  {
    key: 'blue-ocean-gradient',
    color: 'linear-gradient(to right, #00c6ff, #0072ff)',
    name: 'Blue Ocean Gradient',
  },
  {
    key: 'blush-gradient',
    color: 'linear-gradient(to right, #ffafbd, #ffc3a0)',
    name: 'Blush Gradient',
  },
  {
    key: 'bright-yellow',
    color: '#ffeb3b',
    name: 'Bright Yellow',
  },
  {
    key: 'green-lime-gradient',
    color: 'linear-gradient(to right, #00b09b, #96c93d)',
    name: 'Green Lime Gradient',
  },
  {
    key: 'royal-purple',
    color: '#8e44ad',
    name: 'Royal Purple',
  },
  {
    key: 'red-sunset-gradient',
    color: 'linear-gradient(to right, #ff512f, #dd2476)',
    name: 'Red Sunset Gradient',
  },
  {
    key: 'turquoise-green',
    color: '#1abc9c',
    name: 'Turquoise Green',
  },
  {
    key: 'steel-blue-gradient',
    color: 'linear-gradient(to right, #2c3e50, #4ca1af)',
    name: 'Steel Blue Gradient',
  },
  {
    key: 'magenta-blue-gradient',
    color: 'linear-gradient(to right, #fc466b, #3f5efb)',
    name: 'Magenta Blue Gradient',
  },
];

export const BG_HTML_DEFAULT_CSS =
  'aspect-video w-full rounded flex justify-center items-center';

export const DEMO_HTML =
  "<div style='width: 100%; height : 100%; border-radius : 10px 10px 10px 10px; background: linear-gradient(45deg, #2C3E50, #4CA1AF); display: flex; align-items: center; justify-content: center; color: white; font-weight: bold; font-size: 16px;'><p style='text-align: center;'>Your tweet content here</p></div>";
