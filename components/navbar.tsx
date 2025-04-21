import { useState, useEffect, useRef } from "react";

import Link from "next/link";

import { translatoinSchemaType } from "@/types/page";

const scrollToSection = (id: string, offset: number = 64) => {
    const target = document.querySelector(id);
    if (target) {
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: "smooth" });
    }
};

const Navbar = (transation: translatoinSchemaType) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLangOpen, setIsLangOpen] = useState(false);
    const langDropdownRef = useRef<HTMLDivElement>(null);

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

    return (
        <div className="sticky top-0 inset-x-0 flex flex-wrap md:justify-start md:flex-nowrap z-50 w-full text-sm">
            <nav className="mt-4 relative max-w-2xl w-full bg-white border border-gray-200 rounded-[2rem] mx-2 py-2.5 md:flex md:items-center md:justify-between md:py-0 md:px-4 md:mx-auto dark:bg-neutral-900 dark:border-neutral-700">
                <div className="px-4 md:px-0 flex justify-between items-center">
                    <div className="md:hidden">
                        {/* <!-- Toggle Button --> */}
                        <button type="button" className="hs-collapse-toggle flex justify-center items-center size-6 border border-gray-200 text-gray-500 rounded-full hover:bg-gray-200 focus:outline-none focus:bg-gray-200 dark:border-neutral-700 dark:text-neutral-400 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700" id="hs-navbar-header-floating-collapse" aria-expanded="false" aria-controls="hs-navbar-header-floating" aria-label="Toggle navigation" data-hs-collapse="#hs-navbar-header-floating" onClick={() => setIsOpen(!isOpen)}>
                            {isOpen ? (
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M18 6 6 18" />
                                    <path d="m6 6 12 12" />
                                </svg>
                            ) : (
                                <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <line x1="3" x2="21" y1="6" y2="6" />
                                    <line x1="3" x2="21" y1="12" y2="12" />
                                    <line x1="3" x2="21" y1="18" y2="18" />
                                </svg>
                            )}
                        </button>
                        {/* <!-- End Toggle Button --> */}
                    </div>
                </div>
                {/* "hidden hs-collapse overflow-hidden transition-all duration-300 basis-full grow md:block" */}
                <div id="hs-navbar-header-floating" className={`${isOpen ? "block" : "hidden"} md:block transition-all duration-300 basis-full grow md:block`} aria-labelledby="hs-navbar-header-floating-collapse">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-end gap-2 md:gap-3 mt-3 md:mt-0 py-2 md:py-0 md:ps-7">
                        <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-gray-800 font-medium text-gray-800 focus:outline-none dark:border-neutral-200 dark:text-neutral-200" href="#" aria-current="page">{transation.data.profile.title}</Link>
                        <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#work-experience");
                        }} href="#work-experience">{transation.data.workExperience.title}</Link>
                        <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#education");
                        }} href="#education">{transation.data.education.title}</Link>
                        <Link className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200" onClick={(e) => {
                            e.preventDefault();
                            scrollToSection("#skills");
                        }} href="#skills">{transation.data.skills.title}</Link>
                        <div className="relative" ref={langDropdownRef}>
                            <button className="py-0.5 md:py-3 px-4 md:px-1 border-s-2 md:border-s-0 md:border-b-2 border-transparent text-gray-500 hover:text-gray-800 focus:outline-none dark:text-neutral-400 dark:hover:text-neutral-200 flex items-center" onClick={() => setIsLangOpen(!isLangOpen)}>
                                {transation.data.language.title}
                                <svg className={`ml-1 w-4 h-4 transition-transform ${isLangOpen ? 'rotate-180' : ''}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            {isLangOpen && (
                                <div className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-md shadow-lg dark:bg-neutral-900 dark:border-neutral-700">
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-700" href="https://xchux.github.io/Resume/en">English</Link>
                                    <Link className="block px-4 py-2 text-gray-800 hover:bg-gray-200 dark:text-neutral-200 dark:hover:bg-neutral-700" href="https://xchux.github.io/Resume/zh-TW">中文</Link>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;