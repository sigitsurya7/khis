import { useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

export function useSafeMediaQuery(query: string) {
  const [mounted, setMounted] = useState(false);
  const matches = useMediaQuery(query);

  useEffect(() => {
    setMounted(true);
  }, []);

  return mounted ? matches : false; // atau nilai default lain
}
