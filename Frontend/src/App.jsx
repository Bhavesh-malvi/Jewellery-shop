import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Catalogue from './pages/Catalogue'
import Collections from './pages/Collections'
import OurStory from './pages/OurStory'
import VisitShowroom from './pages/VisitShowroom'
import { EnquiryProvider } from './context/EnquiryContext'
import EnquiryDrawer from './components/EnquiryDrawer'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const App = () => {
    return (
        <EnquiryProvider>
            <BrowserRouter>
                <ScrollToTop />
                <Navbar />
                <EnquiryDrawer />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/catalogue" element={<Catalogue />} />
                    <Route path="/collections" element={<Collections />} />
                    <Route path="/about" element={<OurStory />} />
                    <Route path="/contact" element={<VisitShowroom />} />
                </Routes>
                <Footer />
            </BrowserRouter>
        </EnquiryProvider>
    )
}

export default App