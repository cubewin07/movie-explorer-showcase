import Section from "../Section";

export default function Cohesion() {
  return (
    <Section id="cohesion" eyebrow="Cohesion" heading="Repeated motion patterns and shared tokens" act="cohesion">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Timings and easings repeat across features with reduced-motion support.
          </p>
        </div>
        <div className="rounded-2xl border border-slate-200/60 dark:border-slate-800/60 bg-white/90 dark:bg-slate-900/80 p-4" data-reveal>
          <p className="text-sm text-slate-600 dark:text-slate-300">
            Color, elevation and shape tokens match the product&apos;s dark UI.
          </p>
        </div>
      </div>
    </Section>
  );
}
