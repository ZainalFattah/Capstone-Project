import { useEffect, useState, useRef } from 'react';

export const useDetectOutsideClick = (initialState, togglerRef) => {
  const ref = useRef(null);
  const [isActive, setIsActive] = useState(initialState);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        ref.current && !ref.current.contains(event.target) &&
        togglerRef.current && !togglerRef.current.contains(event.target)
      ) {
        setIsActive(false);
      }
    };

    const handleScroll = () => {
      setIsActive(false);
    };

    if (isActive) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('touchstart', handleClickOutside);
      document.addEventListener('scroll', handleScroll, { capture: true });
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
      document.removeEventListener('scroll', handleScroll, { capture: true });
    };
  }, [isActive, ref, togglerRef]);

  return [isActive, setIsActive, ref];
};