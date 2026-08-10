import React from 'react';

export default function SectionTitle({ badge, title, highlight, subtitle, center = true }) {
  return (
    <div className={`mb-12 ${center ? 'text-center max-w-3xl mx-auto' : 'max-w-2xl'}`}>
      {badge && (
        <span className="inline-block px-3.5 py-1.5 mb-3 text-xs font-bold tracking-wider text-[#1B4D3E] uppercase bg-emerald-100/90 rounded-full border border-emerald-200">
          {badge}
        </span>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 font-heading tracking-tight leading-tight">
        {title}{' '}
        {highlight && <span className="text-[#1B4D3E]">{highlight}</span>}
      </h2>
      {subtitle && (
        <p className="mt-3 text-base sm:text-lg text-gray-600 leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
