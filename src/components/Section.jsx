import React from "react";

export default function Section({ id, heading, eyebrow, act, children }) {
  return (
    <section id={id} className="act py-24 border-b border-slate-200/60 dark:border-slate-800/60" data-act={act}>
      <div className="max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-slate-500 dark:text-slate-400">{eyebrow}</p>
          <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">{heading}</h2>
        </div>
        <div className="flex flex-col gap-6">{children}</div>
      </div>
    </section>
  );
}
