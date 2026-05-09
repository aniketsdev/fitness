import { WHATSAPP_CONFIG } from '../config'
import { WhatsAppButton } from './WhatsAppButton'

export function CtaBand() {
  return (
    <section
      id="contact"
      className="relative bg-terracotta text-cream py-20 md:py-28 px-6 lg:px-8 overflow-hidden"
    >
      <div className="absolute -top-20 -left-20 w-72 h-72 rounded-full bg-cream/10 pointer-events-none" />
      <div className="absolute -bottom-24 -right-16 w-96 h-96 rounded-full bg-cream/10 pointer-events-none" />

      <div className="relative max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-6xl leading-tight">
          Ready when
          <br />
          <em className="italic font-normal">you are.</em>
        </h2>
        <p className="mt-6 text-cream/85 text-base md:text-lg max-w-md mx-auto">
          Free 15-minute consultation. No pressure, no contract, no upsell.
          Let's just talk.
        </p>
        <div className="mt-10 flex justify-center">
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={`${WHATSAPP_CONFIG.defaultMessage} I'd like to book the free consultation.`}
            label="Message Shubham"
            variant="cream"
          />
        </div>
      </div>
    </section>
  );
}
