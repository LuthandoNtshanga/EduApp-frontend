import React from 'react';

type CardProps = {
  title: string;
  description?: string;           // optional description prop
  children?: React.ReactNode;     // children optional as well
};

export default function Card({ title, description, children }: CardProps) {
  return (
    <div className="bg-white rounded-2xl shadow-md p-6 border border-gray-200">
      <h2 className="text-lg font-semibold mb-4">{title}</h2>
      {description && <p className="mb-4 text-gray-600">{description}</p>}
      {children}
    </div>
  );
}
