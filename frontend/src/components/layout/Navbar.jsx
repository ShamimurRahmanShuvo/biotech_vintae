import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

const links = [
    { name: 'About Us', href: '/#about' },
    { name: 'Leadership', href: '/#leadership' },
    { name: 'Products', href: '/#products' },
    { name: 'Contact', href: '/#contact' },
];

export default function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleNav = (href) => {
        setOpen(false);

        if (href.startsWith('/#')) {
            const id = href.substring(2);

            if (location.pathname === '/') {
                requestAnimationFrame(() => {
                    document.getElementById(id)?.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start',
                    });
                });
            }
        }
    };

    return (
        <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
            <div className="mx-auto flex min-h-[80px] max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">

                {/* Logo / Company Name */}
                <Link to="/" onClick={() => setOpen(false)} className="flex min-w-0 flex-col">
                    <span className="text-lg font-extrabold leading-tight tracking-tight text-brand-blue sm:text-xl">
                        Biotech Vintae Pharma Ltd.
                    </span>
                    <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal sm:block">
                        Quality • Trust • Healthcare
                    </span>
                </Link>

                {/* Desktop Navigation */}
                <nav className="hidden md:flex" aria-label="Main navigation">
                    <ul className="flex items-center gap-6 lg:gap-8">
                        {links.map((link) => (
                            <li key={link.href}>
                                <Link
                                    to={link.href}
                                    onClick={() => handleNav(link.href)}
                                    className="nav-link inline-flex items-center whitespace-nowrap px-2 py-3 text-sm font-semibold text-brand-dark transition-colors duration-200 hover:text-brand-teal"
                                >
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {/* Mobile Menu Button */}
                <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-lg p-2 text-brand-dark transition-colors hover:bg-slate-100 hover:text-brand-teal md:hidden"
                    aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                    aria-expanded={open}
                    onClick={() => setOpen((value) => !value)}
                >
                    {open ? (
                        <X size={26} strokeWidth={2} />
                    ) : (
                        <Menu size={26} strokeWidth={2} />
                    )}
                </button>
            </div>

            {/* Mobile Navigation */}
            {open && (
                <nav className="border-t border-slate-200 bg-white shadow-md md:hidden" area-label="Mobile navigation">
                    <div className="mx-auto max-w-7xl px-5 py-3 sm:px-6">
                        {links.map((link) => (
                            <Link
                                key={link.href}
                                to={link.href}
                                onClick={() => handleNav(link.href)}
                                className="block rounded-lg px-4 py-3 text-sm font-semibold text-brand-dark transition-colors duration-200 hover:bg-brand-light hover:text-brand-teal"
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                </nav>
            )}
        </header>
    );
}
