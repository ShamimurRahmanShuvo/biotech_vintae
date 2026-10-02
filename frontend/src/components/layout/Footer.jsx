import React from 'react';
import { MapPin, Phone } from 'lucide-react';

export default function Footer({ companyInfo }) {
    const info = companyInfo?.[0] || {};

  return (
    <footer id="contact" className="bg-brand-dark text-white pt-12 pb-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-700">
            <div>
                <h3 className="text-xl font-bold mb-3">{info.company_name || 'Biotech Vintae Pharma Ltd.'}</h3>
                <p className="text-gray-300 text-sm leading-relaxed">
                    Committed to ensuring consistent quality, affordable medicines, and customer satisfaction while
                    advancing public health welfare.
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-3">Headquarters</h4>
                <p className="text-gray-300 text-sm flex items-start gap-2">
                    <MapPin className="w-5 h-5 text-brand-teal shrink-0 mt-0.5" />
                        {info.office_address || 'Rahman Nagar, Bogura, Bangladesh'}
                </p>
            </div>
            <div>
                <h4 className="text-lg font-semibold mb-3">Direct Contacts</h4>
                <ul className="text-gray-300 text-sm space-y-2">
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-teal" />
                        <span>Chairman: 01716-185705</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-teal" />
                        <span>Managing Director: 01711-076557</span>
                    </li>
                    <li className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-brand-teal" />
                        <span>Finance Director: 01765-653583</span>
                    </li>
                </ul>
            </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6 text-center text-xs text-gray-400">
            © {new Date().getFullYear()} Biotech Vintae Pharma Ltd. All rights reserved.
        </div>
    </footer>
  );
}