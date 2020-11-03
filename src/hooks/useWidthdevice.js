import { useEffect, useState } from 'react';

const useWidthdevice = (size) => {
  const isWidth = () => window.innerWidth >= size;
  const [isInWidth, setInWidth] = useState(isWidth);

  useEffect(() => {
    const handleWidth = () => {
      setInWidth(isWidth);
    };
    window.addEventListener('resize', handleWidth);

    return () => window.removeEventListener('resize', handleWidth);
  }, []);

  return {
    isInWidth,
  };
};

export default useWidthdevice;
