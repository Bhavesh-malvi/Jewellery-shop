import React from 'react'
import { BrowserRouter, Route, Routes, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Collections from './pages/Collections'
import OurStory from './pages/OurStory'
import VisitShowroom from './pages/VisitShowroom'
import ProductDetail from './pages/ProductDetail'
import { EnquiryProvider } from './context/EnquiryContext'
import { AdminAuthProvider } from './context/AdminAuthContext'
import EnquiryDrawer from './components/EnquiryDrawer'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

// Admin Components
import AdminLogin from './pages/admin/AdminLogin'
import AdminLayout from './components/admin/AdminLayout'
import AdminProtectedRoute from './components/admin/AdminProtectedRoute'
import AdminDashboard from './pages/admin/AdminDashboard'
import AdminProductList from './pages/admin/AdminProductList'
import AdminProductForm from './pages/admin/AdminProductForm'

// Public layout wrapper with Store Navbar and Footer
const PublicLayout = () => {
    return (
        <>
            <Navbar />
            <EnquiryDrawer />
            <Outlet />
            <Footer />
        </>
    )
}

const App = () => {
    return (
        <AdminAuthProvider>
            <EnquiryProvider>
                <BrowserRouter>
                    <ScrollToTop />
                    <Routes>
                        {/* Public Customer Routes */}
                        <Route element={<PublicLayout />}>
                            <Route path="/" element={<Home />} />
                            <Route path="/catalogue" element={<Catalogue />} />
                            <Route path="/collections" element={<Collections />} />
                            <Route path="/about" element={<OurStory />} />
                            <Route path="/contact" element={<VisitShowroom />} />
                            <Route path="/product/:id" element={<ProductDetail />} />
                        </Route>

                        {/* Admin Authentication */}
                        <Route path="/admin/login" element={<AdminLogin />} />

                        {/* Protected Admin Portal */}
                        <Route path="/admin" element={<AdminProtectedRoute />}>
                            <Route element={<AdminLayout />}>
                                <Route index element={<AdminDashboard />} />
                                <Route path="products" element={<AdminProductList />} />
                                <Route path="products/new" element={<AdminProductForm />} />
                                <Route path="products/edit/:id" element={<AdminProductForm />} />
                            </Route>
                        </Route>
                    </Routes>
                </BrowserRouter>
            </EnquiryProvider>
        </AdminAuthProvider>
    )
}

export default App