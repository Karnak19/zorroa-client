import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title?: string;
  className?: string;
}

function Card({ children, title, className = '' }: IProps) {
  const CAPS_LOGO =
    'https://assets.coingecko.com/coins/images/15921/large/e55393fa-7b4d-40f5-9f36-9a8a6bdcb570.png?1622430581';

  return (
    <div
      className={`shadow-lg rounded-xl p-4 
    bg-gradient-to-br from-indigo-800 via-indigo-700 to-purple-500 dark:bg-gray-800 
    relative overflow-hidden ${className}`}
    >
      <img
        src={CAPS_LOGO}
        className="h-24 w-24 absolute opacity-70 -top-4 -right-4 transform rotate-12"
        style={{ filter: 'drop-shadow(30px 10px 14px #ffff)' }}
      />
      {children}
    </div>
  );
}

export default Card;
