import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import FuzzyText from '../ui/FuzzyText';

export default function StayInspired() {
  return (
    <div className="relative">
      {/* Hero Section */}
      <section
        className="relative min-h-screen flex items-center justify-center px-6 py-16 overflow-hidden"
        style={{ backgroundColor: '#000000' }}
      >
        <div className="w-full mx-auto text-center">
          {/* Main Heading */}
          <h1 className="text-white font-light tracking-wide mb-6">
            <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] leading-tight">
              Stay Inspired
            </div>
            <div className="text-6xl sm:text-7xl md:text-6xl lg:text-9xl xl:text-[6.5rem] leading-tight mt-2">
              With
              <span className="inline-block">
              <FuzzyText
                fontSize="clamp(7rem, 2vw, 8rem)"
                fontWeight={600}
                color="#fff"
                enableHover={true}
                baseIntensity={0.2}
                hoverIntensity={0.6}
              >
                AQUA ELECTRIC
              </FuzzyText>
            </span>
            </div>
          </h1>

          {/* Subtitle */}
          <p className="text-white text-md sm:text-xl md:text-2xl lg:text-2xl font-normal tracking-wide max-w-5xl mx-auto leading-relaxed">
            It&apos;s Anchor by Aqua Electric
            Where simplicity meets sophistication.
          </p>
        </div>
      </section>

      
    </div>
  );
}
