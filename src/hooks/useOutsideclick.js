import { useState, useEffect } from 'react';

const useOutsideclick = (ref, callback) => {
  const [isOpen, setOpen] = useState(false);

  useEffect(() => {
    const handleClick = (e) => {
      let action;
      if (e.target && !ref.current.contains(e.target)) {
        action = callback ? callback() : setOpen(false);
      }
      return action;
    };
    window.addEventListener('click', handleClick);

    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return {
    isOpen,
    setOpen,
  };
};

export default useOutsideclick;
