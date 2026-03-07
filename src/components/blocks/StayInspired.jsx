import FuzzyText from '../ui/FuzzyText';

export default function StayInspired() {
  return (
    <div className='relative h-[calc(100vh-10rem)] my-auto'>
      <div className="sticky top-30 pb-20">
        {/* Hero Section */}
        <section
          className=" w-full flex flex-col items-center justify-center">
          <div className="w-full mx-auto text-center">
            {/* Main Heading */}
            <h1 className="text-white font-light tracking-wide mb-6">
              <div className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl xl:text-[8rem] font-normal leading-tight">
                Stay Inspired
              </div>
              <div className="flex items-center justify-center text-6xl sm:text-7xl md:text-6xl lg:text-9xl xl:text-[6.5rem] mt-2">
                <span className='leading-tight font-normal'>With</span>
                <span className="inline-block">
                  <FuzzyText
                    fontSize="clamp(7.5rem, 2vw, 8rem)"
                    fontWeight={500}
                    color="#fff"
                    enableHover={true}
                    baseIntensity={0.3}
                    hoverIntensity={0.08}
                  >
                    Aqua Electric
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
    </div>
  );
}
