'use client';

import { usePathname } from 'next/navigation';
import React from 'react';

const GlobalHeader = () => {
  const pathName = usePathname().split('/dashboard/')[1];
  const path = usePathname();

  return (
    <article className="flex flex-col gap-2">
      <span className="text-[#707070] text-sm">{path}</span>
      <h1 className="text-4xl font-bold mb-4">
        {pathName
          ? pathName.charAt(0).toUpperCase() + pathName.slice(1).toLowerCase()
          : 'Dashboard'}
      </h1>
    </article>
  );
};

export default GlobalHeader;
