import { Icon } from './Icon'

type Variant = 'primary' | 'cream' | 'pill';

type Props = {
  number: string;
  message: string;
  label: string;
  variant?: Variant;
  className?: string;
};

const VARIANT_CLASSES: Record<Variant, string> = {
  primary:
    'bg-forest text-cream hover:bg-forest-soft px-6 py-3 rounded-full font-medium',
  cream:
    'bg-cream text-terracotta hover:bg-cream-dark px-8 py-4 rounded-full font-semibold text-lg',
  pill:
    'bg-terracotta text-cream hover:bg-terracotta-dark px-4 py-2 rounded-full text-sm font-medium',
};

export function WhatsAppButton({
  number,
  message,
  label,
  variant = 'primary',
  className = '',
}: Props) {
  const href = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center gap-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-terracotta ${VARIANT_CLASSES[variant]} ${className}`}
    >
      <Icon name="message-circle" className="h-4 w-4" />
      <span>{label}</span>
    </a>
  );
}
