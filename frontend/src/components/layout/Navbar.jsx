import React from 'react';
import { Link } from 'react-router-dom';
import {Shield} from 'lucide-react';


export default function Navbar() {
  return (
    <header classname="bg-white shadow-sm sticky top-0 z-50">
        <div classname="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-3">
                <div className="bg-brand-blue p-2 rounded-lg text-white">
                    <Shield className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-xl font-bold text-brand-dark leading-tight">
                        Biotech Vintae Pharma Ltd.
                    </h1>
                    <p className="text-xs text-gray-500 uppercase tracking-widest">
                        Quality & Trust in Healthcare
                    </p>
                </div>
            </Link>
            <nav className="flex items-center space-x-6">
                <Link to="/" className="text-gray-600 hover:text-brand-blue font-medium transition">
                    Home
                </Link>
                <a href="#products" className="text-gray-600 hover:text-brand-blue font-medium transition">
                    Products
                </a>
                <a href="#leadership" className="text-gray-600 hover:text-brand-blue font-medium transition">
                    Leadership
                </a>
                <a href="#contact" className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium hover:bg-brand-dark transition">
                    Contact Us
                </a>
            </nav>
        </div>
    </header>
  );
}
