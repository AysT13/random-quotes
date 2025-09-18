"use client";

export default function Card({ children }) {
  return (
    <div className='w-screen md:w-xl bg-slate-200 p-12 rounded-lg flex flex-col shadow-lg'>
      {children}
    </div>
  );
}
