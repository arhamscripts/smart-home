const PHONE_WIDTH = 380;
const PHONE_HEIGHT = 830;
const SCREEN_X = 9;
const SCREEN_Y = 14;
const SCREEN_WIDTH = 360;
const SCREEN_HEIGHT = 800;
const SCREEN_RADIUS = 33;

const LEFT_PCT = (SCREEN_X / PHONE_WIDTH) * 100;
const TOP_PCT = (SCREEN_Y / PHONE_HEIGHT) * 100;
const WIDTH_PCT = (SCREEN_WIDTH / PHONE_WIDTH) * 100;
const HEIGHT_PCT = (SCREEN_HEIGHT / PHONE_HEIGHT) * 100;
const RADIUS_H = (SCREEN_RADIUS / SCREEN_WIDTH) * 100;
const RADIUS_V = (SCREEN_RADIUS / SCREEN_HEIGHT) * 100;

export function Android({
  src,
  videoSrc,
  children,
  className,
  style,
  ...props
}) {
  return (
    <div
      className={`relative inline-block h-full w-auto max-w-full align-middle leading-none ${className || ""}`}
      style={{
        aspectRatio: `${PHONE_WIDTH}/${PHONE_HEIGHT}`,
        ...style,
      }}
      {...props}
    >
      <div
        className="absolute z-0 overflow-hidden"
        style={{
          left: `${LEFT_PCT}%`,
          top: `${TOP_PCT}%`,
          width: `${WIDTH_PCT}%`,
          height: `${HEIGHT_PCT}%`,
          borderRadius: `${RADIUS_H}% / ${RADIUS_V}%`,
        }}
      >
        {src && (
          <img
            src={src}
            alt=""
            className="block size-full object-cover"
          />
        )}
        {videoSrc && (
          <video
            className="block size-full object-cover"
            src={videoSrc}
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        {children && <div className="size-full overflow-hidden">{children}</div>}
      </div>

      <svg
        viewBox="0 0 380 830"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className=" inset-0 size-full pointer-events-none"
      >
      <path
        d="M376 153H378C379.105 153 380 153.895 380 155V249C380 250.105 379.105 251 378 251H376V153Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]" />
      <path
        d="M376 301H378C379.105 301 380 301.895 380 303V351C380 352.105 379.105 353 378 353H376V301Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]" />
      <path
        d="M0 42C0 18.8041 18.804 0 42 0H336C359.196 0 378 18.804 378 42V788C378 811.196 359.196 830 336 830H42C18.804 830 0 811.196 0 788V42Z"
        className="fill-[#E5E5E5] dark:fill-[#404040]" />
      <path
        d="M2 43C2 22.0132 19.0132 5 40 5H338C358.987 5 376 22.0132 376 43V787C376 807.987 358.987 825 338 825H40C19.0132 825 2 807.987 2 787V43Z"
        className="fill-white dark:fill-[#262626]" />
      <g clipPath="url(#clip0_514_20855)">
        <path
          d="M9.25 48C9.25 29.3604 24.3604 14.25 43 14.25H335C353.64 14.25 368.75 29.3604 368.75 48V780C368.75 798.64 353.64 813.75 335 813.75H43C24.3604 813.75 9.25 798.64 9.25 780V48Z"
          className="fill-[#E5E5E5] stroke-[#E5E5E5] stroke-[0.5] dark:fill-[#404040] dark:stroke-[#404040]" />
      </g>
      <circle cx="189" cy="28" r="9" className="fill-white dark:fill-[#262626]" />
      <circle cx="189" cy="28" r="4" className="fill-[#E5E5E5] dark:fill-[#404040]" />
      <defs>
        <clipPath id="clip0_514_20855">
          <rect
            width="360"
            height="800"
            rx="33"
            ry="25"
            className="fill-white dark:fill-[#262626]"
            transform="translate(9 14)" />
        </clipPath>
      </defs>
      </svg>
    </div>
  );
}
