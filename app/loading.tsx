'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { BarLoader } from 'react-spinners';

export default function Loading() {
  const [ready, setReady] = useState(false);
  useEffect(() => {
    setReady(true);
  }, []);
  return ready
    ? createPortal(
        <div className="loading-box">
          <BarLoader />
        </div>,
        document.querySelector('body') as HTMLElement
      )
    : '';
}
