import { COACH, IMAGES } from '../config'

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative order-2 md:order-1">
          <div className="absolute -top-6 -left-6 w-40 h-40 rounded-full bg-sage/30 -z-10" />
          <img
            src={IMAGES.aboutPortrait}
            alt={`${COACH.name} coaching (placeholder image)`}
            className="w-full aspect-[4/5] object-cover rounded-3xl shadow-md"
            loading="lazy"
          />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — About
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Hi, I'm Shubham.
            <br />
            <em className="italic font-normal">Let's build something real.</em>
          </h2>
          <div className="mt-6 space-y-4 text-forest/80 leading-relaxed">
            <p>
              I've spent the last {COACH.yearsExperience}+ years helping people
              who tried every fast-fix diet, every 30-day shred, every
              motivational reel — and still felt stuck. Sustainable change
              isn't about discipline alone. It's about building a plan that
              actually fits your life.
            </p>
            <p>
              Whether you're trying to drop weight, put on muscle, or just feel
              strong again, we'll start with a free WhatsApp consultation,
              build a plan together, and adjust it weekly as your body changes.
              No cookie-cutter PDFs.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-3 gap-4 bg-sage/15 rounded-2xl p-6">
            <Stat value={COACH.clientsTrained} label="clients trained" />
            <Stat value={`${COACH.yearsExperience}`} label="years coaching" />
            <Stat value={COACH.successRate} label="success rate" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="font-display text-3xl md:text-4xl text-forest">{value}</div>
      <div className="mt-1 text-xs md:text-sm text-forest/70 leading-tight">
        {label}
      </div>
    </div>
  );
}
