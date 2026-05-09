import { useEffect, useState } from 'react'
import { COACH, NAV_LINKS, WHATSAPP_CONFIG } from '../config'
import { Icon } from './Icon'
import { WhatsAppButton } from './WhatsAppButton'

export function Nav() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all ${
        isScrolled
          ? 'bg-cream/85 backdrop-blur-md shadow-sm'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8 flex items-center justify-between h-16 md:h-20">
        <a
          href="#top"
          className="font-display italic text-xl md:text-2xl text-forest"
        >
          {COACH.name}
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-forest/80 hover:text-forest transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:block">
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={WHATSAPP_CONFIG.defaultMessage}
            label="WhatsApp"
            variant="pill"
          />
        </div>

        <button
          type="button"
          onClick={() => setIsOpen((v) => !v)}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          className="md:hidden p-2 text-forest"
        >
          <Icon name={isOpen ? 'x' : 'menu'} className="h-6 w-6" />
        </button>
      </div>

      {isOpen && (
        <div
          id="mobile-menu"
          className="md:hidden bg-cream border-t border-forest/10 px-6 py-6 flex flex-col gap-4"
        >
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="text-base text-forest"
            >
              {link.label}
            </a>
          ))}
          <WhatsAppButton
            number={WHATSAPP_CONFIG.number}
            message={WHATSAPP_CONFIG.defaultMessage}
            label="Start on WhatsApp"
            variant="primary"
            className="self-start"
          />
        </div>
      )}
    </header>
  );
}
