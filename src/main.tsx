  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import { BrowserRouter, Routes, Route } from 'react-router-dom';
  import { Toaster } from "@/components/ui/sonner";
  import App from './App';
  import VehicleList from './components/VehicleList';
  import VehicleDetail from './components/VehicleDetails';
  import './index.css'; // Pastikan baris ini ada

  ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<VehicleList />} />
            <Route path="/vehicles/:id" element={<VehicleDetail />} />
          </Route>
        </Routes>
        <Toaster />
      </BrowserRouter>
    </React.StrictMode>
  );