"use client";

export default function Card({ children }) {
  return (
    <div className='w-full md:w-xl bg-gray-200 dark:bg-gray-300 p-12 rounded-lg flex flex-col shadow-lg m-4 '>
      {children}
    </div>
  );
}
