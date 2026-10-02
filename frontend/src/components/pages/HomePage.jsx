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
            <section className="bg-gradient-to-r from-brand-dark via-brand-blue to-brand-teal text-white py-20 px-4">
                <div className="max-w-7xl mx-auto text-center md:text-left grid md:grid-cols-2 items-center gap-8">
                    <div>
                        <span className="inline-block bg-white/20 backdrop-blur-md text-xs font-semibold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                            Pioneering Modern Healthcare
                        </span>
                        <h1 className="text-4xl md:text-5xl font-extrabold leading-tight mb-4">
                            Advanced Nutraceuticals & Therapeutic Solutions
                        </h1>
                        <p className="text-gray-200 text-lg mb-6 leading-relaxed">
                            Biotech Vintae Pharma Ltd. provides international standard,
                            quality-driven medicines crafted to empower healthier lives.
                        </p>
                        <a href="#products" className="inline-flex items-center bg-brand-gold text-white font-bold px-6 py-3 rounded-lg shadow-lg hover:bg-opacity-90 transition">
                            Explore Our Products <ChevronRight className="ml-2 w-5 h-5" />
                        </a>
                    </div>

                    <div className="hidden md:flex justify-center">
                        <div className="bg-white/10 p-8 rounded-2xl backdrop-blur-md border border-white/20 max-w-md">
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <Award className="text-brand-gold" /> Our Mission
                            </h3>
                            <p className="text-sm text-gray-200 leading-relaxed mb-4">
                                {info.mission}
                            </p>
                            <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                                <HeartPulse className="text-brand-gold" /> Our Vision
                            </h3>
                            <p className="text-sm text-gray-200 leading-relaxed">
                                {info.vision}
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Leadership Messages */}
            <section id="leadership" className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-brand-dark">
                        Executive Board Messages
                    </h2>
                    <p className="text-gray-600 mt-2">
                        Dedicated leadership guiding quality, integrity, and human welfare.
                    </p>
                </div>

                <div className="grid md:grid-cols-3 gap-8">
                    {leadership.map((leader) => (
                    <div key={leader.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100 flex flex-col justify-between">
                        <div>
                            <span className="text-xs font-bold text-brand-teal uppercase tracking-wider bg-teal-50 px-2.5 py-1 rounded">
                                {leader.role_display}
                            </span>
                            <h3 className="text-xl font-bold text-gray-800 mt-3">{leader.name}</h3>
                            <p className="text-sm text-gray-500 mb-4">Contact: {leader.phone_number}</p>
                            <p className="text-gray-600 text-sm leading-relaxed italic">"{leader.message}"</p>
                        </div>
                    </div>
                    ))}
                </div>
            </section>

            {/* Product Catalog */}
            <section id="products" className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-brand-dark">
                            Our Core Products
                        </h2>
                        <p className="text-gray-600 mt-2">
                            Formulated with premium imported raw materials for optimal therapeutic outcomes.
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {products.map((product) => (
                        <div key={product.id} className="bg-white rounded-xl shadow-md hover:shadow-lg transition border border-gray-100 overflow-hidden flex flex-col">
                            <div className="p-6 flex-1">
                                <span className="text-xs font-semibold text-brand-blue bg-blue-50 px-2.5 py-1 rounded">
                                    {product.category}
                                </span>
                                <h3 className="text-2xl font-bold text-brand-dark mt-2 mb-2">
                                    {product.name}
                                </h3>
                                <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                                    {product.short_description}
                                </p>
                                <div className="text-xs text-gray-500 space-y-1">
                                    <p><strong>Presentation:</strong> {product.presentation}</p>
                                </div>
                            </div>
                            <div className="bg-gray-50 px-6 py-4 border-t border-gray-100 flex justify-between items-center">
                                <Link to={`/product/${product.slug}`} className="text-brand-blue font-bold text-sm flex items-center hover:underline">
                                    View Full Composition <ChevronRight className="w-4 h-4 ml-1" />
                                </Link>
                            </div>
                        </div>
                        ))}
                    </div>
                </div>
            </section>

            <Footer companyInfo={companyInfo} />
        </div>
    );
}
