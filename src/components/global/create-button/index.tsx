'use client';
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import CreateDialog from '../create-dialog';

type Props = {};

const CreateButton = (props: Props) => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  const handleConvert = (tweetUrl: string) => {
    console.log(tweetUrl);
    closePopup();
  };

  return (
    <>
      <Button
        onClick={openPopup}
        className="bg-[#9D9D9D] flex items-center gap-2"
      >
        <PlusCircle />
        <span className="flex items-center gap-2">Create</span>
      </Button>

      <CreateDialog
        isOpen={isPopupOpen}
        onClose={closePopup}
        onConvert={handleConvert}
      />
    </>
  );
};

export default CreateButton;
