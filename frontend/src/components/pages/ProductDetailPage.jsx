import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { AlertTriangle, ArrowLeft, CheckCircle2, ClipboardList, Package, ShieldCheck } from 'lucide-react';
import { getProductBySlug, getCompanyInfo, getMediaUrl } from '../../services/api';
import Footer from '../layout/Footer';

function DetailCard({ icon, title, children }) {
    return (
        <section className="detail-card">
            <div className="mb-5 flex items-center gap-3 text-brand-blue">
                {icon}
                <h2 className="text-xl font-extrabold">
                    {title}
                </h2>
            </div>
            {children}
        </section>
    );
}


export default function ProductDetailPage(companyInfo) {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;
        getProductBySlug(slug)
            .then((productRes) => {
                if (!active) return;
                setProduct(productRes.data);
            })
            .catch(() => active && setError('Product details could not be found'))
            .finally(() => active && setLoading(false));
        return () => {active = false };
        /*
        Promise.all([getProductBySlug(slug), getCompanyInfo()])
            .then(([productRes, companyRes]) => {
                if (!active) return;
                setProduct(productRes.data);
                setCompanyInfo(companyRes.data);
            })
            .catch(() => active && setError('Product details could not be found.'))
            .finally(() => active && setLoading(false));
        return () => { active = false; }; */
    }, [slug]);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-light">
                <div className="loading-spinner"></div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="flex min-h-screen flex-col items-center justify-center bg-brand-light px-5 text-center">
                <h1 className="text-3xl font-extrabold text-brand-blue">Product Not Found</h1>
                <p className="mt-3 text-slate-600">{error}</p>
                    <Link to="/" className="mt-6 rounded-lg bg-brand-blue px-5 py-3 font-bold text-white">
                        Back to Products
                    </Link>
            </div>
        );
    }

    const composition = product.composition || [];
    const indications = product.indications || [];
    const images = product.images || [];
    const primaryImage = images.find((image) => image.is_primary) || images[0];

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <main className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-8">
                <Link to="/#products" className="mb-7 inline-flex items-center gap-2 text-sm font-bold text-brand-blue hover:text-brand-teal">
                    <ArrowLeft size={17} /> Back to All Products
                </Link>

                <section className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
                    <div className="grid lg:grid-cols-[.7fr_1.3fr]">
                        <div className="flex min-h-[300px] items-center justify-center bg-gradient-to-br from-brand-blue to-brand-teal p-8">
                            {primaryImage?.image ? <img src={primaryImage.image}  alt={primaryImage.alt_text || product.name}  className="max-h-80 w-full rounded-2xl object-contain" /> : <Package size={110} strokeWidth={1} className="text-white/80" />}
                        </div>
                        <div className="p-7 sm:p-10">
                            <span className="inline-flex rounded-full bg-teal-50 px-3 py-1 text-xs font-bold uppercase tracking-wider text-brand-teal">
                                {product.category}
                            </span>
                            <h1 className="mt-4 text-3xl font-black tracking-tight text-brand-blue sm:text-4xl">
                                {product.name}
                            </h1>
                            {product.therapeutic_class && <p className="mt-2 font-semibold text-brand-teal">{product.therapeutic_class}</p>}
                            <p className="mt-6 leading-8 text-slate-600">
                                {product.short_description}
                            </p>
                            <div className="mt-7 grid gap-4 sm:grid-cols-2">
                                <div className="rounded-xl bg-brand-light p-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">Presentation</span>
                                    <p className="mt-1 font-semibold text-brand-dark">{product.presentation || '—'}</p>
                                </div>
                                <div className="rounded-xl bg-brand-light p-4">
                                    <span className="text-xs font-bold uppercase tracking-wide text-slate-500">
                                        Route
                                    </span>
                                    <p className="mt-1 font-semibold text-brand-dark">
                                        {product.route_of_administration || '—'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                <div className="mt-8 grid gap-8 lg:grid-cols-2">
                    {composition.length > 0 && (
                        <DetailCard icon={<ClipboardList />} title="Composition">
                            <div className="overflow-hidden rounded-xl border border-slate-200">
                                <table className="w-full text-left text-sm">
                                    <thead className="bg-brand-light">
                                        <tr>
                                            <th className="px-4 py-3 font-bold text-brand-blue">Group</th>
                                            <th className="px-4 py-3 font-bold text-brand-blue">Ingredient / Component</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-slate-100">
                                        {composition.map((item, index) => (
                                            <tr key={`${item.name}-${index}`}>
                                                <td className="px-4 py-3 font-semibold text-slate-700">
                                                    {item.group || 'General'}
                                                </td>
                                                <td className="px-4 py-3 text-slate-600">
                                                    {item.name}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </DetailCard>
                    )}

                    <DetailCard icon={<ShieldCheck className="text-brand-teal" />} title="Indications">
                        {indications.length ?
                            <ul className="space-y-3">
                                {indications.map((item, index) => (
                                    <li key={`${item}-${index}`} className="flex gap-3 text-sm leading-6 text-slate-600">
                                        <CheckCircle2 className="mt-1 shrink-0 text-brand-teal" size={17} />
                                        {typeof item === 'string' ? item : item.text}
                                    </li>
                                ))}
                            </ul> : <p className="text-sm text-slate-500">No indication information has been provided.</p>
                        }
                    </DetailCard>

                    <DetailCard icon={<ClipboardList />} title="Dosage & Administration">
                        <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                            {product.dosage_administration || 'Follow the direction of a qualified healthcare professional.'}
                        </p>
                    </DetailCard>

                    <DetailCard icon={<AlertTriangle className="text-brand-accent" />} title="Safety & Storage">
                        <div className="space-y-5 text-sm leading-7 text-slate-600">
                            {product.pharmacology_how_it_works && (
                                <div>
                                    <h3 className="font-bold text-brand-dark">How It Works</h3>
                                    <p>{product.pharmacology_how_it_works}</p>
                                </div>
                            )}
                            {product.contraindications && (
                                <div>
                                    <h3 className="font-bold text-brand-dark">Contraindications</h3>
                                    <p>{product.contraindications}</p>
                                </div>
                            )}
                            {product.side_effects && (
                                <div>
                                    <h3 className="font-bold text-brand-dark">Potential Side Effects</h3>
                                    <p>{product.side_effects}</p>
                                </div>
                            )}
                            <div>
                                <h3 className="font-bold text-brand-dark">Storage Conditions</h3>
                                <p>{product.storage_conditions}</p>
                            </div>
                        </div>
                    </DetailCard>
                </div>

            </main>
        </div>
    );
}
