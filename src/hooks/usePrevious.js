import { useRef, useEffect } from 'react';
import { sumItemsWithKey } from 'utils';

const usePreviousLiked = (value, arr, key) => {
  const currentLikedNotes = sumItemsWithKey(arr, key);
  const ref = useRef(currentLikedNotes);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  return ref.current;
};

export default usePreviousLiked;
