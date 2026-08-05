import { CloudSun } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/8 bg-base-100/84 shadow-[0_8px_30px_rgb(0_0_0_/_0.12)] backdrop-blur-lg">
      <nav
        className="navbar mx-auto min-h-16 max-w-7xl px-4 sm:min-h-18 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="navbar-start">
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-base-100"
            aria-label="Scandium Weather dashboard home"
          >
            <span className="grid size-10 shrink-0 place-items-center rounded-xl border border-primary/32 bg-primary/10 text-primary shadow-[0_8px_22px_rgb(244_201_93_/_0.09)] transition-[border-color,background-color,transform] duration-150 group-hover:-translate-y-px group-hover:border-primary/58 group-hover:bg-primary/14 motion-reduce:transform-none sm:size-11 sm:rounded-2xl">
              <CloudSun size={23} aria-hidden="true" />
            </span>

            <span>
              <span className="block text-sm font-extrabold tracking-[-0.01em] text-base-content sm:text-base">
                Scandium Weather
              </span>

              <span className="block text-[0.7rem] font-semibold text-base-content/56 sm:text-xs">
                Weather + Mood Dashboard
              </span>
            </span>
          </a>
        </div>

        <div className="navbar-end">
          <span className="hidden text-sm font-semibold text-base-content/42 sm:block">
            Live local weather
          </span>
        </div>
      </nav>
    </header>
  );
}