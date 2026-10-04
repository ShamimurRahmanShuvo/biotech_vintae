import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts, getLeadershipMessages, getCompanyInfo } from '../../services/api';
import Footer from '../layout/Footer';
import { ChevronRight, Award, HeartPulse } from 'lucide-react';


export default function HomePage() {
    const [products, setProducts] = useState([]);
    const [leadership, setLeadership] = useState([]);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
    Promise.all([getProducts(), getLeadershipMessages(), getCompanyInfo()])
        .then(([prodRes, leadRes, infoRes]) => {
            setProducts(prodRes.data);
            setLeadership(leadRes.data);
            setCompanyInfo(infoRes.data);
        })
        .catch((err) => console.error('Error fetching data:', err))
        .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg font-semibold text-brand-blue animate-pulse">
                    Loading Biotech Vintae Pharma...
                </div>
            </div>
        );
    }

    const info = companyInfo[0] || {};

    return (
        <div className="min-h-screen flex flex-col">
            {/* Hero Section */}
            <section
                className="relative text-white py-24 px-6 text-center bg-cover bg-center"
                style={{
                    backgroundImage: `linear-gradient(rgba(15, 76, 129, 0.85), rgba(0, 168, 150, 0.85)), url('https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1350&q=80')`
                }}
            >
                <div className="max-w-[1200px] mx-auto">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">Healing, Trust & Innovation</h1>
                    <p className="text-lg sm:text-xl max-w-[700px] mx-auto mb-8 text-gray-100">
                        Delivering international standard medicines and nutraceuticals at affordable prices
                        while empowering human welfare.
                    </p>
                    <a href="#products" className="bg-brand-accent text-white px-7 py-3 rounded-md font-bold inline-block hover:opacity-90 transition shadow-md">
                        Explore Our Products
                    </a>
                </div>
            </section>

            {/* Leadership Messages */}
            <section id="leadership" className="max-w-[1200px] mx-auto px-6 py-[4rem] w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-blue inline-block relative after:content-[''] after:w-[60px] after:h-[3px] after:bg-brand-teal after:block after:mx-auto after:mt-2">
                        Executive Board Messages
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Dedicated leadership guiding quality, integrity, and human welfare.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {leadership.map((leader) => (
                    <div key={leader.id} className="bg-white rounded-lg p-8 shadow-[0_4px_6px_rgba(0,0,0,0.05)] border-t-4 border-brand-blue flex flex-col justify-between">
                        <div>
                            <h3 className="text-xl font-bold text-brand-blue mb-1">{leader.name}</h3>
                            <div className="text-sm font-bold text-brand-teal mb-4">{leader.role_display}</div>
                            <p className="text-gray-700 text-sm leading-relaxed italic">"{leader.message}"</p>
                        </div>
                        <div className="text-xs text-gray-500 mt-6 pt-4 border-t border-gray-100">
                            Cell: {leader.phone_number}
                        </div>
                    </div>
                    ))}
                </div>
            </section>

            {/* Mission & Vission Section */}
            <section id="about" className="bg-[#eef7f6] py-[4rem] px-6 w-full">
                <div className="max-w-[1200px] mx-auto">
                    <div className="text-center mb-10">
                        <h2 className="text-3xl font-bold text-brand-blue inline-block relative after:content-[''] after:w-[60px] after:h-[3px] after:bg-brand-teal after:block after:mx-auto after:mt-2">
                            Our Mission & Vision
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div className="bg-white rounded-lg p-8 shadow-[0_4px_6px_rgba(0,0,0,0.05)] border-t-4 border-brand-teal">
                            <h3 className="text-xl font-bold text-brand-blue mb-3">Our Mission</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {info.mission || "To create job opportunities, ensure consistent quality, deliver committed service, and maintain customer satisfaction across all groups, while fostering employee professional development and work-life balance."}
                            </p>
                        </div>
                        <div className="bg-white rounded-lg p-8 shadow-[0_4px_6px_rgba(0,0,0,0.05)] border-t-4 border-brand-teal">
                            <h3 className="text-xl font-bold text-brand-blue mb-3">Our Vision</h3>
                            <p className="text-gray-700 text-sm leading-relaxed">
                                {info.vision || "To lead the industry through best-in-class production and marketing practices, exceed customer expectations, and become a beloved organization for both patients and employees."}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Product Catalog */}
            <section id="products" className="max-w-[1200px] mx-auto px-6 py-[4rem] w-full">
                <div className="text-center mb-10">
                    <h2 className="text-3xl font-bold text-brand-blue inline-block relative after:content-[''] after:w-[60px] after:h-[3px] after:bg-brand-teal after:block after:mx-auto after:mt-2">
                        Our Featured Products
                    </h2>
                    <p className="text-gray-600 mt-2">
                            Formulated with premium imported raw materials for optimal therapeutic outcomes.
                    </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                    {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-lg overflow-hidden shadow-[0_4px_6px_rgba(0,0,0,0.05)] hover:-translate-y-1 transition-transform duration-300 flex flex-col justify-between border border-gray-100">
                        <div>
                            <div className="bg-brand-blue text-white p-4 text-center">
                                <h3 className="text-xl font-bold">{product.name}</h3>
                            </div>
                            <div className="p-6">
                                <p className="text-sm text-gray-700 mb-4">
                                    <strong>Category:</strong> {product.category}
                                </p>
                                <p className="text-sm text-gray-600 line-clamp-3 mb-4">
                                    {product.short_description}
                                </p>
                            </div>
                        </div>
                        <div className="p-6 pt-0 border-t border-gray-100 mt-auto">
                            <Link
                                to={`/product/${product.slug}`}
                                className="inline-block mt-4 text-sm font-bold text-brand-teal hover:text-brand-blue transition-colors"
                            >
                                View Details & Formula →
                            </Link>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer companyInfo={companyInfo} />
        </div>
    );
}
