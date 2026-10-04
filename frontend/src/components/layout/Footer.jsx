import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function Footer({ companyInfo }) {
    const info = companyInfo?.[0] || {};

    return (
        <footer id="contact" className="bg-brand-dark text-white pt-12 pb-4">
            <div className="max-w-[1200px] mx-auto px-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-8">
                <div>
                    <h3 className="text-xl font-bold mb-3">{info.company_name || 'Biotech Vintae Pharma Ltd.'}</h3>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Dedicated to human welfare, scientific innovation, and high-quality
                        affordable healthcare solutions
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-3">Office Address</h4>
                    <p className="text-sm text-gray-300 leading-relaxed whitespace-pre-line">
                        {info.office_address || "Jannatul Mawa G/125 Ground Floor,\nBeside Khaddo Bhaban, Shahid Abdul Jobbar Sarak,\nRahman Nagar, Bogura"}
                    </p>
                </div>
                <div>
                    <h4 className="text-lg font-semibold mb-3">Contact Info</h4>
                    <p className="text-sm text-gray-300 leading-relaxed">
                        Chairman: 01716-185705<br />
                        Managing Director: 01711-076557<br />
                        Finance Director: 01765-653583
                    </p>
                </div>
            </div>
            <div className="text-center border-t border-slate-700 pt-4 text-xs text-gray-400>
                <p>
                    &copy; {new Date().getFullYear()} Biotech Vintae Pharma Ltd. All rights reserved.
                </p>
                <p>Designed and developed by
                    <a href="https://shamimurrahmanshuvo.github.io/" className="text-blue-400 hover:underline" target="_blank">
                        Md Shamimur Rahman Shuvo
                    </a>
                </p>
            </div>
        </footer>
    );
}