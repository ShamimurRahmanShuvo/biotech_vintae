import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

import HomePage from './components/pages/HomePage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import { getProducts, getLeadershipMessages, getCompanyInfo } from './services/api';

export default function App() {
    const [companyInfo, setCompanyInfo] = useState(null);
    const [leadership, setLeadership] = useState([]);
    const [products, setProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('')

    useEffect(() => {
        let active = true;

        const loadCompanyData = async () => {
            try {
                const [productsResponse, leadershipResponse, companyInfoResponse] = await Promise.allSettled([
                    getProducts(),
                    getLeadershipMessages(),
                    getCompanyInfo()
                ]);

                if (!active) return;

                const hasError = [productsResponse, leadershipResponse, companyInfoResponse].some(
                    (result) => result.status === 'rejected'
                );

                setError (hasError ? 'Error fetching companyInfo. Please try again.' : '');

                setProducts(
                    productsResponse.status === 'fulfilled' &&
                    Array.isArray(productsResponse.value) ? productsResponse.value : []
                );

                setLeadership(
                    leadershipResponse.status === 'fulfilled' &&
                    Array.isArray(leadershipResponse.value) ? leadershipResponse.value : []
                );

                setCompanyInfo(
                    companyInfoResponse.status === 'fulfilled' ? companyInfoResponse.value : null
                );
            } catch (err) {
                if (!active) return;

                console.error('Failed to load company data: ', err);
                setError('Unable to load company information. Please try again');
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        loadCompanyData();

        return () => { active = false; };

    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-brand-light">
                <div className="oading-spinner" aria-label="Loading" />
            </div>
        );
    }
    return (
        <div className="min-h-screen bg-brand-light text-slate-800">

            {error && (
                <div className="mx-auto max-w-7xl px-5 pt-6 sm:px-6 lg:px-8">
                    <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                        {error}
                    </div>
                </div>
            )}
            <Router>
                <Navbar companyInfo={companyInfo} />
                <Routes>
                    <Route path="/" element={<HomePage
                                                companyInfo={companyInfo}
                                                leadership={leadership}
                                                products={products}
                                                />}
                    />
                    <Route path="/product/:slug" element={<ProductDetailPage />} />
                </Routes>
            </Router>
            <Footer companyInfo={companyInfo} leadership={leadership} />
        </div>
    );
}
