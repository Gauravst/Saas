import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UserButton } from '@clerk/nextjs';
import { Users, Search } from 'lucide-react';
import React from 'react';
import CreateButton from '../create-button';

type Props = {};

const InfoBar = (props: Props) => {
  return (
    <header className="bg-[#171717] pl-20 md:pl-[265px] fixed p-4 w-full flex items-center justify-between gap-4">
      <div className="hidden sm:flex gap-4 justify-center items-center border-2 rounded-full px-4 w-full max-w-lg">
        <Search size={25} className="text-[#707070]" />
        <Input
          className="bg-transparent border-none !placeholder-neutral-500"
          placeholder="Search for tweets and more"
        />
      </div>
      <div className="flex items-center gap-4 ml-auto sm:ml-0">
        <Button className="bg-[#9D9D9D] hidden sm:flex items-center gap-2">
          <Users size={20} />
          <span className="flex items-center gap-2">Refer</span>
        </Button>
        <CreateButton />
        <UserButton />
      </div>
    </header>
  );
};

export default InfoBar;
