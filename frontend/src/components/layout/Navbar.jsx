import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {Shield} from 'lucide-react';

export default function Navbar() {
    const location = useLocation();
    const isHome = location.pathname === '/';

    return (
        <header className="bg-white shadow-sm sticky top-0 z-50">
            <div className="max-w-[1200px] mx-auto px-6 py-4 flex justify-between items-center">
                <Link to="/" className="text-2xl font-bold text-brand-blue tracking-tight">
                    Biotech Vintae Pharma Ltd.
                </Link>
                <nav>
                    <ul className="flex items-center gap-6 list-none font-semibold text-brand-dark text-sm sm:text-base">
                        <li>
                            <a href={isHome ? "#about" : "/#about"} className="hover:text-brand-teal transition-colors">
                                About Us
                            </a>
                        </li>
                        <li>
                            <a href={isHome ? "#leadership" : "/#leadership"} className="hover:text-brand-teal transition-colors">
                                Leadership
                            </a>
                        </li>
                        <li>
                            <a href={isHome ? "#products" : "/#products"} className="hover:text-brand-teal transition-colors">
                                Products
                            </a>
                        </li>
                        <li>
                            <a href="#contact" className="hover:text-brand-teal transition-colors">
                                Contact
                            </a>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
}
