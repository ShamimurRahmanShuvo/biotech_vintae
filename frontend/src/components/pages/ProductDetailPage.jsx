import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductBySlug, getCompanyInfo } from '../../services/api';
import Footer from '../layout/Footer';
import { ArrowLeft, CheckCircle2, AlertTriangle, ShieldCheck, FileText } from 'lucide-react';


export default function ProductDetailPage() {
    const { slug } = useParams();
    const [product, setProduct] = useState(null);
    const [companyInfo, setCompanyInfo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        Promise.all([getProductBySlug(slug), getCompanyInfo()])
            .then(([prodRes, infoRes]) => {
                setProduct(prodRes.data);
                setCompanyInfo(infoRes.data);
            })
            .catch((err) => {
                console.error("Product fetch error: ", err);
                setError("Product details could not be found.");
            })
            .finally(() => {
                setLoading(false);
            });
    }, [slug]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-lg font-semibold text-brand-blue animate-pulse">
                    Fetching product details...
                 </div>
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center p-4">
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                    Product Not Found
                </h2>
                <p className="text-gray-600 mb-4">{error}</p>
                <Link to="/" className="bg-brand-blue text-white px-4 py-2 rounded-lg font-medium">
                    Back to Home
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex flex-col bg-gray-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1">
                <Link to="/" className="inline-flex items-center text-sm font-semibold text-brand-blue hover:underline mb-6">
                    <ArrowLeft className="w-4 h-4 mr-1" /> Back to All Products
                </Link>

                {/* Product Header */}
                <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                    <div className="flex flex-col md:flex-row justify-between md:items-center gap-4 border-b border-gray-100 pb-6 mb-6">
                        <div>
                            <span className="text-xs font-semibold uppercase tracking-wider text-brand-teal bg-teal-50 px-3 py-1 rounded-full">
                                {product.category}
                            </span>
                            <h1 className="text-4xl font-extrabold text-brand-dark mt-2">
                                {product.name}
                            </h1>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-xl text-sm border border-gray-100">
                            <p><strong>Presentation:</strong> {product.presentation}</p>
                            <p><strong>Route of Admin:</strong> {product.route_of_admin}</p>
                        </div>
                    </div>
                    <p className="text-gray-700 text-lg leading-relaxed">
                        {product.short_description}
                    </p>
                </div>

                {/* Composition Breakdown */}
                {product.ingredients && product.ingredients.length > 0 && (
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-8">
                        <h2 className="text-2xl font-bold text-brand-dark mb-6 flex items-center gap-2">
                            <FileText className="text-brand-blue" /> Composition & Active Ingredients
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-50 border-b border-gray-200 text-xs font-bold text-gray-600 uppercase">
                                        <th className="py-3 px-4">Ingredient Name</th>
                                        <th className="py-3 px-4">Strength / Amount</th>
                                        <th className="py-3 px-4">Mechanism / Role</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-100 text-sm">
                                    {product.ingredients.map((item) => (
                                        <tr key={item.id} className="hover:bg-gray-50 transition">
                                            <td className="py-3 px-4 font-semibold text-gray-800">{item.name}</td>
                                            <td className="py-3 px-4 text-brand-blue font-bold">{item.amount}</td>
                                            <td className="py-3 px-4 text-gray-600">{item.role_description}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}

                {/* Indication & Safety Grid */}
                <div className="grid md:grid-cols-2 gap-8 mb-8">
                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <ShieldCheck className="text-brand-teal" /> Recommended Indications
                        </h2>
                        <ul className="space-y-2">
                            {product.indications?.map((ind) => (
                                <li key={ind.id} className="flex items-start gap-2 text-sm text-gray-700">
                                    <CheckCircle2 className="w-4 h-4 text-brand-teal shrink-0 mt-0.5" />
                                    <span>{ind.condition_name}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                        <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-2">
                            <AlertTriangle className="text-brand-gold" /> Dosage & Administration Safety
                        </h2>
                        <div className="space-y-4 text-sm text-gray-700">
                            <div>
                                <strong className="block text-brand-dark mb-1">Recommended Dosage:</strong>
                                <p>{product.dosage_instructions}</p>
                            </div>
                            {product.precautions && (
                                <div>
                                    <strong className="block text-brand-dark mb-1">Precautions & Warnings:</strong>
                                    <p>{product.precautions}</p>
                                </div>
                            )}
                            {product.side_effects && (
                                <div>
                                    <strong className="block text-brand-dark mb-1">Potential Side Effects:</strong>
                                    <p>{product.side_effects}</p>
                                </div>
                            )}
                            <div>
                                <strong className="block text-brand-dark mb-1">Storage Conditions:</strong>
                                <p>{product.storage_conditions}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer companyInfo={companyInfo} />
        </div>
    );
}
