'use client';
import React from 'react';
import Image from 'next/image';
import { menuItems } from '@/constants';
import SidebarItem from './sidebar-item';
import { Separator } from '@/components/ui/separator';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import PaymentButton from '../payment-button';
import { Menu } from 'lucide-react';
import InfoBar from '../info-bar';
import GlobalCard from '../global-card';
import { usePathname } from 'next/navigation';

const Sidebar = () => {
  const pathName = usePathname();

  const SidebarSection = (
    <div className="bg-[#111111] flex-none relative p-4 h-full w-[250px] flex flex-col gap-4 items-center overflow-hidden">
      <div className="bg-[#111111] p-4 flex gap-2 justify-center items-center mb-4 absolute top-0 left-0 right-0 ">
        <Image src="/next.svg" height={40} width={40} alt="logo" />
        <p className="text-2xl">Saas</p>
      </div>
      <p className="w-full text-[#9D9D9D] font-bold mt-4">Menu</p>
      <nav className="w-full">
        <ul>
          {menuItems.map((item) => (
            <SidebarItem
              href={item.href}
              icon={item.icon}
              selected={pathName === item.href}
              title={item.title}
              key={item.title}
              // notifications={
              //   (item.title === 'Notifications' &&
              //     count?._count &&
              //     count._count.notification) ||
              //   0
              // }
            />
          ))}
        </ul>
      </nav>
      <Separator className="w-4/5 mb-auto" />
      {true && (
        <GlobalCard
          title="Upgrade to Pro"
          description="Upgrade for more customization options, higher quality, and extra credits!"
          footer={<PaymentButton />}
        />
      )}
    </div>
  );
  return (
    <div className="full">
      <InfoBar />
      <div className="md:hidden fixed my-4">
        <Sheet>
          <SheetTrigger asChild className="ml-2">
            <Button variant={'ghost'} className="mt-[2px]">
              <Menu />
            </Button>
          </SheetTrigger>
          <SheetContent side={'left'} className="p-0 w-fit h-full">
            {SidebarSection}
          </SheetContent>
        </Sheet>
      </div>
      <div className="md:block hidden h-full">{SidebarSection}</div>
    </div>
  );
};

export default Sidebar;
