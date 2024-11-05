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

  return (
    <>
      <Button
        onClick={openPopup}
        className="h-8 w-8 sm:w-auto sm:h-9 flex items-center gap-2"
      >
        <PlusCircle />
        <span className="hidden sm:flex items-center gap-2 ">Create</span>
      </Button>

      <CreateDialog isOpen={isPopupOpen} onClose={closePopup} />
    </>
  );
};

export default CreateButton;
