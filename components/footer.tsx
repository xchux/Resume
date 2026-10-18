import { useEffect, useState } from "react";

const THEME_KEY = "hs_theme";

const Footer = () => {
  const [isDark, setIsDark] = useState(false);

  // The inline script in _document only sets an explicit choice; otherwise follow the OS preference.
  useEffect(() => {
    const root = document.documentElement;
    setIsDark(root.classList.contains("dark") || (!root.classList.contains("light") && window.matchMedia("(prefers-color-scheme: dark)").matches));
  }, []);

  const toggleTheme = () => {
    const next = isDark ? "light" : "dark";
    const root = document.documentElement;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    try {
      localStorage.setItem(THEME_KEY, next);
    } catch {
      // Storage unavailable (private mode); the toggle still works for this session.
    }
    setIsDark(!isDark);
  };

  return (
    <footer className="w-full max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="py-6 border-t border-line">
        <div className="flex flex-wrap justify-between items-center gap-2">
          <div>
            <p className="text-xs text-muted">
              © Simon.
            </p>
          </div>
          {/* <!-- End Col --> */}

          {/* <!-- List --> */}
          <ul className="flex flex-wrap items-center">
            <li className="inline-block pe-4 text-xs">
              <a className="text-xs text-muted underline hover:text-ink hover:decoration-2 focus:outline-none focus:decoration-2" href="https://xchux.github.io/Resume/">
                Github
              </a>
            </li>
            <li className="inline-block">
              {/* <!-- Dark Mode --> */}
              <button
                type="button"
                onClick={toggleTheme}
                aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
                className="relative flex justify-center items-center size-7 border border-line text-muted rounded-full hover:bg-accent-soft focus:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                {isDark ? (
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <circle cx="12" cy="12" r="4" />
                    <path d="M12 2v2" />
                    <path d="M12 20v2" />
                    <path d="m4.93 4.93 1.41 1.41" />
                    <path d="m17.66 17.66 1.41 1.41" />
                    <path d="M2 12h2" />
                    <path d="M20 12h2" />
                    <path d="m6.34 17.66-1.41 1.41" />
                    <path d="m19.07 4.93-1.41 1.41" />
                  </svg>
                ) : (
                  <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
                  </svg>
                )}
              </button>
              {/* <!-- End Dark Mode --> */}
            </li>
          </ul>
          {/* <!-- End List --> */}
        </div>
      </div>
    </footer>
  );
};

export default Footer;
