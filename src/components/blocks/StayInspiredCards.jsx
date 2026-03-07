import Image from 'next/image';
import { Button } from '@/components/ui/button';

const cards = [
  {
    id: 1,
    title: 'Introducing Roma Urban Smart Touch Switches',
    description:
      'Elegant smart switch that brings effortless control and modern living to your home',
    buttonText: 'Explore',
    image: '/images/InspiredCard1.png',
  },
  {
    id: 2,
    title: 'Transform Your Living Space',
    description:
      'Experience the future of home automation with intelligent lighting control',
    buttonText: 'Learn More',
    image: '/images/InspiredCard2.png',
  },
  {
    id: 3,
    title: 'Premium Home Automation',
    description:
      'Elevate your lifestyle with cutting-edge smart home technology',
    buttonText: 'Discover',
    image: '/images/InspiredCard1.png',
  },
];

export default function StayInspiredCards() {
  return (
    <section className="relative bg-gray-100">
      {cards.map((card, index) => (
        <div
          key={card.id}
          className="sticky top-0 h-screen w-full p-4 md:p-6"
          style={{ zIndex: index + 1 }}
        >
          <div className="relative h-full w-full rounded-3xl overflow-hidden shadow-2xl">
            <Image
              src={card.image}
              alt={card.title}
              fill
              className="object-cover"
              sizes="100vw"
              priority={index === 0}
            />

            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/20 to-transparent" />

            {/* Content */}
            <div className="absolute bottom-0 left-0 right-0 p-8 md:p-12 lg:p-16">
              <p className="text-white/50 text-sm font-medium tracking-widest uppercase mb-4">
                {String(index + 1).padStart(2, '0')} /{' '}
                {String(cards.length).padStart(2, '0')}
              </p>
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-semibold text-white mb-3 leading-tight max-w-2xl">
                {card.title}
              </h2>
              <p className="text-white/75 text-base md:text-lg mb-8 max-w-xl leading-relaxed">
                {card.description}
              </p>
              <Button
                size="lg"
                className="bg-white text-black hover:bg-white/90 px-8 py-3 rounded-full text-base font-normal shadow-lg transition-all duration-300"
              >
                {card.buttonText}
              </Button>
            </div>
          </div>
        </div>
      ))}
    </section>
  );
}
