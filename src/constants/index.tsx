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
