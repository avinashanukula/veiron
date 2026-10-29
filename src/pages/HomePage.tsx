import React, { useEffect, useRef } from 'react';
import { Page } from '../types';

interface HomePageProps {
  onNavigate: (page: Page) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data?.type === 'VEIRON_NAVIGATE' && event.data.page) {
        onNavigate(event.data.page as Page);
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [onNavigate]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-[#f4f4f1]">
      <iframe
        ref={iframeRef}
        src="/inspo/index.html"
        title="VEIRON — World Models for Institutions"
        className="w-full h-full border-none block"
      />
    </div>
  );
};
