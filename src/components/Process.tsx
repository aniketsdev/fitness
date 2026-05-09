const STEPS = [
  {
    n: '01',
    title: 'Free WhatsApp consultation',
    body: "Tell me your goals, your schedule, your past attempts. We'll figure out if we're a fit. No pressure.",
  },
  {
    n: '02',
    title: 'Custom plan built for you',
    body: 'Workouts and diet, designed around your body, your kitchen, and your budget. Built in 48 hours.',
  },
  {
    n: '03',
    title: 'Daily check-ins & adjustments',
    body: "I'm in your WhatsApp every day. Plans evolve as you do. Stuck? Question? Just message me.",
  },
] as const;

export function Process() {
  return (
    <section
      id="process"
      className="relative py-20 md:py-28 px-6 lg:px-8 bg-cream-dark/40"
    >
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — How it works
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Three steps from where you are
            <br />
            <em className="italic font-normal">to where you want to be.</em>
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6 md:gap-8">
          {STEPS.map((step) => (
            <div
              key={step.n}
              className="bg-cream rounded-2xl p-8 shadow-sm border border-forest/5"
            >
              <div className="font-display text-5xl text-sage mb-2">
                {step.n}
              </div>
              <div className="w-12 h-px bg-terracotta mb-6" />
              <h3 className="text-xl font-semibold text-forest mb-3 font-body">
                {step.title}
              </h3>
              <p className="text-forest/75 leading-relaxed">{step.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
