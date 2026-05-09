import { COACH, NAV_LINKS, SOCIAL_LINKS, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'

export function Footer() {
  const year = new Date().getFullYear();
  const whatsappHref = `https://wa.me/${WHATSAPP_CONFIG.number}?text=${encodeURIComponent(WHATSAPP_CONFIG.defaultMessage)}`;

  return (
    <footer className="bg-forest text-cream/85 px-6 lg:px-8 pt-16 pb-8">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 md:gap-12">
        <div>
          <div className="font-display italic text-2xl text-cream">
            {COACH.name}
          </div>
          <p className="mt-3 text-sm text-cream/70 max-w-xs">
            {COACH.title}. Helping you build a body — and a life — that lasts.
          </p>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-4">
            Explore
          </div>
          <ul className="space-y-2 text-sm">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-cream transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <div className="text-xs uppercase tracking-[0.2em] text-cream/60 mb-4">
            Connect
          </div>
          <ul className="space-y-2 text-sm">
            <li>
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <Icon name="instagram" className="h-4 w-4" />
                Instagram
              </a>
            </li>
            <li>
              <a
                href={whatsappHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-cream transition-colors"
              >
                <Icon name="message-circle" className="h-4 w-4" />
                WhatsApp
              </a>
            </li>
          </ul>
        </div>
      </div>

      <div className="max-w-7xl mx-auto mt-12 pt-6 border-t border-cream/10 text-xs text-cream/55 flex flex-col md:flex-row justify-between gap-2">
        <div>© {year} {COACH.name}. All rights reserved.</div>
        <div>Built with care.</div>
      </div>
    </footer>
  );
}
