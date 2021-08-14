import React, { FC, ReactNode, useState } from 'react';
import { useContext, createContext } from 'react';
import Layout from '../components/layout/Layout';
import LoginForm from '../components/login/LoginForm';

export const magicContext = createContext(null as any);

export const useMagicContext = () => useContext(magicContext);

export const MagicProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [state, setState] = useState<any>(localStorage.getItem('MAGIC_TOKEN'));

  return (
    <magicContext.Provider value={{ state, setState }}>
      {!state ? <LoginForm /> : <Layout>{children}</Layout>}
    </magicContext.Provider>
  );
};
