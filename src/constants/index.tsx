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
