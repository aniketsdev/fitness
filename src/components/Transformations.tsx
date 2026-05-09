import { IMAGES } from '../config'

type Transformation = {
  kind: 'transform';
  image: string;
  name: string;
  goal: string;
  duration: string;
};

type Quote = {
  kind: 'quote';
  avatar: string;
  name: string;
  text: string;
};

type Card = Transformation | Quote;

const CARDS: Card[] = [
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[0],
    name: 'Priya M.',
    goal: 'Lost 14kg',
    duration: '6 months',
  },
  {
    kind: 'quote',
    avatar: IMAGES.testimonialAvatars[0],
    name: 'Anjali R.',
    text: "I'd tried four trainers before Shubham. He's the first who actually listened. Down 9kg and not hungry once.",
  },
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[1],
    name: 'Rohan K.',
    goal: 'Gained 8kg lean mass',
    duration: '5 months',
  },
  {
    kind: 'quote',
    avatar: IMAGES.testimonialAvatars[1],
    name: 'Megha S.',
    text: 'The daily WhatsApp check-ins kept me honest. I never felt alone in this. I look forward to workouts now.',
  },
  {
    kind: 'transform',
    image: IMAGES.beforeAfter[2],
    name: 'Vikram J.',
    goal: 'Lost 18kg',
    duration: '8 months',
  },
];

export function Transformations() {
  return (
    <section id="results" className="relative py-20 md:py-28 px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-12 md:mb-16">
          <p className="text-terracotta text-xs tracking-[0.25em] uppercase font-semibold mb-4">
            — Results
          </p>
          <h2 className="font-display text-4xl md:text-5xl leading-tight text-forest">
            Real results.
            <br />
            <em className="italic font-normal">Real people.</em>
          </h2>
        </div>

        <div className="-mx-6 lg:-mx-8 px-6 lg:px-8">
          <div className="flex gap-5 md:gap-6 overflow-x-auto snap-x snap-mandatory pb-6 scroll-smooth">
            {CARDS.map((card, i) => (
              <CardView key={i} card={card} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function CardView({ card }: { card: Card }) {
  if (card.kind === 'transform') {
    return (
      <article
        data-card
        className="snap-start shrink-0 w-[80%] sm:w-[55%] md:w-[32%] lg:w-[30%] bg-cream-dark/40 rounded-2xl overflow-hidden shadow-sm"
      >
        <img
          src={card.image}
          alt={`${card.name} transformation (placeholder)`}
          className="w-full aspect-[4/5] object-cover"
          loading="lazy"
        />
        <div className="p-5">
          <div className="font-display text-2xl text-forest">{card.name}</div>
          <div className="mt-1 text-terracotta font-medium text-sm">
            {card.goal}
          </div>
          <div className="text-forest/60 text-xs mt-1">{card.duration}</div>
        </div>
      </article>
    );
  }

  return (
    <article
      data-card
      className="snap-start shrink-0 w-[80%] sm:w-[55%] md:w-[32%] lg:w-[30%] bg-forest text-cream rounded-2xl p-6 md:p-8 flex flex-col justify-between aspect-[4/5]"
    >
      <p className="font-display text-xl md:text-2xl italic leading-snug">
        “{card.text}”
      </p>
      <div className="mt-6 flex items-center gap-3">
        <img
          src={card.avatar}
          alt={`${card.name} (placeholder)`}
          className="w-12 h-12 rounded-full object-cover"
          loading="lazy"
        />
        <div className="text-cream/90 text-sm font-medium">{card.name}</div>
      </div>
    </article>
  );
}
