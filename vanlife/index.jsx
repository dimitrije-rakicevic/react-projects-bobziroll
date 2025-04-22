import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom"
import Home from "./pages/Home"
import About from "./pages/About"
import Vans from './pages/vans/Vans';
import VanDetail from './pages/vans/VanDetail';
import Layout from './components/Layout';
import HostLayout from './components/HostLayout';
import Dashboard from './pages/host/Dashboard';
import Reviews from './pages/host/Reviews';
import Income from './pages/host/Income';
import HostVans from './pages/host/HostVans';
import HostVanDetail from './pages/host/HostVanDetail';
import './server'
import HostVanDetails from './pages/host/hostVan/HostVanDetails';
import HostVanPricing from './pages/host/hostVan/HostVanPricing';
import HostVanPhotos from './pages/host/hostVan/HostVanPhotos';
import NotFound from './pages/NotFound';
import Login from './pages/Login';
import AuthRequired from './components/AuthRequired';

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/vans" element={<Vans />} />
            <Route path="/login" element={<Login />} />
            <Route path="/vans/:id" element={<VanDetail />} />
            <Route path="login" element={<Login />} />
            <Route element={<AuthRequired />}>
              <Route path="host" element={<HostLayout />}>
                <Route index element={<Dashboard />} />
                <Route path="income" element={<Income />} />
                <Route path="vans" element={<HostVans />} />
                <Route path="vans/:id" element={<HostVanDetail />}>
                  <Route index element={<HostVanDetails />} />
                  <Route path="pricing" element={<HostVanPricing />} />
                  <Route path="photos" element={<HostVanPhotos />} />
                </Route>
                <Route path="reviews" element={<Reviews />} />
              </Route>
            </Route>
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}

ReactDOM
  .createRoot(document.getElementById('root'))
  .render(<App />);