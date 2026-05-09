import { COACH, IMAGES, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'
import { WhatsAppButton } from './WhatsAppButton'

export function Hero() {
  return (
    <section
      id="top"
      className="relative pt-28 md:pt-36 pb-20 md:pb-28 px-6 lg:px-8 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 md:gap-16 items-center">
        <div className="relative z-10">
          <p className="text-terracotta text-xs md:text-sm tracking-[0.25em] uppercase font-semibold mb-6">
            — {COACH.title}
          </p>
          <h1 className="font-display text-5xl sm:text-6xl md:text-7xl leading-[1.05] tracking-tight text-forest">
            Your body,
            <br />
            <em className="italic font-normal">your timeline.</em>
          </h1>
          <p className="mt-6 text-base md:text-lg text-forest/75 max-w-md leading-relaxed">
            Online 1-on-1 coaching · Custom diet plans · In-person training ·
            Group challenges. Built around your goals, your schedule, your life.
          </p>
          <div className="mt-8 flex flex-wrap gap-4 items-center">
            <WhatsAppButton
              number={WHATSAPP_CONFIG.number}
              message={WHATSAPP_CONFIG.defaultMessage}
              label="Start on WhatsApp"
              variant="primary"
            />
            <a
              href="#results"
              className="inline-flex items-center gap-2 text-forest/80 hover:text-forest font-medium"
            >
              See transformations
              <Icon name="arrow-right" className="h-4 w-4" />
            </a>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 w-40 h-40 md:w-56 md:h-56 rounded-full bg-terracotta/15 -z-10" />
          <div className="absolute -bottom-8 -left-4 w-28 h-28 md:w-40 md:h-40 rounded-full bg-sage/30 -z-10" />
          <img
            src={IMAGES.coachPortrait}
            alt={`${COACH.name} (placeholder image)`}
            className="w-full aspect-[4/5] object-cover rounded-3xl shadow-lg"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
}
