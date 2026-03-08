import FuzzyText from '../ui/FuzzyText';

export default function StayInspired() {
  return (
    <div className='relative overflow-hidden px-4 py-12 sm:px-6 sm:py-16 lg:py-24'>
      <div className="mx-auto max-w-7xl">
        {/* Hero Section */}
        <section
          className="flex w-full flex-col items-center justify-center">
          <div className="w-full mx-auto text-center">
            {/* Main Heading */}
            <h1 className="mb-6 text-white font-light tracking-wide">
              <div className="text-[clamp(2.25rem,8vw,8rem)] font-normal leading-none">
                Stay Inspired With
              </div>
              <div className='mt-3 flex flex-col w-full items-center justify-center'>
                <FuzzyText
                  fontSize="clamp(2.25rem,8vw,8rem)"
                  fontWeight={500}
                  color="#fff"
                  enableHover={true}
                  baseIntensity={0.2}
                  hoverIntensity={0.08}
                >
                  Aqua Electric
                </FuzzyText>
              </div>
            </h1>

            {/* Subtitle */}
            <p className="mx-auto max-w-4xl px-2 text-sm font-normal leading-relaxed tracking-wide text-white sm:text-lg md:text-2xl">
              It&apos;s Anchor by Aqua Electric
              Where simplicity meets sophistication.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}
