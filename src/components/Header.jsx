import { CloudSun, Sparkles } from "lucide-react";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-base-100/75 backdrop-blur-xl">
      <nav
        className="navbar mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"
        aria-label="Main navigation"
      >
        <div className="navbar-start">
          <a
            href="#top"
            className="group flex items-center gap-3 rounded-2xl outline-none focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Scandium Weather home"
          >
            <span className="grid size-11 place-items-center rounded-2xl border border-primary/30 bg-primary/10 text-primary shadow-lg shadow-primary/5 transition duration-300 group-hover:-rotate-6 group-hover:scale-105 group-hover:border-primary/60">
              <CloudSun size={24} aria-hidden="true" />
            </span>

            <span>
              <span className="block text-sm font-extrabold tracking-wide text-base-content sm:text-base">
                Scandium Weather
              </span>

              <span className="block text-xs font-medium text-base-content/55">
                Weather + Mood Dashboard
              </span>
            </span>
          </a>
        </div>

        <div className="navbar-end">
          <div className="badge badge-outline hidden h-8 gap-2 border-primary/30 bg-primary/5 px-3 text-primary sm:flex">
            <Sparkles size={14} aria-hidden="true" />
            React build day
          </div>
        </div>
      </nav>
    </header>
  );
}