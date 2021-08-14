import React, { ReactNode } from 'react';

function Layout({ children }: { children: ReactNode }) {
  return <div className="container mx-auto pt-10">{children}</div>;
}

export default Layout;
