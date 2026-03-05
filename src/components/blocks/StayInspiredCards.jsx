import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

export default function StayInspiredCards() {
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

  return (
    <section className="bg-gray-50 px-4 md:px-6 py-12 md:py-20">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col gap-6">
          {cards.map((card) => (
            <Card
              key={card.id}
              className="w-full rounded-3xl shadow-lg overflow-hidden border-0 bg-white"
            >
              <CardContent className="p-0">
                <div className="relative w-full h-56 md:h-72 lg:h-80 overflow-hidden">
                  <Image
                    src={card.image}
                    alt={card.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 1280px"
                  />
                </div>
                <div className="p-6 md:p-10 lg:p-12">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-semibold text-gray-900 mb-3 md:mb-4 leading-tight">
                    {card.title}
                  </h2>
                  <p className="text-gray-600 text-base md:text-lg mb-6 md:mb-8 max-w-2xl leading-relaxed">
                    {card.description}
                  </p>
                  <Button
                    size="lg"
                    className="bg-black hover:bg-gray-800 text-white px-8 py-6 rounded-full text-base font-normal shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    {card.buttonText}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
