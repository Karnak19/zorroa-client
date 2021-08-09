import React, { FC, ReactNode, useEffect, useState } from 'react';
import { useContext, createContext } from 'react';
import useMagic from '../hooks/useMagic';

export const magicContext = createContext(null as any);

export const useMagicContext = useContext(magicContext);

export const MagicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<any>(null);

  useMagic();

  return <magicContext.Provider value={{ state, setState }}>{children}</magicContext.Provider>;
};
