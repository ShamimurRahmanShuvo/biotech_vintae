import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Award, HeartPulse, ShieldCheck, Sparkles } from 'lucide-react';
// import { getProducts, getLeadershipMessages, getCompanyInfo } from '../../services/api';
import Footer from '../layout/Footer';
import heroImage from '../../assets/hero.png';


function SectionHeading({ eyebrow, title, description }) {
    return (
        <div className="mx-auto mb-12 max-w-2xl text-center">
            {eyebrow && (
                <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-teal">
                    {eyebrow}
                </p>
            )}
            <h2 className="text-3xl font-extrabold tracking-tight text-brand-blue sm:text-4xl">
                {title}
            </h2>
            <div className="mx-auto mt-4 h-1 w-14 rounded-full bg-brand-accent" />
            {description && (
                <p className="mt-4 text-sm leading-7 text-slate-600 sm:text-base">
                    {description}
                </p>
            )}
        </div>
    );
}

export default function HomePage({ companyInfo, leadership = [], products = [] }) {
    const info = companyInfo && typeof companyInfo === 'object' ? companyInfo : {};

    return (
        <div className="min-h-screen bg-brand-light text-slate-800">
            <main>
                {/* Hero Section */}
                <section className="hero-section">
                    <div className="absolute inset-0 bg-[linear-gradient(115deg,rgba(15,76,129,.96),rgba(0,168,150,.78))]" />
                    <div className="relative mx-auto grid min-h-[560px] max-w-7xl items-center gap-10 px-5 py-20 sm:px-6 lg:grid-cols-[1.15fr_.85fr] lg:px-8">
                        <div className="max-w-2xl text-white">
                            <p className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/30 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.16em] backdrop-blur">
                                <Sparkles size={14} /> Healthcare • Innovation • Trust
                            </p>
                            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl lg:text-6xl">
                                Healing, Trust & Innovation
                            </h1>
                            <p className="mt-6 max-w-xl text-base leading-8 text-blue-50 sm:text-lg">
                                Delivering international-standard medicines
                                and nutraceuticals at affordable prices while empowering human welfare.
                            </p>
                            <div className="mt-8 flex flex-wrap gap-4">
                                <a href="#products" className="inline-flex items-center gap-2 rounded-lg bg-brand-accent px-6 py-3 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:brightness-95">
                                    Explore Products <ArrowRight size={18} />
                                </a>
                                <a href="#about" className="rounded-lg border border-white/50 bg-white/10 px-6 py-3 font-bold text-white backdrop-blur transition hover:bg-white/20">
                                    Our Mission
                                </a>
                            </div>
                        </div>
                        <div className="hidden justify-center lg:flex">
                            <div className="hero-art rounded-[2rem] border border-white/20 bg-white/10 p-5 shadow-2xl backdrop-blur">
                                <img src={heroImage} alt="Biotech Vintae Pharma" className="h-72 w-72 rounded-3xl object-cover" />
                            </div>
                        </div>
                    </div>
                </section>

                {/* About Section */}
                <section id="about" className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Who we are"
                        title="Our Mission & Vision"
                        description="Building a trusted healthcare organization around quality, service, innovation and human welfare."
                    />
                    <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-2">
                        <article className="info-card border-brand-teal">
                            <div className="icon-badge">
                                <HeartPulse size={22} />
                            </div>
                            <h3>Our Mission</h3>
                            <p>{info.mission || 'Mission information is not available.'}</p>
                        </article>
                        <article className="info-card border-brand-blue">
                            <div className="icon-badge blue">
                                <Award size={22} />
                            </div>
                            <h3>Our Vision</h3>
                            <p>{info.vision || 'Vision information is not available.'}</p>
                        </article>
                    </div>
                </section>

                {/* Leadership Section */}
                <section id="leadership" className="scroll-mt-24 bg-brand-light px-5 py-20 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Leadership" title="Executive Board Messages"
                        description="Dedicated leadership guiding quality, integrity and human welfare."
                    />
                    <div className="mx-auto grid max-w-7xl gap-7 md:grid-cols-3">
                        {leadership.length ? leadership.map((leader) => (
                            <article key={leader.id} className="leadership-card">
                                <div>
                                    <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-blue text-white">
                                        <ShieldCheck size={24} />
                                    </div>
                                    <p className="text-xs font-bold uppercase tracking-wider text-brand-teal">
                                        {leader.role_display || leader.role}
                                    </p>
                                    <h3 className="mt-1 text-xl font-extrabold text-brand-blue">
                                        {leader.name}
                                    </h3>
                                    <p className="mt-5 text-sm leading-7 text-slate-600">
                                        “{leader.message}”
                                    </p>
                                </div>
                                <p className="mt-6 border-t border-slate-100 pt-4 text-xs font-semibold text-slate-500">
                                    Cell: {leader.phone_number}
                                </p>
                            </article>
                        )) :
                        <div className="md:col-span-3 rounded-2xl border border-dashed border-slate-300 bg-white p-10 text-center text-slate-500">
                            Leadership information is not available at the moment. Please check back later.
                        </div>
                        }
                    </div>
                </section>

                {/* Products Section */}
                <section id="products" className="scroll-mt-24 bg-white px-5 py-20 sm:px-6 lg:px-8">
                    <SectionHeading
                        eyebrow="Our portfolio" title="Featured Products"
                        description="Explore product information, composition, indications, dosage guidance and storage conditions."
                    />
                    {products.length ? (
                        <div className="mx-auto grid max-w-7xl gap-7 sm:grid-cols-2 lg:grid-cols-3">
                            {products.map((product) => (
                                <article key={product.id} className="product-card">
                                    <div className="flex items-start justify-between gap-4 bg-gradient-to-br from-brand-blue to-[#176b9e] p-6 text-white">
                                        <div>
                                            <p className="text-[10px] font-bold uppercase tracking-[0.16em] text-blue-100">
                                                {product.category}
                                            </p>
                                            <h3 className="mt-2 text-xl font-extrabold">
                                                {product.name}
                                            </h3>
                                        </div>
                                        <div className="rounded-lg bg-white/10 p-2">
                                            <HeartPulse size={20} />
                                        </div>
                                    </div>
                                    <div className="flex flex-1 flex-col p-6">
                                        <p className="text-sm leading-7 text-slate-600">
                                            {product.short_description || 'Product information is available on the detail page.'}
                                        </p>
                                        <div className="mt-5 grid grid-cols-2 gap-3 text-xs">
                                            <div className="rounded-lg bg-brand-light p-3">
                                                <span className="block font-bold text-brand-blue">
                                                    Therapeutic class
                                                </span>
                                                <span className="mt-1 block text-slate-600">
                                                    {product.therapeutic_class || '—'}
                                                </span>
                                            </div>
                                            <div className="rounded-lg bg-brand-light p-3">
                                                <span className="block font-bold text-brand-blue">
                                                    Presentation
                                                </span>
                                                <span className="mt-1 block text-slate-600">
                                                    {product.presentation || '—'}
                                                </span>
                                            </div>
                                        </div>
                                        <Link to={`/product/${product.slug}`} className="mt-6 inline-flex items-center gap-2 font-bold text-brand-teal hover:text-brand-blue">
                                            View Product Details
                                            <ArrowRight size={16} />
                                        </Link>
                                    </div>
                                </article>
                            ))}
                        </div>
                    ) : <div className="mx-auto max-w-2xl rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
                            No products are currently available.
                        </div>}
                </section>

            </main>
        </div>
    );
}
