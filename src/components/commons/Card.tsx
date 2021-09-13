import React, { ReactNode } from 'react';
import tw from 'twin.macro';

const CAPS_LOGO =
  'https://assets.coingecko.com/coins/images/15921/large/e55393fa-7b4d-40f5-9f36-9a8a6bdcb570.png?1622430581';

interface IProps {
  children: ReactNode;
  title?: string;
  className?: string;
  grid?: string;
  logo?: boolean;
}

export const CardWrapper = tw.div`rounded-xl p-4 relative overflow-hidden text-pink-300 bg-black relative h-full`;

function Card({ children, className = '', grid = '', logo }: IProps) {
  return (
    <div className={`relative ${grid}`}>
      <div className="absolute inset-0 bg-gradient-to-r from-pink-600 to-purple-600 rounded-xl filter blur"></div>
      <CardWrapper className={className}>
        {logo && (
          <img
            src={CAPS_LOGO}
            className="h-24 w-24 absolute opacity-70 -top-4 -right-4 transform rotate-12"
            style={{ filter: 'drop-shadow(10px 10px 30px #ffff)' }}
          />
        )}
        {children}
      </CardWrapper>
    </div>
  );
}

export default Card;
