import React, { ReactNode } from 'react';

interface IProps {
  children: ReactNode;
  title?: string;
}

function Card({ children, title }: IProps) {
  return (
    <div className="shadow-lg rounded-xl p-4 bg-gradient-to-br from-indigo-800 via-indigo-700 to-purple-500 dark:bg-gray-800 relative overflow-hidden flex-1">
      {title && (
        <div>
          <p className="text-xl text-purple-50 dark:text-white ml-2">{title}</p>
        </div>
      )}
      {children}
    </div>
  );
}

export default Card;
