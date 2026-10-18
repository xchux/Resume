import { useState, useEffect, useRef, type ReactNode } from "react";

import { translatoinSchemaType } from "@/types/page";

type NavItem = { id: string; label: string; icon: ReactNode };

const iconProps = {
    className: "shrink-0 size-[18px]",
    xmlns: "http://www.w3.org/2000/svg",
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.8,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
};

const HomeIcon = () => (
    <svg {...iconProps}>
        <path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8" />
        <path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
    </svg>
);
const BriefcaseIcon = () => (
    <svg {...iconProps}>
        <path d="M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        <rect width="20" height="14" x="2" y="6" rx="2" />
    </svg>
);
const GraduationIcon = () => (
    <svg {...iconProps}>
        <path d="M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z" />
        <path d="M22 10v6" />
        <path d="M6 12.5V16a6 3 0 0 0 12 0v-3.5" />
    </svg>
);
const FolderIcon = () => (
    <svg {...iconProps}>
        <path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z" />
    </svg>
);
const WrenchIcon = () => (
    <svg {...iconProps}>
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
    </svg>
);
const AwardIcon = () => (
    <svg {...iconProps}>
        <path d="m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526" />
        <circle cx="12" cy="8" r="6" />
    </svg>
);
const DownloadIcon = () => (
    <svg {...iconProps} strokeWidth={2}>
        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
        <polyline points="7 10 12 15 17 10" />
        <line x1="12" x2="12" y1="15" y2="3" />
    </svg>
);

const linkClass = (isActive: boolean) =>
    `inline-flex shrink-0 items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium whitespace-nowrap transition-colors xl:px-2.5 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        isActive
            ? "bg-surface text-ink shadow-sm ring-1 ring-line"
            : "text-muted hover:bg-surface/60 hover:text-ink"
    }`;

const Navbar = (transation: translatoinSchemaType) => {
    const { data } = transation;
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const [activeId, setActiveId] = useState("profile");
    const langDropdownRef = useRef<HTMLDivElement>(null);

    const items: NavItem[] = [
        { id: "profile", label: data.profile.title, icon: <HomeIcon /> },
        { id: "work-experience", label: data.workExperience.title, icon: <BriefcaseIcon /> },
        { id: "education", label: data.education.title, icon: <GraduationIcon /> },
        { id: "project", label: data.project.title, icon: <FolderIcon /> },
        { id: "skills", label: data.skills.title, icon: <WrenchIcon /> },
        { id: "award", label: data.awards.title, icon: <AwardIcon /> },
    ];

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (langDropdownRef.current && !langDropdownRef.current.contains(event.target as Node)) {
                setIsLangOpen(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    // Highlight the last section whose top has passed the upper part of the viewport; default to the first.
    useEffect(() => {
        const update = () => {
            const line = window.innerHeight * 0.3;
            let current = items[0].id;
            items.forEach(({ id }) => {
                const el = document.getElementById(id);
                if (el && el.getBoundingClientRect().top <= line) current = id;
            });
            if (window.scrollY < 8) current = items[0].id;
            setActiveId(current);
        };
        update();
        window.addEventListener("scroll", update, { passive: true });
        window.addEventListener("resize", update);
        return () => {
            window.removeEventListener("scroll", update);
            window.removeEventListener("resize", update);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const [firstName, ...restName] = data.profile.name.split(" ");

    return (
        <header className="sticky top-0 z-50 w-full">
            <div className="mx-auto w-full max-w-6xl px-3 pt-4 sm:px-5">
                <nav
                    aria-label="Primary"
                    className={`flex flex-wrap items-center justify-between gap-y-3 border border-line bg-linear-to-r from-surface/85 via-accent-soft to-surface/85 px-5 py-3 shadow-[0_10px_30px_-14px_var(--accent)] backdrop-blur-xl xl:rounded-full xl:px-6 xl:py-3.5 ${isOpen ? "rounded-3xl" : "rounded-full"}`}
                >
                    <a href="#profile" onClick={() => setIsOpen(false)} className="shrink-0 font-serif text-[22px] whitespace-nowrap tracking-tight text-ink focus:outline-none focus-visible:ring-2 focus-visible:ring-accent">
                        {firstName}
                        {restName.length > 0 && <span className="text-muted italic"> {restName.join(" ")}</span>}
                    </a>

                    <button
                        type="button"
                        className="flex size-9 shrink-0 items-center justify-center rounded-full border border-line bg-surface text-ink xl:hidden"
                        aria-expanded={isOpen}
                        aria-controls="primary-menu"
                        aria-label="Toggle navigation"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        <svg className="size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                            {isOpen ? (
                                <>
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </>
                            ) : (
                                <>
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </>
                            )}
                        </svg>
                    </button>

                    <div
                        id="primary-menu"
                        className={`${isOpen ? "flex" : "hidden"} max-h-[calc(100dvh-7rem)] basis-full flex-col gap-3 overflow-y-auto xl:flex xl:max-h-none xl:min-w-0 xl:flex-1 xl:basis-0 xl:flex-row xl:items-center xl:justify-between xl:gap-4 xl:overflow-visible`}
                    >
                        <ul className="flex flex-col gap-1 xl:min-w-0 xl:flex-1 xl:flex-row xl:justify-center xl:gap-0.5">
                            {items.map(({ id, label, icon }) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        className={linkClass(activeId === id)}
                                        aria-current={activeId === id ? "location" : undefined}
                                        onClick={() => {
                                            setActiveId(id);
                                            setIsOpen(false);
                                        }}
                                    >
                                        {icon}
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>

                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center xl:gap-2">
                            {/* Below xl: inline language links, so no popup can overlap the CTA */}
                            <div className="flex gap-2 xl:hidden">
                                <a className={`${linkClass(false)} flex-1 justify-center border border-line sm:flex-none`} href="https://xchux.github.io/Resume/en">English</a>
                                <a className={`${linkClass(false)} flex-1 justify-center border border-line sm:flex-none`} href="https://xchux.github.io/Resume/zh-TW">中文</a>
                            </div>

                            <div className="relative hidden xl:block" ref={langDropdownRef}>
                                <button type="button" className={linkClass(false)} aria-expanded={isLangOpen} aria-haspopup="true" onClick={() => setIsLangOpen(!isLangOpen)}>
                                    {data.language.title}
                                    <svg className={`size-4 transition-transform ${isLangOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                    </svg>
                                </button>
                                {isLangOpen && (
                                    <div className="absolute end-0 top-full z-10 mt-5 w-40 overflow-hidden rounded-2xl border border-line bg-surface shadow-lg">
                                        <a className="block px-4 py-2 text-sm text-ink hover:bg-accent-soft" href="https://xchux.github.io/Resume/en">English</a>
                                        <a className="block px-4 py-2 text-sm text-ink hover:bg-accent-soft" href="https://xchux.github.io/Resume/zh-TW">中文</a>
                                    </div>
                                )}
                            </div>

                            <a
                                href={`/Resume/${data.about.cvFile}`}
                                download
                                className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-accent-ink px-4 py-2.5 text-[15px] font-semibold whitespace-nowrap text-bg transition hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
                            >
                                <DownloadIcon />
                                {data.about.downloadCv}
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </header>
    );
};

export default Navbar;
