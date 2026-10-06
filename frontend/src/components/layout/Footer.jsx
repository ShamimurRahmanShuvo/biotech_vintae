import React from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';

export default function Footer({ companyInfo }) {
    const info = companyInfo?.[0] || {};

    return (
        <footer id="contact" className="bg-brand-dark text-white">
            <div className="mx-auto grid max-w-7xl gap-10 px-5 py-14 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                    <h3 className="text-xl font-extrabold">{info.company_name || 'Biotech Vintae Pharma Ltd.'}</h3>
                    <div className="mt-4 h-1 w-12 rounded bg-brand-teal" />
                    <p className="mt-5 max-w-sm text-sm leading-7 text-slate-300">
                        Dedicated to human welfare, scientific innovation, and high-quality
                        affordable healthcare solutions
                    </p>
                </div>
                <div>
                    <h4 className="text-base font-bold">Office Address</h4>
                    <div className="mt-4 flex gap-3 text-sm leading-6 text-slate-300">
                        <MapPin className="mt-1 shrink-0 text-brand-teal" size={18} />
                        <span className="whitespace-pre-line">
                            {info.office_address || 'Jannatul Mawa G/125 Ground Floor,\nBeside Khaddo Bhaban, Shahid Abdul Jobbar Sarak,\nRahman Nagar, Bogura'}
                        </span>
                    </div>
                </div>

                <div>
                    <h4 className="text-base font-bold">Contact Information</h4>
                    <div className="mt-4 space-y-3 text-sm text-slate-300">
                        <p className="flex items-center gap-3"><Phone size={17} className="text-brand-teal" /> Chairman: 01716-185705</p>
                        <p className="flex items-center gap-3"><Phone size={17} className="text-brand-teal" /> Managing Director: 01711-076557</p>
                        <p className="flex items-center gap-3"><Phone size={17} className="text-brand-teal" /> Finance Director: 01765-653583</p>
                        {info.email && <p className="flex items-center gap-3"><Mail size={17} className="text-brand-teal" /> {info.email}</p>}
                    </div>
                </div>
            </div>

            <div className="border-t border-slate-700 px-5 py-5 text-center text-xs text-slate-400">
                <p>
                    &copy; {new Date().getFullYear()} Biotech Vintae Pharma Ltd. All rights reserved.
                </p>
                <p className="mt-1">Designed and developed by &nbsp;
                    <a href="https://shamimurrahmanshuvo.github.io/" className="text-brand-teal hover:underline" target="_blank" rel="noreferrer">
                          Md Shamimur Rahman Shuvo
                    </a>
                </p>
            </div>
        </footer>
    );
}