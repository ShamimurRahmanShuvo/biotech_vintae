import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Shield, Menu, X } from 'lucide-react';

const links = [
    { name: 'About Us', href: '#about' },
    { name: 'Leadership', href: '#leadership' },
    { name: 'Products', href: '#products' },
    { name: 'Contact', href: '#contact' },
];

export default function Navbar() {
    const location = useLocation();
    const [open, setOpen] = useState(false);

    const handleNav = (href) => {
        setOpen(false);
        if (href.startsWith('#') && location.pathname === '/') {
            const Id = href.slice(2);
            requestAnimationFrame(() => document.getElementById(Id)?.scrollIntoView({ behavior: 'smooth' }));
        }
    };

    return (
        <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/95 shadow-sm backdrop-blur">
            <div className="mx-auto flex min-h-20 max-w-7xl items-center justify-between px-5 sm:px-6 lg:px-8">
                <Link to="/" onClick={() => setOpen(false)} className="min-w-0">
                    <span className="block text-lg font-extrabold leading-tight tracking-tight text-brand-blue sm:text-xl">
                        Biotech Vintae Pharma Ltd.
                    </span>
                    <span className="hidden text-[10px] font-semibold uppercase tracking-[0.2em] text-brand-teal sm:block">
                        Quality • Trust • Healthcare
                    </span>
                </Link>
                <nav className="hidden md:block" aria-label="Main navigation">
                    <ul className="flex items-center gap-7 text-sm font-semibold text-brand-dark">
                        {links.map((link) => (
                            <li key={link.name}>
                                <Link to={link.href} onClick={() => handleNav(link.href)} className="nav-link">
                                    {link.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                <button type="button"
                        className="rounded-lg p-2 text-brand-dark hover:bg-slate-100 md:hidden"
                        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
                        aria-expanded={open}
                        onClick={() => setOpen((value) => !value)}
                >
                    {open ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {open && (
                <nav className="border-t border-slate-100 bg-white px-5 py-3 md:hidden" area-label="Mobile navigation">
                    {links.map((link) => (
                        <Link key={link.label} to={link.href} onClick={() => handleNav(link.href)} className="block rounded-lg px-3 py-3 font-semibold text-brand-dark hover:bg-brand-light hover:text-brand-teal">
                            {link.label}
                        </Link>
                    ))}
                </nav>
            )}
        </header>
    );
}
