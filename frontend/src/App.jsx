import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import ProductDetailPage from './components/pages/ProductDetailPage';
import { getCompanyInfo } from './services/api';

export default function App() {
    const [companyInfo, setCompanyInfo] = useState(null);

    useEffect(() => {
        let active = true;

        getCompanyInfo()
            .then((info) => {
                if (active) {
                    setCompanyInfo(info);
                }
            })
            .catch(() => {
                if (active) {
                    setCompanyInfo(null);
                }
            });

        return () => { active = false; };
    }, []);

    return (
        <Router>
            <Navbar companyInfo={companyInfo} />
            <Routes>
                <Route path="/" element={<HomePage companyInfo={companyInfo} />} />
                <Route path="/product/:slug" element={<ProductDetailPage companyInfo={companyInfo} />} />
            </Routes>
        </Router>
    );
}
