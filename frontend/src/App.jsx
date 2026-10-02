import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/layout/Navbar';
import HomePage from './components/pages/HomePage';
import ProductDetailPage from './components/pages/ProductDetailPage';

export default function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/product/:slug" element={<ProductDetailPage />} />
            </Routes>
        </Router>
    );
}
